"use strict";
const common_vendor = require("../../../common/vendor.js");
function enableSampleTaskStatus(taskKey) {
  const tasks = common_vendor.Jt.getData(common_vendor.o$1.APP, "tasks");
  if (taskKey in tasks && !tasks[taskKey]) {
    tasks[taskKey] = true;
    common_vendor.Jt.update(common_vendor.o$1.APP, "tasks", tasks);
  }
}
exports.enableSampleTaskStatus = enableSampleTaskStatus;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/enableSampleTaskStatus.js.map
