"use strict";
const debug_libGenerateTestUsersigEs_min = require("./lib-generate-test-usersig-es.min.js");
const SDKAPPID = 1600089018;
const EXPIRETIME = 604800;
const SECRETKEY = "3ed492e6eeeaa0f87871f78b24a18619a1e854631a09cd7b20e9ca886ee80d36";
function genTestUserSig(userID) {
  const generator = new debug_libGenerateTestUsersigEs_min.LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);
  return {
    sdkAppID: SDKAPPID,
    userSig
  };
}
exports.genTestUserSig = genTestUserSig;
//# sourceMappingURL=../../.sourcemap/mp-weixin/debug/GenerateTestUserSig.js.map
