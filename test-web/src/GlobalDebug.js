/* eslint-disable no-var */
const GlobalDebug = (() => {
  var savedConsole = console;
  /**
   * @param {boolean} debugOn
   * @param {boolean} suppressAll
   */
  return (debugOn, suppressAll) => {
    var suppress = suppressAll || false;
    if (debugOn === false) {
      // eslint-disable-next-line no-global-assign
      console = {};
      console.log = () => {};
      if (suppress) {
        console.info = () => {};
        console.warn = () => {};
        console.error = () => {};
      } else {
        console.info = savedConsole.info;
        console.warn = savedConsole.warn;
        console.error = savedConsole.error;
      }
    } else {
      // eslint-disable-next-line no-global-assign
      console = savedConsole;
    }
  };
})();

export default GlobalDebug;
