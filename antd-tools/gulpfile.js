/* eslint-disable no-console */
const { getProjectPath, injectRequire } = require('./utils/projectHelper');

injectRequire();

// const install = require('./install')
const runCmd = require('./runCmd');
const getBabelCommonConfig = require('./getBabelCommonConfig');
const merge2 = require('merge2');
// const { execSync } = require('child_process');
const through2 = require('through2');
const transformLess = require('./transformLess');
const webpack = require('webpack');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const argv = require('minimist')(process.argv.slice(2));
const { Octokit } = require('@octokit/rest');

// const getNpm = require('./getNpm')
// const selfPackage = require('../package.json')
const chalk = require('chalk');
// const getNpmArgs = require('./utils/get-npm-args');
// const getChangelog = require('./utils/getChangelog');
const path = require('path');
// const watch = require('gulp-watch')
const ts = require('gulp-typescript');
const gulp = require('gulp');
const fs = require('fs');
const rimraf = require('rimraf');
const tsConfig = require('./getTSCommonConfig')();
const replaceLib = require('./replaceLib');
const stripCode = require('gulp-strip-code');
// const compareVersions = require('compare-versions');

const packageJson = require(getProjectPath('package.json'));
const tsDefaultReporter = ts.reporter.defaultReporter();
const cwd = process.cwd();
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

// function reportError(errorTip, suggestTip) {
//   console.log(chalk.blue.bgRed.bold('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
//   console.log();
//   if (errorTip) {
//     console.log(chalk.blue.bgRed.bold(`-> ${errorTip}`));
//   }
//   if (suggestTip) {
//     console.log(chalk.blue.bgRed.bold(`-> ${suggestTip}`));
//   }
//   console.log();
//   console.log(chalk.blue.bgRed.bold('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
// }

function dist(done) {
  // 清除
  // rimraf.sync(path.join(cwd, 'dist'));
  process.env.RUN_ENV = 'PRODUCTION';
  const webpackConfig = require(getProjectPath('webpack.build.conf.js'));
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    });
    console.log(buildInfo);
    done(0);
  });
}

const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

function compileTs(stream) {
  return stream
    .pipe(ts(tsConfig))
    .js.pipe(
      through2.obj(function (file, encoding, next) {
        // console.log(file.path, file.base);
        file.path = file.path.replace(/\.[jt]sx$/, '.js');
        this.push(file);
        next();
      }),
    )
    .pipe(gulp.dest(process.cwd()));
}

gulp.task('tsc', () =>
  compileTs(
    gulp.src(tsFiles, {
      base: cwd,
    }),
  ),
);

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  babelConfig.babelrc = false;
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index\.(js|jsx|ts|tsx)$/)) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(
          content
            .replace(/\/style\/?'/g, "/style/css'")
            .replace(/\/style\/?"/g, '/style/css"')
            .replace(/\.less/g, '.css'),
        );
        file.path = file.path.replace(/index\.(js|jsx|ts|tsx)$/, 'css.js');
        this.push(file);
      } else if (modules !== false) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(
          content
            .replace(/lodash-es/g, 'lodash')
            .replace(/@ant-design\/icons-vue/g, '@ant-design/icons-vue/lib/icons'),
        );
        this.push(file);
      }
      next();
    }),
  );
  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      }),
    );
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function copy() {
  gulp.src(['components/**/*.vue']).pipe(replace(/\.ts/gi, '.js')).pipe(gulp.dest(esDir));
}

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (
          file.path.match(/\/style\/index\.less$/) ||
          file.path.match(/\/style\/v2-compatible-reset\.less$/)
        ) {
          transformLess(file.path)
            .then((css) => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  const assets = gulp
    .src(['components/**/*.@(png|svg)'])
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  let error = 0;
  const source = [
    'components/**/*.js',
    'components/**/*.jsx',
    'components/**/*.tsx',
    'components/**/*.ts',
    'typings/**/*.d.ts',
    '!components/*/__tests__/*',
  ];

  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    }),
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);
  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([less, tsFilesStream, tsd, assets]);
}

