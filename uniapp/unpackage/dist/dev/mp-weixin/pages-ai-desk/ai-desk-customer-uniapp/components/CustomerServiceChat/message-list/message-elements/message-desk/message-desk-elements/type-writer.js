"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const chineseRegex = /[\u4e00-\u9fa5]/;
const wordAndNonWordRegex = /\b\w+\b|[^\w]+/g;
const isStringArray = (test) => {
  return Array.isArray(test) && !test.some((value) => typeof value !== "string");
};
class TypeWriter {
  constructor(options) {
    /**
     * @property {array} strings strings to be typed
     */
    __publicField(this, "strings", []);
    /**
     * @property {boolean} isTyping current typing status
     */
    __publicField(this, "isTyping", false);
    /**
     * @property {number} typeSpeed type speed in milliseconds. If empty, using dynamic speed.
     */
    __publicField(this, "typeSpeed", 0);
    /**
     * @property {number} curArrayPos current typing string's position of all strings.
     */
    __publicField(this, "curArrayPos", 0);
    /**
     * @property {number} curCharPos current typing character's position in current strings.
     */
    __publicField(this, "curCharPos", 0);
    /**
     * @property {ReturnType<typeof setTimeout>} timer timer for type writer animation
     */
    __publicField(this, "timer");
    /**
     * On string is typing
     * @param {string} curStr
     * @param {number} arrayPos
     * @param {number} characterPos
     * @param {Typed} self
     */
    __publicField(this, "onTyping");
    /**
     * After start
     * @param {number} arrayPos
     * @param {number} characterPos
     * @param {TypeWriter} self
     */
    __publicField(this, "onStart");
    /**
     * After stop
     * @param {number} arrayPos
     * @param {number} characterPos
     * @param {TypeWriter} self
     */
    __publicField(this, "onStop");
    /**
     * All typing is complete
     * @param {Typed} self
     */
    __publicField(this, "onComplete");
    const { defaultStrings, typeSpeed, onTyping, onComplete, onStart, onStop } = options;
    if (defaultStrings && isStringArray(defaultStrings)) {
      this.add(defaultStrings);
    }
    if (typeof typeSpeed === "number") {
      this.typeSpeed = typeSpeed;
    }
    if (typeof onTyping === "function") {
      this.onTyping = onTyping;
    }
    if (typeof onComplete === "function") {
      this.onComplete = onComplete;
    }
    if (typeof onStart === "function") {
      this.onStart = onStart;
    }
    if (typeof onStop === "function") {
      this.onStop = onStop;
    }
  }
  add(addStrings) {
    if (!addStrings || !addStrings.length)
      return;
    addStrings.forEach((item) => {
      if (chineseRegex.test(item)) {
        const newValueArray = item.split("");
        this.strings.push(...newValueArray);
      } else {
        const newValueArray = item.match(wordAndNonWordRegex) || item.split("");
        this.strings.push(...newValueArray);
      }
    });
  }
  start() {
    if (this.isTyping) {
      return;
    }
    this.isTyping = true;
    this.onStart && this.onStart(this.curArrayPos, this.curCharPos, this);
    this._next();
  }
  stop() {
    if (!this.isTyping) {
      return;
    }
    this.isTyping = false;
    clearTimeout(this.timer);
    this.onStop && this.onStop(this.curArrayPos, this.curCharPos, this);
  }
  done() {
    var _a;
    this.stop();
    let _str = this.strings[this.curArrayPos].slice(this.curCharPos);
    _str += this.strings.slice(this.curArrayPos + 1).join("");
    this.curArrayPos = this.strings.length - 1;
    this.curCharPos = ((_a = this.strings[this.curArrayPos]) == null ? void 0 : _a.length) - 1;
    this.onTyping && this.onTyping(_str, this.curArrayPos, this.curCharPos, this);
    this.strings = [];
  }
  _consume() {
    var _a, _b, _c;
    if (!this.strings.length) {
      return;
    }
    if (this.curArrayPos >= this.strings.length) {
      this.isTyping = false;
      (_a = this.onComplete) == null ? void 0 : _a.call(this, this);
      return;
    }
    const item = (_b = this.strings[this.curArrayPos]) == null ? void 0 : _b[this.curCharPos];
    if (item) {
      this.onTyping && this.onTyping(item, this.curArrayPos, this.curCharPos, this);
    }
    if (this.curCharPos < ((_c = this.strings[this.curArrayPos]) == null ? void 0 : _c.length) - 1) {
      this.curCharPos++;
    } else {
      this.curArrayPos++;
      this.curCharPos = 0;
    }
  }
  _next() {
    this._consume();
    this.timer = setTimeout(() => {
      this._consume();
      if (this.isTyping) {
        this._next();
      }
    }, this.typeSpeed || this._dynamicSpeed());
  }
  _dynamicSpeed() {
    var _a, _b;
    let length = 0;
    length += (((_a = this.strings[this.curArrayPos]) == null ? void 0 : _a.length) || 0) - this.curCharPos - 1;
    for (let i = this.curArrayPos + 1; i < this.strings.length; i++) {
      length += ((_b = this.strings[i]) == null ? void 0 : _b.length) || 0;
    }
    if (length <= 0) {
      length = 10;
    }
    const speed = 1500 / length;
    if (speed >= 150) {
      return 150;
    } else {
      return speed;
    }
  }
}
exports.TypeWriter = TypeWriter;
//# sourceMappingURL=../../../../../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/components/CustomerServiceChat/message-list/message-elements/message-desk/message-desk-elements/type-writer.js.map
