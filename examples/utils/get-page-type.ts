export const getPageType = (path) => {
  const pagePath = path.match(/\/(.*)\//g);
  const pageType = pagePath.length ? pagePath[0] : ''; // /utils/
  const pageTrueType = pageType.replace(/\//g, ''); // utils

  return {
    pagePath,
    pageType,
    pageTrueType,
  }
}