// function tag() {
//   console.log('tagging');
//   const { version } = packageJson;
//   if (!process.env.GITHUB_USER_EMAIL) {
//     reportError(
//       `\`process.env.GITHUB_USER_EMAIL\` does not exist`,
//       `Please set \`process.env.GITHUB_USER_EMAIL\``,
//     );
//     process.exit(1);
//   }
//   if (!process.env.GITHUB_USER_NAME) {
//     reportError(
//       `\`process.env.GITHUB_USER_NAME\` does not exist`,
//       `Please set \`process.env.GITHUB_USER_NAME\``,
//     );
//     process.exit(1);
//   }
//   if (!process.env.GITHUB_TOKEN) {
//     reportError(
//       `\`process.env.GITHUB_TOKEN\` does not exist`,
//       `Please set \`process.env.GITHUB_TOKEN\``,
//     );
//     process.exit(1);
//   }
//   execSync(`git config --global user.email ${process.env.GITHUB_USER_EMAIL}`);
//   execSync(`git config --global user.name ${process.env.GITHUB_USER_NAME}`);
//   execSync(`git tag ${version}`);
//   execSync(
//     `git push https://${process.env.GITHUB_TOKEN}@github.com/fe6/water-pro.git ${version}:${version}`,
//   );
//   execSync(
//     `git push https://${process.env.GITHUB_TOKEN}@github.com/fe6/water-pro.git master:master`,
//   );
//   console.log('tagged');
// }

// function githubRelease(done) {
//   const changlogFiles = [
//     path.join(cwd, 'CHANGELOG.en-US.md'),
//     path.join(cwd, 'CHANGELOG.zh-CN.md'),
//   ];
//   console.log('creating release on GitHub');
//   if (!process.env.GITHUB_TOKEN) {
//     reportError('no GitHub token found, skip');
//     return;
//   }
//   if (!changlogFiles.every(file => fs.existsSync(file))) {
//     reportError('no changelog found, skip');
//     return;
//   }
//   const github = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
//   });
//   const date = new Date();
//   const { version } = packageJson;
//   const enChangelog = getChangelog(changlogFiles[0], version);
//   const cnChangelog = getChangelog(changlogFiles[1], version);
//   const changelog = [
//     `\`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}\``,
//     enChangelog,
//     '\n',
//     '---',
//     '\n',
//     cnChangelog,
//   ].join('\n');
//   const [_, owner, repo] = execSync('git remote get-url origin') // eslint-disable-line
//     .toString()
//     .match(/github.com[:/](.+)\/(.+)\.git/);
//   github.repos
//     .createRelease({
//       owner,
//       repo,
//       tag_name: version,
//       name: version,
//       body: changelog,
//     })
//     .then(() => {
//       done();
//     })
//     .catch(err => {
//       reportError(err);
//     });
// }

gulp.task(
  'copy',
  gulp.series((done) => {
    copy();
    done();
  }),
);

// gulp.task(
//   'tag',
//   gulp.series(done => {
//     tag();
//     githubRelease(done);
//   }),
// );

gulp.task(
  'check-git',
  gulp.series((done) => {
    runCmd('git', ['status', '--porcelain'], (code, result) => {
      if (/^\?\?/m.test(result)) {
        return done(`There are untracked files in the working tree.\n${result}
      `);
      }
      if (/^([ADRM]| [ADRM])/m.test(result)) {
        return done(`There are uncommitted changes in the working tree.\n${result}
      `);
      }
      return done();
    });
  }),
);

// function publish(tagString, done) {
//   let args = ['publish', '--with-antd-tools'];
//   if (tagString) {
//     args = args.concat(['--tag', tagString]);
//   }
//   const publishNpm = process.env.PUBLISH_NPM_CLI || 'npm';
//   runCmd(publishNpm, args, code => {
//     done(code);
//   });
// }

