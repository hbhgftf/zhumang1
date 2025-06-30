"use strict";
const common_vendor = require("../../../common/vendor.js");
const debug_GenerateTestUserSig = require("../../../debug/GenerateTestUserSig.js");
const TUICallKit = common_vendor.index.requireNativePlugin("TencentCloud-TUICallKit");
common_vendor.index.$TUICallKit = TUICallKit;
const _sfc_main = {
  data() {
    return {
      inputID: "",
      isLogin: false,
      userID: ""
    };
  },
  methods: {
    handleLogin() {
      this.userID = this.inputID;
      const { userSig, sdkAppID: SDKAppID } = debug_GenerateTestUserSig.genTestUserSig(this.userID);
      const loginParams = { SDKAppID, userID: this.userID, userSig };
      common_vendor.index.$TUICallKit.login(
        loginParams,
        (res) => {
          if (res.code === 0) {
            this.isLogin = true;
            this.inputID = "";
            common_vendor.index.__f__("log", "at pages/index/spxz/spxz.vue:31", "[TUICallKit] login success.");
          } else {
            common_vendor.index.__f__("error", "at pages/index/spxz/spxz.vue:33", "[TUICallKit] login failed, failed message = ", res.msg, params);
          }
        }
      );
    },
    handleCall() {
      try {
        const callParams = {
          userIDList: [this.inputID],
          callMediaType: 2,
          // 1 -- audio call，2 -- video call
          callParams: { roomID: 234, strRoomID: "2323423", timeout: 30 }
        };
        common_vendor.index.$TUICallKit.calls(
          callParams,
          (res) => {
            common_vendor.index.__f__("log", "at pages/index/spxz/spxz.vue:47", "[TUICallKit] call params: ", JSON.stringify(res));
          }
        );
        this.inputID = "";
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/index/spxz/spxz.vue:52", "[TUICallKit] call error: ", error);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.isLogin ? "please enter a caller userID" : "please enter your login userID",
    b: $data.inputID,
    c: common_vendor.o(($event) => $data.inputID = $event.detail.value),
    d: common_vendor.t($data.userID),
    e: $data.isLogin,
    f: !$data.isLogin,
    g: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    h: $data.isLogin,
    i: common_vendor.o((...args) => $options.handleCall && $options.handleCall(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/spxz/spxz.js.map
