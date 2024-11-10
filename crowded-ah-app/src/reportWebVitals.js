/**
 * @fileoverview Defines a function for reporting web vitals (performance metrics) to an external handler.
 * The function imports the web-vitals library dynamically and calls the provided callback with various performance metrics.
 * @author Choo Yi Ken
 */

/**
 * Function to report web vitals (performance metrics) by dynamically importing the `web-vitals` library
 * and invoking the callback function with performance data.
 * 
 * @param {Function} onPerfEntry - The callback function to be called with the performance metrics. 
 * It should accept performance data as its argument.
 * @returns {void}
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
