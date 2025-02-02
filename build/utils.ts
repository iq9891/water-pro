import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export interface ViteEnv {
  VITE_APP_SITE: boolean;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_APP_NAME: string;
  VITE_APP_PREFIX: string;
  VITE_APP_ENCRYPTION: boolean;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_DYNAMIC_IMPORT: boolean;
  VITE_LEGACY: boolean;
  VITE_APP_ENV?:string;
  VITE_USE_IMAGEMIN: boolean;
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: any): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_APP_', confFiles = ['.env', '.env.production']) {
  let envConfig = {};
  confFiles.forEach(item => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));

      envConfig = { ...envConfig, ...env };
    } catch (error) {}
  });
  Object.keys(envConfig).forEach(key => {
    const reg = new RegExp(`^(${match})`);
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });

  return envConfig;
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getCwdPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

export function pathResolve(dir: string) {
  return path.resolve(__dirname, '../', dir);
}