function pub(done) {
  const notOk = !packageJson.version.match(/^\d+\.\d+\.\d+$/);
  let tagString;
  if (argv['npm-tag']) {
    tagString = argv['npm-tag'];
  }
  if (!tagString && notOk) {
    tagString = 'next';
  }

  if (packageJson.scripts['pre-publish']) {
    runCmd('npm', ['run', 'pre-publish']);
  }
}

gulp.task('compile-with-es', (done) => {
  console.log(chalk.blue.bold('💦 [water tool] Compile to es...'));
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', (done) => {
  console.log(chalk.blue.bold('💦 [water tool] Compile to js...'));
  compile().on('finish', done);
});

gulp.task(
  'compile',
  gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib'), (done) => {
    done();
  }),
);

gulp.task(
  'dist',
  gulp.series((done) => {
    dist(done);
  }),
);
// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; };var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
// _regenerator.default.mark
// _regenerator.default.wrap
// DOTO [fix] [!] Error: 'default' is not exported by @babel/runtime/regenerator
// gulp.task('relaceRegenerator', gulp.series(done => {
//   gulp
//     .src([`${esDir}/**/*.js`])
//     .pipe(replace('import _regeneratorRuntime from "@babel/runtime/regenerator";', 'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; };var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));'))
//     .pipe(replace('_regeneratorRuntime.mark', '_regenerator.default.mark'))
//     .pipe(replace('_regeneratorRuntime.wrap', '_regenerator.default.wrap'))
//     .pipe(gulp.dest(esDir));
//   done();
// }));
// , 'relaceRegenerator'

gulp.task(
  'pub',
  gulp.series('check-git', 'compile', 'copy', 'dist', (done) => {
    // if (!process.env.GITHUB_TOKEN) {
    //   console.log('no GitHub token found, skip');
    // } else {
    //   pub(done);
    // }
    pub(done);
  }),
);

// gulp.task(
//   'pub-with-ci',
//   gulp.series(done => {
//     if (!process.env.GITHUB_TOKEN) {
//       reportError(
//         `\`process.env.GITHUB_TOKEN\` does not exist`,
//         `Please set \`process.env.GITHUB_TOKEN\``,
//       );
//       process.exit(1);
//     }
//     if (!process.env.NPM_TOKEN) {
//       reportError(
//         `\`process.env.NPM_TOKEN\` does not exist`,
//         `Please set \`process.env.NPM_TOKEN\``,
//       );
//       process.exit(1);
//     }
//     const github = new Octokit({
//       auth: process.env.GITHUB_TOKEN,
//     });
//     const [_, owner, repo] = execSync('git remote get-url origin') // eslint-disable-line
//       .toString()
//       .trim()
//       .match(/github.com[:/](.+)\/(.+)/);
//     const getLatestRelease = github.repos.getLatestRelease({
//       owner,
//       repo,
//     });
//     const listCommits = github.repos.listCommits({
//       owner,
//       repo,
//       per_page: 1,
//     });
//     Promise.all([getLatestRelease, listCommits]).then(([latestRelease, commits]) => {
//       const preVersion = latestRelease.data.tag_name;
//       const { version } = packageJson;
//       const [_, newVersion] = commits.data[0].commit.message.trim().match(/bump (.+)/) || []; // eslint-disable-line
//       console.log(version, preVersion, 999)
//       /*
//       runCmd('npm', ['run', 'pub'], code => {
//         done();
//       });
//       */
//     });
//   }),
// );

// gulp.task(
//   'guard',
//   gulp.series(done => {
//     const npmArgs = getNpmArgs();
//     if (npmArgs) {
//       for (let arg = npmArgs.shift(); arg; arg = npmArgs.shift()) {
//         if (/^pu(b(l(i(sh?)?)?)?)?$/.test(arg) && npmArgs.indexOf('--with-antd-tools') < 0) {
//           reportError(
//             `\`npm publish or yarn publish\` is forbidden for this package.`,
//             `Use \`npm run pub or yarn pub\` instead.`,
//           );
//           process.exit(1);
//         }
//       }
//     }
//     done();
//   }),
// );
