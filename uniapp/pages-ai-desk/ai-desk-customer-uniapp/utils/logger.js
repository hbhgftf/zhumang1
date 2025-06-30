import console from './console';
import { getDate } from './time';

const canIUseConsoleStyle = function() {
  return false;
}

const getType = function(input) {
  return Object.prototype.toString
    .call(input)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
};

const isArray = function(input) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(input);
  }
  return getType(input) === 'array';
};

const isObject = function(input) {
  // null is object, hence the extra check
  return input !== null && typeof input === 'object';
};

/**
 * 检测input是否为Error的实例
 * @param {*} input 任意类型的输入
 * @returns {Boolean} true->input is an instance of Error
 */
const isInstanceOfError = function(input) {
  return (input instanceof Error);
};

/**
 * 检测input类型是否为数组或者object
 * @param {*} input 任意类型的输入
 * @returns {Boolean} true->input is an array or an object
 */
const isArrayOrObject = function(input) {
  return isArray(input) || isObject(input);
};

/**
 * 对齐毫秒字符串
 * @param {*} ms 毫秒
 * @returns {String} 对齐后的毫秒时间字符串
 */
function padMs(ms) {
  const len = ms.toString().length;
  let ret;
  switch (len) {
    case 1:
      ret = '00' + ms;
      break;
    case 2:
      ret = '0' + ms;
      break;
    default:
      ret = ms;
      break;
  }

  return ret;
}

/**
 * log前缀
 * @returns {String} 日志前缀
 */
function getPrefix() {
  return 'ai-desk-customer';
}

function getTime() {
  const date = getDate();
  return date.toLocaleTimeString('en-US', { hour12: false }) + '.' + padMs(date.getMilliseconds());
}

const Log = {
  // 将函数参数拼成字符串
  arguments2String(args) {
    let s = '';
    if (args.length === 1) {
      s = args[0];
    } else {

      for (let i = 0, length = args.length; i < length; i++) {
        if (isArrayOrObject(args[i])) {
          try {
            s += isInstanceOfError(args[i]) ? JSON.stringify(args[i], ['message', 'code']) : JSON.stringify(args[i]);
          } catch (error) {
            s += error ? error.message : '';
            break;
          }
        } else {
          s += args[i];
        }
        s += ' ';
      }
    }
    return s;
  },

  _exec(api, log) {
    if (!canIUseConsoleStyle()) {
      console[api](`${getPrefix()} ${getTime()} ${log}`);
    } else {
      console[api](getPrefix(), getPrefixStyle(), getBgStyle(), getTime(), log);
    }
  },

  /**
   * 打印调试日志
   */
  d: function() {
    const s = this.arguments2String(arguments);
    this._exec('debug', s);
  },

  /**
   * 打印普通日志
   */
  l: function() {
    const s = this.arguments2String(arguments);
    this._exec('log', s);
  },

  /**
   * 打印普通日志，等同于 Log.i，为了兼容低版本的本地审核插件（其内部调用了 Logger.log）
   */
  log: function() {
    const s = this.arguments2String(arguments);
    this._exec('log', s);
  },

  /**
   * 打印release日志
   */
  i: function() {
    const s = this.arguments2String(arguments);
    this._exec('info', s);
  },

  /**
   * 打印告警日志
   */
  w: function() {
    const s = this.arguments2String(arguments);
    this._exec('warn', s);
  },

  /**
   * 打印错误日志
   */
  e: function() {
    const s = this.arguments2String(arguments);
    this._exec('error', s);
  },
};

export default Log;
