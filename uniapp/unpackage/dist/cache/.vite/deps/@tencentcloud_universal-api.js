import "./chunk-LQ2VYIYD.js";

// D:/JAVAEE/myflies/uniapp-app/uniapp/node_modules/@tencentcloud/universal-api/index.js
var e = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting);
var t = "undefined" != typeof uni && "undefined" == typeof window;
var n = e || t;
var o = "undefined" != typeof uni;
var r = ("undefined" != typeof uni || "undefined" != typeof window) && !n;
var i = e ? wx : o ? uni : "undefined" != typeof window ? window : {};
var s = r && window && window.navigator && window.navigator.userAgent || "";
var c = /Android/i.test(s);
var l = /(?:Windows Phone)/.test(s);
var a = /(?:SymbianOS)/.test(s);
var u = /OpenHarmony/i.test(s);
var d = r && ("ontouchstart" in window || navigator.maxTouchPoints > 0) && function() {
  if (r) {
    if (/Tablet|Pad/i.test(s))
      return true;
    if (180 === window.orientation || 0 === window.orientation)
      return window.innerWidth >= 768 && window.innerHeight >= 1024;
    if (90 === window.orientation || -90 === window.orientation)
      return window.innerWidth >= 1024 && window.innerHeight >= 768;
  }
  return false;
}();
var f = /iPhone/i.test(s) || /iPod/i.test(s);
var w = e;
var h = c || l || a || f || d || u;
var m = r && !h;
var p = t && !e;
function g() {
  let e2 = "";
  return m ? e2 = "pc" : h ? e2 = "h5" : w ? e2 = "wechat" : p && (e2 = "app"), e2;
}
function b(t2) {
  const { count: n2 = 1, sourceType: r2 = ["album"], mediaType: s2, dom: c2 } = t2;
  return new Promise((t3, l2) => {
    o ? e && i.chooseMedia ? i.chooseMedia({ count: n2, sourceType: r2, mediaType: s2, success: (e2) => {
      t3({ files: e2 });
    }, error: (e2) => {
      l2(e2);
    } }) : i.chooseVideo({ count: n2, sourceType: r2, success: (e2) => {
      t3({ files: e2 });
    }, error: (e2) => {
      l2(e2);
    } }) : ((null == c2 ? void 0 : c2.click) && c2.click(), c2.value = "", null == c2 || c2.addEventListener("change", (e2) => {
      var n3;
      (null === (n3 = e2.target.files) || void 0 === n3 ? void 0 : n3.length) <= 0 || t3({ files: e2.target.files[0] });
    }, false));
  });
}
function y(e2) {
  return b(Object.assign({ mediaType: ["image"] }, e2));
}
function S(e2) {
  return b(Object.assign({ mediaType: ["video"] }, e2));
}
var E = /* @__PURE__ */ new Map();
function v(e2, t2) {
  E.set(e2, t2);
}
function T(e2, t2) {
  if (!e2)
    return Promise.reject(new Error(`getBoundingClientRect get error selector ${typeof e2}.`));
  if (window || document) {
    const t3 = "object" == typeof e2 ? e2 : document.querySelector(e2);
    if (!t3)
      return Promise.reject(new Error(`getBoundingClientRect can't find ${e2} dom.`));
    const n2 = t3.getBoundingClientRect();
    return Promise.resolve({ id: t3.id, top: n2.top, left: n2.left, right: n2.right, bottom: n2.bottom, width: n2.width, height: n2.height, x: n2.x, y: n2.y });
  }
  if (o) {
    if (!t2)
      return Promise.reject(new Error("getBoundingClientRect need instanceName in params."));
    const n2 = uni.createSelectorQuery().in(E.get(t2));
    return new Promise((t3, o2) => {
      n2.select(e2).boundingClientRect((e3) => {
        e3 && t3(e3);
      }).exec(), setTimeout(() => o2(new Error(`getBoundingClientRect ${e2} timeout.`)), 500);
    });
  }
  return Promise.reject(new Error("getBoundingClientRect occur error"));
}
function C(e2) {
  if (o)
    throw new Error("getBoundingClientRectSync can not use in uni-app.");
  if (window || document) {
    const t2 = "object" == typeof e2 ? e2 : document.querySelector(e2);
    if (!t2)
      throw new Error(`getBoundingClientRectSync can't find ${e2} dom.`);
    const n2 = t2.getBoundingClientRect();
    return { id: t2.id, top: n2.top, left: n2.left, right: n2.right, bottom: n2.bottom, width: n2.width, height: n2.height, x: n2.x, y: n2.y };
  }
  throw new Error("getBoundingClientRectSync occur error.");
}
function P(e2, t2) {
  if (!e2)
    return Promise.reject(new Error(`getScrollInfo get error selector ${typeof e2}.`));
  if (!o && window) {
    const t3 = "object" == typeof e2 ? e2 : document.querySelector(e2);
    return t3 ? Promise.resolve({ id: t3.id, scrollTop: t3.scrollTop, scrollLeft: t3.scrollLeft, scrollWidth: t3.scrollWidth, scrollHeight: t3.scrollHeight }) : Promise.reject(new Error(`getScrollInfo can't find ${e2} dom.`));
  }
  if (o) {
    if (!t2)
      return Promise.reject(new Error("getScrollInfo need instanceName in params."));
    const n2 = uni.createSelectorQuery().in(E.get(t2));
    return new Promise((t3, o2) => {
      n2.select(e2).scrollOffset((e3) => {
        e3 && t3(e3);
      }).exec(), setTimeout(() => o2(new Error(`getScrollInfo ${e2} timeout.`)), 500);
    });
  }
  return Promise.reject(new Error("getScrollInfo occur error"));
}
function x(e2) {
  if (o)
    throw new Error("getScrollInfoSync can not use in uni-app.");
  if (!o && window) {
    const t2 = "object" == typeof e2 ? e2 : document.querySelector(e2);
    if (!t2)
      throw new Error(`getScrollInfoSync can't find ${e2} dom.`);
    return { id: t2.id, scrollTop: t2.scrollTop, scrollLeft: t2.scrollLeft, scrollWidth: t2.scrollWidth, scrollHeight: t2.scrollHeight };
  }
  throw new Error("getScrollInfoSync() occur error.");
}
function R(e2, t2) {
  if (o) {
    if (!t2)
      return Promise.reject(new Error("getFields need instanceName in params."));
    const n2 = uni.createSelectorQuery().in(E.get(t2));
    return new Promise((t3, o2) => {
      n2.select(e2).fields({ rect: true, size: true, scrollOffset: true }, (e3) => {
        e3 && t3(e3);
      }).exec(), setTimeout(() => o2(new Error(`get ${e2} fields timeout.`)), 500);
    });
  }
  return Promise.reject(new Error("getFields occur error"));
}
var L = class _L {
  constructor() {
    if (_L.instance)
      return _L.instance;
    _L.instance = this, this.eventCallback = null, this.listener = null, this.button = 0, this.init();
  }
  init() {
    r && (this.eventCallback = (e2) => {
      this.listener && this.listener(e2);
    }, document.addEventListener("mousedown", this.eventCallback));
  }
  listen(e2) {
    if (r) {
      const { domRefs: t2, ignoreDomRefs: n2, handler: o2, button: r2 = 0 } = e2;
      this.button = r2, this.listener = (e3) => {
        const r3 = Array.isArray(n2) ? n2 : [n2];
        for (const t3 of r3)
          if (t3 && t3.contains(e3.target))
            return;
        const i2 = Array.isArray(t2) ? t2 : [t2];
        for (const t3 of i2)
          if (t3 && t3.contains(e3.target) && this.button === e3.button)
            return;
        o2(e3), this.remove();
      };
    }
  }
  remove() {
    this.listener = null, this.button = -1;
  }
};
function k(e2) {
  const { element: t2, onLongPress: n2, options: o2 = {} } = e2;
  if (!t2 || !n2)
    throw new Error("addLongPressEventListener missing arguments");
  const { duration: r2 = 800, eventDelegation: i2 } = o2;
  let s2;
  function c2() {
    clearTimeout(s2), a2();
  }
  function l2() {
    clearTimeout(s2), a2();
  }
  function a2() {
    t2.removeEventListener("pointerup", c2), t2.removeEventListener("pointermove", l2);
  }
  t2.addEventListener("pointerdown", (e3) => {
    const o3 = e3.target, a3 = (null == i2 ? void 0 : i2.subSelector) ? o3.closest(i2.subSelector) || void 0 : o3, u2 = e3.currentTarget;
    s2 = setTimeout(() => n2(e3, a3, u2), r2), t2.addEventListener("pointerup", c2), t2.addEventListener("pointermove", l2);
  });
}
var I = { PROTOCOLS: ["javascript:", "vbscript:", "file:", "about:", "ftp:", "ws:", "wss:", "mailto:", "tel:", "sms:", "gopher:", "data:", "blob:"], HTML_TAGS: ["<script", "<img", "<iframe", "<object", "<embed", "<video", "<audio", "<link", "<meta", "<style", "<form", "<input", "<svg", "<xml", "<xmp", "<xsl", "<base"], EVENT_HANDLERS: ["onclick", "onload", "onerror", "onmouseover", "onmouseout", "onfocus", "onblur", "onsubmit", "onreset", "onselect", "onchange", "onkeyup", "onkeydown", "onkeypress", "ondblclick", "oncontextmenu", "ondrag", "ondrop", "onmouseenter", "onmouseleave", "onanimation", "onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange", "onmessage", "onoffline", "ononline", "onpagehide", "onpageshow", "onpopstate", "onresize", "onstorage", "onunload"], JS_FUNCTIONS: ["eval(", "setTimeout(", "setInterval(", "Function(", "constructor", "prototype", "__proto__", "window.", "document.", "location.", "alert(", "confirm(", "prompt(", "fetch(", "XMLHttpRequest"], CSS_PATTERNS: ["expression(", "url(", "@import", "behavior:", "-moz-binding"], ENCODING_SEQUENCES: ["&#", "\\", "fromCharCode", "String.fromCharCode", "unescape(", "escape(", "encodeURI(", "decodeURI(", "atob(", "btoa("], SPECIAL_MARKERS: ["<!--", "-->", "*/>", "]]>", "<!ENTITY", "<!DOCTYPE"], DATA_MARKERS: ["base64,", "0x", "%0", "U+", "\\u", "\\x"], OTHER_PATTERNS: ["null", "undefined", "NaN", "true", "false", "instanceof"] };
function j(e2, t2 = {}) {
  const { maxLength: n2 = 2083, allowedProtocols: o2 = ["http:", "https:", "mailto:"], allowCredentials: r2 = false, allowDataUrl: i2 = false } = t2;
  if (!e2 || "string" != typeof e2)
    return "about:blank";
  if (e2.length > n2)
    return "about:blank";
  try {
    let t3 = e2.replace(/[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/g, "");
    t3 = t3.normalize("NFKC"), t3 = t3.replace(/\s+/g, " ").trim();
    let n3 = t3;
    const s2 = /* @__PURE__ */ new Set();
    let c2 = 0;
    for (; c2 < 5; )
      try {
        const e3 = decodeURIComponent(n3);
        if (s2.has(e3))
          break;
        s2.add(e3), n3 = e3, c2++;
      } catch (e3) {
        break;
      }
    const l2 = function() {
      const e3 = [], t4 = Object.keys(I);
      for (let n4 = 0; n4 < t4.length; n4++) {
        const o3 = I[t4[n4]];
        for (let t5 = 0; t5 < o3.length; t5++)
          e3.push(o3[t5]);
      }
      return e3;
    }();
    for (const e3 of s2) {
      const t4 = e3.toLowerCase();
      for (let e4 = 0; e4 < l2.length; e4++)
        if (-1 !== t4.indexOf(l2[e4]))
          return "about:blank";
    }
    const a2 = function(e3) {
      const t4 = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, n4 = e3.match(t4);
      if (!n4)
        throw new Error("Invalid URL");
      const o3 = (n4[4] || "").split("@"), r3 = o3[o3.length - 1];
      let i3 = "", s3 = "";
      if (o3.length > 1) {
        const e4 = o3[0].split(":");
        i3 = e4[0] || "", s3 = e4[1] || "";
      }
      const c3 = r3.split(":"), l3 = c3[0], a3 = c3[1] || "";
      return { href: e3, protocol: (n4[1] || "").toLowerCase(), host: r3, hostname: l3, port: a3, pathname: n4[5] || "", search: n4[6] || "", hash: n4[8] || "", username: i3, password: s3 };
    }(t3), u2 = a2.protocol.replace(":", "").toLowerCase() + ":";
    let d2 = false;
    for (let e3 = 0; e3 < o2.length; e3++)
      if (o2[e3] === u2) {
        d2 = true;
        break;
      }
    if (!d2)
      return "about:blank";
    if (!r2 && (a2.username || a2.password))
      return "about:blank";
    if (!i2 && "data:" === u2)
      return "about:blank";
    if (!/^[\w\-.]+(:\d+)?$/.test(a2.host))
      return "about:blank";
    const f2 = a2.pathname + a2.search + a2.hash;
    return /^[\w\-./=?#&%+@,:()[\]]+$/.test(f2) ? t3 : "about:blank";
  } catch (e3) {
    return "about:blank";
  }
}
function A(e2) {
  const t2 = function(e3) {
    const t3 = /(?:https?:\/\/|mailto:|www\.)(?:localhost(?::\d{1,5})?|[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi, n2 = [], o2 = e3.split(t3), r2 = e3.match(t3) || [];
    let i2 = 0;
    return o2.forEach((e4) => {
      if (e4 && n2.push({ type: "text", text: e4 }), r2[i2]) {
        const e5 = r2[i2];
        let t4 = e5;
        e5.toLowerCase().startsWith("www.") && (t4 = "https://" + e5), n2.push({ type: "url", text: e5, url: t4 }), i2++;
      }
    }), n2;
  }(e2);
  return t2.map((e3) => {
    if ("url" === e3.type) {
      const t3 = j(e3.url);
      return "about:blank" === t3 ? { type: "text", text: e3.text } : Object.assign(Object.assign({}, e3), { url: t3 });
    }
    return e3;
  });
}
console.log("UniversalAPI.VERSION:2.4.0");
var O = new L();
export {
  i as TUIGlobal,
  k as addLongPressListener,
  y as chooseImage,
  S as chooseVideo,
  T as getBoundingClientRect,
  C as getBoundingClientRectSync,
  R as getFields,
  g as getPlatform,
  P as getScrollInfo,
  x as getScrollInfoSync,
  f as isIOS,
  O as outsideClick,
  A as parseTextAndValidateUrls,
  j as sanitizeUrl,
  v as setInstanceMapping
};
//# sourceMappingURL=@tencentcloud_universal-api.js.map
