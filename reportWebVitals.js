const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const metrics = [getCLS, getFID, getFCP, getLCP, getTTFB];
      metrics.forEach((metric) => metric(onPerfEntry));
    });
  }
};

export default reportWebVitals;
