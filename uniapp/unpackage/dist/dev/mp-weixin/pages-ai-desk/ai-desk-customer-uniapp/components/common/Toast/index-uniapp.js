"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type = require("./type.js");
const Toast = (options) => {
  common_vendor.i.showToast({
    title: options.message || "Toast",
    duration: options.duration || 1500,
    icon: handleIconType(options.type)
  });
};
const handleIconType = (type) => {
  if (!type) {
    return "none";
  }
  switch (type) {
    case pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.ERROR:
      return "none";
    case pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.WARNING:
      return "none";
    case pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.SUCCESS:
      return "success";
    case pagesAiDesk_aiDeskCustomerUniapp_components_common_Toast_type.TOAST_TYPE.NORMAL:
      return "none";
    default:
      return "none";
  }
};
exports.Toast = Toast;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/common/Toast/index-uniapp.js.map
