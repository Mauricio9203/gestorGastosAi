const obtenerKeyDesdeURL = (url) => {
  const baseURL = "https://pub-2d8344ab758f4d1b8f4ec35631657394.r2.dev/";
  return url.startsWith(baseURL) ? url.slice(baseURL.length) : null;
};

export { obtenerKeyDesdeURL };
