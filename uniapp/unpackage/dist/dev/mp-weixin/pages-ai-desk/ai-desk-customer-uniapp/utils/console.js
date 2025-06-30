"use strict";
let _console;
let method;
if (typeof console !== "undefined") {
  _console = console;
} else if (typeof global !== "undefined" && global.console) {
  _console = global.console;
} else if (typeof window !== "undefined" && window.console) {
  _console = window.console;
} else {
  _console = {};
}
const noop = function() {
};
const methods = [
  "assert",
  "clear",
  "count",
  "debug",
  "dir",
  "dirxml",
  "error",
  "group",
  "groupCollapsed",
  "groupEnd",
  "info",
  "log",
  "profile",
  "profileEnd",
  "table",
  "time",
  "timeEnd",
  "timeStamp",
  "trace",
  "warn"
];
let length = methods.length;
while (length--) {
  method = methods[length];
  if (!console[method]) {
    _console[method] = noop;
  }
}
const console$1 = _console;
exports.console = console$1;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/console.js.map
