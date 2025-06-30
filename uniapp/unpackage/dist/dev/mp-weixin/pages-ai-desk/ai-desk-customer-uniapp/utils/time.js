"use strict";
let _offset = 0;
const getTimestamp = function() {
  return (/* @__PURE__ */ new Date()).getTime() + _offset;
};
const getDate = function() {
  const now = /* @__PURE__ */ new Date();
  now.setTime(getTimestamp());
  return now;
};
exports.getDate = getDate;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/time.js.map
