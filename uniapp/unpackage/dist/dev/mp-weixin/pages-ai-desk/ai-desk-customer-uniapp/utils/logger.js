"use strict";
const pagesAiDesk_aiDeskCustomerUniapp_utils_console = require("./console.js");
const pagesAiDesk_aiDeskCustomerUniapp_utils_time = require("./time.js");
const getType = function(input) {
  return Object.prototype.toString.call(input).match(/^\[object (.*)\]$/)[1].toLowerCase();
};
const isArray = function(input) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(input);
  }
  return getType(input) === "array";
};
const isObject = function(input) {
  return input !== null && typeof input === "object";
};
const isInstanceOfError = function(input) {
  return input instanceof Error;
};
const isArrayOrObject = function(input) {
  return isArray(input) || isObject(input);
};
function padMs(ms) {
  const len = ms.toString().length;
  let ret;
  switch (len) {
    case 1:
      ret = "00" + ms;
      break;
    case 2:
      ret = "0" + ms;
      break;
    default:
      ret = ms;
      break;
  }
  return ret;
}
function getPrefix() {
  return "ai-desk-customer";
}
function getTime() {
  const date = pagesAiDesk_aiDeskCustomerUniapp_utils_time.getDate();
  return date.toLocaleTimeString("en-US", { hour12: false }) + "." + padMs(date.getMilliseconds());
}
const Log = {
  // 将函数参数拼成字符串
  arguments2String(args) {
    let s = "";
    if (args.length === 1) {
      s = args[0];
    } else {
      for (let i = 0, length = args.length; i < length; i++) {
        if (isArrayOrObject(args[i])) {
          try {
            s += isInstanceOfError(args[i]) ? JSON.stringify(args[i], ["message", "code"]) : JSON.stringify(args[i]);
          } catch (error) {
            s += error ? error.message : "";
            break;
          }
        } else {
          s += args[i];
        }
        s += " ";
      }
    }
    return s;
  },
  _exec(api, log) {
    {
      pagesAiDesk_aiDeskCustomerUniapp_utils_console.console[api](`${getPrefix()} ${getTime()} ${log}`);
    }
  },
  /**
   * 打印调试日志
   */
  d: function() {
    const s = this.arguments2String(arguments);
    this._exec("debug", s);
  },
  /**
   * 打印普通日志
   */
  l: function() {
    const s = this.arguments2String(arguments);
    this._exec("log", s);
  },
  /**
   * 打印普通日志，等同于 Log.i，为了兼容低版本的本地审核插件（其内部调用了 Logger.log）
   */
  log: function() {
    const s = this.arguments2String(arguments);
    this._exec("log", s);
  },
  /**
   * 打印release日志
   */
  i: function() {
    const s = this.arguments2String(arguments);
    this._exec("info", s);
  },
  /**
   * 打印告警日志
   */
  w: function() {
    const s = this.arguments2String(arguments);
    this._exec("warn", s);
  },
  /**
   * 打印错误日志
   */
  e: function() {
    const s = this.arguments2String(arguments);
    this._exec("error", s);
  }
};
exports.Log = Log;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/utils/logger.js.map
