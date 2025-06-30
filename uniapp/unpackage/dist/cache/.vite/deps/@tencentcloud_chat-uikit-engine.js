import {
  require_chat,
  require_tim_profanity_filter_plugin,
  require_tim_upload_plugin
} from "./chunk-6QHDUI5A.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// D:/JAVAEE/myflies/uniapp-app/uniapp/node_modules/@tencentcloud/chat-uikit-engine/index.js
var import_chat = __toESM(require_chat());
var import_tim_upload_plugin = __toESM(require_tim_upload_plugin());
var import_tim_profanity_filter_plugin = __toESM(require_tim_profanity_filter_plugin());
function n(e2, t2) {
  var s2 = {};
  for (var n2 in e2)
    Object.prototype.hasOwnProperty.call(e2, n2) && t2.indexOf(n2) < 0 && (s2[n2] = e2[n2]);
  if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
    var i2 = 0;
    for (n2 = Object.getOwnPropertySymbols(e2); i2 < n2.length; i2++)
      t2.indexOf(n2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, n2[i2]) && (s2[n2[i2]] = e2[n2[i2]]);
  }
  return s2;
}
function i(e2, t2, s2, n2) {
  return new (s2 || (s2 = Promise))(function(i2, r2) {
    function a2(e3) {
      try {
        u2(n2.next(e3));
      } catch (e4) {
        r2(e4);
      }
    }
    function o2(e3) {
      try {
        u2(n2.throw(e3));
      } catch (e4) {
        r2(e4);
      }
    }
    function u2(e3) {
      var t3;
      e3.done ? i2(e3.value) : (t3 = e3.value, t3 instanceof s2 ? t3 : new s2(function(e4) {
        e4(t3);
      })).then(a2, o2);
    }
    u2((n2 = n2.apply(e2, t2 || [])).next());
  });
}
var r = class _r {
  constructor(e2) {
    return _r.instance || (_r.instance = this, this.engine = e2, this.events = {}, this.bindIMEvents()), _r.instance;
  }
  addEvent(e2, t2) {
    this.events[e2] || (this.events[e2] = /* @__PURE__ */ new Map()), this.events[e2].set(t2, 1);
  }
  removeEvents() {
    Object.keys(this.events).forEach((e2) => {
      this.events[e2].clear();
    }), this.events = {};
  }
  dispatch(e2, t2) {
    if (this.events[e2])
      for (const s2 of this.events[e2].keys())
        s2.call(this, t2);
  }
  bindIMEvents() {
    this.engine.chat.on(this.engine.EVENT.SDK_READY, this.onSDKReady, this), this.engine.chat.on(this.engine.EVENT.SDK_NOT_READY, this.onSDKNotReady, this), this.engine.chat.on(this.engine.EVENT.KICKED_OUT, this.onKickedOut, this), this.engine.chat.on(this.engine.EVENT.NET_STATE_CHANGE, this.onNetStateChange, this), this.engine.chat.on(this.engine.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage, this), this.engine.chat.on(this.engine.EVENT.MESSAGE_MODIFIED, this.onMessageModified, this), this.engine.chat.on(this.engine.EVENT.MESSAGE_REVOKED, this.onMessageRevoked, this), this.engine.chat.on(this.engine.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer, this), this.engine.chat.on(this.engine.EVENT.MESSAGE_READ_RECEIPT_RECEIVED, this.onMessageReadReceiptReceived, this), this.engine.chat.on(this.engine.EVENT.MESSAGE_REACTIONS_UPDATED, this.onMessageReactionsUpdated, this), this.engine.chat.on(this.engine.EVENT.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated, this), this.engine.chat.on(this.engine.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, this.onTotalMessageCountUpdated, this), this.engine.chat.on(this.engine.EVENT.PROFILE_UPDATED, this.onProfileUpdated, this), this.engine.chat.on(this.engine.EVENT.BLACKLIST_UPDATED, this.onBlacklistUpdated, this), this.engine.chat.on(this.engine.EVENT.USER_STATUS_UPDATED, this.onUserStatusUpdated, this), this.engine.chat.on(this.engine.EVENT.GROUP_LIST_UPDATED, this.onGroupListUpdated, this), this.engine.chat.on(this.engine.EVENT.GROUP_ATTRIBUTES_UPDATED, this.onGroupAttributesUpdated, this), this.engine.chat.on(this.engine.EVENT.GROUP_COUNTER_UPDATED, this.onGroupCounterUpdated, this), this.engine.chat.on(this.engine.EVENT.FRIEND_LIST_UPDATED, this.onFriendListUpdated, this), this.engine.chat.on(this.engine.EVENT.FRIEND_APPLICATION_LIST_UPDATED, this.onFriendApplicationListUpdated, this);
  }
  unbindIMEvents() {
    this.engine.chat.off(this.engine.EVENT.SDK_READY, this.onSDKReady, this), this.engine.chat.off(this.engine.EVENT.SDK_NOT_READY, this.onSDKNotReady, this), this.engine.chat.off(this.engine.EVENT.KICKED_OUT, this.onKickedOut, this), this.engine.chat.off(this.engine.EVENT.NET_STATE_CHANGE, this.onNetStateChange, this), this.engine.chat.off(this.engine.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage, this), this.engine.chat.off(this.engine.EVENT.MESSAGE_MODIFIED, this.onMessageModified, this), this.engine.chat.off(this.engine.EVENT.MESSAGE_REVOKED, this.onMessageRevoked, this), this.engine.chat.off(this.engine.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer, this), this.engine.chat.off(this.engine.EVENT.MESSAGE_READ_RECEIPT_RECEIVED, this.onMessageReadReceiptReceived, this), this.engine.chat.off(this.engine.EVENT.MESSAGE_REACTIONS_UPDATED, this.onMessageReactionsUpdated, this), this.engine.chat.off(this.engine.EVENT.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated, this), this.engine.chat.off(this.engine.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, this.onTotalMessageCountUpdated, this), this.engine.chat.off(this.engine.EVENT.PROFILE_UPDATED, this.onProfileUpdated, this), this.engine.chat.off(this.engine.EVENT.BLACKLIST_UPDATED, this.onBlacklistUpdated, this), this.engine.chat.off(this.engine.EVENT.USER_STATUS_UPDATED, this.onUserStatusUpdated, this), this.engine.chat.off(this.engine.EVENT.GROUP_LIST_UPDATED, this.onGroupListUpdated, this), this.engine.chat.off(this.engine.EVENT.GROUP_ATTRIBUTES_UPDATED, this.onGroupAttributesUpdated, this), this.engine.chat.off(this.engine.EVENT.GROUP_COUNTER_UPDATED, this.onGroupCounterUpdated, this), this.engine.chat.off(this.engine.EVENT.FRIEND_LIST_UPDATED, this.onFriendListUpdated, this), this.engine.chat.off(this.engine.EVENT.FRIEND_APPLICATION_LIST_UPDATED, this.onFriendApplicationListUpdated, this), _r.instance = null;
  }
  onSDKReady(e2) {
    this.dispatch(this.engine.EVENT.SDK_READY, e2.data);
  }
  onSDKNotReady(e2) {
    this.dispatch(this.engine.EVENT.SDK_NOT_READY, e2.data);
  }
  onKickedOut(e2) {
    this.dispatch(this.engine.EVENT.KICKED_OUT, e2.data);
  }
  onNetStateChange(e2) {
    this.dispatch(this.engine.EVENT.NET_STATE_CHANGE, e2.data);
  }
  onReceiveMessage(e2) {
    this.dispatch(this.engine.EVENT.MESSAGE_RECEIVED, e2.data);
  }
  onMessageModified(e2) {
    this.dispatch(this.engine.EVENT.MESSAGE_MODIFIED, e2.data);
  }
  onMessageRevoked(e2) {
    this.dispatch(this.engine.EVENT.MESSAGE_REVOKED, e2.data);
  }
  onMessageReadByPeer(e2) {
    this.dispatch(this.engine.EVENT.MESSAGE_READ_BY_PEER, e2.data);
  }
  onMessageReadReceiptReceived(e2) {
    this.dispatch(this.engine.EVENT.MESSAGE_READ_RECEIPT_RECEIVED, e2.data);
  }
  onMessageReactionsUpdated(e2) {
    this.dispatch(this.engine.EVENT.MESSAGE_REACTIONS_UPDATED, e2.data);
  }
  onConversationListUpdated(e2) {
    this.dispatch(this.engine.EVENT.CONVERSATION_LIST_UPDATED, e2.data);
  }
  onTotalMessageCountUpdated(e2) {
    this.dispatch(this.engine.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, e2.data);
  }
  onProfileUpdated(e2) {
    this.dispatch(this.engine.EVENT.PROFILE_UPDATED, e2.data);
  }
  onBlacklistUpdated(e2) {
    this.dispatch(this.engine.EVENT.BLACKLIST_UPDATED, e2.data);
  }
  onUserStatusUpdated(e2) {
    this.dispatch(this.engine.EVENT.USER_STATUS_UPDATED, e2.data);
  }
  onGroupListUpdated(e2) {
    this.dispatch(this.engine.EVENT.GROUP_LIST_UPDATED, e2.data);
  }
  onGroupAttributesUpdated(e2) {
    this.dispatch(this.engine.EVENT.GROUP_ATTRIBUTES_UPDATED, e2.data);
  }
  onGroupCounterUpdated(e2) {
    this.dispatch(this.engine.EVENT.GROUP_COUNTER_UPDATED, e2.data);
  }
  onFriendListUpdated(e2) {
    this.dispatch(this.engine.EVENT.FRIEND_LIST_UPDATED, e2.data);
  }
  onFriendApplicationListUpdated(e2) {
    this.dispatch(this.engine.EVENT.FRIEND_APPLICATION_LIST_UPDATED, e2.data);
  }
};
var a;
var o;
var u;
var c;
var g;
var l;
var h;
var p;
var d;
!function(e2) {
  e2.TUIStore = "TUIStore", e2.TUITranslate = "TUITranslate", e2.TUIConversation = "TUIConversation", e2.TUIChat = "TUIChat", e2.TUIGroup = "TUIGroup", e2.TUIUser = "TUIUser", e2.TUIFriend = "TUIFriend", e2.TUIReport = "TUIReport";
}(a || (a = {})), function(e2) {
  e2.APP = "application", e2.CONV = "conversation", e2.CHAT = "chat", e2.GRP = "group", e2.USER = "user", e2.FRIEND = "friend", e2.SEARCH = "search", e2.CUSTOM = "custom";
}(o || (o = {})), function(e2) {
  e2[e2.UNSUB_USER = -1] = "UNSUB_USER";
}(u || (u = {})), function(e2) {
  e2.BUSINESS_ID = "user_typing_status", e2[e2.STATUS_START = 1] = "STATUS_START", e2[e2.STATUS_END = 0] = "STATUS_END", e2[e2.VERSION = 1] = "VERSION", e2[e2.ACTION_START_ID = 14] = "ACTION_START_ID", e2[e2.ACTION_END_ID = 0] = "ACTION_END_ID", e2.ACTION_START = "EIMAMSG_InputStatus_Ing", e2.ACTION_END = "EIMAMSG_InputStatus_End", e2[e2.NEED_TYPING = 1] = "NEED_TYPING";
}(c || (c = {})), function(e2) {
  e2.ADD = "add", e2.REMOVE = "remove";
}(g || (g = {})), function(e2) {
  e2[e2.MSG_MODIFY_CONFLICT = 2480] = "MSG_MODIFY_CONFLICT", e2[e2.MSG_MODIFY_DISABLED_IN_AVCHATROOM = 2481] = "MSG_MODIFY_DISABLED_IN_AVCHATROOM", e2[e2.MODIFY_MESSAGE_NOT_EXIST = 20026] = "MODIFY_MESSAGE_NOT_EXIST";
}(l || (l = {})), function(e2) {
  e2[e2.NOT_INIT = -1e5] = "NOT_INIT", e2[e2.INVALID_CONV_ID = -100001] = "INVALID_CONV_ID", e2[e2.CONV_ID_SAME = -100002] = "CONV_ID_SAME", e2[e2.CONV_NOT_EXIST = -100003] = "CONV_NOT_EXIST", e2[e2.GET_MSG_LIST_ERROR = -100004] = "GET_MSG_LIST_ERROR", e2[e2.MISMATCH_TYPE_AND_PAYLOAD = -100005] = "MISMATCH_TYPE_AND_PAYLOAD";
}(h || (h = {})), function(e2) {
  e2.MSG_MODIFY_CONFLICT = "MODIFY_MESSAGE_ERROR,修改消息发生冲突, data.message 是最新的消息", e2.MSG_MODIFY_DISABLED_IN_AVCHATROOM = "MODIFY_MESSAGE_ERROR,不支持修改直播群消息.", e2.MODIFY_MESSAGE_NOT_EXIST = "MODIFY_MESSAGE_ERROR,消息不存在.";
}(p || (p = {})), function(e2) {
  e2.NOT_INIT = "TUIChatEngine 初始化未完成，请确认 TUIChatEngine.login 接口调用是否正常。", e2.INVALID_CONV_ID = "会话 ID 无效", e2.CONV_ID_SAME = "您切换的是同一个会话 ID", e2.CONV_NOT_EXIST = "会话不存在", e2.GET_MSG_LIST_ERROR = "Chat SDK is not ready.", e2.MISMATCH_TYPE_AND_PAYLOAD = "type 与 payload 不匹配.";
}(d || (d = {}));
var f = { logout: 1, destroy: 1 };
var m = { deleteConversation: 1, pinConversation: 1, muteConversation: 1, switchConversation: 1, getConversationProfile: 1, clearHistoryMessage: 1 };
var v = { modifyMessage: 1, revokeMessage: 1, resendMessage: 1, deleteMessage: 1, quoteMessage: 1, replyMessage: 1, setMessageExtensions: 1, deleteMessageExtensions: 1, getMessageExtensions: 1, sendTextMessage: 1, sendTextAtMessage: 1, sendImageMessage: 1, sendAudioMessage: 1, sendVideoMessage: 1, sendFileMessage: 1, sendCustomMessage: 1, sendFaceMessage: 1, sendLocationMessage: 1, sendForwardMessage: 1, enterTypingState: 1, leaveTypingState: 1, sendMessageReadReceipt: 1, getGroupMessageReadMemberList: 1, getMessageList: 1, downloadMergedMessages: 1, setTranslationLanguage: 1, translateText: 1, searchCloudMessages: 1, addMessageReaction: 1, removeMessageReaction: 1, getMessageReactions: 1, getAllUserListOfMessageReaction: 1 };
var T = { switchGroup: 1, getGroupProfile: 1, updateGroupProfile: 1, createGroup: 1, dismissGroup: 1, searchGroupByID: 1, joinGroup: 1, quitGroup: 1, getGroupApplicationList: 1, handleGroupApplication: 1, getGroupOnlineMemberCount: 1, changeGroupOwner: 1, initGroupAttributes: 1, setGroupAttributes: 1, deleteGroupAttributes: 1, getGroupAttributes: 1, setGroupCounters: 1, increaseGroupCounter: 1, decreaseGroupCounter: 1, getGroupCounters: 1, getGroupMemberList: 1, getGroupMemberProfile: 1, addGroupMember: 1, deleteGroupMember: 1, setGroupMemberMuteTime: 1, setGroupMemberRole: 1, setGroupMemberNameCard: 1, setGroupMemberCustomField: 1, markGroupMemberList: 1 };
var E = { switchUserStatus: 1, switchMessageReadStatus: 1, getUserProfile: 1, updateMyProfile: 1, addToBlacklist: 1, removeFromBlacklist: 1 };
var I = { getFriendList: 1, addFriend: 1, deleteFriend: 1, checkFriend: 1, getFriendProfile: 1, updateFriend: 1, acceptFriendApplication: 1, refuseFriendApplication: 1, deleteFriendApplication: 1, setFriendApplicationRead: 1 };
var S = function(e2) {
  return void 0 === e2;
};
var y = function(e2) {
  return e2.startsWith("_");
};
var b = function(e2) {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(e2);
};
var U = function(e2) {
  return e2 && function(e3) {
    if ("string" == typeof e3)
      try {
        return !!JSON.parse(e3);
      } catch (e4) {
        return false;
      }
    return false;
  }(e2) ? JSON.parse(e2) : e2;
};
var C = function(e2) {
  let t2 = "";
  return t2 = e2 >= 1048576 ? `${(e2 / 1048576).toFixed(2)} Mb` : e2 >= 1024 ? `${(e2 / 1024).toFixed(2)} Kb` : `${e2.toFixed(2)}B`, t2;
};
var M = "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_16.png";
var O = "https://web.sdk.qcloud.com/im/demo/TUIkit/web/img/constomer.png";
var _ = "https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
var D = "https://web.sdk.qcloud.com/im/assets/emoji-plugin/";
var P = "https://web.sdk.qcloud.com/im/assets/face-elem/";
var R = "https://map.qq.com/?type=marker&isopeninfowin=1&markertype=1&";
var L = "https://apis.map.qq.com/ws/staticmap/v2/?";
var A = { "[TUIEmoji_Expect]": "emoji_0@2x.png", "[TUIEmoji_Blink]": "emoji_1@2x.png", "[TUIEmoji_Guffaw]": "emoji_2@2x.png", "[TUIEmoji_KindSmile]": "emoji_3@2x.png", "[TUIEmoji_Haha]": "emoji_4@2x.png", "[TUIEmoji_Cheerful]": "emoji_5@2x.png", "[TUIEmoji_Smile]": "emoji_6@2x.png", "[TUIEmoji_Sorrow]": "emoji_7@2x.png", "[TUIEmoji_Speechless]": "emoji_8@2x.png", "[TUIEmoji_Amazed]": "emoji_9@2x.png", "[TUIEmoji_Complacent]": "emoji_10@2x.png", "[TUIEmoji_Lustful]": "emoji_11@2x.png", "[TUIEmoji_Stareyes]": "emoji_12@2x.png", "[TUIEmoji_Giggle]": "emoji_13@2x.png", "[TUIEmoji_Daemon]": "emoji_14@2x.png", "[TUIEmoji_Rage]": "emoji_15@2x.png", "[TUIEmoji_Yawn]": "emoji_16@2x.png", "[TUIEmoji_TearsLaugh]": "emoji_17@2x.png", "[TUIEmoji_Silly]": "emoji_18@2x.png", "[TUIEmoji_Wail]": "emoji_19@2x.png", "[TUIEmoji_Kiss]": "emoji_20@2x.png", "[TUIEmoji_Trapped]": "emoji_21@2x.png", "[TUIEmoji_Fear]": "emoji_22@2x.png", "[TUIEmoji_BareTeeth]": "emoji_23@2x.png", "[TUIEmoji_FlareUp]": "emoji_24@2x.png", "[TUIEmoji_Tact]": "emoji_25@2x.png", "[TUIEmoji_Shit]": "emoji_26@2x.png", "[TUIEmoji_ShutUp]": "emoji_27@2x.png", "[TUIEmoji_Sigh]": "emoji_28@2x.png", "[TUIEmoji_Hehe]": "emoji_29@2x.png", "[TUIEmoji_Silent]": "emoji_30@2x.png", "[TUIEmoji_Skull]": "emoji_31@2x.png", "[TUIEmoji_Mask]": "emoji_32@2x.png", "[TUIEmoji_Beer]": "emoji_33@2x.png", "[TUIEmoji_Cake]": "emoji_34@2x.png", "[TUIEmoji_RedPacket]": "emoji_35@2x.png", "[TUIEmoji_Bombs]": "emoji_36@2x.png", "[TUIEmoji_Ai]": "emoji_37@2x.png", "[TUIEmoji_Celebrate]": "emoji_38@2x.png", "[TUIEmoji_Bless]": "emoji_39@2x.png", "[TUIEmoji_Flower]": "emoji_40@2x.png", "[TUIEmoji_Watermelon]": "emoji_41@2x.png", "[TUIEmoji_Cow]": "emoji_42@2x.png", "[TUIEmoji_Fool]": "emoji_43@2x.png", "[TUIEmoji_Surprised]": "emoji_44@2x.png", "[TUIEmoji_Askance]": "emoji_45@2x.png", "[TUIEmoji_Monster]": "emoji_46@2x.png", "[TUIEmoji_Pig]": "emoji_47@2x.png", "[TUIEmoji_Coffee]": "emoji_48@2x.png", "[TUIEmoji_Ok]": "emoji_49@2x.png", "[TUIEmoji_Heart]": "emoji_50@2x.png", "[TUIEmoji_Sun]": "emoji_51@2x.png", "[TUIEmoji_Moon]": "emoji_52@2x.png", "[TUIEmoji_Star]": "emoji_53@2x.png", "[TUIEmoji_Rich]": "emoji_54@2x.png", "[TUIEmoji_Fortune]": "emoji_55@2x.png", "[TUIEmoji_857]": "emoji_56@2x.png", "[TUIEmoji_666]": "emoji_57@2x.png", "[TUIEmoji_Prohibit]": "emoji_58@2x.png", "[TUIEmoji_Convinced]": "emoji_59@2x.png", "[TUIEmoji_Knife]": "emoji_60@2x.png", "[TUIEmoji_Like]": "emoji_61@2x.png" };
var j = { "[TUIEmoji_Smile]": "[微笑]", "[TUIEmoji_Expect]": "[期待]", "[TUIEmoji_Blink]": "[眨眼]", "[TUIEmoji_Guffaw]": "[大笑]", "[TUIEmoji_KindSmile]": "[姨母笑]", "[TUIEmoji_Haha]": "[哈哈哈]", "[TUIEmoji_Cheerful]": "[愉快]", "[TUIEmoji_Speechless]": "[无语]", "[TUIEmoji_Amazed]": "[惊讶]", "[TUIEmoji_Sorrow]": "[悲伤]", "[TUIEmoji_Complacent]": "[得意]", "[TUIEmoji_Silly]": "[傻了]", "[TUIEmoji_Lustful]": "[色]", "[TUIEmoji_Giggle]": "[憨笑]", "[TUIEmoji_Kiss]": "[亲亲]", "[TUIEmoji_Wail]": "[大哭]", "[TUIEmoji_TearsLaugh]": "[哭笑]", "[TUIEmoji_Trapped]": "[困]", "[TUIEmoji_Mask]": "[口罩]", "[TUIEmoji_Fear]": "[恐惧]", "[TUIEmoji_BareTeeth]": "[龇牙]", "[TUIEmoji_FlareUp]": "[发怒]", "[TUIEmoji_Yawn]": "[打哈欠]", "[TUIEmoji_Tact]": "[机智]", "[TUIEmoji_Stareyes]": "[星星眼]", "[TUIEmoji_ShutUp]": "[闭嘴]", "[TUIEmoji_Sigh]": "[叹气]", "[TUIEmoji_Hehe]": "[呵呵]", "[TUIEmoji_Silent]": "[收声]", "[TUIEmoji_Surprised]": "[惊喜]", "[TUIEmoji_Askance]": "[白眼]", "[TUIEmoji_Ok]": "[OK]", "[TUIEmoji_Shit]": "[便便]", "[TUIEmoji_Monster]": "[怪兽]", "[TUIEmoji_Daemon]": "[恶魔]", "[TUIEmoji_Rage]": "[恶魔怒]", "[TUIEmoji_Fool]": "[衰]", "[TUIEmoji_Pig]": "[猪]", "[TUIEmoji_Cow]": "[牛]", "[TUIEmoji_Ai]": "[AI]", "[TUIEmoji_Skull]": "[骷髅]", "[TUIEmoji_Bombs]": "[炸弹]", "[TUIEmoji_Coffee]": "[咖啡]", "[TUIEmoji_Cake]": "[蛋糕]", "[TUIEmoji_Beer]": "[啤酒]", "[TUIEmoji_Flower]": "[花]", "[TUIEmoji_Watermelon]": "[瓜]", "[TUIEmoji_Rich]": "[壕]", "[TUIEmoji_Heart]": "[爱心]", "[TUIEmoji_Moon]": "[月亮]", "[TUIEmoji_Sun]": "[太阳]", "[TUIEmoji_Star]": "[星星]", "[TUIEmoji_RedPacket]": "[红包]", "[TUIEmoji_Celebrate]": "[庆祝]", "[TUIEmoji_Bless]": "[福]", "[TUIEmoji_Fortune]": "[发]", "[TUIEmoji_Convinced]": "[服]", "[TUIEmoji_Prohibit]": "[禁]", "[TUIEmoji_666]": "[666]", "[TUIEmoji_857]": "[857]", "[TUIEmoji_Knife]": "[刀]", "[TUIEmoji_Like]": "[赞]" };
var k = { enabledMessageReadReceipt: Math.pow(2, 5), enabledEmojiPlugin: Math.pow(2, 48), enabledOnlineStatus: Math.pow(2, 7), enabledCustomerServicePlugin: Math.pow(2, 40), enabledTranslationPlugin: Math.pow(2, 38), enabledVoiceToText: Math.pow(2, 39) };
var N = ["messageList", "conversationList", "newMessageList"];
var x = ["translateTextInfo", "voiceToTextInfo"];
var G = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync && Boolean(wx.getSystemInfoSync().fontSizeSetting);
var w = "undefined" != typeof uni && "undefined" == typeof window;
var V = G || w;
var F = "undefined" != typeof uni;
var $ = ("undefined" != typeof uni || "undefined" != typeof window) && !V;
var H = G ? wx : F ? uni : window;
var Y = $ && window && window.navigator && window.navigator.userAgent || "";
var B = /Android/i.test(Y);
var K = /(?:Windows Phone)/.test(Y);
var q = /(?:SymbianOS)/.test(Y);
var z = /iPad/i.test(Y) || /iPhone/i.test(Y) || /iPod/i.test(Y);
var J = B || K || q || z;
var W = $ && !J;
var X = class _X {
  constructor() {
    this.global = H, this.isOfficial = false;
  }
  static getInstance() {
    return _X.instance || (_X.instance = new _X()), _X.instance;
  }
  initOfficial(e2) {
    this.isOfficial = e2;
  }
  getPlatform() {
    let e2 = "";
    return W ? e2 = "pc" : J ? e2 = "h5" : G ? e2 = "wechat" : w && !G && (e2 = "app"), e2;
  }
};
var Z = "group-module";
var Q = "relationship-module";
var ee = class _ee {
  constructor() {
    this.EVENT = import_chat.default.EVENT, this.TYPES = import_chat.default.TYPES, this.loginStatusPromise = /* @__PURE__ */ new Map(), this.userID = "", this.isInited = false;
  }
  static getInstance() {
    return _ee.instance || (_ee.instance = new _ee()), _ee.instance;
  }
  mount(e2, t2) {
    this[e2] = t2;
  }
  login(t2) {
    const { chat: s2, SDKAppID: n2, userID: i2 } = t2, a2 = 1400187352 === n2 || 1400188366 === n2;
    return this.createChat(t2), this.userID = i2, X.getInstance().initOfficial(a2), this.TUIStore.update(o.APP, "isOfficial", a2), this.TUIStore.update(o.APP, "SDKVersion", import_chat.default.VERSION), this.eventCenter = new r(this), this.eventCenter.removeEvents(), this.resetStore(), this.initService(), s2 && s2.isReady() ? (console.log("TUIChatEngine.login ok, from TUICore."), this.TUIUser.getUserProfile(), this.checkCommercialAbility(), Promise.resolve({})) : (this.registerPlugin(t2), this.eventCenter.addEvent(this.EVENT.SDK_READY, () => {
      this.onSDKReady();
    }), this.eventCenter.addEvent(this.EVENT.SDK_NOT_READY, () => {
      this.onSDKNotReady();
    }), this.loginChat(t2));
  }
  logout() {
    return this.userID = "", this.isInited = false, this.resetStore(), this.chat.logout();
  }
  isReady() {
    var e2;
    return (null === (e2 = this.chat) || void 0 === e2 ? void 0 : e2.isReady()) || false;
  }
  setLogLevel(e2) {
    this.chat ? this.chat.setLogLevel(e2) : console.warn("TUIChatEngine 初始化未完成，请确认 TUIChatEngine.login 接口调用是否正常。");
  }
  destroy() {
    return this.eventCenter.unbindIMEvents(), this.isInited = false, this.resetStore(), this.chat.destroy();
  }
  getMyUserID() {
    return this.userID;
  }
  resetStore() {
    this.TUIStore.reset(o.CHAT), this.TUIStore.reset(o.CONV), this.TUIStore.reset(o.GRP), this.TUIStore.reset(o.USER), this.TUIStore.reset(o.SEARCH), this.TUIStore.reset(o.FRIEND), this.TUIStore.reset(o.CUSTOM), console.log("TUIChatEngine.resetStore ok.");
  }
  initService() {
    this.TUIChat.init(), this.TUIConversation.init(), this.TUIUser.init(), this.initOptionalServices(), this.isInited = true, console.log("TUIChatEngine.initService ok.");
  }
  initOptionalServices() {
    const t2 = import_chat.default.VERSION.split(".");
    t2[0] > 3 || 3 === t2[0] && t2[1] >= 3 && t2[2] > 0 ? (true === this.chat.callExperimentalAPI("canIUseModule", [Z]) && this.TUIGroup.init(), true === this.chat.callExperimentalAPI("canIUseModule", [Q]) && this.TUIFriend.init()) : (this.TUIGroup.init(), this.TUIFriend.init());
  }
  createChat(t2) {
    const { chat: s2 } = t2, i2 = n(t2, ["chat"]);
    S(s2) ? this.chat = import_chat.default.create(Object.assign(Object.assign({}, i2), { scene: "chat-uikit-engine" })) : this.chat = s2;
  }
  loginChat(e2) {
    const { userID: t2, userSig: s2 } = e2;
    return new Promise((e3, n2) => {
      this.chat.login({ userID: t2, userSig: s2 }).then((t3) => {
        console.log("TUIChatEngine.loginChat ok."), this.checkCommercialAbility(), t3.data.repeatLogin && this.chat.isReady() && e3(t3), this.loginStatusPromise.set("login", { resolve: e3, reject: n2, imResponse: t3 });
      }).catch((e4) => {
        n2(e4);
      });
    });
  }
  registerPlugin(e2) {
    const { useUploadPlugin: n2 = false, useProfanityFilterPlugin: i2 = false, TIMPush: r2, pushConfig: a2, TUIOfflinePush: o2, offlinePushConfig: u2 } = e2;
    true === n2 && this.chat.registerPlugin({ "tim-upload-plugin": import_tim_upload_plugin.default }), true === i2 && this.chat.registerPlugin({ "tim-profanity-filter-plugin": import_tim_profanity_filter_plugin.default }), !w || G || S(r2) || S(a2) || this.chat.registerPlugin({ "tim-push": r2, pushConfig: a2 }), !w || G || S(o2) || S(u2) || this.chat.registerPlugin({ "tim-offline-push-plugin": o2, offlinePushConfig: u2 });
  }
  onSDKReady() {
    if (this.loginStatusPromise.has("login")) {
      const e2 = this.loginStatusPromise.get("login");
      e2.resolve(e2.imResponse), this.TUIUser.getUserProfile();
    }
    this.loginStatusPromise.delete("login");
  }
  onSDKNotReady() {
    if (this.loginStatusPromise.has("login")) {
      this.loginStatusPromise.get("login").reject(new Error("sdk not ready"));
    }
    this.loginStatusPromise.delete("login"), this.resetStore();
  }
  checkCommercialAbility() {
    Object.keys(k).forEach((e2) => {
      const t2 = k[e2];
      this.chat.callExperimentalAPI("isCommercialAbilityEnabled", t2).then((t3) => {
        const { enabled: s2 = false } = t3.data;
        this.TUIStore.update(o.APP, e2, s2);
      });
    });
  }
};
var te = class {
  constructor() {
    this.defaultStore = { enabledMessageReadReceipt: false, enabledEmojiPlugin: false, enabledOnlineStatus: false, enabledCustomerServicePlugin: false, enabledTranslationPlugin: false, enabledVoiceToText: false, enableTyping: true, enableConversationDraft: true, isOfficial: false, SDKVersion: "3.0.0", tasks: { sendMessage: false, revokeMessage: false, modifyNickName: false, groupChat: false, muteGroup: false, dismissGroup: false, call: false, searchCloudMessage: false, customerService: false, translateTextMessage: false } }, this.store = { enabledEmojiPlugin: false, enabledMessageReadReceipt: false, enabledOnlineStatus: false, enabledCustomerServicePlugin: false, enabledTranslationPlugin: false, enabledVoiceToText: false, enableTyping: true, enableConversationDraft: true, isOfficial: false, SDKVersion: "3.0.0", tasks: { sendMessage: false, revokeMessage: false, modifyNickName: false, groupChat: false, muteGroup: false, dismissGroup: false, call: false, searchCloudMessage: false, customerService: false, translateTextMessage: false } };
  }
  update(e2, t2) {
    this.store[e2] = t2;
  }
  getData(e2) {
    return this.store[e2];
  }
  reset(e2 = []) {
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: this.defaultStore[t2] }), {}));
  }
};
var se = class {
  constructor() {
    this.defaultStore = { userProfile: {}, displayOnlineStatus: false, displayMessageReadReceipt: true, userStatusList: /* @__PURE__ */ new Map(), kickedOut: "", netStateChange: "", userBlacklist: [], targetLanguage: "zh" }, this.store = { userProfile: {}, displayOnlineStatus: false, displayMessageReadReceipt: true, userStatusList: /* @__PURE__ */ new Map(), kickedOut: "", netStateChange: "", userBlacklist: [], targetLanguage: "zh" };
  }
  update(e2, t2) {
    if ("userStatusList" === e2)
      this.updateUserStatusList(t2);
    else
      this.store[e2] = t2;
  }
  getData(e2) {
    return this.store[e2];
  }
  reset(e2 = []) {
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: this.defaultStore[t2] }), {}));
  }
  updateUserStatusList(e2) {
    0 !== e2.length ? e2.forEach((e3) => {
      const { userID: t2, statusType: s2 = 0, customStatus: n2 = "" } = e3;
      s2 === u.UNSUB_USER ? this.store.userStatusList.delete(t2) : this.store.userStatusList.set(t2, { statusType: s2, customStatus: n2 });
    }) : this.store.userStatusList.clear();
  }
};
var ne = class {
  getEngine() {
    return ee.getInstance();
  }
};
var ie = function(e2) {
  if (null == e2)
    return true;
  if ("boolean" == typeof e2)
    return false;
  if ("number" == typeof e2)
    return 0 === e2;
  if ("string" == typeof e2)
    return 0 === e2.length;
  if ("function" == typeof e2)
    return 0 === e2.length;
  if (Array.isArray(e2))
    return 0 === e2.length;
  if (e2 instanceof Error)
    return "" === e2.message;
  if (function(e3) {
    if ("object" != typeof e3 || null === e3)
      return false;
    const t2 = Object.getPrototypeOf(e3);
    if (null === t2)
      return true;
    let s2 = t2;
    for (; null !== Object.getPrototypeOf(s2); )
      s2 = Object.getPrototypeOf(s2);
    return t2 === s2;
  }(e2)) {
    for (const t2 in e2)
      if (Object.prototype.hasOwnProperty.call(e2, t2))
        return false;
    return true;
  }
  return false;
};
var re = ["[图片]", "[语音]", "[视频]", "[文件]", "[位置]", "[地理位置]", "[动画表情]", "[自定义消息]", "[群提示消息]", "[聊天记录]"];
var ae = class extends ne {
  constructor(e2) {
    super(), this.initProxy(e2), this.isMuted = this.messageRemindType === this.getEngine().TYPES.MSG_REMIND_ACPT_NOT_NOTE || this.messageRemindType === this.getEngine().TYPES.MSG_REMIND_DISCARD, this.operationType = 0, this._conversation = e2;
  }
  initProxy(e2) {
    Object.keys(e2).forEach((t2) => {
      y(t2) || (this[t2] = e2[t2]);
    });
  }
  updateProperties(e2) {
    Object.keys(e2).forEach((t2) => {
      y(t2) || (this[t2] = e2[t2]);
    });
  }
  updateOperationType(e2) {
    this.operationType = e2;
  }
  getConversation() {
    return this._conversation;
  }
  deleteConversation() {
    return this.getEngine().TUIConversation.deleteConversation(this.conversationID);
  }
  pinConversation() {
    return this.getEngine().TUIConversation.pinConversation({ conversationID: this.conversationID, isPinned: !this.isPinned });
  }
  muteConversation() {
    const e2 = this.getEngine(), t2 = { messageRemindType: true === this.isMuted ? e2.TYPES.MSG_REMIND_ACPT_AND_NOTE : e2.TYPES.MSG_REMIND_ACPT_NOT_NOTE };
    if (this.type === e2.TYPES.CONV_C2C) {
      const s2 = this.conversationID.replace(e2.TYPES.CONV_C2C, "");
      t2.userIDList = [s2];
    } else if (this.type === e2.TYPES.CONV_GROUP) {
      const s2 = this.conversationID.replace(e2.TYPES.CONV_GROUP, "");
      t2.groupID = s2;
    }
    return e2.TUIConversation.muteConversation(t2);
  }
  getAvatar() {
    var e2, t2, s2, n2, i2, r2;
    const a2 = this.getEngine();
    let o2 = "";
    switch (this.type) {
      case a2.TYPES.CONV_C2C:
        o2 = b(null === (e2 = this.userProfile) || void 0 === e2 ? void 0 : e2.avatar) ? null === (t2 = this.userProfile) || void 0 === t2 ? void 0 : t2.avatar : M;
        break;
      case a2.TYPES.CONV_GROUP:
        o2 = b(null === (s2 = this.groupProfile) || void 0 === s2 ? void 0 : s2.avatar) ? null === (n2 = this.groupProfile) || void 0 === n2 ? void 0 : n2.avatar : O;
        break;
      case a2.TYPES.CONV_SYSTEM:
        o2 = b(null === (i2 = this.groupProfile) || void 0 === i2 ? void 0 : i2.avatar) ? null === (r2 = this.groupProfile) || void 0 === r2 ? void 0 : r2.avatar : _;
    }
    return o2;
  }
  getShowName() {
    var e2, t2, s2, n2;
    const i2 = this.getEngine();
    let r2 = "";
    switch (this.type) {
      case i2.TYPES.CONV_C2C:
        r2 = this.remark || (null === (e2 = this.userProfile) || void 0 === e2 ? void 0 : e2.nick) || (null === (t2 = this.userProfile) || void 0 === t2 ? void 0 : t2.userID) || "";
        break;
      case i2.TYPES.CONV_GROUP:
        r2 = (null === (s2 = this.groupProfile) || void 0 === s2 ? void 0 : s2.name) || (null === (n2 = this.groupProfile) || void 0 === n2 ? void 0 : n2.groupID) || "";
        break;
      case i2.TYPES.CONV_SYSTEM:
        r2 = i2.TUITranslate.t("系统通知");
    }
    return r2;
  }
  getGroupAtInfo() {
    const e2 = this.getEngine(), t2 = e2.TUITranslate.t.bind(e2.TUITranslate), s2 = [`[${t2("TUIConversation.有人@我")}]`, `[${t2("TUIConversation.@所有人")}]`, `[${t2("TUIConversation.@所有人")}][${t2("TUIConversation.有人@我")}]`];
    let n2 = "";
    for (let e3 = 0; e3 < this.groupAtInfoList.length; e3++)
      this.groupAtInfoList[e3].atTypeArray[0] && this.unreadCount > 0 && (n2 = s2[this.groupAtInfoList[e3].atTypeArray[0] - 1]);
    return n2;
  }
  getLastMessage(e2) {
    return "time" === e2 ? this.getLastMessageTime() : "text" === e2 ? this.getLastMessageText() : (console.warn(`ConversationModel.getLastMessage key:${e2} is invalid.`), null);
  }
  getLastMessageTime() {
    var e2;
    const t2 = this.getEngine();
    let s2 = "";
    return (null === (e2 = this.lastMessage) || void 0 === e2 ? void 0 : e2.lastTime) > 0 && (s2 = function(e3, t3) {
      const s3 = 6e4, n2 = 36e5, i2 = 24 * n2, r2 = 7 * i2, a2 = (/* @__PURE__ */ new Date()).getTime() - e3;
      let o2 = "";
      if (a2 < 0)
        return o2;
      const u2 = a2 / s3, c2 = a2 / n2, g2 = a2 / i2, l2 = a2 / r2;
      if (l2 >= 1 && l2 <= 4)
        o2 = ` ${parseInt(`${l2}`, 10)} ${t3("time.周")}${t3("time.前")}`;
      else if (g2 >= 1 && g2 <= 6)
        o2 = ` ${parseInt(`${g2}`, 10)} ${t3("time.天")}${t3("time.前")}`;
      else if (c2 >= 1 && c2 <= 23)
        o2 = ` ${parseInt(`${c2}`, 10)} ${t3("time.小时")}${t3("time.前")}`;
      else if (u2 >= 1 && u2 <= 59)
        o2 = ` ${parseInt(`${u2}`, 10)} ${t3("time.分钟")}${t3("time.前")}`;
      else if (a2 >= 0 && a2 <= s3)
        o2 = `${t3("time.刚刚")}`;
      else {
        const t4 = /* @__PURE__ */ new Date();
        t4.setTime(e3), o2 = `${t4.getFullYear()}-${t4.getMonth() + 1 < 10 ? `0${t4.getMonth() + 1}` : t4.getMonth() + 1}-${t4.getDate() < 10 ? `0${t4.getDate()}` : t4.getDate()}`;
      }
      return o2;
    }(1e3 * this.lastMessage.lastTime, t2.TUITranslate.t.bind(t2.TUITranslate))), s2;
  }
  getLastMessageText() {
    var e2;
    if (this.draftText) {
      return U(this.draftText).abstract;
    }
    const t2 = this.getEngine(), s2 = t2.TUITranslate.t.bind(t2.TUITranslate);
    if (4 === this.operationType)
      return s2("TUIConversation.您已被群管理员移出群聊");
    if (5 === this.operationType)
      return s2("TUIConversation.该群聊已被解散");
    if (8 === this.operationType)
      return s2("TUIConversation.您已退出该群聊");
    const n2 = this._conversation, { lastMessage: i2 } = this;
    let r2 = "", a2 = "";
    const o2 = n2.unreadCount > 0 && n2.messageRemindType === t2.TYPES.MSG_REMIND_ACPT_NOT_NOTE ? `[${n2.unreadCount > 99 ? "99+" : n2.unreadCount}${s2("TUIConversation.条")}]` : "";
    if (n2.type === t2.TYPES.CONV_GROUP)
      if (i2.fromAccount === t2.getMyUserID())
        r2 = s2("TUIConversation.我");
      else {
        const e3 = i2.fromAccount;
        r2 = t2.TUIFriend.getFriendRemark([e3])[e3] || i2.nameCard || i2.nick || e3;
      }
    if (i2.type === t2.TYPES.MSG_TEXT)
      a2 = this.decodeTextMessage(i2.payload.text);
    else if (i2.type === t2.TYPES.MSG_CUSTOM) {
      const n3 = U(null === (e2 = null == i2 ? void 0 : i2.payload) || void 0 === e2 ? void 0 : e2.data);
      if (1 === (null == n3 ? void 0 : n3.businessID))
        return a2 = t2.TUIChat.messageHandler.handleCallKitSignaling(i2), a2;
      a2 = re.includes(i2.messageForShow) ? s2(`TUIChat.${i2.messageForShow}`) : i2.messageForShow;
    } else
      a2 = re.includes(i2.messageForShow) ? s2(`TUIChat.${i2.messageForShow}`) : i2.messageForShow;
    return i2.isRevoked && (a2 = s2("TUIChat.撤回了一条消息")), n2.type === t2.TYPES.CONV_GROUP && i2.type === t2.TYPES.MSG_GRP_TIP ? a2 : `${o2}${r2 ? `${r2}:` : ""}${a2}`;
  }
  decodeTextMessage(e2) {
    if (ie(e2))
      return e2;
    const t2 = /(\[.+?\])/g;
    let s2 = e2;
    if (t2.test(e2)) {
      const n2 = this.getEngine(), i2 = n2.TUITranslate.t.bind(n2.TUITranslate);
      s2 = e2.replace(t2, (e3) => {
        const t3 = i2(`Emoji.${e3}`);
        return G || !t3 || t3.startsWith("Emoji.") ? j[e3] || e3 : t3;
      });
    }
    return s2;
  }
};
var oe = class {
  constructor() {
    this.defaultStore = { currentConversationID: "", totalUnreadCount: 0, conversationList: [], currentConversation: null, operationTypeMap: /* @__PURE__ */ new Map() }, this.store = { currentConversationID: "", totalUnreadCount: 0, conversationList: [], currentConversation: null, operationTypeMap: /* @__PURE__ */ new Map() };
  }
  update(e2, t2) {
    switch (e2) {
      case "conversationList":
        this.updateConversationList(t2);
        break;
      case "operationTypeMap":
        this.updateOperationTypeMap(t2);
        break;
      default:
        this.store[e2] = t2;
    }
  }
  getData(e2) {
    return this.store[e2];
  }
  getModel(e2) {
    return this.store.conversationList.find((t2) => t2.conversationID === e2);
  }
  reset(e2 = []) {
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: this.defaultStore[t2] }), {}));
  }
  updateConversationList(e2) {
    const t2 = [];
    e2.forEach((e3) => {
      let s2 = e3;
      e3 instanceof ae ? s2.updateProperties(e3) : s2 = new ae(e3);
      const n2 = this.getOperationType(e3);
      s2.updateOperationType(n2), t2.push(s2);
    }), this.store.conversationList = t2;
  }
  updateOperationTypeMap(e2) {
    const { conversationID: t2, operationType: s2 = 0 } = e2;
    this.store.operationTypeMap.set(t2, s2);
  }
  getOperationType(e2) {
    const { conversationID: t2 } = e2;
    return this.store.operationTypeMap.get(t2) || 0;
  }
};
var ue = class extends ne {
  constructor(e2) {
    super(), this.messageHandlers = { [this.getEngine().TYPES.MSG_TEXT]: (e3) => this.getEngine().TUIChat.messageHandler.handleTextMessage(e3), [this.getEngine().TYPES.MSG_FACE]: (e3) => this.getEngine().TUIChat.messageHandler.handleFaceMessage(e3), [this.getEngine().TYPES.MSG_LOCATION]: (e3) => this.getEngine().TUIChat.messageHandler.handleLocationMessage(e3), [this.getEngine().TYPES.MSG_IMAGE]: (e3) => this.getEngine().TUIChat.messageHandler.handleImageMessage(e3), [this.getEngine().TYPES.MSG_AUDIO]: (e3) => this.getEngine().TUIChat.messageHandler.handleAudioMessage(e3), [this.getEngine().TYPES.MSG_VIDEO]: (e3) => this.getEngine().TUIChat.messageHandler.handleVideoMessage(e3), [this.getEngine().TYPES.MSG_FILE]: (e3) => this.getEngine().TUIChat.messageHandler.handleFileMessage(e3), [this.getEngine().TYPES.MSG_CUSTOM]: (e3) => this.getEngine().TUIChat.messageHandler.handleCustomMessage(e3), [this.getEngine().TYPES.MSG_MERGER]: (e3) => this.getEngine().TUIChat.messageHandler.handleMergeMessage(e3), [this.getEngine().TYPES.MSG_GRP_TIP]: (e3) => this.getEngine().TUIChat.messageHandler.handleGroupTipsMessage(e3) }, this._message = e2, this._signalingInfo = void 0, this.progress = 0, this.reactionList = [], this.initProperties(e2);
  }
  initProperties(e2) {
    Object.keys(e2).forEach((t2) => {
      y(t2) || (this[t2] = e2[t2]);
    });
  }
  updateProperties(e2) {
    this._message = e2, Object.keys(e2).forEach((t2) => {
      y(t2) || (this[t2] = e2[t2]);
    });
  }
  getMessage() {
    return this._message;
  }
  modifyMessage(e2) {
    return e2.type && this._message.type !== e2.type && !e2.payload ? Promise.reject({ code: h.MISMATCH_TYPE_AND_PAYLOAD, message: d.MISMATCH_TYPE_AND_PAYLOAD }) : (this._message.type = e2.type || this._message.type, this._message.payload = e2.payload || this._message.payload, this._message.cloudCustomData = e2.cloudCustomData || this._message.cloudCustomData, this.getEngine().TUIChat.modifyMessage(this._message));
  }
  revokeMessage() {
    return this.getEngine().TUIChat.revokeMessage(this._message);
  }
  resendMessage() {
    return this.getEngine().TUIChat.resendMessage(this._message);
  }
  deleteMessage() {
    return this.getEngine().TUIChat.deleteMessage([this._message]);
  }
  quoteMessage() {
    return this.getEngine().TUIChat.quoteMessage(this._message);
  }
  replyMessage() {
    return this.getEngine().TUIChat.replyMessage(this._message);
  }
  setMessageExtensions(e2) {
    return this.getEngine().TUIChat.setMessageExtensions(this._message, e2);
  }
  getMessageExtensions() {
    return this.getEngine().TUIChat.getMessageExtensions(this._message);
  }
  deleteMessageExtensions(e2) {
    return this.getEngine().TUIChat.deleteMessageExtensions(this._message, e2);
  }
  getSignalingInfo() {
    return this.type !== this.getEngine().TYPES.MSG_CUSTOM ? null : S(this._signalingInfo) ? (this._signalingInfo = this.getEngine().chat.getSignalingInfo(this._message), this._signalingInfo) : this._signalingInfo;
  }
  getMessageContent() {
    const e2 = this.messageHandlers[this.type];
    if (S(e2))
      return {};
    if (this.type === this.getEngine().TYPES.MSG_GRP_TIP)
      return e2(this._message);
    const t2 = this.getEngine().TUIFriend.getFriendRemark([this.from]);
    return Object.assign(Object.assign({}, e2(this._message)), { showName: t2[this.from] || this.nameCard || this.nick || this.from });
  }
  sendForwardMessage(e2) {
    return this.getEngine().TUIChat.sendForwardMessage(e2, [this._message]);
  }
};
var ce = class {
  constructor() {
    this.defaultStore = { messageList: [], isCompleted: false, nextReqMessageID: "", quoteMessage: {}, newMessageList: [], typingStatus: false, messageSource: void 0, translateTextInfo: void 0, voiceToTextInfo: void 0, userInfo: {} }, this.store = { messageList: [], isCompleted: false, nextReqMessageID: "", quoteMessage: {}, newMessageList: [], typingStatus: false, messageSource: void 0, translateTextInfo: void 0, voiceToTextInfo: void 0, userInfo: {} };
  }
  update(e2, t2) {
    switch (e2) {
      case "messageList":
        this.updateMessageList(t2);
        break;
      case "translateTextInfo":
        this.updateTranslateTextInfo(t2);
        break;
      case "voiceToTextInfo":
        this.updateVoiceToTextInfo(t2);
        break;
      default:
        this.store[e2] = t2;
    }
  }
  getData(e2) {
    return this.store[e2];
  }
  getModel(e2) {
    return this.store.messageList.find((t2) => t2.ID === e2);
  }
  reset(e2 = []) {
    const t2 = e2.filter((e3) => !x.includes(e3));
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), null == t2 ? void 0 : t2.reduce((e3, t3) => Object.assign(Object.assign({}, e3), { [t3]: this.defaultStore[t3] }), {}));
  }
  updateMessageList(e2) {
    const t2 = [];
    e2.forEach((e3) => {
      let s2 = e3;
      e3 instanceof ue || (s2 = this.getModel(e3.ID), s2 ? s2.updateProperties(e3) : s2 = new ue(e3)), t2.push(s2);
    }), this.store.messageList = t2;
  }
  updateTranslateTextInfo(e2) {
    this.updateBykey("translateTextInfo", e2);
  }
  updateVoiceToTextInfo(e2) {
    this.updateBykey("voiceToTextInfo", e2);
  }
  updateBykey(e2, t2) {
    const { conversationID: s2, messageID: n2, visible: i2 = false } = t2;
    this.store[e2] || (this.store[e2] = /* @__PURE__ */ new Map()), this.store[e2].has(s2) || this.store[e2].set(s2, []);
    const r2 = this.store[e2].get(s2) || [];
    let a2 = true;
    for (let e3 = 0; e3 < r2.length; e3++)
      if (r2[e3].messageID === n2) {
        r2[e3].visible = i2, a2 = false;
        break;
      }
    a2 && r2.push({ messageID: n2, visible: i2 }), this.store[e2].set(s2, r2);
  }
};
var ge = class {
  constructor(e2) {
    this.groupAttributes = {}, this.groupCounters = {}, this.initProxy(e2);
  }
  initProxy(e2) {
    Object.keys(e2).forEach((t2) => {
      y(t2) || (this[t2] = e2[t2]);
    });
  }
};
var le = class {
  constructor() {
    this.defaultStore = { currentGroupID: "", currentGroup: {}, currentGroupAttributes: {}, currentGroupCounters: {}, currentGroupMemberList: [], groupList: [], groupSystemNoticeList: [], isCompleted: false, offset: 0 }, this.store = { currentGroupID: "", currentGroup: void 0, currentGroupAttributes: {}, currentGroupCounters: {}, currentGroupMemberList: [], groupList: [], groupSystemNoticeList: [], isCompleted: false, offset: 0 };
  }
  update(e2, t2) {
    switch (e2) {
      case "groupList":
        this.updateGroupList(t2);
        break;
      case "currentGroup":
        this.store.currentGroup = t2 instanceof ge ? t2 : new ge(t2);
        break;
      default:
        this.store[e2] = t2;
    }
  }
  getData(e2) {
    if ("groupSystemNoticeList" === e2) {
      const e3 = [...this.store.groupSystemNoticeList];
      return this.store.groupSystemNoticeList.length = 0, e3;
    }
    return this.store[e2];
  }
  reset(e2 = []) {
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: this.defaultStore[t2] }), {}));
  }
  updateGroupList(e2) {
    this.store.groupList = e2.map((e3) => e3 instanceof ge ? e3 : new ge(e3));
  }
};
var he = class {
  constructor() {
    this.store = {};
  }
  update(e2, t2) {
    this.store[e2] = t2;
  }
  getData(e2) {
    return this.store[e2];
  }
  reset(e2 = []) {
    0 === e2.length && (this.store = {}), this.store = Object.assign(Object.assign({}, this.store), e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: void 0 }), {}));
  }
};
var pe = class {
  constructor() {
    this.defaultStore = { friendList: [], friendApplicationList: [], friendApplicationUnreadCount: 0 }, this.store = { friendList: [], friendApplicationList: [], friendApplicationUnreadCount: 0 };
  }
  update(e2, t2) {
    this.store[e2] = t2;
  }
  getData(e2) {
    return this.store[e2];
  }
  reset(e2 = []) {
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: this.defaultStore[t2] }), {}));
  }
};
var de = class {
  constructor() {
    this.defaultStore = { currentSearchInputValue: { value: "", searchType: "global" }, currentSearchMessageType: { value: { key: "", label: "", value: "" }, searchType: "global" }, currentSearchMessageTime: { value: { key: "", label: "", value: { timePosition: 0, timePeriod: 0 } }, searchType: "global" }, currentSearchingStatus: { isSearching: false, searchType: "global" }, isShowInConversationSearch: false }, this.store = { currentSearchInputValue: { value: "", searchType: "global" }, currentSearchMessageType: { value: { key: "", label: "", value: "" }, searchType: "global" }, currentSearchMessageTime: { value: { key: "", label: "", value: { timePosition: 0, timePeriod: 0 } }, searchType: "global" }, currentSearchingStatus: { isSearching: false, searchType: "global" }, isShowInConversationSearch: false };
  }
  update(e2, t2) {
    this.store[e2] = t2;
  }
  getData(e2) {
    return this.store[e2];
  }
  reset(e2 = []) {
    this.store = Object.assign(Object.assign(Object.assign({}, this.defaultStore), this.store), null == e2 ? void 0 : e2.reduce((e3, t2) => Object.assign(Object.assign({}, e3), { [t2]: this.defaultStore[t2] }), {}));
  }
};
var fe = class _fe {
  constructor() {
    this.storeMap = { [o.APP]: new te(), [o.USER]: new se(), [o.CONV]: new oe(), [o.CHAT]: new ce(), [o.GRP]: new le(), [o.FRIEND]: new pe(), [o.SEARCH]: new de() }, this.task = {};
  }
  static getInstance() {
    return _fe.instance || (_fe.instance = new _fe()), _fe.instance;
  }
  watch(e2, t2) {
    this.task[e2] || (this.task[e2] = {});
    const s2 = this.task[e2];
    Object.keys(t2).forEach((n2) => {
      const i2 = t2[n2];
      s2[n2] || (s2[n2] = /* @__PURE__ */ new Map()), s2[n2].set(i2, 1), this.notifyOnWatch(e2, n2, i2);
    });
  }
  unwatch(e2, t2) {
    if (!this.task[e2])
      return;
    const s2 = this.task[e2];
    Object.keys(t2).forEach((e3) => {
      var n2;
      null === (n2 = s2[e3]) || void 0 === n2 || n2.delete(t2[e3]);
    });
  }
  update(e2, t2, s2) {
    var n2;
    e2 !== o.CUSTOM || this.storeMap[e2] || (this.storeMap[e2] = new he()), null === (n2 = this.storeMap[e2]) || void 0 === n2 || n2.update(t2, s2), this.notify(e2, t2);
  }
  getData(e2, t2) {
    var s2;
    return e2 !== o.CUSTOM || this.storeMap[e2] || (this.storeMap[e2] = new he()), null === (s2 = this.storeMap[e2]) || void 0 === s2 ? void 0 : s2.getData(t2);
  }
  getConversationModel(e2) {
    var t2;
    return null === (t2 = this.storeMap[o.CONV]) || void 0 === t2 ? void 0 : t2.getModel(e2);
  }
  getMessageModel(e2) {
    var t2;
    return null === (t2 = this.storeMap[o.CHAT]) || void 0 === t2 ? void 0 : t2.getModel(e2);
  }
  reset(e2, t2 = [], s2 = false) {
    if (e2 in this.storeMap) {
      const n2 = this.storeMap[e2];
      0 === t2.length && (t2 = Object.keys(null == n2 ? void 0 : n2.store)), n2.reset(t2), s2 && t2.forEach((t3) => {
        this.notify(e2, t3);
      });
    }
  }
  notifyOnWatch(e2, t2, s2) {
    const n2 = this.getData(e2, t2);
    N.indexOf(t2) > -1 && 0 === n2.length || s2 && s2.call(this, n2);
  }
  notify(e2, t2) {
    if (!this.task[e2])
      return;
    const s2 = this.task[e2];
    if (s2[t2]) {
      const n2 = s2[t2], i2 = this.getData(e2, t2);
      for (const [e3] of n2.entries())
        e3.call(this, i2);
    }
  }
};
function me(e2) {
  return me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, me(e2);
}
function ve(e2, t2) {
  if (!(e2 instanceof t2))
    throw new TypeError("Cannot call a class as a function");
}
function Te(e2) {
  var t2 = function(e3, t3) {
    if ("object" != me(e3) || !e3)
      return e3;
    var s2 = e3[Symbol.toPrimitive];
    if (void 0 !== s2) {
      var n2 = s2.call(e3, t3 || "default");
      if ("object" != me(n2))
        return n2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t3 ? String : Number)(e3);
  }(e2, "string");
  return "symbol" == me(t2) ? t2 : t2 + "";
}
function Ee(e2, t2) {
  for (var s2 = 0; s2 < t2.length; s2++) {
    var n2 = t2[s2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, Te(n2.key), n2);
  }
}
function Ie(e2, t2, s2) {
  return t2 && Ee(e2.prototype, t2), s2 && Ee(e2, s2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
}
function Se(e2) {
  if (void 0 === e2)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e2;
}
function ye(e2, t2) {
  return ye = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
    return e3.__proto__ = t3, e3;
  }, ye(e2, t2);
}
function be(e2, t2) {
  if ("function" != typeof t2 && null !== t2)
    throw new TypeError("Super expression must either be null or a function");
  e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && ye(e2, t2);
}
function Ue(e2, t2) {
  if (t2 && ("object" == me(t2) || "function" == typeof t2))
    return t2;
  if (void 0 !== t2)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Se(e2);
}
function Ce(e2) {
  return Ce = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
    return e3.__proto__ || Object.getPrototypeOf(e3);
  }, Ce(e2);
}
function Me(e2, t2, s2) {
  return (t2 = Te(t2)) in e2 ? Object.defineProperty(e2, t2, { value: s2, enumerable: true, configurable: true, writable: true }) : e2[t2] = s2, e2;
}
function Oe(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var s2 = 0, n2 = Array(t2); s2 < t2; s2++)
    n2[s2] = e2[s2];
  return n2;
}
function _e(e2) {
  return function(e3) {
    if (Array.isArray(e3))
      return e3;
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"])
      return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (e3) {
      if ("string" == typeof e3)
        return Oe(e3, t2);
      var s2 = {}.toString.call(e3).slice(8, -1);
      return "Object" === s2 && e3.constructor && (s2 = e3.constructor.name), "Map" === s2 || "Set" === s2 ? Array.from(e3) : "Arguments" === s2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s2) ? Oe(e3, t2) : void 0;
    }
  }(e2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function De(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function Pe(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? De(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : De(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
var Re = { type: "logger", log: function(e2) {
  this.output("log", e2);
}, warn: function(e2) {
  this.output("warn", e2);
}, error: function(e2) {
  this.output("error", e2);
}, output: function(e2, t2) {
  console && console[e2] && console[e2].apply(console, t2);
} };
var Le = new (function() {
  function e2(t2) {
    var s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    ve(this, e2), this.init(t2, s2);
  }
  return Ie(e2, [{ key: "init", value: function(e3) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    this.prefix = t2.prefix || "i18next:", this.logger = e3 || Re, this.options = t2, this.debug = t2.debug;
  } }, { key: "setDebug", value: function(e3) {
    this.debug = e3;
  } }, { key: "log", value: function() {
    for (var e3 = arguments.length, t2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      t2[s2] = arguments[s2];
    return this.forward(t2, "log", "", true);
  } }, { key: "warn", value: function() {
    for (var e3 = arguments.length, t2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      t2[s2] = arguments[s2];
    return this.forward(t2, "warn", "", true);
  } }, { key: "error", value: function() {
    for (var e3 = arguments.length, t2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      t2[s2] = arguments[s2];
    return this.forward(t2, "error", "");
  } }, { key: "deprecate", value: function() {
    for (var e3 = arguments.length, t2 = new Array(e3), s2 = 0; s2 < e3; s2++)
      t2[s2] = arguments[s2];
    return this.forward(t2, "warn", "WARNING DEPRECATED: ", true);
  } }, { key: "forward", value: function(e3, t2, s2, n2) {
    return n2 && !this.debug ? null : ("string" == typeof e3[0] && (e3[0] = "".concat(s2).concat(this.prefix, " ").concat(e3[0])), this.logger[t2](e3));
  } }, { key: "create", value: function(t2) {
    return new e2(this.logger, Pe(Pe({}, { prefix: "".concat(this.prefix, ":").concat(t2, ":") }), this.options));
  } }, { key: "clone", value: function(t2) {
    return (t2 = t2 || this.options).prefix = t2.prefix || this.prefix, new e2(this.logger, t2);
  } }]), e2;
}())();
var Ae = function() {
  function e2() {
    ve(this, e2), this.observers = {};
  }
  return Ie(e2, [{ key: "on", value: function(e3, t2) {
    var s2 = this;
    return e3.split(" ").forEach(function(e4) {
      s2.observers[e4] = s2.observers[e4] || [], s2.observers[e4].push(t2);
    }), this;
  } }, { key: "off", value: function(e3, t2) {
    this.observers[e3] && (t2 ? this.observers[e3] = this.observers[e3].filter(function(e4) {
      return e4 !== t2;
    }) : delete this.observers[e3]);
  } }, { key: "emit", value: function(e3) {
    for (var t2 = arguments.length, s2 = new Array(t2 > 1 ? t2 - 1 : 0), n2 = 1; n2 < t2; n2++)
      s2[n2 - 1] = arguments[n2];
    this.observers[e3] && [].concat(this.observers[e3]).forEach(function(e4) {
      e4.apply(void 0, s2);
    });
    this.observers["*"] && [].concat(this.observers["*"]).forEach(function(t3) {
      t3.apply(t3, [e3].concat(s2));
    });
  } }]), e2;
}();
function je() {
  var e2, t2, s2 = new Promise(function(s3, n2) {
    e2 = s3, t2 = n2;
  });
  return s2.resolve = e2, s2.reject = t2, s2;
}
function ke(e2) {
  return null == e2 ? "" : "" + e2;
}
function Ne(e2, t2, s2) {
  function n2(e3) {
    return e3 && e3.indexOf("###") > -1 ? e3.replace(/###/g, ".") : e3;
  }
  function i2() {
    return !e2 || "string" == typeof e2;
  }
  for (var r2 = "string" != typeof t2 ? [].concat(t2) : t2.split("."); r2.length > 1; ) {
    if (i2())
      return {};
    var a2 = n2(r2.shift());
    !e2[a2] && s2 && (e2[a2] = new s2()), e2 = Object.prototype.hasOwnProperty.call(e2, a2) ? e2[a2] : {};
  }
  return i2() ? {} : { obj: e2, k: n2(r2.shift()) };
}
function xe(e2, t2, s2) {
  var n2 = Ne(e2, t2, Object);
  n2.obj[n2.k] = s2;
}
function Ge(e2, t2) {
  var s2 = Ne(e2, t2), n2 = s2.obj, i2 = s2.k;
  if (n2)
    return n2[i2];
}
function we(e2, t2, s2) {
  for (var n2 in t2)
    "__proto__" !== n2 && "constructor" !== n2 && (n2 in e2 ? "string" == typeof e2[n2] || e2[n2] instanceof String || "string" == typeof t2[n2] || t2[n2] instanceof String ? s2 && (e2[n2] = t2[n2]) : we(e2[n2], t2[n2], s2) : e2[n2] = t2[n2]);
  return e2;
}
function Ve(e2) {
  return e2.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var Fe = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
function $e(e2) {
  return "string" == typeof e2 ? e2.replace(/[&<>"'\/]/g, function(e3) {
    return Fe[e3];
  }) : e2;
}
var He = "undefined" != typeof window && window.navigator && void 0 === window.navigator.userAgentData && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1;
var Ye = [" ", ",", "?", "!", ";"];
function Be(e2, t2) {
  var s2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
  if (e2) {
    if (e2[t2])
      return e2[t2];
    for (var n2 = t2.split(s2), i2 = e2, r2 = 0; r2 < n2.length; ++r2) {
      if (!i2)
        return;
      if ("string" == typeof i2[n2[r2]] && r2 + 1 < n2.length)
        return;
      if (void 0 === i2[n2[r2]]) {
        for (var a2 = 2, o2 = n2.slice(r2, r2 + a2).join(s2), u2 = i2[o2]; void 0 === u2 && n2.length > r2 + a2; )
          a2++, u2 = i2[o2 = n2.slice(r2, r2 + a2).join(s2)];
        if (void 0 === u2)
          return;
        if (null === u2)
          return null;
        if (t2.endsWith(o2)) {
          if ("string" == typeof u2)
            return u2;
          if (o2 && "string" == typeof u2[o2])
            return u2[o2];
        }
        var c2 = n2.slice(r2 + a2).join(s2);
        return c2 ? Be(u2, c2, s2) : void 0;
      }
      i2 = i2[n2[r2]];
    }
    return i2;
  }
}
function Ke(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function qe(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Ke(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : Ke(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
function ze(e2) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e3) {
      return false;
    }
  }();
  return function() {
    var s2, n2 = Ce(e2);
    if (t2) {
      var i2 = Ce(this).constructor;
      s2 = Reflect.construct(n2, arguments, i2);
    } else
      s2 = n2.apply(this, arguments);
    return Ue(this, s2);
  };
}
var Je = function() {
  be(t2, Ae);
  var e2 = ze(t2);
  function t2(s2) {
    var n2, i2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { ns: ["translation"], defaultNS: "translation" };
    return ve(this, t2), n2 = e2.call(this), He && Ae.call(Se(n2)), n2.data = s2 || {}, n2.options = i2, void 0 === n2.options.keySeparator && (n2.options.keySeparator = "."), void 0 === n2.options.ignoreJSONStructure && (n2.options.ignoreJSONStructure = true), n2;
  }
  return Ie(t2, [{ key: "addNamespaces", value: function(e3) {
    this.options.ns.indexOf(e3) < 0 && this.options.ns.push(e3);
  } }, { key: "removeNamespaces", value: function(e3) {
    var t3 = this.options.ns.indexOf(e3);
    t3 > -1 && this.options.ns.splice(t3, 1);
  } }, { key: "getResource", value: function(e3, t3, s2) {
    var n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, i2 = void 0 !== n2.keySeparator ? n2.keySeparator : this.options.keySeparator, r2 = void 0 !== n2.ignoreJSONStructure ? n2.ignoreJSONStructure : this.options.ignoreJSONStructure, a2 = [e3, t3];
    s2 && "string" != typeof s2 && (a2 = a2.concat(s2)), s2 && "string" == typeof s2 && (a2 = a2.concat(i2 ? s2.split(i2) : s2)), e3.indexOf(".") > -1 && (a2 = e3.split("."));
    var o2 = Ge(this.data, a2);
    return o2 || !r2 || "string" != typeof s2 ? o2 : Be(this.data && this.data[e3] && this.data[e3][t3], s2, i2);
  } }, { key: "addResource", value: function(e3, t3, s2, n2) {
    var i2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : { silent: false }, r2 = void 0 !== i2.keySeparator ? i2.keySeparator : this.options.keySeparator, a2 = [e3, t3];
    s2 && (a2 = a2.concat(r2 ? s2.split(r2) : s2)), e3.indexOf(".") > -1 && (n2 = t3, t3 = (a2 = e3.split("."))[1]), this.addNamespaces(t3), xe(this.data, a2, n2), i2.silent || this.emit("added", e3, t3, s2, n2);
  } }, { key: "addResources", value: function(e3, t3, s2) {
    var n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : { silent: false };
    for (var i2 in s2)
      "string" != typeof s2[i2] && "[object Array]" !== Object.prototype.toString.apply(s2[i2]) || this.addResource(e3, t3, i2, s2[i2], { silent: true });
    n2.silent || this.emit("added", e3, t3, s2);
  } }, { key: "addResourceBundle", value: function(e3, t3, s2, n2, i2) {
    var r2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : { silent: false }, a2 = [e3, t3];
    e3.indexOf(".") > -1 && (n2 = s2, s2 = t3, t3 = (a2 = e3.split("."))[1]), this.addNamespaces(t3);
    var o2 = Ge(this.data, a2) || {};
    n2 ? we(o2, s2, i2) : o2 = qe(qe({}, o2), s2), xe(this.data, a2, o2), r2.silent || this.emit("added", e3, t3, s2);
  } }, { key: "removeResourceBundle", value: function(e3, t3) {
    this.hasResourceBundle(e3, t3) && delete this.data[e3][t3], this.removeNamespaces(t3), this.emit("removed", e3, t3);
  } }, { key: "hasResourceBundle", value: function(e3, t3) {
    return void 0 !== this.getResource(e3, t3);
  } }, { key: "getResourceBundle", value: function(e3, t3) {
    return t3 || (t3 = this.options.defaultNS), "v1" === this.options.compatibilityAPI ? qe(qe({}, {}), this.getResource(e3, t3)) : this.getResource(e3, t3);
  } }, { key: "getDataByLanguage", value: function(e3) {
    return this.data[e3];
  } }, { key: "hasLanguageSomeTranslations", value: function(e3) {
    var t3 = this.getDataByLanguage(e3);
    return !!(t3 && Object.keys(t3) || []).find(function(e4) {
      return t3[e4] && Object.keys(t3[e4]).length > 0;
    });
  } }, { key: "toJSON", value: function() {
    return this.data;
  } }]), t2;
}();
var We = { processors: {}, addPostProcessor: function(e2) {
  this.processors[e2.name] = e2;
}, handle: function(e2, t2, s2, n2, i2) {
  var r2 = this;
  return e2.forEach(function(e3) {
    r2.processors[e3] && (t2 = r2.processors[e3].process(t2, s2, n2, i2));
  }), t2;
} };
function Xe(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function Ze(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Xe(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : Xe(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
function Qe(e2) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e3) {
      return false;
    }
  }();
  return function() {
    var s2, n2 = Ce(e2);
    if (t2) {
      var i2 = Ce(this).constructor;
      s2 = Reflect.construct(n2, arguments, i2);
    } else
      s2 = n2.apply(this, arguments);
    return Ue(this, s2);
  };
}
var et = {};
var tt = function() {
  be(t2, Ae);
  var e2 = Qe(t2);
  function t2(s2) {
    var n2, i2, r2, a2, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return ve(this, t2), n2 = e2.call(this), He && Ae.call(Se(n2)), i2 = ["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], r2 = s2, a2 = Se(n2), i2.forEach(function(e3) {
      r2[e3] && (a2[e3] = r2[e3]);
    }), n2.options = o2, void 0 === n2.options.keySeparator && (n2.options.keySeparator = "."), n2.logger = Le.create("translator"), n2;
  }
  return Ie(t2, [{ key: "changeLanguage", value: function(e3) {
    e3 && (this.language = e3);
  } }, { key: "exists", value: function(e3) {
    var t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { interpolation: {} };
    if (null == e3)
      return false;
    var s2 = this.resolve(e3, t3);
    return s2 && void 0 !== s2.res;
  } }, { key: "extractFromKey", value: function(e3, t3) {
    var s2 = void 0 !== t3.nsSeparator ? t3.nsSeparator : this.options.nsSeparator;
    void 0 === s2 && (s2 = ":");
    var n2 = void 0 !== t3.keySeparator ? t3.keySeparator : this.options.keySeparator, i2 = t3.ns || this.options.defaultNS || [], r2 = s2 && e3.indexOf(s2) > -1, a2 = !(this.options.userDefinedKeySeparator || t3.keySeparator || this.options.userDefinedNsSeparator || t3.nsSeparator || function(e4, t4, s3) {
      t4 = t4 || "", s3 = s3 || "";
      var n3 = Ye.filter(function(e5) {
        return t4.indexOf(e5) < 0 && s3.indexOf(e5) < 0;
      });
      if (0 === n3.length)
        return true;
      var i3 = new RegExp("(".concat(n3.map(function(e5) {
        return "?" === e5 ? "\\?" : e5;
      }).join("|"), ")")), r3 = !i3.test(e4);
      if (!r3) {
        var a3 = e4.indexOf(s3);
        a3 > 0 && !i3.test(e4.substring(0, a3)) && (r3 = true);
      }
      return r3;
    }(e3, s2, n2));
    if (r2 && !a2) {
      var o2 = e3.match(this.interpolator.nestingRegexp);
      if (o2 && o2.length > 0)
        return { key: e3, namespaces: i2 };
      var u2 = e3.split(s2);
      (s2 !== n2 || s2 === n2 && this.options.ns.indexOf(u2[0]) > -1) && (i2 = u2.shift()), e3 = u2.join(n2);
    }
    return "string" == typeof i2 && (i2 = [i2]), { key: e3, namespaces: i2 };
  } }, { key: "translate", value: function(e3, s2, n2) {
    var i2 = this;
    if ("object" !== me(s2) && this.options.overloadTranslationOptionHandler && (s2 = this.options.overloadTranslationOptionHandler(arguments)), "object" === me(s2) && (s2 = Ze({}, s2)), s2 || (s2 = {}), null == e3)
      return "";
    Array.isArray(e3) || (e3 = [String(e3)]);
    var r2 = void 0 !== s2.returnDetails ? s2.returnDetails : this.options.returnDetails, a2 = void 0 !== s2.keySeparator ? s2.keySeparator : this.options.keySeparator, o2 = this.extractFromKey(e3[e3.length - 1], s2), u2 = o2.key, c2 = o2.namespaces, g2 = c2[c2.length - 1], l2 = s2.lng || this.language, h2 = s2.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (l2 && "cimode" === l2.toLowerCase()) {
      if (h2) {
        var p2 = s2.nsSeparator || this.options.nsSeparator;
        return r2 ? { res: "".concat(g2).concat(p2).concat(u2), usedKey: u2, exactUsedKey: u2, usedLng: l2, usedNS: g2 } : "".concat(g2).concat(p2).concat(u2);
      }
      return r2 ? { res: u2, usedKey: u2, exactUsedKey: u2, usedLng: l2, usedNS: g2 } : u2;
    }
    var d2 = this.resolve(e3, s2), f2 = d2 && d2.res, m2 = d2 && d2.usedKey || u2, v2 = d2 && d2.exactUsedKey || u2, T2 = Object.prototype.toString.apply(f2), E2 = void 0 !== s2.joinArrays ? s2.joinArrays : this.options.joinArrays, I2 = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (I2 && f2 && ("string" != typeof f2 && "boolean" != typeof f2 && "number" != typeof f2) && ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(T2) < 0 && ("string" != typeof E2 || "[object Array]" !== T2)) {
      if (!s2.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        var S2 = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(m2, f2, Ze(Ze({}, s2), {}, { ns: c2 })) : "key '".concat(u2, " (").concat(this.language, ")' returned an object instead of string.");
        return r2 ? (d2.res = S2, d2) : S2;
      }
      if (a2) {
        var y2 = "[object Array]" === T2, b2 = y2 ? [] : {}, U2 = y2 ? v2 : m2;
        for (var C2 in f2)
          if (Object.prototype.hasOwnProperty.call(f2, C2)) {
            var M2 = "".concat(U2).concat(a2).concat(C2);
            b2[C2] = this.translate(M2, Ze(Ze({}, s2), { joinArrays: false, ns: c2 })), b2[C2] === M2 && (b2[C2] = f2[C2]);
          }
        f2 = b2;
      }
    } else if (I2 && "string" == typeof E2 && "[object Array]" === T2)
      (f2 = f2.join(E2)) && (f2 = this.extendTranslation(f2, e3, s2, n2));
    else {
      var O2 = false, _2 = false, D2 = void 0 !== s2.count && "string" != typeof s2.count, P2 = t2.hasDefaultValue(s2), R2 = D2 ? this.pluralResolver.getSuffix(l2, s2.count, s2) : "", L2 = s2["defaultValue".concat(R2)] || s2.defaultValue;
      !this.isValidLookup(f2) && P2 && (O2 = true, f2 = L2), this.isValidLookup(f2) || (_2 = true, f2 = u2);
      var A2 = (s2.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && _2 ? void 0 : f2, j2 = P2 && L2 !== f2 && this.options.updateMissing;
      if (_2 || O2 || j2) {
        if (this.logger.log(j2 ? "updateKey" : "missingKey", l2, g2, u2, j2 ? L2 : f2), a2) {
          var k2 = this.resolve(u2, Ze(Ze({}, s2), {}, { keySeparator: false }));
          k2 && k2.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        var N2 = [], x2 = this.languageUtils.getFallbackCodes(this.options.fallbackLng, s2.lng || this.language);
        if ("fallback" === this.options.saveMissingTo && x2 && x2[0])
          for (var G2 = 0; G2 < x2.length; G2++)
            N2.push(x2[G2]);
        else
          "all" === this.options.saveMissingTo ? N2 = this.languageUtils.toResolveHierarchy(s2.lng || this.language) : N2.push(s2.lng || this.language);
        var w2 = function(e4, t3, n3) {
          var r3 = P2 && n3 !== f2 ? n3 : A2;
          i2.options.missingKeyHandler ? i2.options.missingKeyHandler(e4, g2, t3, r3, j2, s2) : i2.backendConnector && i2.backendConnector.saveMissing && i2.backendConnector.saveMissing(e4, g2, t3, r3, j2, s2), i2.emit("missingKey", e4, g2, t3, f2);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && D2 ? N2.forEach(function(e4) {
          i2.pluralResolver.getSuffixes(e4, s2).forEach(function(t3) {
            w2([e4], u2 + t3, s2["defaultValue".concat(t3)] || L2);
          });
        }) : w2(N2, u2, L2));
      }
      f2 = this.extendTranslation(f2, e3, s2, d2, n2), _2 && f2 === u2 && this.options.appendNamespaceToMissingKey && (f2 = "".concat(g2, ":").concat(u2)), (_2 || O2) && this.options.parseMissingKeyHandler && (f2 = "v1" !== this.options.compatibilityAPI ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(g2, ":").concat(u2) : u2, O2 ? f2 : void 0) : this.options.parseMissingKeyHandler(f2));
    }
    return r2 ? (d2.res = f2, d2) : f2;
  } }, { key: "extendTranslation", value: function(e3, t3, s2, n2, i2) {
    var r2 = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      e3 = this.i18nFormat.parse(e3, Ze(Ze({}, this.options.interpolation.defaultVariables), s2), n2.usedLng, n2.usedNS, n2.usedKey, { resolved: n2 });
    else if (!s2.skipInterpolation) {
      s2.interpolation && this.interpolator.init(Ze(Ze({}, s2), { interpolation: Ze(Ze({}, this.options.interpolation), s2.interpolation) }));
      var a2, o2 = "string" == typeof e3 && (s2 && s2.interpolation && void 0 !== s2.interpolation.skipOnVariables ? s2.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      if (o2) {
        var u2 = e3.match(this.interpolator.nestingRegexp);
        a2 = u2 && u2.length;
      }
      var c2 = s2.replace && "string" != typeof s2.replace ? s2.replace : s2;
      if (this.options.interpolation.defaultVariables && (c2 = Ze(Ze({}, this.options.interpolation.defaultVariables), c2)), e3 = this.interpolator.interpolate(e3, c2, s2.lng || this.language, s2), o2) {
        var g2 = e3.match(this.interpolator.nestingRegexp);
        a2 < (g2 && g2.length) && (s2.nest = false);
      }
      !s2.lng && "v1" !== this.options.compatibilityAPI && n2 && n2.res && (s2.lng = n2.usedLng), false !== s2.nest && (e3 = this.interpolator.nest(e3, function() {
        for (var e4 = arguments.length, n3 = new Array(e4), a3 = 0; a3 < e4; a3++)
          n3[a3] = arguments[a3];
        return i2 && i2[0] === n3[0] && !s2.context ? (r2.logger.warn("It seems you are nesting recursively key: ".concat(n3[0], " in key: ").concat(t3[0])), null) : r2.translate.apply(r2, n3.concat([t3]));
      }, s2)), s2.interpolation && this.interpolator.reset();
    }
    var l2 = s2.postProcess || this.options.postProcess, h2 = "string" == typeof l2 ? [l2] : l2;
    return null != e3 && h2 && h2.length && false !== s2.applyPostProcessor && (e3 = We.handle(h2, e3, t3, this.options && this.options.postProcessPassResolved ? Ze({ i18nResolved: n2 }, s2) : s2, this)), e3;
  } }, { key: "resolve", value: function(e3) {
    var t3, s2, n2, i2, r2, a2 = this, o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return "string" == typeof e3 && (e3 = [e3]), e3.forEach(function(e4) {
      if (!a2.isValidLookup(t3)) {
        var u2 = a2.extractFromKey(e4, o2), c2 = u2.key;
        s2 = c2;
        var g2 = u2.namespaces;
        a2.options.fallbackNS && (g2 = g2.concat(a2.options.fallbackNS));
        var l2 = void 0 !== o2.count && "string" != typeof o2.count, h2 = l2 && !o2.ordinal && 0 === o2.count && a2.pluralResolver.shouldUseIntlApi(), p2 = void 0 !== o2.context && ("string" == typeof o2.context || "number" == typeof o2.context) && "" !== o2.context, d2 = o2.lngs ? o2.lngs : a2.languageUtils.toResolveHierarchy(o2.lng || a2.language, o2.fallbackLng);
        g2.forEach(function(e5) {
          a2.isValidLookup(t3) || (r2 = e5, !et["".concat(d2[0], "-").concat(e5)] && a2.utils && a2.utils.hasLoadedNamespace && !a2.utils.hasLoadedNamespace(r2) && (et["".concat(d2[0], "-").concat(e5)] = true, a2.logger.warn('key "'.concat(s2, '" for languages "').concat(d2.join(", "), `" won't get resolved as namespace "`).concat(r2, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), d2.forEach(function(s3) {
            if (!a2.isValidLookup(t3)) {
              i2 = s3;
              var r3, u3 = [c2];
              if (a2.i18nFormat && a2.i18nFormat.addLookupKeys)
                a2.i18nFormat.addLookupKeys(u3, c2, s3, e5, o2);
              else {
                var g3;
                l2 && (g3 = a2.pluralResolver.getSuffix(s3, o2.count, o2));
                var d3 = "".concat(a2.options.pluralSeparator, "zero");
                if (l2 && (u3.push(c2 + g3), h2 && u3.push(c2 + d3)), p2) {
                  var f2 = "".concat(c2).concat(a2.options.contextSeparator).concat(o2.context);
                  u3.push(f2), l2 && (u3.push(f2 + g3), h2 && u3.push(f2 + d3));
                }
              }
              for (; r3 = u3.pop(); )
                a2.isValidLookup(t3) || (n2 = r3, t3 = a2.getResource(s3, e5, r3, o2));
            }
          }));
        });
      }
    }), { res: t3, usedKey: s2, exactUsedKey: n2, usedLng: i2, usedNS: r2 };
  } }, { key: "isValidLookup", value: function(e3) {
    return !(void 0 === e3 || !this.options.returnNull && null === e3 || !this.options.returnEmptyString && "" === e3);
  } }, { key: "getResource", value: function(e3, t3, s2) {
    var n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e3, t3, s2, n2) : this.resourceStore.getResource(e3, t3, s2, n2);
  } }], [{ key: "hasDefaultValue", value: function(e3) {
    var t3 = "defaultValue";
    for (var s2 in e3)
      if (Object.prototype.hasOwnProperty.call(e3, s2) && t3 === s2.substring(0, 12) && void 0 !== e3[s2])
        return true;
    return false;
  } }]), t2;
}();
function st(e2) {
  return e2.charAt(0).toUpperCase() + e2.slice(1);
}
var nt = function() {
  function e2(t2) {
    ve(this, e2), this.options = t2, this.supportedLngs = this.options.supportedLngs || false, this.logger = Le.create("languageUtils");
  }
  return Ie(e2, [{ key: "getScriptPartFromCode", value: function(e3) {
    if (!e3 || e3.indexOf("-") < 0)
      return null;
    var t2 = e3.split("-");
    return 2 === t2.length ? null : (t2.pop(), "x" === t2[t2.length - 1].toLowerCase() ? null : this.formatLanguageCode(t2.join("-")));
  } }, { key: "getLanguagePartFromCode", value: function(e3) {
    if (!e3 || e3.indexOf("-") < 0)
      return e3;
    var t2 = e3.split("-");
    return this.formatLanguageCode(t2[0]);
  } }, { key: "formatLanguageCode", value: function(e3) {
    if ("string" == typeof e3 && e3.indexOf("-") > -1) {
      var t2 = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"], s2 = e3.split("-");
      return this.options.lowerCaseLng ? s2 = s2.map(function(e4) {
        return e4.toLowerCase();
      }) : 2 === s2.length ? (s2[0] = s2[0].toLowerCase(), s2[1] = s2[1].toUpperCase(), t2.indexOf(s2[1].toLowerCase()) > -1 && (s2[1] = st(s2[1].toLowerCase()))) : 3 === s2.length && (s2[0] = s2[0].toLowerCase(), 2 === s2[1].length && (s2[1] = s2[1].toUpperCase()), "sgn" !== s2[0] && 2 === s2[2].length && (s2[2] = s2[2].toUpperCase()), t2.indexOf(s2[1].toLowerCase()) > -1 && (s2[1] = st(s2[1].toLowerCase())), t2.indexOf(s2[2].toLowerCase()) > -1 && (s2[2] = st(s2[2].toLowerCase()))), s2.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e3.toLowerCase() : e3;
  } }, { key: "isSupportedCode", value: function(e3) {
    return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e3 = this.getLanguagePartFromCode(e3)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e3) > -1;
  } }, { key: "getBestMatchFromCodes", value: function(e3) {
    var t2, s2 = this;
    return e3 ? (e3.forEach(function(e4) {
      if (!t2) {
        var n2 = s2.formatLanguageCode(e4);
        s2.options.supportedLngs && !s2.isSupportedCode(n2) || (t2 = n2);
      }
    }), !t2 && this.options.supportedLngs && e3.forEach(function(e4) {
      if (!t2) {
        var n2 = s2.getLanguagePartFromCode(e4);
        if (s2.isSupportedCode(n2))
          return t2 = n2;
        t2 = s2.options.supportedLngs.find(function(e5) {
          return e5 === n2 ? e5 : e5.indexOf("-") < 0 && n2.indexOf("-") < 0 ? void 0 : 0 === e5.indexOf(n2) ? e5 : void 0;
        });
      }
    }), t2 || (t2 = this.getFallbackCodes(this.options.fallbackLng)[0]), t2) : null;
  } }, { key: "getFallbackCodes", value: function(e3, t2) {
    if (!e3)
      return [];
    if ("function" == typeof e3 && (e3 = e3(t2)), "string" == typeof e3 && (e3 = [e3]), "[object Array]" === Object.prototype.toString.apply(e3))
      return e3;
    if (!t2)
      return e3.default || [];
    var s2 = e3[t2];
    return s2 || (s2 = e3[this.getScriptPartFromCode(t2)]), s2 || (s2 = e3[this.formatLanguageCode(t2)]), s2 || (s2 = e3[this.getLanguagePartFromCode(t2)]), s2 || (s2 = e3.default), s2 || [];
  } }, { key: "toResolveHierarchy", value: function(e3, t2) {
    var s2 = this, n2 = this.getFallbackCodes(t2 || this.options.fallbackLng || [], e3), i2 = [], r2 = function(e4) {
      e4 && (s2.isSupportedCode(e4) ? i2.push(e4) : s2.logger.warn("rejecting language code not found in supportedLngs: ".concat(e4)));
    };
    return "string" == typeof e3 && e3.indexOf("-") > -1 ? ("languageOnly" !== this.options.load && r2(this.formatLanguageCode(e3)), "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && r2(this.getScriptPartFromCode(e3)), "currentOnly" !== this.options.load && r2(this.getLanguagePartFromCode(e3))) : "string" == typeof e3 && r2(this.formatLanguageCode(e3)), n2.forEach(function(e4) {
      i2.indexOf(e4) < 0 && r2(s2.formatLanguageCode(e4));
    }), i2;
  } }]), e2;
}();
var it = [{ lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"], nr: [1, 2], fc: 1 }, { lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"], nr: [1, 2], fc: 2 }, { lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"], nr: [1], fc: 3 }, { lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"], nr: [1, 2, 5], fc: 4 }, { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 }, { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 }, { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ["fr"], nr: [1, 2], fc: 9 }, { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ["is"], nr: [1, 2], fc: 12 }, { lngs: ["jv"], nr: [0, 1], fc: 13 }, { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ["lt"], nr: [1, 2, 10], fc: 15 }, { lngs: ["lv"], nr: [1, 2, 0], fc: 16 }, { lngs: ["mk"], nr: [1, 2], fc: 17 }, { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 }, { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ["or"], nr: [2, 1], fc: 2 }, { lngs: ["ro"], nr: [1, 2, 20], fc: 20 }, { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 }, { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 }];
var rt = { 1: function(e2) {
  return Number(e2 > 1);
}, 2: function(e2) {
  return Number(1 != e2);
}, 3: function(e2) {
  return 0;
}, 4: function(e2) {
  return Number(e2 % 10 == 1 && e2 % 100 != 11 ? 0 : e2 % 10 >= 2 && e2 % 10 <= 4 && (e2 % 100 < 10 || e2 % 100 >= 20) ? 1 : 2);
}, 5: function(e2) {
  return Number(0 == e2 ? 0 : 1 == e2 ? 1 : 2 == e2 ? 2 : e2 % 100 >= 3 && e2 % 100 <= 10 ? 3 : e2 % 100 >= 11 ? 4 : 5);
}, 6: function(e2) {
  return Number(1 == e2 ? 0 : e2 >= 2 && e2 <= 4 ? 1 : 2);
}, 7: function(e2) {
  return Number(1 == e2 ? 0 : e2 % 10 >= 2 && e2 % 10 <= 4 && (e2 % 100 < 10 || e2 % 100 >= 20) ? 1 : 2);
}, 8: function(e2) {
  return Number(1 == e2 ? 0 : 2 == e2 ? 1 : 8 != e2 && 11 != e2 ? 2 : 3);
}, 9: function(e2) {
  return Number(e2 >= 2);
}, 10: function(e2) {
  return Number(1 == e2 ? 0 : 2 == e2 ? 1 : e2 < 7 ? 2 : e2 < 11 ? 3 : 4);
}, 11: function(e2) {
  return Number(1 == e2 || 11 == e2 ? 0 : 2 == e2 || 12 == e2 ? 1 : e2 > 2 && e2 < 20 ? 2 : 3);
}, 12: function(e2) {
  return Number(e2 % 10 != 1 || e2 % 100 == 11);
}, 13: function(e2) {
  return Number(0 !== e2);
}, 14: function(e2) {
  return Number(1 == e2 ? 0 : 2 == e2 ? 1 : 3 == e2 ? 2 : 3);
}, 15: function(e2) {
  return Number(e2 % 10 == 1 && e2 % 100 != 11 ? 0 : e2 % 10 >= 2 && (e2 % 100 < 10 || e2 % 100 >= 20) ? 1 : 2);
}, 16: function(e2) {
  return Number(e2 % 10 == 1 && e2 % 100 != 11 ? 0 : 0 !== e2 ? 1 : 2);
}, 17: function(e2) {
  return Number(1 == e2 || e2 % 10 == 1 && e2 % 100 != 11 ? 0 : 1);
}, 18: function(e2) {
  return Number(0 == e2 ? 0 : 1 == e2 ? 1 : 2);
}, 19: function(e2) {
  return Number(1 == e2 ? 0 : 0 == e2 || e2 % 100 > 1 && e2 % 100 < 11 ? 1 : e2 % 100 > 10 && e2 % 100 < 20 ? 2 : 3);
}, 20: function(e2) {
  return Number(1 == e2 ? 0 : 0 == e2 || e2 % 100 > 0 && e2 % 100 < 20 ? 1 : 2);
}, 21: function(e2) {
  return Number(e2 % 100 == 1 ? 1 : e2 % 100 == 2 ? 2 : e2 % 100 == 3 || e2 % 100 == 4 ? 3 : 0);
}, 22: function(e2) {
  return Number(1 == e2 ? 0 : 2 == e2 ? 1 : (e2 < 0 || e2 > 10) && e2 % 10 == 0 ? 2 : 3);
} };
var at = ["v1", "v2", "v3"];
var ot = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 };
var ut = function() {
  function e2(t2) {
    var s2, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    ve(this, e2), this.languageUtils = t2, this.options = n2, this.logger = Le.create("pluralResolver"), this.options.compatibilityJSON && "v4" !== this.options.compatibilityJSON || "undefined" != typeof Intl && Intl.PluralRules || (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = (s2 = {}, it.forEach(function(e3) {
      e3.lngs.forEach(function(t3) {
        s2[t3] = { numbers: e3.nr, plurals: rt[e3.fc] };
      });
    }), s2);
  }
  return Ie(e2, [{ key: "addRule", value: function(e3, t2) {
    this.rules[e3] = t2;
  } }, { key: "getRule", value: function(e3) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(e3, { type: t2.ordinal ? "ordinal" : "cardinal" });
      } catch (e4) {
        return;
      }
    return this.rules[e3] || this.rules[this.languageUtils.getLanguagePartFromCode(e3)];
  } }, { key: "needsPlural", value: function(e3) {
    var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s2 = this.getRule(e3, t2);
    return this.shouldUseIntlApi() ? s2 && s2.resolvedOptions().pluralCategories.length > 1 : s2 && s2.numbers.length > 1;
  } }, { key: "getPluralFormsOfKey", value: function(e3, t2) {
    var s2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return this.getSuffixes(e3, s2).map(function(e4) {
      return "".concat(t2).concat(e4);
    });
  } }, { key: "getSuffixes", value: function(e3) {
    var t2 = this, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = this.getRule(e3, s2);
    return n2 ? this.shouldUseIntlApi() ? n2.resolvedOptions().pluralCategories.sort(function(e4, t3) {
      return ot[e4] - ot[t3];
    }).map(function(e4) {
      return "".concat(t2.options.prepend).concat(e4);
    }) : n2.numbers.map(function(n3) {
      return t2.getSuffix(e3, n3, s2);
    }) : [];
  } }, { key: "getSuffix", value: function(e3, t2) {
    var s2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n2 = this.getRule(e3, s2);
    return n2 ? this.shouldUseIntlApi() ? "".concat(this.options.prepend).concat(n2.select(t2)) : this.getSuffixRetroCompatible(n2, t2) : (this.logger.warn("no plural rule found for: ".concat(e3)), "");
  } }, { key: "getSuffixRetroCompatible", value: function(e3, t2) {
    var s2 = this, n2 = e3.noAbs ? e3.plurals(t2) : e3.plurals(Math.abs(t2)), i2 = e3.numbers[n2];
    this.options.simplifyPluralSuffix && 2 === e3.numbers.length && 1 === e3.numbers[0] && (2 === i2 ? i2 = "plural" : 1 === i2 && (i2 = ""));
    var r2 = function() {
      return s2.options.prepend && i2.toString() ? s2.options.prepend + i2.toString() : i2.toString();
    };
    return "v1" === this.options.compatibilityJSON ? 1 === i2 ? "" : "number" == typeof i2 ? "_plural_".concat(i2.toString()) : r2() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === e3.numbers.length && 1 === e3.numbers[0] ? r2() : this.options.prepend && n2.toString() ? this.options.prepend + n2.toString() : n2.toString();
  } }, { key: "shouldUseIntlApi", value: function() {
    return !at.includes(this.options.compatibilityJSON);
  } }]), e2;
}();
function ct(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function gt(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? ct(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : ct(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
function lt(e2, t2, s2) {
  var n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ".", i2 = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], r2 = function(e3, t3, s3) {
    var n3 = Ge(e3, s3);
    return void 0 !== n3 ? n3 : Ge(t3, s3);
  }(e2, t2, s2);
  return !r2 && i2 && "string" == typeof s2 && void 0 === (r2 = Be(e2, s2, n2)) && (r2 = Be(t2, s2, n2)), r2;
}
var ht = function() {
  function e2() {
    var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    ve(this, e2), this.logger = Le.create("interpolator"), this.options = t2, this.format = t2.interpolation && t2.interpolation.format || function(e3) {
      return e3;
    }, this.init(t2);
  }
  return Ie(e2, [{ key: "init", value: function() {
    var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    e3.interpolation || (e3.interpolation = { escapeValue: true });
    var t2 = e3.interpolation;
    this.escape = void 0 !== t2.escape ? t2.escape : $e, this.escapeValue = void 0 === t2.escapeValue || t2.escapeValue, this.useRawValueToEscape = void 0 !== t2.useRawValueToEscape && t2.useRawValueToEscape, this.prefix = t2.prefix ? Ve(t2.prefix) : t2.prefixEscaped || "{{", this.suffix = t2.suffix ? Ve(t2.suffix) : t2.suffixEscaped || "}}", this.formatSeparator = t2.formatSeparator ? t2.formatSeparator : t2.formatSeparator || ",", this.unescapePrefix = t2.unescapeSuffix ? "" : t2.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t2.unescapeSuffix || "", this.nestingPrefix = t2.nestingPrefix ? Ve(t2.nestingPrefix) : t2.nestingPrefixEscaped || Ve("$t("), this.nestingSuffix = t2.nestingSuffix ? Ve(t2.nestingSuffix) : t2.nestingSuffixEscaped || Ve(")"), this.nestingOptionsSeparator = t2.nestingOptionsSeparator ? t2.nestingOptionsSeparator : t2.nestingOptionsSeparator || ",", this.maxReplaces = t2.maxReplaces ? t2.maxReplaces : 1e3, this.alwaysFormat = void 0 !== t2.alwaysFormat && t2.alwaysFormat, this.resetRegExp();
  } }, { key: "reset", value: function() {
    this.options && this.init(this.options);
  } }, { key: "resetRegExp", value: function() {
    var e3 = "".concat(this.prefix, "(.+?)").concat(this.suffix);
    this.regexp = new RegExp(e3, "g");
    var t2 = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
    this.regexpUnescape = new RegExp(t2, "g");
    var s2 = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
    this.nestingRegexp = new RegExp(s2, "g");
  } }, { key: "interpolate", value: function(e3, t2, s2, n2) {
    var i2, r2, a2, o2 = this, u2 = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function c2(e4) {
      return e4.replace(/\$/g, "$$$$");
    }
    var g2 = function(e4) {
      if (e4.indexOf(o2.formatSeparator) < 0) {
        var i3 = lt(t2, u2, e4, o2.options.keySeparator, o2.options.ignoreJSONStructure);
        return o2.alwaysFormat ? o2.format(i3, void 0, s2, gt(gt(gt({}, n2), t2), {}, { interpolationkey: e4 })) : i3;
      }
      var r3 = e4.split(o2.formatSeparator), a3 = r3.shift().trim(), c3 = r3.join(o2.formatSeparator).trim();
      return o2.format(lt(t2, u2, a3, o2.options.keySeparator, o2.options.ignoreJSONStructure), c3, s2, gt(gt(gt({}, n2), t2), {}, { interpolationkey: a3 }));
    };
    this.resetRegExp();
    var l2 = n2 && n2.missingInterpolationHandler || this.options.missingInterpolationHandler, h2 = n2 && n2.interpolation && void 0 !== n2.interpolation.skipOnVariables ? n2.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{ regex: this.regexpUnescape, safeValue: function(e4) {
      return c2(e4);
    } }, { regex: this.regexp, safeValue: function(e4) {
      return o2.escapeValue ? c2(o2.escape(e4)) : c2(e4);
    } }].forEach(function(t3) {
      for (a2 = 0; i2 = t3.regex.exec(e3); ) {
        var s3 = i2[1].trim();
        if (void 0 === (r2 = g2(s3)))
          if ("function" == typeof l2) {
            var u3 = l2(e3, i2, n2);
            r2 = "string" == typeof u3 ? u3 : "";
          } else if (n2 && Object.prototype.hasOwnProperty.call(n2, s3))
            r2 = "";
          else {
            if (h2) {
              r2 = i2[0];
              continue;
            }
            o2.logger.warn("missed to pass in variable ".concat(s3, " for interpolating ").concat(e3)), r2 = "";
          }
        else
          "string" == typeof r2 || o2.useRawValueToEscape || (r2 = ke(r2));
        var c3 = t3.safeValue(r2);
        if (e3 = e3.replace(i2[0], c3), h2 ? (t3.regex.lastIndex += r2.length, t3.regex.lastIndex -= i2[0].length) : t3.regex.lastIndex = 0, ++a2 >= o2.maxReplaces)
          break;
      }
    }), e3;
  } }, { key: "nest", value: function(e3, t2) {
    var s2, n2, i2, r2 = this, a2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    function o2(e4, t3) {
      var s3 = this.nestingOptionsSeparator;
      if (e4.indexOf(s3) < 0)
        return e4;
      var n3 = e4.split(new RegExp("".concat(s3, "[ ]*{"))), r3 = "{".concat(n3[1]);
      e4 = n3[0];
      var a3 = (r3 = this.interpolate(r3, i2)).match(/'/g), o3 = r3.match(/"/g);
      (a3 && a3.length % 2 == 0 && !o3 || o3.length % 2 != 0) && (r3 = r3.replace(/'/g, '"'));
      try {
        i2 = JSON.parse(r3), t3 && (i2 = gt(gt({}, t3), i2));
      } catch (t4) {
        return this.logger.warn("failed parsing options string in nesting for key ".concat(e4), t4), "".concat(e4).concat(s3).concat(r3);
      }
      return delete i2.defaultValue, e4;
    }
    for (; s2 = this.nestingRegexp.exec(e3); ) {
      var u2 = [];
      (i2 = (i2 = gt({}, a2)).replace && "string" != typeof i2.replace ? i2.replace : i2).applyPostProcessor = false, delete i2.defaultValue;
      var c2 = false;
      if (-1 !== s2[0].indexOf(this.formatSeparator) && !/{.*}/.test(s2[1])) {
        var g2 = s2[1].split(this.formatSeparator).map(function(e4) {
          return e4.trim();
        });
        s2[1] = g2.shift(), u2 = g2, c2 = true;
      }
      if ((n2 = t2(o2.call(this, s2[1].trim(), i2), i2)) && s2[0] === e3 && "string" != typeof n2)
        return n2;
      "string" != typeof n2 && (n2 = ke(n2)), n2 || (this.logger.warn("missed to resolve ".concat(s2[1], " for nesting ").concat(e3)), n2 = ""), c2 && (n2 = u2.reduce(function(e4, t3) {
        return r2.format(e4, t3, a2.lng, gt(gt({}, a2), {}, { interpolationkey: s2[1].trim() }));
      }, n2.trim())), e3 = e3.replace(s2[0], n2), this.regexp.lastIndex = 0;
    }
    return e3;
  } }]), e2;
}();
function pt(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function dt(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? pt(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : pt(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
function ft(e2) {
  var t2 = {};
  return function(s2, n2, i2) {
    var r2 = n2 + JSON.stringify(i2), a2 = t2[r2];
    return a2 || (a2 = e2(n2, i2), t2[r2] = a2), a2(s2);
  };
}
var mt = function() {
  function e2() {
    var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    ve(this, e2), this.logger = Le.create("formatter"), this.options = t2, this.formats = { number: ft(function(e3, t3) {
      var s2 = new Intl.NumberFormat(e3, dt({}, t3));
      return function(e4) {
        return s2.format(e4);
      };
    }), currency: ft(function(e3, t3) {
      var s2 = new Intl.NumberFormat(e3, dt(dt({}, t3), {}, { style: "currency" }));
      return function(e4) {
        return s2.format(e4);
      };
    }), datetime: ft(function(e3, t3) {
      var s2 = new Intl.DateTimeFormat(e3, dt({}, t3));
      return function(e4) {
        return s2.format(e4);
      };
    }), relativetime: ft(function(e3, t3) {
      var s2 = new Intl.RelativeTimeFormat(e3, dt({}, t3));
      return function(e4) {
        return s2.format(e4, t3.range || "day");
      };
    }), list: ft(function(e3, t3) {
      var s2 = new Intl.ListFormat(e3, dt({}, t3));
      return function(e4) {
        return s2.format(e4);
      };
    }) }, this.init(t2);
  }
  return Ie(e2, [{ key: "init", value: function(e3) {
    var t2 = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { interpolation: {} }).interpolation;
    this.formatSeparator = t2.formatSeparator ? t2.formatSeparator : t2.formatSeparator || ",";
  } }, { key: "add", value: function(e3, t2) {
    this.formats[e3.toLowerCase().trim()] = t2;
  } }, { key: "addCached", value: function(e3, t2) {
    this.formats[e3.toLowerCase().trim()] = ft(t2);
  } }, { key: "format", value: function(e3, t2, s2) {
    var n2 = this, i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    return t2.split(this.formatSeparator).reduce(function(e4, t3) {
      var r2 = function(e5) {
        var t4 = e5.toLowerCase().trim(), s3 = {};
        if (e5.indexOf("(") > -1) {
          var n3 = e5.split("(");
          t4 = n3[0].toLowerCase().trim();
          var i3 = n3[1].substring(0, n3[1].length - 1);
          "currency" === t4 && i3.indexOf(":") < 0 ? s3.currency || (s3.currency = i3.trim()) : "relativetime" === t4 && i3.indexOf(":") < 0 ? s3.range || (s3.range = i3.trim()) : i3.split(";").forEach(function(e6) {
            if (e6) {
              var t5 = _e(e6.split(":")), n4 = t5[0], i4 = t5.slice(1).join(":").trim().replace(/^'+|'+$/g, "");
              s3[n4.trim()] || (s3[n4.trim()] = i4), "false" === i4 && (s3[n4.trim()] = false), "true" === i4 && (s3[n4.trim()] = true), isNaN(i4) || (s3[n4.trim()] = parseInt(i4, 10));
            }
          });
        }
        return { formatName: t4, formatOptions: s3 };
      }(t3), a2 = r2.formatName, o2 = r2.formatOptions;
      if (n2.formats[a2]) {
        var u2 = e4;
        try {
          var c2 = i2 && i2.formatParams && i2.formatParams[i2.interpolationkey] || {}, g2 = c2.locale || c2.lng || i2.locale || i2.lng || s2;
          u2 = n2.formats[a2](e4, g2, dt(dt(dt({}, o2), i2), c2));
        } catch (e5) {
          n2.logger.warn(e5);
        }
        return u2;
      }
      return n2.logger.warn("there was no format function for ".concat(a2)), e4;
    }, e3);
  } }]), e2;
}();
function vt(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function Tt(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? vt(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : vt(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
function Et(e2) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e3) {
      return false;
    }
  }();
  return function() {
    var s2, n2 = Ce(e2);
    if (t2) {
      var i2 = Ce(this).constructor;
      s2 = Reflect.construct(n2, arguments, i2);
    } else
      s2 = n2.apply(this, arguments);
    return Ue(this, s2);
  };
}
var It = function() {
  be(t2, Ae);
  var e2 = Et(t2);
  function t2(s2, n2, i2) {
    var r2, a2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    return ve(this, t2), r2 = e2.call(this), He && Ae.call(Se(r2)), r2.backend = s2, r2.store = n2, r2.services = i2, r2.languageUtils = i2.languageUtils, r2.options = a2, r2.logger = Le.create("backendConnector"), r2.waitingReads = [], r2.maxParallelReads = a2.maxParallelReads || 10, r2.readingCalls = 0, r2.maxRetries = a2.maxRetries >= 0 ? a2.maxRetries : 5, r2.retryTimeout = a2.retryTimeout >= 1 ? a2.retryTimeout : 350, r2.state = {}, r2.queue = [], r2.backend && r2.backend.init && r2.backend.init(i2, a2.backend, a2), r2;
  }
  return Ie(t2, [{ key: "queueLoad", value: function(e3, t3, s2, n2) {
    var i2 = this, r2 = {}, a2 = {}, o2 = {}, u2 = {};
    return e3.forEach(function(e4) {
      var n3 = true;
      t3.forEach(function(t4) {
        var o3 = "".concat(e4, "|").concat(t4);
        !s2.reload && i2.store.hasResourceBundle(e4, t4) ? i2.state[o3] = 2 : i2.state[o3] < 0 || (1 === i2.state[o3] ? void 0 === a2[o3] && (a2[o3] = true) : (i2.state[o3] = 1, n3 = false, void 0 === a2[o3] && (a2[o3] = true), void 0 === r2[o3] && (r2[o3] = true), void 0 === u2[t4] && (u2[t4] = true)));
      }), n3 || (o2[e4] = true);
    }), (Object.keys(r2).length || Object.keys(a2).length) && this.queue.push({ pending: a2, pendingCount: Object.keys(a2).length, loaded: {}, errors: [], callback: n2 }), { toLoad: Object.keys(r2), pending: Object.keys(a2), toLoadLanguages: Object.keys(o2), toLoadNamespaces: Object.keys(u2) };
  } }, { key: "loaded", value: function(e3, t3, s2) {
    var n2 = e3.split("|"), i2 = n2[0], r2 = n2[1];
    t3 && this.emit("failedLoading", i2, r2, t3), s2 && this.store.addResourceBundle(i2, r2, s2), this.state[e3] = t3 ? -1 : 2;
    var a2 = {};
    this.queue.forEach(function(s3) {
      var n3, o2, u2, c2, g2, l2;
      n3 = s3.loaded, o2 = r2, c2 = Ne(n3, [i2], Object), g2 = c2.obj, l2 = c2.k, g2[l2] = g2[l2] || [], u2 && (g2[l2] = g2[l2].concat(o2)), u2 || g2[l2].push(o2), function(e4, t4) {
        void 0 !== e4.pending[t4] && (delete e4.pending[t4], e4.pendingCount--);
      }(s3, e3), t3 && s3.errors.push(t3), 0 !== s3.pendingCount || s3.done || (Object.keys(s3.loaded).forEach(function(e4) {
        a2[e4] || (a2[e4] = {});
        var t4 = s3.loaded[e4];
        t4.length && t4.forEach(function(t5) {
          void 0 === a2[e4][t5] && (a2[e4][t5] = true);
        });
      }), s3.done = true, s3.errors.length ? s3.callback(s3.errors) : s3.callback());
    }), this.emit("loaded", a2), this.queue = this.queue.filter(function(e4) {
      return !e4.done;
    });
  } }, { key: "read", value: function(e3, t3, s2) {
    var n2 = this, i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, r2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout, a2 = arguments.length > 5 ? arguments[5] : void 0;
    if (!e3.length)
      return a2(null, {});
    if (this.readingCalls >= this.maxParallelReads)
      this.waitingReads.push({ lng: e3, ns: t3, fcName: s2, tried: i2, wait: r2, callback: a2 });
    else {
      this.readingCalls++;
      var o2 = function(o3, u3) {
        if (n2.readingCalls--, n2.waitingReads.length > 0) {
          var c3 = n2.waitingReads.shift();
          n2.read(c3.lng, c3.ns, c3.fcName, c3.tried, c3.wait, c3.callback);
        }
        o3 && u3 && i2 < n2.maxRetries ? setTimeout(function() {
          n2.read.call(n2, e3, t3, s2, i2 + 1, 2 * r2, a2);
        }, r2) : a2(o3, u3);
      }, u2 = this.backend[s2].bind(this.backend);
      if (2 !== u2.length)
        return u2(e3, t3, o2);
      try {
        var c2 = u2(e3, t3);
        c2 && "function" == typeof c2.then ? c2.then(function(e4) {
          return o2(null, e4);
        }).catch(o2) : o2(null, c2);
      } catch (e4) {
        o2(e4);
      }
    }
  } }, { key: "prepareLoading", value: function(e3, t3) {
    var s2 = this, n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i2 = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i2 && i2();
    "string" == typeof e3 && (e3 = this.languageUtils.toResolveHierarchy(e3)), "string" == typeof t3 && (t3 = [t3]);
    var r2 = this.queueLoad(e3, t3, n2, i2);
    if (!r2.toLoad.length)
      return r2.pending.length || i2(), null;
    r2.toLoad.forEach(function(e4) {
      s2.loadOne(e4);
    });
  } }, { key: "load", value: function(e3, t3, s2) {
    this.prepareLoading(e3, t3, {}, s2);
  } }, { key: "reload", value: function(e3, t3, s2) {
    this.prepareLoading(e3, t3, { reload: true }, s2);
  } }, { key: "loadOne", value: function(e3) {
    var t3 = this, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n2 = e3.split("|"), i2 = n2[0], r2 = n2[1];
    this.read(i2, r2, "read", void 0, void 0, function(n3, a2) {
      n3 && t3.logger.warn("".concat(s2, "loading namespace ").concat(r2, " for language ").concat(i2, " failed"), n3), !n3 && a2 && t3.logger.log("".concat(s2, "loaded namespace ").concat(r2, " for language ").concat(i2), a2), t3.loaded(e3, n3, a2);
    });
  } }, { key: "saveMissing", value: function(e3, t3, s2, n2, i2) {
    var r2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {}, a2 = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : function() {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t3))
      this.logger.warn('did not save key "'.concat(s2, '" as the namespace "').concat(t3, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
    else if (null != s2 && "" !== s2) {
      if (this.backend && this.backend.create) {
        var o2 = Tt(Tt({}, r2), {}, { isUpdate: i2 }), u2 = this.backend.create.bind(this.backend);
        if (u2.length < 6)
          try {
            var c2;
            (c2 = 5 === u2.length ? u2(e3, t3, s2, n2, o2) : u2(e3, t3, s2, n2)) && "function" == typeof c2.then ? c2.then(function(e4) {
              return a2(null, e4);
            }).catch(a2) : a2(null, c2);
          } catch (e4) {
            a2(e4);
          }
        else
          u2(e3, t3, s2, n2, a2, o2);
      }
      e3 && e3[0] && this.store.addResource(e3[0], t3, s2, n2);
    }
  } }]), t2;
}();
function St() {
  return { debug: false, initImmediate: true, ns: ["translation"], defaultNS: ["translation"], fallbackLng: ["dev"], fallbackNS: false, supportedLngs: false, nonExplicitSupportedLngs: false, load: "all", preload: false, simplifyPluralSuffix: true, keySeparator: ".", nsSeparator: ":", pluralSeparator: "_", contextSeparator: "_", partialBundledLanguages: false, saveMissing: false, updateMissing: false, saveMissingTo: "fallback", saveMissingPlurals: true, missingKeyHandler: false, missingInterpolationHandler: false, postProcess: false, postProcessPassResolved: false, returnNull: true, returnEmptyString: true, returnObjects: false, joinArrays: false, returnedObjectHandler: false, parseMissingKeyHandler: false, appendNamespaceToMissingKey: false, appendNamespaceToCIMode: false, overloadTranslationOptionHandler: function(e2) {
    var t2 = {};
    if ("object" === me(e2[1]) && (t2 = e2[1]), "string" == typeof e2[1] && (t2.defaultValue = e2[1]), "string" == typeof e2[2] && (t2.tDescription = e2[2]), "object" === me(e2[2]) || "object" === me(e2[3])) {
      var s2 = e2[3] || e2[2];
      Object.keys(s2).forEach(function(e3) {
        t2[e3] = s2[e3];
      });
    }
    return t2;
  }, interpolation: { escapeValue: true, format: function(e2, t2, s2, n2) {
    return e2;
  }, prefix: "{{", suffix: "}}", formatSeparator: ",", unescapePrefix: "-", nestingPrefix: "$t(", nestingSuffix: ")", nestingOptionsSeparator: ",", maxReplaces: 1e3, skipOnVariables: true } };
}
function yt(e2) {
  return "string" == typeof e2.ns && (e2.ns = [e2.ns]), "string" == typeof e2.fallbackLng && (e2.fallbackLng = [e2.fallbackLng]), "string" == typeof e2.fallbackNS && (e2.fallbackNS = [e2.fallbackNS]), e2.supportedLngs && e2.supportedLngs.indexOf("cimode") < 0 && (e2.supportedLngs = e2.supportedLngs.concat(["cimode"])), e2;
}
function bt(e2, t2) {
  var s2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    t2 && (n2 = n2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), s2.push.apply(s2, n2);
  }
  return s2;
}
function Ut(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var s2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? bt(Object(s2), true).forEach(function(t3) {
      Me(e2, t3, s2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(s2)) : bt(Object(s2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(s2, t3));
    });
  }
  return e2;
}
function Ct(e2) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if ("function" == typeof Proxy)
      return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e3) {
      return false;
    }
  }();
  return function() {
    var s2, n2 = Ce(e2);
    if (t2) {
      var i2 = Ce(this).constructor;
      s2 = Reflect.construct(n2, arguments, i2);
    } else
      s2 = n2.apply(this, arguments);
    return Ue(this, s2);
  };
}
function Mt() {
}
var Ot = function() {
  be(t2, Ae);
  var e2 = Ct(t2);
  function t2() {
    var s2, n2, i2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = arguments.length > 1 ? arguments[1] : void 0;
    if (ve(this, t2), s2 = e2.call(this), He && Ae.call(Se(s2)), s2.options = yt(i2), s2.services = {}, s2.logger = Le, s2.modules = { external: [] }, n2 = Se(s2), Object.getOwnPropertyNames(Object.getPrototypeOf(n2)).forEach(function(e3) {
      "function" == typeof n2[e3] && (n2[e3] = n2[e3].bind(n2));
    }), r2 && !s2.isInitialized && !i2.isClone) {
      if (!s2.options.initImmediate)
        return s2.init(i2, r2), Ue(s2, Se(s2));
      setTimeout(function() {
        s2.init(i2, r2);
      }, 0);
    }
    return s2;
  }
  return Ie(t2, [{ key: "init", value: function() {
    var e3 = this, t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s2 = arguments.length > 1 ? arguments[1] : void 0;
    "function" == typeof t3 && (s2 = t3, t3 = {}), !t3.defaultNS && false !== t3.defaultNS && t3.ns && ("string" == typeof t3.ns ? t3.defaultNS = t3.ns : t3.ns.indexOf("translation") < 0 && (t3.defaultNS = t3.ns[0]));
    var n2 = St();
    function i2(e4) {
      return e4 ? "function" == typeof e4 ? new e4() : e4 : null;
    }
    if (this.options = Ut(Ut(Ut({}, n2), this.options), yt(t3)), "v1" !== this.options.compatibilityAPI && (this.options.interpolation = Ut(Ut({}, n2.interpolation), this.options.interpolation)), void 0 !== t3.keySeparator && (this.options.userDefinedKeySeparator = t3.keySeparator), void 0 !== t3.nsSeparator && (this.options.userDefinedNsSeparator = t3.nsSeparator), !this.options.isClone) {
      var r2;
      this.modules.logger ? Le.init(i2(this.modules.logger), this.options) : Le.init(null, this.options), this.modules.formatter ? r2 = this.modules.formatter : "undefined" != typeof Intl && (r2 = mt);
      var a2 = new nt(this.options);
      this.store = new Je(this.options.resources, this.options);
      var o2 = this.services;
      o2.logger = Le, o2.resourceStore = this.store, o2.languageUtils = a2, o2.pluralResolver = new ut(a2, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix }), !r2 || this.options.interpolation.format && this.options.interpolation.format !== n2.interpolation.format || (o2.formatter = i2(r2), o2.formatter.init(o2, this.options), this.options.interpolation.format = o2.formatter.format.bind(o2.formatter)), o2.interpolator = new ht(this.options), o2.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }, o2.backendConnector = new It(i2(this.modules.backend), o2.resourceStore, o2, this.options), o2.backendConnector.on("*", function(t4) {
        for (var s3 = arguments.length, n3 = new Array(s3 > 1 ? s3 - 1 : 0), i3 = 1; i3 < s3; i3++)
          n3[i3 - 1] = arguments[i3];
        e3.emit.apply(e3, [t4].concat(n3));
      }), this.modules.languageDetector && (o2.languageDetector = i2(this.modules.languageDetector), o2.languageDetector.init && o2.languageDetector.init(o2, this.options.detection, this.options)), this.modules.i18nFormat && (o2.i18nFormat = i2(this.modules.i18nFormat), o2.i18nFormat.init && o2.i18nFormat.init(this)), this.translator = new tt(this.services, this.options), this.translator.on("*", function(t4) {
        for (var s3 = arguments.length, n3 = new Array(s3 > 1 ? s3 - 1 : 0), i3 = 1; i3 < s3; i3++)
          n3[i3 - 1] = arguments[i3];
        e3.emit.apply(e3, [t4].concat(n3));
      }), this.modules.external.forEach(function(t4) {
        t4.init && t4.init(e3);
      });
    }
    if (this.format = this.options.interpolation.format, s2 || (s2 = Mt), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      var u2 = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      u2.length > 0 && "dev" !== u2[0] && (this.options.lng = u2[0]);
    }
    this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined");
    ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(function(t4) {
      e3[t4] = function() {
        var s3;
        return (s3 = e3.store)[t4].apply(s3, arguments);
      };
    });
    ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(function(t4) {
      e3[t4] = function() {
        var s3;
        return (s3 = e3.store)[t4].apply(s3, arguments), e3;
      };
    });
    var c2 = je(), g2 = function() {
      var t4 = function(t5, n3) {
        e3.isInitialized && !e3.initializedStoreOnce && e3.logger.warn("init: i18next is already initialized. You should call init just once!"), e3.isInitialized = true, e3.options.isClone || e3.logger.log("initialized", e3.options), e3.emit("initialized", e3.options), c2.resolve(n3), s2(t5, n3);
      };
      if (e3.languages && "v1" !== e3.options.compatibilityAPI && !e3.isInitialized)
        return t4(null, e3.t.bind(e3));
      e3.changeLanguage(e3.options.lng, t4);
    };
    return this.options.resources || !this.options.initImmediate ? g2() : setTimeout(g2, 0), c2;
  } }, { key: "loadResources", value: function(e3) {
    var t3 = this, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Mt, n2 = "string" == typeof e3 ? e3 : this.language;
    if ("function" == typeof e3 && (s2 = e3), !this.options.resources || this.options.partialBundledLanguages) {
      if (n2 && "cimode" === n2.toLowerCase())
        return s2();
      var i2 = [], r2 = function(e4) {
        e4 && t3.services.languageUtils.toResolveHierarchy(e4).forEach(function(e5) {
          i2.indexOf(e5) < 0 && i2.push(e5);
        });
      };
      if (n2)
        r2(n2);
      else
        this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(function(e4) {
          return r2(e4);
        });
      this.options.preload && this.options.preload.forEach(function(e4) {
        return r2(e4);
      }), this.services.backendConnector.load(i2, this.options.ns, function(e4) {
        e4 || t3.resolvedLanguage || !t3.language || t3.setResolvedLanguage(t3.language), s2(e4);
      });
    } else
      s2(null);
  } }, { key: "reloadResources", value: function(e3, t3, s2) {
    var n2 = je();
    return e3 || (e3 = this.languages), t3 || (t3 = this.options.ns), s2 || (s2 = Mt), this.services.backendConnector.reload(e3, t3, function(e4) {
      n2.resolve(), s2(e4);
    }), n2;
  } }, { key: "use", value: function(e3) {
    if (!e3)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e3.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return "backend" === e3.type && (this.modules.backend = e3), ("logger" === e3.type || e3.log && e3.warn && e3.error) && (this.modules.logger = e3), "languageDetector" === e3.type && (this.modules.languageDetector = e3), "i18nFormat" === e3.type && (this.modules.i18nFormat = e3), "postProcessor" === e3.type && We.addPostProcessor(e3), "formatter" === e3.type && (this.modules.formatter = e3), "3rdParty" === e3.type && this.modules.external.push(e3), this;
  } }, { key: "setResolvedLanguage", value: function(e3) {
    if (e3 && this.languages && !(["cimode", "dev"].indexOf(e3) > -1))
      for (var t3 = 0; t3 < this.languages.length; t3++) {
        var s2 = this.languages[t3];
        if (!(["cimode", "dev"].indexOf(s2) > -1) && this.store.hasLanguageSomeTranslations(s2)) {
          this.resolvedLanguage = s2;
          break;
        }
      }
  } }, { key: "changeLanguage", value: function(e3, t3) {
    var s2 = this;
    this.isLanguageChangingTo = e3;
    var n2 = je();
    this.emit("languageChanging", e3);
    var i2 = function(e4) {
      s2.language = e4, s2.languages = s2.services.languageUtils.toResolveHierarchy(e4), s2.resolvedLanguage = void 0, s2.setResolvedLanguage(e4);
    }, r2 = function(r3) {
      e3 || r3 || !s2.services.languageDetector || (r3 = []);
      var a2 = "string" == typeof r3 ? r3 : s2.services.languageUtils.getBestMatchFromCodes(r3);
      a2 && (s2.language || i2(a2), s2.translator.language || s2.translator.changeLanguage(a2), s2.services.languageDetector && s2.services.languageDetector.cacheUserLanguage && s2.services.languageDetector.cacheUserLanguage(a2)), s2.loadResources(a2, function(e4) {
        !function(e5, r4) {
          r4 ? (i2(r4), s2.translator.changeLanguage(r4), s2.isLanguageChangingTo = void 0, s2.emit("languageChanged", r4), s2.logger.log("languageChanged", r4)) : s2.isLanguageChangingTo = void 0, n2.resolve(function() {
            return s2.t.apply(s2, arguments);
          }), t3 && t3(e5, function() {
            return s2.t.apply(s2, arguments);
          });
        }(e4, a2);
      });
    };
    return e3 || !this.services.languageDetector || this.services.languageDetector.async ? !e3 && this.services.languageDetector && this.services.languageDetector.async ? 0 === this.services.languageDetector.detect.length ? this.services.languageDetector.detect().then(r2) : this.services.languageDetector.detect(r2) : r2(e3) : r2(this.services.languageDetector.detect()), n2;
  } }, { key: "getFixedT", value: function(e3, t3, s2) {
    var n2 = this, i2 = function e4(t4, i3) {
      var r2;
      if ("object" !== me(i3)) {
        for (var a2 = arguments.length, o2 = new Array(a2 > 2 ? a2 - 2 : 0), u2 = 2; u2 < a2; u2++)
          o2[u2 - 2] = arguments[u2];
        r2 = n2.options.overloadTranslationOptionHandler([t4, i3].concat(o2));
      } else
        r2 = Ut({}, i3);
      r2.lng = r2.lng || e4.lng, r2.lngs = r2.lngs || e4.lngs, r2.ns = r2.ns || e4.ns, r2.keyPrefix = r2.keyPrefix || s2 || e4.keyPrefix;
      var c2, g2 = n2.options.keySeparator || ".";
      return c2 = r2.keyPrefix && Array.isArray(t4) ? t4.map(function(e5) {
        return "".concat(r2.keyPrefix).concat(g2).concat(e5);
      }) : r2.keyPrefix ? "".concat(r2.keyPrefix).concat(g2).concat(t4) : t4, n2.t(c2, r2);
    };
    return "string" == typeof e3 ? i2.lng = e3 : i2.lngs = e3, i2.ns = t3, i2.keyPrefix = s2, i2;
  } }, { key: "t", value: function() {
    var e3;
    return this.translator && (e3 = this.translator).translate.apply(e3, arguments);
  } }, { key: "exists", value: function() {
    var e3;
    return this.translator && (e3 = this.translator).exists.apply(e3, arguments);
  } }, { key: "setDefaultNamespace", value: function(e3) {
    this.options.defaultNS = e3;
  } }, { key: "hasLoadedNamespace", value: function(e3) {
    var t3 = this, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), false;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), false;
    var n2 = s2.lng || this.resolvedLanguage || this.languages[0], i2 = !!this.options && this.options.fallbackLng, r2 = this.languages[this.languages.length - 1];
    if ("cimode" === n2.toLowerCase())
      return true;
    var a2 = function(e4, s3) {
      var n3 = t3.services.backendConnector.state["".concat(e4, "|").concat(s3)];
      return -1 === n3 || 2 === n3;
    };
    if (s2.precheck) {
      var o2 = s2.precheck(this, a2);
      if (void 0 !== o2)
        return o2;
    }
    return !!this.hasResourceBundle(n2, e3) || (!(this.services.backendConnector.backend && (!this.options.resources || this.options.partialBundledLanguages)) || !(!a2(n2, e3) || i2 && !a2(r2, e3)));
  } }, { key: "loadNamespaces", value: function(e3, t3) {
    var s2 = this, n2 = je();
    return this.options.ns ? ("string" == typeof e3 && (e3 = [e3]), e3.forEach(function(e4) {
      s2.options.ns.indexOf(e4) < 0 && s2.options.ns.push(e4);
    }), this.loadResources(function(e4) {
      n2.resolve(), t3 && t3(e4);
    }), n2) : (t3 && t3(), Promise.resolve());
  } }, { key: "loadLanguages", value: function(e3, t3) {
    var s2 = je();
    "string" == typeof e3 && (e3 = [e3]);
    var n2 = this.options.preload || [], i2 = e3.filter(function(e4) {
      return n2.indexOf(e4) < 0;
    });
    return i2.length ? (this.options.preload = n2.concat(i2), this.loadResources(function(e4) {
      s2.resolve(), t3 && t3(e4);
    }), s2) : (t3 && t3(), Promise.resolve());
  } }, { key: "dir", value: function(e3) {
    if (e3 || (e3 = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !e3)
      return "rtl";
    var t3 = this.services && this.services.languageUtils || new nt(St());
    return ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf(t3.getLanguagePartFromCode(e3)) > -1 || e3.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  } }, { key: "cloneInstance", value: function() {
    var e3 = this, s2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Mt, i2 = Ut(Ut(Ut({}, this.options), s2), { isClone: true }), r2 = new t2(i2);
    void 0 === s2.debug && void 0 === s2.prefix || (r2.logger = r2.logger.clone(s2));
    return ["store", "services", "language"].forEach(function(t3) {
      r2[t3] = e3[t3];
    }), r2.services = Ut({}, this.services), r2.services.utils = { hasLoadedNamespace: r2.hasLoadedNamespace.bind(r2) }, r2.translator = new tt(r2.services, r2.options), r2.translator.on("*", function(e4) {
      for (var t3 = arguments.length, s3 = new Array(t3 > 1 ? t3 - 1 : 0), n3 = 1; n3 < t3; n3++)
        s3[n3 - 1] = arguments[n3];
      r2.emit.apply(r2, [e4].concat(s3));
    }), r2.init(i2, n2), r2.translator.options = r2.options, r2.translator.backendConnector.services.utils = { hasLoadedNamespace: r2.hasLoadedNamespace.bind(r2) }, r2;
  } }, { key: "toJSON", value: function() {
    return { options: this.options, store: this.store, language: this.language, languages: this.languages, resolvedLanguage: this.resolvedLanguage };
  } }]), t2;
}();
Me(Ot, "createInstance", function() {
  return new Ot(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, arguments.length > 1 ? arguments[1] : void 0);
});
var _t = Ot.createInstance();
_t.createInstance = Ot.createInstance, _t.createInstance, _t.dir, _t.init, _t.loadResources, _t.reloadResources, _t.use, _t.changeLanguage, _t.getFixedT, _t.t, _t.exists, _t.setDefaultNamespace, _t.hasLoadedNamespace, _t.loadNamespaces, _t.loadLanguages;
var Dt = class _Dt extends ne {
  constructor() {
    super(), this.languages = null, this.keyMap = {};
  }
  static getInstance() {
    return _Dt.instance || (_Dt.instance = new _Dt()), _Dt.instance;
  }
  provideLanguages(e2) {
    var t2;
    G || (this.languages = e2, (null === (t2 = e2["zh-CN"]) || void 0 === t2 ? void 0 : t2.Chat) && this.setKeyMap(e2["zh-CN"]), console.log("TUITranslateService.provideLanguages ok."));
  }
  useI18n(e2) {
    var t2;
    if (G)
      return;
    if (!this.languages)
      return void console.warn("TUITranslateService.useI18next not have messages.");
    const s2 = {};
    for (const [e3, t3] of Object.entries(this.languages)) {
      s2["zh_cn" === e3 ? "zh" : e3] = { translation: t3 };
    }
    _t.init({ compatibilityJSON: "v3", lng: e2 || "zh", fallbackLng: "zh", detection: { order: ["querystring", "navigator"], caches: ["localStorage", "cookie"] }, resources: s2 });
    let n2 = this.normalizeLanguageKey(e2 || "zh");
    null === (t2 = this.getEngine().TUIReport) || void 0 === t2 || t2.reportFeature(201, n2);
  }
  changeLanguage(e2) {
    let t2 = this.normalizeLanguageKey(e2);
    return this.getEngine().TUIReport.reportFeature(201, t2), _t.changeLanguage(e2);
  }
  normalizeLanguageKey(e2) {
    return e2.includes("en") ? "en-us" : e2.includes("tw") ? "zh-tw" : e2.includes("zh") || e2.includes("cn") ? "zh-cn" : e2.includes("ko") || e2.includes("kr") ? "ko-kr" : e2.includes("ja") || e2.includes("jp") ? "ja-jp" : "other-" + e2;
  }
  t(e2) {
    if (!this.languages) {
      let t3 = e2;
      return !S(e2) && e2.indexOf(".") > -1 && (t3 = e2.split(".").pop() || ""), t3;
    }
    const t2 = this.keyMap[e2];
    return t2 ? _t.t(t2) : _t.t(e2);
  }
  setKeyMap(e2, t2) {
    for (const s2 in e2)
      if (Object.prototype.hasOwnProperty.call(e2, s2)) {
        const n2 = t2 ? `${t2}.${s2}` : s2;
        if (e2[s2] && "object" == typeof e2[s2] && !Array.isArray(e2[s2]) && null !== e2[s2])
          this.setKeyMap(e2[s2], n2);
        else {
          let n3 = t2 ? `${t2}.${e2[s2]}` : e2[s2];
          n3 = this.replaceKey(n3), this.keyMap[n3] = `${t2}.${s2}`;
        }
      }
  }
  replaceKey(e2) {
    return e2.startsWith("Chat") ? e2.replace("Chat", "TUIChat") : e2.startsWith("Conversation") ? e2.replace("Conversation", "TUIConversation") : e2.startsWith("Message") ? e2.replace("Message", "message.tip") : e2.startsWith("Call") ? e2.replace("Call", "message.custom") : e2;
  }
};
var Pt = class _Pt extends ne {
  constructor() {
    super(), this.serv = "TUIConversationService";
  }
  static getInstance() {
    return _Pt.instance || (_Pt.instance = new _Pt()), _Pt.instance;
  }
  init() {
    const e2 = this.getEngine();
    e2.eventCenter.addEvent(e2.EVENT.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated.bind(this)), e2.eventCenter.addEvent(e2.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, this.onTotalUnreadCountUpdated.bind(this)), e2.eventCenter.addEvent(e2.EVENT.MESSAGE_RECEIVED, this.onMessageReceived.bind(this)), this.getConversationInitData();
  }
  onConversationListUpdated(e2) {
    const t2 = this.filterSystemConversation(e2);
    this.getEngine().TUIStore.update(o.CONV, "conversationList", t2), this.updateCurrentConversation();
  }
  onTotalUnreadCountUpdated(e2) {
    this.getEngine().TUIStore.update(o.CONV, "totalUnreadCount", e2);
  }
  onMessageReceived(e2) {
    const t2 = this.getEngine(), s2 = this.getEngine().TUIStore.getData(o.CONV, "conversationList");
    let n2 = false;
    for (let i2 = 0; i2 < e2.length; i2++) {
      if (e2[i2].type !== t2.TYPES.MSG_GRP_SYS_NOTICE)
        continue;
      const { operationType: r2 } = e2[i2].payload, a2 = `GROUP${e2[i2].to}`, u2 = 4 === r2 || 5 === r2 || 8 === r2, c2 = 2 === r2 || 6 === r2 || 7 === r2;
      if (u2 || c2) {
        for (let e3 = 0; e3 < s2.length; e3++)
          if (s2[e3].type !== t2.TYPES.CONV_C2C && s2[e3].conversationID === a2) {
            if (u2) {
              this.getEngine().TUIStore.update(o.CONV, "operationTypeMap", { conversationID: a2, operationType: r2 }), n2 = true;
              break;
            }
            if (c2 && s2[e3].operationType > 0) {
              this.getEngine().TUIStore.update(o.CONV, "operationTypeMap", { conversationID: a2, operationType: 0 }), n2 = true;
              break;
            }
          }
      }
    }
    if (n2) {
      this.getEngine().TUIStore.update(o.CONV, "conversationList", s2);
      const e3 = this.getEngine().TUIStore.getData(o.CONV, "currentConversationID") || "", t3 = this.findConversation(e3);
      t3 && this.getEngine().TUIStore.update(o.CONV, "currentConversation", t3);
    }
  }
  getConversationInitData() {
    const e2 = this.getEngine();
    e2.chat.isReady() && e2.chat.getConversationList().then((t2) => {
      const { conversationList: s2, isSyncCompleted: n2 } = t2.data;
      if (console.log(`${this.serv}.init, getConversationList count:${s2.length} isSyncCompleted:${n2}`), s2.length > 0) {
        this.onConversationListUpdated(s2);
        const t3 = e2.chat.getTotalUnreadMessageCount();
        this.onTotalUnreadCountUpdated(t3);
      }
    });
  }
  switchConversation(e2) {
    return i(this, void 0, void 0, function* () {
      const t2 = `${this.serv}.switchConversation`, s2 = this.getEngine();
      if (!e2)
        return s2.TUIStore.reset(o.CHAT, ["messageList", "isCompleted", "nextReqMessageID"]), s2.TUIStore.update(o.CONV, "currentConversationID", ""), s2.TUIStore.update(o.CONV, "currentConversation", null), console.log(`${t2} conversationID is empty, conversationID:${e2}`), Promise.resolve({});
      if (!e2.startsWith(s2.TYPES.CONV_C2C) && !e2.startsWith(s2.TYPES.CONV_GROUP))
        return console.warn(`${t2} conversationID is invalid, conversationID:${e2}`), Promise.reject({ code: h.INVALID_CONV_ID, message: d.INVALID_CONV_ID });
      const n2 = s2.TUIStore.getData(o.CONV, "currentConversationID");
      if (n2 && n2 === e2)
        return this.setMessageRead(n2), console.warn(`${t2} please check conversationID, conversationID:${e2}`), Promise.resolve({ code: h.CONV_ID_SAME, message: d.CONV_ID_SAME });
      const i2 = yield this.getConversationModel(e2);
      return S(i2) ? (console.warn(`${t2} target conversation is not exist, conversationID:${e2}`), Promise.reject({ code: h.CONV_NOT_EXIST, message: d.CONV_NOT_EXIST })) : (n2 && this.setMessageRead(n2), e2 && this.setMessageRead(e2), s2.TUIStore.reset(o.CHAT, ["messageList", "isCompleted", "nextReqMessageID"]), s2.TUIStore.update(o.CONV, "currentConversationID", e2), s2.TUIStore.update(o.CONV, "currentConversation", i2), Promise.resolve(i2));
    });
  }
  getConversationModel(e2) {
    return i(this, void 0, void 0, function* () {
      let t2 = this.findConversation(e2);
      if (S(t2))
        try {
          const s2 = yield this.getConversationProfile(e2);
          s2.data && s2.data.conversation && (t2 = new ae(s2.data.conversation));
        } catch (e3) {
          t2 = void 0;
        }
      return t2;
    });
  }
  findConversation(e2) {
    let t2;
    const s2 = this.getEngine().TUIStore.getData(o.CONV, "conversationList");
    for (let n2 = 0; n2 < s2.length; n2++)
      if (s2[n2].conversationID === e2) {
        t2 = s2[n2];
        break;
      }
    return t2;
  }
  updateCurrentConversation() {
    const e2 = this.getEngine(), t2 = e2.TUIStore.getData(o.CONV, "currentConversationID"), s2 = this.findConversation(t2);
    s2 && e2.TUIStore.update(o.CONV, "currentConversation", s2);
  }
  getConversationList() {
    return this.getEngine().chat.getConversationList();
  }
  getConversationProfile(e2) {
    return this.getEngine().chat.getConversationProfile(e2);
  }
  deleteConversation(e2) {
    return this.getEngine().chat.deleteConversation(e2).then((t2) => {
      const s2 = this.getEngine().TUIStore.getData(o.CONV, "currentConversationID");
      return console.log(`${this.serv}.deleteConversation conversationID:${e2} currentConversationID:${s2}`), e2 === s2 && (this.getEngine().TUIStore.update(o.CONV, "currentConversationID", ""), this.getEngine().TUIStore.update(o.CONV, "currentConversation", null)), t2;
    });
  }
  pinConversation(e2) {
    return this.getEngine().chat.pinConversation(e2);
  }
  muteConversation(e2) {
    return this.getEngine().chat.setMessageRemindType(e2);
  }
  clearHistoryMessage(e2) {
    return this.getEngine().chat.clearHistoryMessage(e2).then((e3) => (this.getEngine().TUIStore.update(o.CHAT, "messageList", []), this.getEngine().TUIStore.update(o.CHAT, "nextReqMessageID", ""), this.getEngine().TUIStore.update(o.CHAT, "isCompleted", true), e3));
  }
  setMessageRead(e2) {
    return this.getEngine().chat.setMessageRead({ conversationID: e2 });
  }
  setConversationDraft(e2) {
    const { conversationID: t2, draftInfo: s2 } = e2;
    let n2 = "";
    return s2 && (n2 = JSON.stringify(s2)), this.getEngine().chat.setConversationDraft({ conversationID: t2, draftText: n2 }).then((e3) => {
      const { conversation: t3 } = e3.data;
      this.updateConversation(t3);
    });
  }
  updateConversation(e2) {
    let t2 = false;
    const s2 = this.getEngine().TUIStore.getData(o.CONV, "conversationList");
    for (let n2 = 0; n2 < s2.length; n2++)
      if (s2[n2].conversationID === e2.conversationID) {
        s2[n2] = e2, t2 = true;
        break;
      }
    t2 && this.getEngine().TUIStore.update(o.CONV, "conversationList", s2);
  }
  filterSystemConversation(e2) {
    return e2.filter((e3) => e3.type !== this.getEngine().TYPES.CONV_SYSTEM);
  }
};
var Rt = class {
  constructor(e2) {
    this.TUIUserService = e2;
  }
  getEngine() {
    return this.TUIUserService.getEngine();
  }
  init() {
    this.getEngine().eventCenter.addEvent(this.getEngine().EVENT.PROFILE_UPDATED, this.onProfileUpdated.bind(this)), this.getEngine().eventCenter.addEvent(this.getEngine().EVENT.BLACKLIST_UPDATED, this.onBlacklistUpdated.bind(this)), this.getUserProfileInitData();
  }
  onProfileUpdated(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.USER, "userProfile");
    e2.forEach((e3) => {
      e3.userID === s2.userID && t2.TUIStore.update(o.USER, "userProfile", e3);
    });
  }
  onBlacklistUpdated(e2) {
    const t2 = this.getEngine();
    this.getBlacklistProfile(e2).then((e3) => {
      t2.TUIStore.update(o.USER, "userBlacklist", e3);
    });
  }
  getUserProfileInitData() {
    const e2 = this.getEngine();
    e2.chat.isReady() && e2.chat.getBlacklist().then((e3) => {
      const t2 = e3.data || [];
      console.log(`TUIUserProfileHandler.init, getBlacklist count:${t2.length}`), t2.length > 0 && this.onBlacklistUpdated(t2);
    });
  }
  getBlacklistProfile(e2) {
    const t2 = [];
    let s2 = 0;
    for (; s2 < e2.length; )
      t2.push(e2.slice(s2, s2 += 100));
    const n2 = [];
    t2.forEach((e3) => {
      n2.push(this.TUIUserService.getUserProfile({ userIDList: e3 }));
    });
    const i2 = [];
    return Promise.all(n2).then((e3) => (e3.forEach((e4) => {
      const t3 = e4.data.map((e5) => {
        const { userID: t4, nick: s3, avatar: n3 } = e5;
        return { userID: t4, nick: s3, avatar: n3 };
      });
      i2.push(...t3);
    }), i2));
  }
  getUserProfile(e2) {
    const t2 = this.getEngine();
    return S(e2) ? t2.chat.getMyProfile().then((e3) => (t2.TUIStore.update(o.USER, "userProfile", e3.data), e3)).catch((e3) => Promise.reject(e3)) : t2.chat.getUserProfile(e2);
  }
  updateMyProfile(e2) {
    return this.getEngine().chat.updateMyProfile(e2);
  }
  addToBlacklist(e2) {
    return this.getEngine().chat.addToBlacklist(e2);
  }
  removeFromBlacklist(e2) {
    return this.getEngine().chat.removeFromBlacklist(e2);
  }
};
function Lt(e2, t2, s2 = true) {
  !function(e3, t3) {
    V ? H.setStorageSync(e3, t3) : kt() && localStorage.setItem(e3, JSON.stringify(t3));
  }(s2 ? jt(e2) : e2, t2);
}
function At(e2, t2 = true) {
  try {
    return function(e3) {
      if (V)
        return H.getStorageSync(e3);
      if (kt()) {
        const t3 = localStorage.getItem(e3);
        if ("undefined" !== t3)
          return JSON.parse(t3);
      }
      return;
    }(t2 ? jt(e2) : e2);
  } catch (e3) {
    return void console.warn("Storage.getStorageItem error:", e3);
  }
}
function jt(e2) {
  return `chat_engine_${e2}`;
}
function kt() {
  return navigator && navigator.cookieEnabled && localStorage;
}
var Nt = class {
  constructor(e2) {
    this.TUIUserService = e2;
  }
  getEngine() {
    return this.TUIUserService.getEngine();
  }
  init() {
    const e2 = this.getEngine(), t2 = At("displayOnlineStatus") || false;
    e2.TUIStore.update(o.USER, "displayOnlineStatus", t2), e2.eventCenter.addEvent(e2.EVENT.USER_STATUS_UPDATED, this.onUserStatusUpdated.bind(this)), this.onConversationListUpdated();
  }
  onConversationListUpdated() {
    const e2 = this.getEngine();
    e2.TUIStore.watch(o.CONV, { conversationList: () => {
      const t2 = e2.TUIStore.getData(o.APP, "enabledOnlineStatus"), s2 = e2.TUIStore.getData(o.USER, "displayOnlineStatus");
      t2 && s2 && this.startToSubscribe();
    } });
  }
  onUserStatusUpdated(e2) {
    this.getEngine().TUIStore.update(o.USER, "userStatusList", e2);
  }
  switchUserStatus(e2) {
    const t2 = this.getEngine(), { displayOnlineStatus: s2 = false } = e2;
    t2.TUIStore.update(o.USER, "displayOnlineStatus", s2), Lt("displayOnlineStatus", s2);
    const n2 = t2.TUIStore.getData(o.APP, "enabledOnlineStatus");
    n2 ? true === s2 ? this.startToSubscribe() : this.unsubscribeUserStatus() : console.warn(`UserStatusHandler.switchUserStatus enabledOnlineStatus:${n2} displayOnlineStatus:${s2}`);
  }
  getUserStatus(e2) {
    const t2 = this.getEngine();
    return t2.chat.getUserStatus(e2).then((e3) => {
      const { successUserList: s2 } = e3.data;
      return s2.length > 0 && t2.TUIStore.update(o.USER, "userStatusList", s2), e3;
    }).catch((e3) => Promise.reject(e3));
  }
  subscribeUserStatus(e2) {
    var t2;
    const s2 = (null === (t2 = null == e2 ? void 0 : e2.userIDList) || void 0 === t2 ? void 0 : t2.length) || 0;
    return 0 === s2 ? (console.warn(`UserStatusHandler.subscribeUserStatus userID count:${s2}`), Promise.resolve()) : this.getEngine().chat.subscribeUserStatus(e2);
  }
  unsubscribeUserStatus(e2) {
    const t2 = this.getEngine(), { userIDList: s2 = [] } = e2 || {};
    return t2.chat.unsubscribeUserStatus({ userIDList: s2 }).then((e3) => {
      const { failureUserList: n2 } = e3.data, i2 = [];
      return s2.forEach((e4) => {
        n2.includes(e4) || i2.push({ userID: e4, statusType: u.UNSUB_USER });
      }), t2.TUIStore.update(o.USER, "userStatusList", i2), e3;
    }).catch((e3) => Promise.reject(e3));
  }
  startToSubscribe() {
    const e2 = this.getEngine(), t2 = e2.TUIStore.getData(o.CONV, "conversationList"), s2 = e2.TUIStore.getData(o.USER, "userStatusList"), n2 = [];
    t2.forEach((t3) => {
      if (t3.type === e2.TYPES.CONV_C2C) {
        const i2 = t3.conversationID.replace(e2.TYPES.CONV_C2C, "");
        s2.has(i2) || n2.push(i2);
      }
    }), 0 !== n2.length && e2.chat.isReady() && (this.subscribeUserStatus({ userIDList: n2 }), this.getUserStatus({ userIDList: n2 }));
  }
};
var xt = class _xt extends ne {
  constructor() {
    super(), this.userProfileHandler = new Rt(this), this.userStatusHandler = new Nt(this);
  }
  static getInstance() {
    return _xt.instance || (_xt.instance = new _xt()), _xt.instance;
  }
  init() {
    const e2 = this.getEngine();
    e2.eventCenter.addEvent(e2.EVENT.KICKED_OUT, this.onKickedOut.bind(this)), e2.eventCenter.addEvent(e2.EVENT.NET_STATE_CHANGE, this.onNetStateChange.bind(this)), this.userProfileHandler.init(), this.userStatusHandler.init(), this.initMessageReadReceipt();
  }
  onKickedOut(e2) {
    this.getEngine().TUIStore.update(o.USER, "kickedOut", e2.type);
  }
  onNetStateChange(e2) {
    this.getEngine().TUIStore.update(o.USER, "netStateChange", e2.state);
  }
  initMessageReadReceipt() {
    const e2 = At("displayMessageReadReceipt") || true;
    this.getEngine().TUIStore.update(o.USER, "displayMessageReadReceipt", e2);
  }
  switchUserStatus(e2) {
    return this.userStatusHandler.switchUserStatus(e2);
  }
  switchMessageReadStatus(e2) {
    this.getEngine().TUIStore.update(o.USER, "displayMessageReadReceipt", e2), Lt("displayMessageReadReceipt", e2);
  }
  getUserProfile(e2) {
    return this.userProfileHandler.getUserProfile(e2);
  }
  updateMyProfile(e2) {
    return this.userProfileHandler.updateMyProfile(e2);
  }
  addToBlacklist(e2) {
    return this.userProfileHandler.addToBlacklist(e2);
  }
  removeFromBlacklist(e2) {
    return this.userProfileHandler.removeFromBlacklist(e2);
  }
  getUserStatus(e2) {
    return this.userStatusHandler.getUserStatus(e2);
  }
  subscribeUserStatus(e2) {
    return this.userStatusHandler.subscribeUserStatus(e2);
  }
  unsubscribeUserStatus(e2) {
    return this.userStatusHandler.unsubscribeUserStatus(e2);
  }
};
var Gt = class {
  constructor(e2) {
    this.TUIChatService = e2, this.userShowNameMap = /* @__PURE__ */ new Map(), this.requestedUserMap = /* @__PURE__ */ new Map();
  }
  getEngine() {
    return this.TUIChatService.getEngine();
  }
  t(e2) {
    return this.getEngine().TUITranslate.t(e2);
  }
  handleTextMessage(e2) {
    return { text: this.decodeText(e2.payload) };
  }
  handleFaceMessage(e2) {
    const t2 = { name: "", url: "", type: "" };
    return e2.payload.data.indexOf("@custom") > -1 ? (t2.name = e2.payload.data, t2.type = "custom", t2) : (t2.name = e2.payload.data.indexOf("@2x") < 0 ? `${e2.payload.data}@2x` : e2.payload.data, t2.url = `${P}${t2.name}.png`, t2);
  }
  handleLocationMessage(e2) {
    const t2 = { lon: "", lat: "", href: "", url: "", description: "" };
    return t2.lon = e2.payload.longitude.toFixed(6), t2.lat = e2.payload.latitude.toFixed(6), t2.href = `${R}pointx=${t2.lon}&pointy=${t2.lat}&name=${e2.payload.description}`, t2.url = `${L}center=${t2.lat},${t2.lon}&zoom=10&size=300*150&maptype=roadmap&markers=size:large|color:0xFFCCFF|label:k|${t2.lat},${t2.lon}&key=UBNBZ-PTP3P-TE7DB-LHRTI-Y4YLE-VWBBD`, t2.description = e2.payload.description, t2;
  }
  handleImageMessage(e2) {
    return { url: e2.payload.imageInfoArray[0].url, width: e2.payload.imageInfoArray[0].width, height: e2.payload.imageInfoArray[0].height };
  }
  handleAudioMessage(e2) {
    return { url: e2.payload.url, second: e2.payload.second };
  }
  handleVideoMessage(e2) {
    return { url: e2.payload.videoUrl, snapshotUrl: e2.payload.snapshotUrl, snapshotWidth: e2.payload.snapshotWidth, snapshotHeight: e2.payload.snapshotHeight };
  }
  handleFileMessage(e2) {
    return { url: e2.payload.fileUrl, name: e2.payload.fileName, size: C(e2.payload.fileSize) };
  }
  handleCustomMessage(e2) {
    var t2;
    const s2 = this.handleCreateGroupCustomMessage(e2);
    return { custom: this.handleCallKitSignaling(e2) || s2 || (null === (t2 = null == e2 ? void 0 : e2.payload) || void 0 === t2 ? void 0 : t2.extension) || `${this.t("TUIChat.[自定义消息]")}`, businessID: s2 ? "group_create" : "" };
  }
  handleMergeMessage(e2) {
    return Object.assign({}, e2.payload);
  }
  handleGroupTipsMessage(e2) {
    var t2, s2, n2, i2, r2, a2;
    const o2 = this.getEngine(), u2 = { text: "" };
    let c2 = (null == e2 ? void 0 : e2.nick) || (null === (s2 = null === (t2 = null == e2 ? void 0 : e2.payload) || void 0 === t2 ? void 0 : t2.userIDList) || void 0 === s2 ? void 0 : s2.join(","));
    switch ((null === (i2 = null === (n2 = null == e2 ? void 0 : e2.payload) || void 0 === n2 ? void 0 : n2.memberList) || void 0 === i2 ? void 0 : i2.length) > 0 && (c2 = "", null === (a2 = null === (r2 = null == e2 ? void 0 : e2.payload) || void 0 === r2 ? void 0 : r2.memberList) || void 0 === a2 || a2.map((e3) => {
      const t3 = (null == e3 ? void 0 : e3.nick) || (null == e3 ? void 0 : e3.userID);
      return c2 += `${this.substringByLength(t3)},`, e3;
    }), c2 = null == c2 ? void 0 : c2.slice(0, -1)), e2.payload.operationType) {
      case o2.TYPES.GRP_TIP_MBR_JOIN:
        u2.text = `${c2} ${this.t("message.tip.加入群组")}`;
        break;
      case o2.TYPES.GRP_TIP_MBR_QUIT:
        u2.text = `${this.t("message.tip.群成员")}：${c2} ${this.t("message.tip.退出群组")}`;
        break;
      case o2.TYPES.GRP_TIP_MBR_KICKED_OUT:
        u2.text = `${this.t("message.tip.群成员")}：${c2} ${this.t("message.tip.被")}${this.t("message.tip.踢出群组")}`;
        break;
      case o2.TYPES.GRP_TIP_MBR_SET_ADMIN:
        u2.text = `${this.t("message.tip.群成员")}：${c2} ${this.t("message.tip.成为管理员")}`;
        break;
      case o2.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
        u2.text = `${this.t("message.tip.群成员")}：${c2} ${this.t("message.tip.被撤销管理员")}`;
        break;
      case o2.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
        u2.text = this.handleGroupProfileUpdated(e2);
        break;
      case o2.TYPES.GRP_TIP_MBR_PROFILE_UPDATED:
        for (const t3 of e2.payload.memberList)
          t3.muteTime > 0 ? u2.text = `${this.t("message.tip.群成员")}：${c2} ${this.t("message.tip.被禁言")}` : u2.text = `${this.t("message.tip.群成员")}：${c2} ${this.t("message.tip.被取消禁言")}`;
        break;
      default:
        u2.text = `[${this.t("message.tip.群提示消息")}]`;
    }
    return u2;
  }
  handleGroupSystemMessage(e2) {
    const t2 = e2.payload.groupProfile.name || e2.payload.groupProfile.groupID, s2 = { text: "" };
    switch (e2.payload.operationType) {
      case 1:
        s2.text = `${e2.payload.operatorID} ${this.t("message.tip.申请加入群组")}：${t2}`;
        break;
      case 2:
        s2.text = `${this.t("message.tip.成功加入群组")}：${t2}`;
        break;
      case 3:
        s2.text = `${this.t("message.tip.申请加入群组")}：${t2} ${this.t("message.tip.被拒绝")}`;
        break;
      case 4:
        s2.text = `${this.t("message.tip.你被管理员")}${e2.payload.operatorID} ${this.t("message.tip.踢出群组")}：${t2}`;
        break;
      case 5:
        s2.text = `${this.t("message.tip.群")}：${t2} ${this.t("message.tip.被")} ${e2.payload.operatorID} ${this.t("message.tip.解散")}`;
        break;
      case 6:
        s2.text = `${e2.payload.operatorID} ${this.t("message.tip.创建群")}：${t2}`;
        break;
      case 7:
      case 12:
        s2.text = `${e2.payload.operatorID} ${this.t("message.tip.邀请你加群")}：${t2}`;
        break;
      case 8:
        s2.text = `${this.t("message.tip.你退出群组")}：${t2}`;
        break;
      case 9:
        s2.text = `${this.t("message.tip.你被")}${e2.payload.operatorID} ${this.t("message.tip.设置为群")}：${t2} ${this.t("message.tip.的管理员")}`;
        break;
      case 10:
        s2.text = `${this.t("message.tip.你被")}${e2.payload.operatorID} ${this.t("message.tip.撤销群")}：${t2} ${this.t("message.tip.的管理员身份")}`;
        break;
      case 13:
        s2.text = `${e2.payload.operatorID} ${this.t("message.tip.同意加群")}：${t2}`;
        break;
      case 14:
        s2.text = `${e2.payload.operatorID} ${this.t("message.tip.拒接加群")}：${t2}`;
        break;
      case 255:
        s2.text = `${this.t("message.tip.自定义群系统通知")}: ${e2.payload.userDefinedField}`;
        break;
      default:
        s2.text = "未解析的群系统通知";
    }
    return s2;
  }
  handleCallKitSignaling(e2) {
    var t2, s2, n2, i2, r2, a2, o2, u2, c2, g2;
    const l2 = U(e2.payload.data);
    if (1 !== (null == l2 ? void 0 : l2.businessID))
      return "";
    const h2 = U(null == l2 ? void 0 : l2.data), p2 = e2.fromAccount || e2.from, d2 = this.getEngine().TUIFriend.getFriendRemark([p2]), f2 = this.getEngine().getMyUserID();
    let m2 = d2[p2] || e2.nameCard || e2.nick || p2;
    switch (m2 = this.substringByLength(m2), null == l2 ? void 0 : l2.actionType) {
      case 1:
        return "audioCall" !== (null === (t2 = null == h2 ? void 0 : h2.data) || void 0 === t2 ? void 0 : t2.cmd) && "videoCall" !== (null === (s2 = null == h2 ? void 0 : h2.data) || void 0 === s2 ? void 0 : s2.cmd) || !(null == l2 ? void 0 : l2.groupID) ? "hangup" === (null === (n2 = null == h2 ? void 0 : h2.data) || void 0 === n2 ? void 0 : n2.cmd) ? (null == l2 ? void 0 : l2.groupID) ? `${this.t("message.custom.通话结束")}` : `${this.t("message.custom.通话时长")}：${function(e3) {
          const t3 = e3;
          let s3, n3, i3, r3 = "";
          return t3 >= 3600 ? (s3 = parseInt("" + t3 / 3600, 10) < 10 ? `0${parseInt("" + t3 / 3600, 10)}` : parseInt("" + t3 / 3600, 10), n3 = parseInt("" + t3 % 60 / 60, 10) < 10 ? `0${parseInt("" + t3 % 60 / 60, 10)}` : parseInt("" + t3 % 60 / 60, 10), i3 = t3 % 3600 < 10 ? "0" + t3 % 3600 : t3 % 3600, i3 > 60 && (n3 = parseInt("" + i3 / 60, 10) < 10 ? `0${parseInt("" + i3 / 60, 10)}` : parseInt("" + i3 / 60, 10), i3 = i3 % 60 < 10 ? "0" + i3 % 60 : i3 % 60), r3 = `${s3}:${n3}:${i3}`) : t3 >= 60 && t3 < 3600 ? (n3 = parseInt("" + t3 / 60, 10) < 10 ? `0${parseInt("" + t3 / 60, 10)}` : parseInt("" + t3 / 60, 10), i3 = t3 % 60 < 10 ? "0" + t3 % 60 : t3 % 60, r3 = `00:${n3}:${i3}`) : t3 < 60 && (i3 = t3 < 10 ? `0${t3}` : t3, r3 = `00:00:${i3}`), r3;
        }(null == h2 ? void 0 : h2.call_end)}` : "switchToAudio" === (null === (i2 = null == h2 ? void 0 : h2.data) || void 0 === i2 ? void 0 : i2.cmd) ? `${this.t("message.custom.切换语音通话")}` : "switchToVideo" === (null === (r2 = null == h2 ? void 0 : h2.data) || void 0 === r2 ? void 0 : r2.cmd) ? `${this.t("message.custom.切换视频通话")}` : `${this.t("message.custom.发起通话")}` : `${m2} ${this.t("message.custom.发起通话")}`;
      case 2:
        return (null == l2 ? void 0 : l2.groupID) ? `${m2} ${this.t("message.custom.取消通话")}` : this.isOldUIKit("message.custom.已取消") ? this.t("message.custom.取消通话") : (null == l2 ? void 0 : l2.inviter) === f2 ? this.t("message.custom.已取消") : this.t("message.custom.对方已取消");
      case 3:
        return "switchToAudio" === (null === (a2 = null == h2 ? void 0 : h2.data) || void 0 === a2 ? void 0 : a2.cmd) ? `${this.t("message.custom.切换语音通话")}` : "switchToVideo" === (null === (o2 = null == h2 ? void 0 : h2.data) || void 0 === o2 ? void 0 : o2.cmd) ? `${this.t("message.custom.切换视频通话")}` : (null == l2 ? void 0 : l2.groupID) ? `${m2} ${this.t("message.custom.已接听")}` : this.t("message.custom.已接听");
      case 4:
        return (null == l2 ? void 0 : l2.groupID) ? `${m2} ${this.t("message.custom.拒绝通话")}` : this.isOldUIKit("message.custom.已拒绝") ? this.t("message.custom.拒绝通话") : "line_busy" === (null == h2 ? void 0 : h2.line_busy) || "lineBusy" === (null == h2 ? void 0 : h2.data.message) ? (null == l2 ? void 0 : l2.inviter) === f2 ? this.t("message.custom.对方忙线中") : this.t("message.custom.忙线未接听") : (null == l2 ? void 0 : l2.inviter) === f2 ? this.t("message.custom.对方已拒绝") : this.t("message.custom.已拒绝");
      case 5:
        if ("switchToAudio" === (null === (u2 = null == h2 ? void 0 : h2.data) || void 0 === u2 ? void 0 : u2.cmd))
          return `${this.t("message.custom.切换语音通话")}`;
        if ("switchToVideo" === (null === (c2 = null == h2 ? void 0 : h2.data) || void 0 === c2 ? void 0 : c2.cmd))
          return `${this.t("message.custom.切换视频通话")}`;
        if (null == l2 ? void 0 : l2.groupID) {
          if (p2 === (null == l2 ? void 0 : l2.inviter)) {
            this.handleCallkitTimeoutSignaling(l2.inviteeList);
            let e3 = "";
            return null === (g2 = l2.inviteeList) || void 0 === g2 || g2.forEach((t3) => {
              const s3 = this.userShowNameMap.get(t3) || t3;
              e3 += `${this.substringByLength(s3)}、`;
            }), e3 = e3.substring(0, e3.lastIndexOf("、")), `${e3} ${this.t("message.custom.无应答")}`;
          }
          return `${m2} ${this.t("message.custom.无应答")}`;
        }
        return this.isOldUIKit("message.custom.对方无应答") ? this.t("message.custom.无应答") : (null == l2 ? void 0 : l2.inviter) === f2 ? this.t("message.custom.对方无应答") : this.t("message.custom.超时无应答");
      default:
        return "";
    }
  }
  handleCreateGroupCustomMessage(e2) {
    let t2;
    const s2 = U(e2.payload.data);
    return "group_create" === (null == s2 ? void 0 : s2.businessID) && (t2 = `${s2.opUser} ${s2.content}`), t2;
  }
  decodeText(e2) {
    const t2 = [];
    let s2 = e2.text, n2 = -1, i2 = -1;
    for (; "" !== s2; )
      switch (n2 = s2.indexOf("["), i2 = s2.indexOf("]"), n2) {
        case 0:
          if (-1 === i2)
            t2.push({ name: "text", text: s2 }), s2 = "";
          else {
            const e3 = s2.slice(0, i2 + 1);
            e3.indexOf("@custom") > -1 ? (t2.push({ name: "img", src: "", type: "custom", emojiKey: e3 }), s2 = s2.substring(i2 + 1)) : A[e3] ? (t2.push({ name: "img", src: D + A[e3], emojiKey: e3 }), s2 = s2.substring(i2 + 1)) : (t2.push({ name: "text", text: "[" }), s2 = s2.slice(1));
          }
          break;
        case -1:
          t2.push({ name: "text", text: s2 }), s2 = "";
          break;
        default:
          t2.push({ name: "text", text: s2.slice(0, n2) }), s2 = s2.substring(n2);
      }
    return t2;
  }
  handleGroupProfileUpdated(e2) {
    const { nick: t2, payload: s2 } = e2, { newGroupProfile: n2, memberList: i2, operatorID: r2 } = s2;
    let a2 = "";
    const o2 = t2 || r2, u2 = Object.keys(n2)[0];
    switch (u2) {
      case "muteAllMembers":
        a2 = n2[u2] ? `${this.t("message.tip.管理员")} ${o2} ${this.t("message.tip.开启全员禁言")}` : `${this.t("message.tip.管理员")} ${o2} ${this.t("message.tip.取消全员禁言")}`;
        break;
      case "ownerID":
        a2 = `${i2[0].nick || i2[0].userID} ${this.t("message.tip.成为新的群主")}`;
        break;
      case "groupName":
        a2 = `${o2} ${this.t("message.tip.修改群名为")} ${n2[u2]}`;
        break;
      case "notification":
        a2 = this.isOldUIKit("message.tip.把群公告修改为") ? `${o2} ${this.t("message.tip.发布新公告")}` : `${o2} ${this.t("message.tip.把群公告修改为")} "${n2[u2]}"`;
    }
    return a2;
  }
  handleCallkitTimeoutSignaling(e2 = []) {
    if (0 === e2.length)
      return;
    const t2 = this.getEngine().TUIFriend.getFriendRemark(e2), s2 = [];
    e2.forEach((e3) => {
      const n2 = t2[e3];
      n2 ? this.userShowNameMap.set(e3, n2) : this.requestedUserMap.has(e3) || (s2.push(e3), this.requestedUserMap.set(e3, 1));
    }), s2.length > 0 && this.getEngine().TUIUser.getUserProfile({ userIDList: s2 }).then((e3) => {
      (e3.data || []).forEach((e4) => {
        const { userID: t3, nick: s3 } = e4, n2 = s3 || t3;
        this.userShowNameMap.set(t3, n2);
      });
    }).catch(() => {
    });
  }
  substringByLength(e2, t2 = 12) {
    return e2.length > t2 ? `${e2.slice(0, t2)}...` : e2;
  }
  isOldUIKit(e2) {
    var t2;
    const s2 = e2.lastIndexOf("."), n2 = e2.slice(0, s2 + 1);
    return null === (t2 = this.t(e2)) || void 0 === t2 ? void 0 : t2.startsWith(n2);
  }
};
var wt = class {
  constructor(e2) {
    this.TUIChatService = e2, this.typingTo = "", this.timer = null;
  }
  getEngine() {
    return this.TUIChatService.getEngine();
  }
  clearTypingStatus() {
    this.getEngine().TUIStore.getData(o.CHAT, "typingStatus") && this.getEngine().TUIStore.update(o.CHAT, "typingStatus", false), this.timer && clearTimeout(this.timer), this.timer = null;
  }
  handleLastMessage(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.CHAT, "typingStatus");
    if (e2.type === this.getEngine().TYPES.MSG_CUSTOM && "in" === e2.flow) {
      const n2 = U(e2.payload.data);
      if (n2.businessID === c.BUSINESS_ID) {
        const { typingStatus: e3, userAction: i2 } = n2;
        if (e3 === c.STATUS_START || i2 === c.ACTION_START_ID)
          return s2 ? (this.timer && clearTimeout(this.timer), this.timer = null) : t2.TUIStore.update(o.CHAT, "typingStatus", true), this.timer = setTimeout(() => {
            this.clearTypingStatus();
          }, 3e4), t2.TUIStore.getData(o.CHAT, "typingStatus");
        e3 !== c.STATUS_END && i2 !== c.ACTION_END_ID || this.clearTypingStatus();
      }
    }
  }
  filterTypingMessage(e2 = []) {
    if (0 === e2.length)
      return [];
    return this.getEngine().TUIStore.getData(o.APP, "enableTyping") && this.handleLastMessage(e2[e2.length - 1]), e2.filter((e3) => {
      if (e3.type === this.getEngine().TYPES.MSG_CUSTOM) {
        return U(e3.payload.data).businessID !== c.BUSINESS_ID;
      }
      return true;
    });
  }
  createTypingMessage(e2 = c.STATUS_END, t2 = "") {
    const { BUSINESS_ID: s2, STATUS_START: n2, VERSION: i2, ACTION_START_ID: r2, ACTION_END_ID: a2, ACTION_START: o2, ACTION_END: u2, NEED_TYPING: g2 } = c;
    return { to: t2, conversationType: this.getEngine().TYPES.CONV_C2C, payload: { data: JSON.stringify({ businessID: s2, typingStatus: e2, version: i2, userAction: e2 === n2 ? r2 : a2, actionParam: e2 === n2 ? o2 : u2 }), description: "", extension: "" }, cloudCustomData: JSON.stringify({ messageFeature: { needTyping: g2, version: i2 } }) };
  }
  sendTyping(e2 = false, t2 = "") {
    if (e2) {
      this.typingTo = t2;
      const e3 = this.createTypingMessage(c.STATUS_START, t2);
      this.getEngine().TUIChat.sendCustomMessage(e3, { onlineUserOnly: true });
    } else
      this.sendTypingEnd();
  }
  sendTypingEnd() {
    if (this.typingTo) {
      const e2 = this.createTypingMessage(c.STATUS_END, this.typingTo);
      this.getEngine().TUIChat.sendCustomMessage(e2, { onlineUserOnly: true });
    }
    this.typingTo = "";
  }
};
var Vt = class {
  constructor(e2) {
    this.TUIChatService = e2;
  }
  getEngine() {
    return this.TUIChatService.getEngine();
  }
  init() {
    const e2 = this.getEngine();
    e2.eventCenter.addEvent(e2.EVENT.MESSAGE_READ_RECEIPT_RECEIVED, this.onMessageReadReceiptReceived.bind(this));
  }
  onMessageReadReceiptReceived(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.CONV, "currentConversationID"), n2 = [];
    e2.forEach((e3) => {
      const { messageID: i2 } = e3, r2 = t2.chat.findMessage(i2);
      r2 && s2 === r2.conversationID && n2.push(r2);
    }), n2.length > 0 && t2.TUIChat.updateMessageList(n2, "edit");
  }
  sendMessageReadReceipt(e2) {
    const t2 = [];
    return e2.forEach((e3) => {
      const s2 = e3.getMessage();
      t2.push(s2);
    }), this.getEngine().chat.sendMessageReadReceipt(t2);
  }
  getGroupMessageReadMemberList(e2) {
    const t2 = e2.message.getMessage(), s2 = Object.assign(Object.assign({}, e2), { message: t2 });
    return this.getEngine().chat.getGroupMessageReadMemberList(s2);
  }
  getMessageReadReceiptList(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.APP, "enabledMessageReadReceipt"), n2 = t2.TUIStore.getData(o.USER, "displayMessageReadReceipt");
    !s2 || !n2 || 0 === e2.length || e2[0].conversationType !== t2.TYPES.CONV_GROUP || t2.chat.getMessageReadReceiptList(e2).then((e3) => {
      const { messageList: t3 } = e3.data;
      this.TUIChatService.updateMessageList(t3, "edit");
    }).catch((e3) => {
      console.warn(`ReadReceiptHandler.getMessageReadReceiptList error:${e3.message}`);
    });
  }
};
var Ft = class _Ft extends ne {
  constructor() {
    super(), this.serv = "TUIChatService", this.messageHandler = new Gt(this), this.typingHandler = new wt(this), this.readReceiptHandler = new Vt(this), this.isSwitching = true, this.delayGetHoppingFunction = void 0, this.hoppingConfigMap = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return _Ft.instance || (_Ft.instance = new _Ft()), _Ft.instance;
  }
  init() {
    const e2 = this.getEngine();
    e2.eventCenter.addEvent(e2.EVENT.MESSAGE_RECEIVED, this.onMessageReceived.bind(this)), e2.eventCenter.addEvent(e2.EVENT.MESSAGE_MODIFIED, this.onMessageModified.bind(this)), e2.eventCenter.addEvent(e2.EVENT.MESSAGE_REVOKED, this.onMessageRevoked.bind(this)), e2.eventCenter.addEvent(e2.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer.bind(this)), e2.eventCenter.addEvent(e2.EVENT.MESSAGE_REACTIONS_UPDATED, this.onMessageReactionsUpdated.bind(this)), this.onCurrentConversationIDUpdated(), this.onMessageSource(), this.readReceiptHandler.init();
  }
  onMessageReceived(e2) {
    this.updateMessageList(e2, "received"), this.getEngine().TUIStore.update(o.CHAT, "newMessageList", e2);
  }
  onMessageModified(e2) {
    this.updateMessageList(e2, "edit");
  }
  onMessageRevoked(e2) {
    this.updateMessageList(e2, "edit");
  }
  onMessageReadByPeer(e2) {
    this.updateMessageList(e2, "edit");
  }
  onMessageReactionsUpdated(e2) {
    this.updateMessageReactionList([e2]);
  }
  onCurrentConversationIDUpdated() {
    const e2 = this.getEngine();
    e2.TUIStore.watch(o.CONV, { currentConversationID: (t2) => {
      this.isSwitching = true, this.delayGetHoppingFunction = void 0, this.hoppingConfigMap.clear(), e2.TUIStore.reset(o.CHAT), this.typingHandler.clearTypingStatus(), this.typingHandler.sendTypingEnd(), ie(t2) || this.getMessageList().finally(() => {
        this.isSwitching = false, this.delayGetHoppingFunction && this.delayGetHoppingFunction();
      });
    } });
  }
  onMessageSource() {
    const e2 = this.getEngine();
    e2.TUIStore.watch(o.CHAT, { messageSource: (t2) => {
      const s2 = this.getStoreData(o.CONV, "currentConversationID");
      if (!s2 || t2 && t2.conversationID !== s2)
        return;
      if (S(t2))
        return this.hoppingConfigMap.clear(), e2.TUIStore.update(o.CHAT, "messageList", []), e2.TUIStore.update(o.CHAT, "nextReqMessageID", ""), e2.TUIStore.update(o.CHAT, "isCompleted", false), void this.getMessageList();
      const n2 = this.getStoreData(o.CHAT, "messageList");
      n2 && n2.find((e3) => t2 && e3.ID === t2.ID) || (this.isSwitching ? this.delayGetHoppingFunction = this.getMessageListHoppingForDown : this.getMessageListHoppingForDown());
    } });
  }
  getMessageListHoppingForDown() {
    const e2 = this.getStoreData(o.CHAT, "messageList"), { conversationID: t2, sequence: s2, time: n2, ID: i2 } = this.getStoreData(o.CHAT, "messageSource");
    if (e2 && e2.find((e3) => i2 && e3.ID === i2))
      return;
    const r2 = this.getEngine();
    r2.TUIStore.update(o.CHAT, "messageList", []), r2.TUIStore.update(o.CHAT, "nextReqMessageID", ""), r2.TUIStore.update(o.CHAT, "isCompleted", false), this.getMessageListHopping({ conversationID: t2, sequence: s2, time: n2, direction: 1 });
  }
  getStoreData(e2, t2) {
    return this.getEngine().TUIStore.getData(e2, t2);
  }
  sendMessage(e2, t2) {
    this.updateMessageList([e2], "send");
    const s2 = this.getEngine().chat.sendMessage(e2, t2);
    return this.getResponse(s2);
  }
  getResponse(e2, t2 = true, s2 = true) {
    return e2.then((e3) => {
      const s3 = e3.data.messageList ? e3.data.messageList : [e3.data.message];
      return t2 && this.updateMessageList(s3, "edit"), e3;
    }).catch((e3) => {
      var t3;
      return s2 && (null === (t3 = null == e3 ? void 0 : e3.data) || void 0 === t3 ? void 0 : t3.message) && this.updateMessageList([e3.data.message], "edit"), Promise.reject(e3);
    });
  }
  updateMessageList(e2, t2 = "") {
    if (this.getStoreData(o.CHAT, "messageSource") && "unshift" !== t2 && "edit" !== t2)
      return;
    const s2 = this.getStoreData(o.CHAT, "messageList"), n2 = this.updateTargetMessageList(e2, s2, t2);
    this.getEngine().TUIStore.update(o.CHAT, "messageList", n2);
  }
  updateTargetMessageList(e2, t2, s2 = "") {
    const n2 = this.getStoreData(o.CONV, "currentConversationID");
    let i2 = e2.filter((e3) => e3.conversationID === n2);
    if (i2 = this.handleC2CCallSignaling(i2), !s2 || 0 === i2.length)
      return t2;
    const r2 = t2 || [];
    let a2 = [];
    if ("send" === s2 || "push" === s2) {
      const e3 = this.getStoreData(o.CHAT, "userInfo");
      Object.keys(e3).length > 0 && this.updateLocalMessage(i2, e3);
    }
    switch (s2) {
      case "edit":
        for (const e3 of t2) {
          const t3 = i2.find((t4) => t4.ID === e3.ID);
          a2.push(t3 || e3);
        }
        break;
      case "resend":
        a2 = r2.filter((e3) => e3.ID !== i2[0].ID).concat(i2);
        break;
      case "send":
        a2 = r2.concat(this.typingHandler.filterTypingMessage(i2));
        break;
      case "push":
        a2 = r2.concat(this.typingHandler.filterTypingMessage(i2)), this.getEngine().chat.setMessageRead({ conversationID: n2 });
        break;
      case "received":
        a2 = r2.concat(this.typingHandler.filterTypingMessage(i2)), a2 = this.sortMessageList(a2), this.getEngine().chat.setMessageRead({ conversationID: n2 });
        break;
      case "unshift":
        a2 = i2.filter((e3) => 0 === r2.length || !r2.find((t3) => t3.ID === e3.ID)), a2.push(...r2), a2 = this.sortMessageList(a2);
    }
    return a2;
  }
  enterTypingState() {
    this.getStoreData(o.APP, "enableTyping") && this.sendTyping(true);
  }
  leaveTypingState() {
    this.getStoreData(o.APP, "enableTyping") && this.sendTyping(false);
  }
  sendTyping(e2) {
    const t2 = this.getEngine(), s2 = this.getStoreData(o.CONV, "currentConversationID");
    if (!s2.startsWith(t2.TYPES.CONV_C2C))
      return;
    const n2 = s2.replace(t2.TYPES.CONV_C2C, "");
    if (e2) {
      const e3 = this.getStoreData(o.CHAT, "messageList").filter((e4) => "in" === e4.flow);
      if (0 === e3.length)
        return;
      const t3 = 1e3 * e3[e3.length - 1].time;
      if ((/* @__PURE__ */ new Date()).getTime() - t3 > 3e4)
        return;
    }
    this.typingHandler.sendTyping(e2, n2);
  }
  quoteMessage(e2) {
    var t2;
    return this.getEngine().TUIStore.update(o.CHAT, "quoteMessage", { message: e2, type: "quote" }), null === (t2 = this.getEngine().TUIReport) || void 0 === t2 || t2.reportFeature(205), e2;
  }
  replyMessage(e2) {
    return this.getEngine().TUIStore.update(o.CHAT, "quoteMessage", { message: e2, type: "reply" }), e2;
  }
  getCurrentConvInfo() {
    const { conversationID: e2 = "", type: t2 } = this.getStoreData(o.CONV, "currentConversation") || {};
    return { to: e2.replace(t2, ""), conversationType: t2 };
  }
  t(e2) {
    return this.getEngine().TUITranslate.t(e2) || e2;
  }
  getMessageAbstractAndType(e2) {
    var t2, s2;
    const n2 = this.getEngine(), i2 = { abstract: "", type: 0 };
    switch (e2.type) {
      case n2.TYPES.MSG_TEXT:
        i2.abstract = null === (t2 = null == e2 ? void 0 : e2.payload) || void 0 === t2 ? void 0 : t2.text, i2.type = 1;
        break;
      case n2.TYPES.MSG_CUSTOM:
        i2.abstract = "[自定义消息]", i2.type = 2;
        break;
      case n2.TYPES.MSG_IMAGE:
        i2.abstract = "[图片]", i2.type = 3;
        break;
      case n2.TYPES.MSG_AUDIO:
        i2.abstract = "[语音]", i2.type = 4;
        break;
      case n2.TYPES.MSG_VIDEO:
        i2.abstract = "[视频]", i2.type = 5;
        break;
      case n2.TYPES.MSG_FILE:
        i2.abstract = "[文件]", i2.type = 6;
        break;
      case n2.TYPES.MSG_LOCATION:
        i2.type = 7;
        break;
      case n2.TYPES.MSG_FACE:
        i2.abstract = "[表情]", i2.type = 8;
        break;
      case n2.TYPES.MSG_GRP_TIP:
        i2.type = 9;
        break;
      case n2.TYPES.MSG_MERGER:
        i2.abstract = null === (s2 = null == e2 ? void 0 : e2.payload) || void 0 === s2 ? void 0 : s2.title, i2.type = 10;
    }
    return i2;
  }
  genMessageReply(e2, t2) {
    if ("reply" !== t2 && "quote" !== t2)
      return {};
    const { abstract: s2, type: n2 } = this.getMessageAbstractAndType(e2), i2 = { messageAbstract: s2, messageSender: e2.nick || e2.from, messageID: e2.ID }, r2 = Object.assign(Object.assign({}, i2), { messageType: n2, messageTime: null == e2 ? void 0 : e2.time, messageSequence: null == e2 ? void 0 : e2.sequence, version: 1 });
    if ("reply" === t2 && (r2.messageRootID = e2.ID, e2.cloudCustomData)) {
      const t3 = U(e2.cloudCustomData);
      t3.messageReply && t3.messageReply.messageRootID && (r2.messageRootID = t3.messageReply.messageRootID);
    }
    return { messageReply: r2, messageReplyRoot: i2 };
  }
  getMessageInfo(e2, t2, s2) {
    const { messageReply: n2, messageReplyRoot: i2 } = this.genMessageReply(t2, s2), r2 = e2.cloudCustomData ? U(e2.cloudCustomData) : {};
    let a2;
    if (r2.messageReply ? r2.messageReply = Object.assign(Object.assign({}, n2), r2.messageReply) : r2.messageReply = n2, "reply" === s2) {
      const { messageRootID: e3 } = n2;
      a2 = this.getEngine().chat.findMessage(e3);
      const t3 = (null == a2 ? void 0 : a2.cloudCustomData) ? U(a2.cloudCustomData) : {};
      t3.messageReplies || (t3.messageReplies = {}), o2 = t3.messageReplies.replies, ("function" == typeof Array.isArray ? Array.isArray(o2) : "array" === Object.prototype.toString.call(o2).match(/^\[object (.*)\]$/)[1].toLowerCase()) || (t3.messageReplies.replies = []), t3.messageReplies.replies.push(i2), a2.cloudCustomData = JSON.stringify(t3);
    }
    var o2;
    return { cloudCustomData: JSON.stringify(r2), rootMessage: a2 };
  }
  sendTextMessage(e2, t2) {
    const s2 = this.getEngine(), { message: n2, type: i2 } = this.getStoreData(o.CHAT, "quoteMessage");
    let r2 = { cloudCustomData: e2.cloudCustomData || "", rootMessage: void 0 };
    n2 && (r2 = this.getMessageInfo(e2, n2, i2));
    const a2 = s2.chat.createTextMessage(Object.assign(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2), { cloudCustomData: r2.cloudCustomData }));
    return this.sendMessage(a2, t2).then((e3) => (r2.rootMessage && this.modifyMessage(r2.rootMessage), s2.TUIStore.reset(o.CHAT, ["quoteMessage"], true), e3));
  }
  sendTextAtMessage(e2, t2) {
    const s2 = this.getEngine(), { message: n2, type: i2 } = this.getStoreData(o.CHAT, "quoteMessage");
    let r2 = { cloudCustomData: e2.cloudCustomData || "", rootMessage: void 0 };
    n2 && (r2 = this.getMessageInfo(e2, n2, i2));
    const a2 = s2.chat.createTextAtMessage(Object.assign(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2), { cloudCustomData: r2.cloudCustomData }));
    return this.sendMessage(a2, t2).then((e3) => (r2.rootMessage && this.modifyMessage(r2.rootMessage), s2.TUIStore.reset(o.CHAT, ["quoteMessage"], true), e3));
  }
  sendImageMessage(e2, t2) {
    const s2 = this.getEngine().chat.createImageMessage(Object.assign(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2), { onProgress: (e3) => {
      this.onProgress(s2.ID, e3);
    } }));
    return this.sendMessage(s2, t2);
  }
  sendAudioMessage(e2, t2) {
    const s2 = this.getEngine().chat.createAudioMessage(Object.assign(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2), { onProgress: (e3) => {
      this.onProgress(s2.ID, e3);
    } }));
    return this.sendMessage(s2, t2);
  }
  sendVideoMessage(e2, t2) {
    const s2 = this.getEngine().chat.createVideoMessage(Object.assign(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2), { onProgress: (e3) => {
      this.onProgress(s2.ID, e3);
    } }));
    return this.sendMessage(s2, t2);
  }
  sendCustomMessage(e2, t2) {
    const s2 = this.getEngine().chat.createCustomMessage(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2));
    return this.sendMessage(s2, t2);
  }
  sendFaceMessage(e2, t2) {
    const s2 = this.getEngine().chat.createFaceMessage(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2));
    return this.sendMessage(s2, t2);
  }
  sendFileMessage(e2, t2) {
    const s2 = this.getEngine().chat.createFileMessage(Object.assign(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2), { onProgress: (e3) => {
      this.onProgress(s2.ID, e3);
    } }));
    return this.sendMessage(s2, t2);
  }
  sendLocationMessage(e2, t2) {
    const s2 = this.getEngine().chat.createLocationMessage(Object.assign(Object.assign({}, this.getCurrentConvInfo()), e2));
    return this.sendMessage(s2, t2);
  }
  onProgress(e2, t2) {
    const s2 = this.getEngine().TUIStore.getMessageModel(e2);
    if (s2) {
      (t2 - s2.progress >= 0.1 || 1 === t2) && (s2.progress = t2, this.updateMessageList([s2], "edit"));
    }
  }
  setAbstractList(e2) {
    const t2 = this.getEngine(), s2 = e2.nick || e2.from;
    let n2 = "";
    switch (e2.type) {
      case t2.TYPES.MSG_TEXT:
        n2 = e2.payload.text || "", n2.length > 20 && (n2 = n2.slice(0, 20));
        break;
      case t2.TYPES.MSG_MERGER:
        n2 = `${this.t("TUIChat.[聊天记录]")}`;
        break;
      case t2.TYPES.MSG_IMAGE:
        n2 = `${this.t("TUIChat.[图片]")}`;
        break;
      case t2.TYPES.MSG_AUDIO:
        n2 = `${this.t("TUIChat.[音频]")}`;
        break;
      case t2.TYPES.MSG_VIDEO:
        n2 = `${this.t("TUIChat.[视频]")}`;
        break;
      case t2.TYPES.MSG_CUSTOM:
        n2 = `${this.t("TUIChat.[自定义消息]")}`;
        break;
      case t2.TYPES.MSG_FILE:
        n2 = `${this.t("TUIChat.[文件]")}`;
        break;
      case t2.TYPES.MSG_FACE:
        n2 = `${this.t("TUIChat.[动画表情]")}`;
    }
    return `${s2}: ${n2}`;
  }
  genMergerForwardPayload(e2, t2) {
    const { abstractList: s2 = [], compatibleText: n2 = "", title: i2 } = t2;
    return 0 === s2.length && e2.forEach((e3) => {
      s2.push(this.setAbstractList(e3));
    }), { messageList: e2, title: i2, abstractList: s2, compatibleText: n2 || this.t("TUIChat.请升级IMSDK到v2.10.1或更高版本查看此消息") };
  }
  genSendMergerForwardMessage(e2) {
    const { conversationList: t2, messageList: s2, params: n2, mergeInfo: i2, sendMessageOptions: r2 } = e2, a2 = [];
    for (let e3 = 0; e3 < t2.length; e3++) {
      const { conversationID: o2, type: u2 } = t2[e3], c2 = Object.assign({ to: o2.replace(`${u2}`, ""), conversationType: u2, payload: this.genMergerForwardPayload(s2, i2) }, n2), g2 = this.getEngine().chat.createMergerMessage(c2);
      a2.push(this.sendMessage(g2, r2));
    }
    return a2;
  }
  genTitle(e2, t2) {
    const { nick: s2, from: n2, to: i2 } = e2;
    return `${s2 || n2} ${this.t("TUIChat.和")} ${t2 || i2} ${this.t("TUIChat.的聊天记录")}`;
  }
  genMergeInfo(e2) {
    var t2;
    return i(this, void 0, void 0, function* () {
      const { messageList: s2, mergeInfo: n2 } = e2;
      if (n2.title)
        return n2;
      if (s2[0].conversationType === this.getEngine().TYPES.CONV_GROUP)
        return n2.title = this.t("TUIChat.群聊的聊天记录"), n2;
      try {
        const { data: e3 = [] } = yield this.getEngine().TUIUser.getUserProfile({ userIDList: [s2[0].to] });
        n2.title = this.genTitle(s2[0], null === (t2 = e3[0]) || void 0 === t2 ? void 0 : t2.nick);
      } catch (e3) {
        n2.title = this.genTitle(s2[0]);
      }
      return n2;
    });
  }
  sendMergerForwardMessage(e2) {
    return i(this, void 0, void 0, function* () {
      return e2.mergeInfo = yield this.genMergeInfo(e2), Promise.all(this.genSendMergerForwardMessage(e2));
    });
  }
  getOriginMessageList(e2) {
    return e2.map((e3) => e3 instanceof ue ? e3.getMessage() : e3);
  }
  sendForwardMessage(e2, t2, s2) {
    t2 = this.getOriginMessageList(t2);
    const i2 = s2 || {}, { needMerge: r2 = false, params: a2 = {}, mergeInfo: o2 = {} } = i2, u2 = n(i2, ["needMerge", "params", "mergeInfo"]);
    if (r2)
      return this.sendMergerForwardMessage({ conversationList: e2, messageList: t2, params: a2, mergeInfo: o2, sendMessageOptions: u2 });
    const c2 = [];
    for (let s3 = 0; s3 < e2.length; s3++) {
      const { conversationID: n2, type: i3 } = e2[s3], r3 = Object.assign({ to: n2.replace(`${i3}`, ""), conversationType: i3 }, a2), o3 = u2[n2] || u2;
      for (let e3 = 0; e3 < t2.length; e3++) {
        Reflect.set(r3, "payload", t2[e3]);
        const s4 = this.getEngine().chat.createForwardMessage(r3);
        c2.push(this.sendMessage(s4, o3));
      }
    }
    return Promise.all(c2);
  }
  revokeMessage(e2) {
    const t2 = this.getEngine().chat.revokeMessage(e2);
    return this.getResponse(t2, true, false);
  }
  resendMessage(e2) {
    e2.status = "unSend", this.updateMessageList([e2], "resend");
    const t2 = this.getEngine().chat.resendMessage(e2);
    return this.getResponse(t2, true, true);
  }
  deleteMessage(e2) {
    const t2 = this.getEngine().chat.deleteMessage(e2);
    return this.getResponse(t2, true, false);
  }
  setMessageExtensions(e2, t2) {
    return this.getEngine().chat.setMessageExtensions(e2, t2);
  }
  getMessageExtensions(e2) {
    return this.getEngine().chat.getMessageExtensions(e2);
  }
  deleteMessageExtensions(e2, t2) {
    return this.getEngine().chat.deleteMessageExtensions(e2, t2);
  }
  modifyMessage(e2) {
    const t2 = this.getEngine().chat.modifyMessage(e2);
    return this.getResponse(t2, true, false).catch((e3) => {
      const { code: t3 = 0, data: s2 = {} } = e3.code;
      throw t3 === l.MSG_MODIFY_CONFLICT ? console.warn(`${p.MSG_MODIFY_CONFLICT} data.message: ${null == s2 ? void 0 : s2.message}`) : t3 === l.MSG_MODIFY_DISABLED_IN_AVCHATROOM ? console.warn(p.MSG_MODIFY_DISABLED_IN_AVCHATROOM) : t3 === l.MODIFY_MESSAGE_NOT_EXIST && console.warn(p.MODIFY_MESSAGE_NOT_EXIST), e3;
    });
  }
  getMessageList(e2 = { conversationID: this.getStoreData(o.CONV, "currentConversationID"), nextReqMessageID: this.getStoreData(o.CHAT, "nextReqMessageID") }) {
    const t2 = this.getEngine();
    if (!t2.chat.isReady())
      return Promise.reject({ code: h.GET_MSG_LIST_ERROR, message: d.GET_MSG_LIST_ERROR });
    if (this.getStoreData(o.CHAT, "isCompleted"))
      return Promise.resolve({ data: { messageList: [], nextReqMessageID: "", isCompleted: true } });
    const s2 = this.getStoreData(o.CHAT, "messageSource"), n2 = this.hoppingConfigMap.get("nextMessageSeq"), i2 = this.hoppingConfigMap.get("nextMessageTime"), r2 = n2 || i2;
    return s2 && s2.conversationID === (null == e2 ? void 0 : e2.conversationID) && r2 ? this.getMessageListHopping() : t2.chat.getMessageList(e2).then((e3) => {
      var s3;
      const { messageList: n3, nextReqMessageID: i3, isCompleted: r3 } = e3.data, a2 = this.getStoreData(o.CHAT, "userInfo");
      Object.keys(a2).length > 0 && this.updateLocalMessage(n3, a2), this.updateMessageList(n3, "unshift"), t2.TUIStore.update(o.CHAT, "nextReqMessageID", i3), t2.TUIStore.update(o.CHAT, "isCompleted", r3);
      const u2 = null === (s3 = n3[0]) || void 0 === s3 ? void 0 : s3.conversationID, { operationType: c2 = 0 } = this.getEngine().TUIStore.getConversationModel(u2) || {};
      return 0 === c2 && (this.getMessageReactions({ messageList: n3 }), this.readReceiptHandler.getMessageReadReceiptList(n3)), e3;
    }).catch((e3) => Promise.reject(e3));
  }
  getMessageListHopping(e2) {
    var t2;
    void 0 === e2 && (e2 = { conversationID: null === (t2 = this.getStoreData(o.CHAT, "messageSource")) || void 0 === t2 ? void 0 : t2.conversationID, sequence: this.hoppingConfigMap.get("nextMessageSeq"), time: this.hoppingConfigMap.get("nextMessageTime") });
    const s2 = this.getEngine();
    return s2.chat.getMessageListHopping(e2).then((t3) => {
      const { messageList: n2, nextMessageSeq: i2, nextMessageTime: r2, isCompleted: a2 } = t3.data, u2 = 1 === e2.direction ? e2.sequence : i2, c2 = 1 === e2.direction ? e2.time : r2;
      return this.updateMessageList(n2, "unshift"), this.delayGetHoppingFunction = void 0, this.hoppingConfigMap.set("nextMessageSeq", u2), this.hoppingConfigMap.set("nextMessageTime", c2), s2.TUIStore.update(o.CHAT, "isCompleted", a2), t3;
    }).catch((e3) => Promise.reject(e3));
  }
  sendMessageReadReceipt(e2) {
    return this.readReceiptHandler.sendMessageReadReceipt(e2);
  }
  getGroupMessageReadMemberList(e2) {
    return this.readReceiptHandler.getGroupMessageReadMemberList(e2).then((e3) => {
      const { isCompleted: t2, cursor: s2, messageID: n2, unreadUserIDList: i2, readUserIDList: r2 } = e3.data, a2 = { code: 0, data: { cursor: s2, isCompleted: t2, messageID: n2, unreadUserInfoList: [], readUserInfoList: [] } }, o2 = [...i2, ...r2];
      return 0 === o2.length ? a2 : this.getEngine().TUIUser.getUserProfile({ userIDList: o2 }).then((e4) => (i2.length > 0 ? e4.data.forEach((e5) => {
        const { userID: t3, nick: s3 = "", avatar: n3 = "" } = e5;
        a2.data.unreadUserInfoList.push({ userID: t3, nick: s3, avatar: n3 });
      }) : e4.data.forEach((e5) => {
        const { userID: t3, nick: s3 = "", avatar: n3 = "" } = e5;
        a2.data.readUserInfoList.push({ userID: t3, nick: s3, avatar: n3 });
      }), a2));
    });
  }
  downloadMergedMessages(e2) {
    return this.getEngine().chat.downloadMergerMessage(e2);
  }
  setTranslationLanguage(e2) {
    this.getEngine().TUIStore.update(o.USER, "targetLanguage", e2);
  }
  translateText(e2) {
    const t2 = this.getStoreData(o.USER, "targetLanguage"), s2 = Object.assign({ targetLanguage: t2, sourceLanguage: "auto" }, e2);
    return this.getEngine().chat.translateText(s2);
  }
  searchCloudMessages(e2) {
    const t2 = this.getStoreData(o.CONV, "conversationList");
    return this.getEngine().chat.searchCloudMessages(e2).then((e3) => {
      const { searchResultList: s2 } = e3.data;
      return e3.data.searchResultList = s2.map((e4) => {
        const { messageList: s3, conversationID: i2 } = e4, r2 = n(e4, ["messageList", "conversationID"]), a2 = s3.map((e5) => new ue(e5)), o2 = t2.find((e5) => e5.conversationID === i2);
        return Object.assign(Object.assign({}, r2), { messageList: a2.sort((e5, t3) => t3.time - e5.time), conversation: o2 });
      }), e3;
    });
  }
  addMessageReaction(e2, t2) {
    return this.getEngine().chat.addMessageReaction(e2.getMessage(), t2);
  }
  removeMessageReaction(e2, t2) {
    return this.getEngine().chat.removeMessageReaction(e2.getMessage(), t2);
  }
  getMessageReactions(e2) {
    const { messageList: t2 = [] } = e2, s2 = this.getStoreData(o.APP, "enabledEmojiPlugin");
    console.log(`TUIChatService.getMessageReactions enabledEmojiPlugin:${s2} messageList length:${t2.length}`), s2 && t2.length > 0 && this.getEngine().chat.getMessageReactions(e2).then((e3) => {
      const t3 = e3.data.resultList || e3.data;
      this.updateMessageReactionList(t3);
    }).catch(() => {
    });
  }
  getAllUserListOfMessageReaction(e2) {
    var t2;
    return this.getEngine().chat.getAllUserListOfMessageReaction(Object.assign(Object.assign({}, e2), { message: null === (t2 = null == e2 ? void 0 : e2.message) || void 0 === t2 ? void 0 : t2.getMessage() }));
  }
  updateMessageReactionList(e2) {
    const t2 = [];
    e2.forEach((e3) => {
      const { messageID: s2, reactionList: n2 } = e3, i2 = this.getEngine().TUIStore.getMessageModel(s2);
      if (i2) {
        const e4 = [];
        for (let t3 = 0; t3 < n2.length; t3++) {
          let s3 = true;
          for (let e5 = 0; e5 < i2.reactionList.length; e5++)
            if (n2[t3].reactionID === i2.reactionList[e5].reactionID) {
              i2.reactionList[e5] = n2[t3], s3 = false;
              break;
            }
          s3 && e4.push(n2[t3]);
        }
        i2.reactionList.push(...e4), e4.length = 0, t2.push(i2);
      }
    }), t2.length > 0 && this.updateMessageList(t2, "edit");
  }
  convertVoiceToText(e2) {
    const { message: t2, language: s2 = "zh" } = e2, n2 = t2.getMessage();
    return this.getEngine().chat.convertVoiceToText({ message: n2, language: s2 });
  }
  clearHistoryMessage(e2) {
    const t2 = this.getEngine();
    return t2.chat.clearHistoryMessage(e2).then((e3) => (t2.TUIStore.update(o.CHAT, "messageList", []), t2.TUIStore.update(o.CHAT, "nextReqMessageID", ""), t2.TUIStore.update(o.CHAT, "isCompleted", false), e3));
  }
  updateMessageInfo(e2) {
    const t2 = this.getStoreData(o.CHAT, "userInfo");
    this.getEngine().TUIStore.update(o.CHAT, "userInfo", Object.assign(t2, e2));
    const s2 = this.getStoreData(o.CHAT, "messageList");
    if (s2.length > 0) {
      this.updateLocalMessage(s2, e2) && this.getEngine().TUIStore.update(o.CHAT, "messageList", s2);
    }
  }
  updateLocalMessage(e2, t2) {
    let s2 = false;
    return e2.forEach((e3) => {
      if (t2[e3.from]) {
        const { nick: n2, nameCard: i2, avatar: r2 } = t2[e3.from];
        n2 && (e3.nick = n2, s2 = true), i2 && (e3.nameCard = i2, s2 = true), r2 && (e3.avatar = r2, s2 = true);
      }
    }), s2;
  }
  handleC2CCallSignaling(e2) {
    const t2 = this.getEngine(), s2 = t2.getMyUserID();
    return e2.filter((e3) => {
      var n2, i2, r2, a2, u2;
      const { conversationType: c2, type: g2, payload: l2 } = e3;
      let h2 = true;
      if (c2 === t2.TYPES.CONV_C2C && g2 === t2.TYPES.MSG_CUSTOM) {
        if (t2.chat.getSignalingInfo(e3)) {
          const t3 = U(l2.data);
          if (1 === (null == t3 ? void 0 : t3.businessID)) {
            const c3 = U(t3.data);
            if (h2 = !(e3._isExcludedFromUnreadCount && e3._isExcludedFromLastMessage), h2 && true !== (null === (n2 = null == c3 ? void 0 : c3.data) || void 0 === n2 ? void 0 : n2.consumed)) {
              let n3 = null === (i2 = null == c3 ? void 0 : c3.data) || void 0 === i2 ? void 0 : i2.inviter;
              "line_busy" !== (null == c3 ? void 0 : c3.line_busy) && "lineBusy" !== (null === (r2 = null == c3 ? void 0 : c3.data) || void 0 === r2 ? void 0 : r2.message) || (n3 = t3.inviter);
              const { from: g3, to: l3 } = e3;
              if (n3 !== s2 && e3.from === s2) {
                const t4 = this.getStoreData(o.CONV, "currentConversation");
                e3.from = l3, e3.to = g3, e3.flow = "in", e3.avatar = (null === (a2 = null == t4 ? void 0 : t4.userProfile) || void 0 === a2 ? void 0 : a2.avatar) || "";
              }
              if (n3 === s2 && e3.from !== s2) {
                const t4 = this.getStoreData(o.USER, "userProfile");
                e3.from = l3, e3.to = g3, e3.flow = "out", e3.avatar = null == t4 ? void 0 : t4.avatar;
              }
              console.log(`${this.serv}.handleC2CCallSignaling myUserID:${s2} callSignaling.inviter:${t3.inviter} customData.data.inviter:${null === (u2 = null == c3 ? void 0 : c3.data) || void 0 === u2 ? void 0 : u2.inviter}`);
            }
          }
        }
      }
      return h2;
    });
  }
  sortMessageList(e2) {
    const { conversationType: t2 } = e2[0];
    if (t2 === this.getEngine().TYPES.CONV_C2C)
      return e2.sort((e3, t3) => e3.time - t3.time);
    const s2 = e2.filter((e3) => "success" === e3.status).sort((e3, t3) => e3.sequence - t3.sequence);
    for (let t3 = 0; t3 < e2.length; t3++)
      "success" !== e2[t3].status && s2.splice(t3, 0, e2[t3]);
    return s2;
  }
};
var $t = class _$t extends ne {
  constructor() {
    super(), this.groupMap = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return _$t.instance || (_$t.instance = new _$t()), _$t.instance;
  }
  init() {
    const e2 = this.getEngine();
    e2.eventCenter.addEvent(e2.EVENT.GROUP_LIST_UPDATED, this.onGroupListUpdated.bind(this)), e2.eventCenter.addEvent(e2.EVENT.GROUP_ATTRIBUTES_UPDATED, this.onGroupAttributesUpdated.bind(this)), e2.eventCenter.addEvent(e2.EVENT.GROUP_COUNTER_UPDATED, this.onGroupCounterUpdated.bind(this)), e2.eventCenter.addEvent(e2.EVENT.MESSAGE_RECEIVED, this.onMessageReceived.bind(this)), this.getGroupInitData();
  }
  onGroupListUpdated(e2) {
    const t2 = this.getEngine();
    t2.TUIStore.update(o.GRP, "groupList", e2);
    const s2 = t2.TUIStore.getData(o.GRP, "currentGroupID");
    e2.forEach((e3) => {
      e3.groupID === s2 && t2.TUIStore.update(o.GRP, "currentGroup", e3);
    });
  }
  onGroupAttributesUpdated(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.GRP, "currentGroupID");
    let n2 = t2.TUIStore.getData(o.GRP, "groupList");
    const { groupID: i2, groupAttributes: r2 } = e2;
    s2 === i2 && t2.TUIStore.update(o.GRP, "currentGroupAttributes", r2), n2 = n2.map((e3) => (e3.groupID === i2 && (e3.groupAttributes = r2), e3)), t2.TUIStore.update(o.GRP, "groupList", n2);
  }
  onGroupCounterUpdated(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.GRP, "currentGroupID"), n2 = t2.TUIStore.getData(o.GRP, "currentGroupCounters") || {};
    let i2 = t2.TUIStore.getData(o.GRP, "groupList");
    const { groupID: r2, key: a2, value: u2 } = e2;
    s2 === r2 && (n2[a2] = u2, t2.TUIStore.update(o.GRP, "currentGroupCounters", n2)), i2 = i2.map((e3) => (e3.groupID === r2 && (e3.groupCounters = Object.assign(Object.assign({}, e3.groupCounters), { [a2]: u2 })), e3)), t2.TUIStore.update(o.GRP, "groupList", i2);
  }
  onMessageReceived(e2) {
    const t2 = this.getEngine(), s2 = [];
    e2.forEach((e3) => {
      if (e3.type === t2.TYPES.MSG_GRP_TIP) {
        const { payload: s3 } = e3, { operationType: n2, userIDList: i2 } = s3;
        switch (n2) {
          case t2.TYPES.GRP_TIP_MBR_JOIN:
            this.addMemberList(i2);
            break;
          case t2.TYPES.GRP_TIP_MBR_QUIT:
          case t2.TYPES.GRP_TIP_MBR_KICKED_OUT:
            this.removeMemberList(i2);
            break;
          case t2.TYPES.GRP_TIP_MBR_SET_ADMIN:
          case t2.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
            this.updateGroupMember(i2);
            break;
          case t2.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
            break;
          case t2.TYPES.GRP_TIP_MBR_PROFILE_UPDATED:
          case t2.TYPES.GRP_TIP_BAN_AVCHATROOM_MEMBER:
          case t2.TYPES.GRP_TIP_UNBAN_AVCHATROOM_MEMBER:
            this.updateGroupMember(i2);
        }
      }
      e3.type === t2.TYPES.MSG_GRP_SYS_NOTICE && s2.push(e3);
    }), s2.length > 0 && t2.TUIStore.update(o.GRP, "groupSystemNoticeList", s2);
  }
  getGroupInitData() {
    const e2 = this.getEngine();
    e2.chat.isReady() && e2.chat.getGroupList().then((e3) => {
      const { groupList: t2 = [] } = e3.data;
      console.log(`TUIGroupService.init, getGroupList count:${t2.length}`), t2.length > 0 && this.onGroupListUpdated(t2);
    });
  }
  updateGroupMember(e2) {
    return i(this, void 0, void 0, function* () {
      const t2 = this.getEngine().TUIStore.getData(o.GRP, "currentGroupID");
      if (t2) {
        const s2 = yield this.getGroupMemberProfile({ groupID: t2, userIDList: e2 }), { memberList: n2 } = s2.data;
        this.updateMemberList(n2);
      }
    });
  }
  resetCurrentStore() {
    this.getEngine().TUIStore.reset(o.GRP, ["currentGroupID", "currentGroup", "currentGroupAttributes", "currentGroupCounters", "currentGroupMemberList"], true);
  }
  switchGroup(e2) {
    return i(this, void 0, void 0, function* () {
      const t2 = this.getEngine();
      t2.TUIStore.update(o.GRP, "offset", 0), t2.TUIStore.update(o.GRP, "isCompleted", false);
      const s2 = t2.TUIStore.getConversationModel(`GROUP${e2}`);
      if ((null == s2 ? void 0 : s2.operationType) > 0) {
        const e3 = t2.TUIStore.getData(o.GRP, "currentGroup");
        return Promise.resolve(e3);
      }
      const n2 = t2.TUIStore.getData(o.GRP, "currentGroupID");
      if (!e2)
        return this.resetCurrentStore(), Promise.resolve({});
      if (n2 === e2) {
        const e3 = t2.TUIStore.getData(o.GRP, "currentGroup");
        return Promise.resolve(e3);
      }
      this.resetCurrentStore(), t2.TUIStore.update(o.GRP, "currentGroupID", e2);
      try {
        yield this.getGroupInfo(e2);
      } catch (e3) {
        Promise.reject(e3);
      }
      const i2 = setTimeout(() => {
        this.groupMap.delete(e2), clearTimeout(i2);
      }, 5e3), r2 = t2.TUIStore.getData(o.GRP, "currentGroup");
      return Promise.resolve(r2);
    });
  }
  getGroupInfo(e2) {
    return i(this, void 0, void 0, function* () {
      const t2 = this.getEngine(), s2 = this.groupMap.get(e2);
      if (s2)
        return this.updateMemberList((null == s2 ? void 0 : s2.memberList) || []), t2.TUIStore.update(o.GRP, "currentGroup", s2.group), t2.TUIStore.update(o.GRP, "currentGroupAttributes", s2.groupAttributes || {}), void t2.TUIStore.update(o.GRP, "currentGroupCounters", s2.counters || {});
      const n2 = { group: {}, memberList: [], groupAttributes: void 0, counters: void 0 }, { data: { group: i2 } } = yield this.getGroupProfile({ groupID: e2 });
      n2.group = i2;
      const { data: { memberList: r2 } } = yield this.getGroupMemberList({ groupID: e2 });
      n2.memberList = r2;
      const a2 = yield this.getGroupAttributes({ groupID: e2, keyList: [] }), { groupAttributes: u2 } = a2.data;
      n2.groupAttributes = u2, t2.TUIStore.update(o.GRP, "currentGroupAttributes", u2);
      try {
        const s3 = yield this.getGroupCounters({ groupID: e2, keyList: [] }), { counters: i3 } = s3.data;
        n2.counters = i3, t2.TUIStore.update(o.GRP, "currentGroupCounters", i3);
      } catch (e3) {
        console.warn(null == e3 ? void 0 : e3.message);
      }
      this.groupMap.set(e2, n2);
    });
  }
  getGroupProfile(e2) {
    const t2 = this.getEngine();
    return t2.chat.getGroupProfile(e2).then((s2) => i(this, void 0, void 0, function* () {
      if (t2.TUIStore.getData(o.GRP, "currentGroupID") === e2.groupID) {
        const { group: e3 } = s2.data;
        t2.TUIStore.update(o.GRP, "currentGroup", e3);
      }
      return s2;
    }));
  }
  updateGroupProfile(e2) {
    return this.getEngine().chat.updateGroupProfile(e2);
  }
  createGroup(e2) {
    return this.getEngine().chat.createGroup(e2);
  }
  dismissGroup(e2) {
    return this.getEngine().chat.dismissGroup(e2);
  }
  searchGroupByID(e2) {
    const t2 = this.getEngine();
    return t2.chat.searchGroupByID(e2).then((e3) => {
      const { group: s2 } = e3.data, n2 = t2.TUIStore.getData(o.GRP, "groupList");
      return e3.data.group.isJoinedGroup = n2.some((e4) => e4.groupID === s2.groupID), e3;
    });
  }
  joinGroup(e2) {
    return this.getEngine().chat.joinGroup(e2);
  }
  quitGroup(e2) {
    return this.getEngine().chat.quitGroup(e2);
  }
  getGroupApplicationList() {
    return this.getEngine().chat.getGroupApplicationList();
  }
  handleGroupApplication(e2) {
    return this.getEngine().chat.handleGroupApplication(e2);
  }
  getGroupOnlineMemberCount(e2) {
    return this.getEngine().chat.getGroupOnlineMemberCount(e2);
  }
  changeGroupOwner(e2) {
    return this.getEngine().chat.changeGroupOwner(e2);
  }
  initGroupAttributes(e2) {
    return this.getEngine().chat.initGroupAttributes(e2);
  }
  setGroupAttributes(e2) {
    return this.getEngine().chat.setGroupAttributes(e2);
  }
  deleteGroupAttributes(e2) {
    return this.getEngine().chat.deleteGroupAttributes(e2);
  }
  getGroupAttributes(e2) {
    return this.getEngine().chat.getGroupAttributes(e2);
  }
  setGroupCounters(e2) {
    return this.getEngine().chat.setGroupCounters(e2);
  }
  increaseGroupCounter(e2) {
    return this.getEngine().chat.increaseGroupCounter(e2);
  }
  decreaseGroupCounter(e2) {
    return this.getEngine().chat.decreaseGroupCounter(e2);
  }
  getGroupCounters(e2) {
    return this.getEngine().chat.getGroupCounters(e2);
  }
  updateMemberList(e2) {
    const t2 = this.getEngine(), s2 = [...(t2.TUIStore.getData(o.GRP, "currentGroupMemberList") || []).filter((t3) => !e2.find((e3) => e3.userID === t3.userID)), ...e2];
    t2.TUIStore.update(o.GRP, "currentGroupMemberList", s2);
  }
  addMemberList(e2) {
    return i(this, void 0, void 0, function* () {
      const t2 = this.getEngine().TUIStore.getData(o.GRP, "currentGroupID");
      if (t2)
        try {
          const s2 = yield this.getGroupMemberProfile({ groupID: t2, userIDList: e2 }), { memberList: n2 } = s2.data;
          this.updateMemberList(n2);
        } catch (t3) {
          const s2 = e2.map((e3) => ({ userID: e3, avatar: "", nick: "", role: "", joinTime: 0, nameCard: "", muteUntil: 0, memberCustomField: [] }));
          this.updateMemberList(s2);
        }
    });
  }
  removeMemberList(e2) {
    const t2 = this.getEngine(), s2 = t2.TUIStore.getData(o.GRP, "currentGroupMemberList").filter((t3) => -1 === e2.indexOf(t3.userID));
    t2.TUIStore.update(o.GRP, "currentGroupMemberList", s2);
  }
  getGroupMemberList(e2) {
    const t2 = this.getEngine();
    if (S(e2.offset)) {
      const s2 = t2.TUIStore.getData(o.GRP, "offset");
      e2.offset = s2;
    }
    return t2.chat.getGroupMemberList(e2).then((s2) => {
      if (t2.TUIStore.getData(o.GRP, "currentGroupID") === e2.groupID) {
        const { memberList: e3, offset: n2 = 0 } = s2.data;
        this.updateMemberList(e3), t2.TUIStore.update(o.GRP, "offset", n2), 0 === n2 && t2.TUIStore.update(o.GRP, "isCompleted", true);
      }
      return s2;
    });
  }
  getGroupMemberProfile(e2) {
    return this.getEngine().chat.getGroupMemberProfile(e2);
  }
  addGroupMember(e2) {
    const t2 = this.getEngine();
    return t2.chat.addGroupMember(e2).then((s2) => i(this, void 0, void 0, function* () {
      if (t2.TUIStore.getData(o.GRP, "currentGroupID") === e2.groupID) {
        const { successUserIDList: e3, group: n2 } = s2.data;
        t2.TUIStore.update(o.GRP, "currentGroup", n2), this.addMemberList(e3);
      }
      return s2;
    }));
  }
  deleteGroupMember(e2) {
    const t2 = this.getEngine();
    return t2.chat.deleteGroupMember(e2).then((s2) => {
      if (t2.TUIStore.getData(o.GRP, "currentGroupID") === e2.groupID) {
        const { userIDList: e3, group: n2 } = s2.data;
        this.removeMemberList(e3), t2.TUIStore.update(o.GRP, "currentGroup", n2);
      }
      return s2;
    });
  }
  setGroupMemberMuteTime(e2) {
    return this.getEngine().chat.setGroupMemberMuteTime(e2);
  }
  setGroupMemberRole(e2) {
    return this.getEngine().chat.setGroupMemberRole(e2);
  }
  setGroupMemberNameCard(e2) {
    return this.getEngine().chat.setGroupMemberNameCard(e2);
  }
  setGroupMemberCustomField(e2) {
    return this.getEngine().chat.setGroupMemberCustomField(e2);
  }
  markGroupMemberList(e2) {
    return this.getEngine().chat.markGroupMemberList(e2);
  }
};
var Ht = class _Ht extends ne {
  constructor() {
    super();
  }
  static getInstance() {
    return _Ht.instance || (_Ht.instance = new _Ht()), _Ht.instance;
  }
  init() {
    const e2 = this.getEngine();
    e2.eventCenter.addEvent(e2.EVENT.FRIEND_LIST_UPDATED, this.onFriendListUpdated.bind(this)), e2.eventCenter.addEvent(e2.EVENT.FRIEND_APPLICATION_LIST_UPDATED, this.onFriendApplicationListUpdated.bind(this)), this.getFriendInitData();
  }
  onFriendListUpdated(e2) {
    this.getEngine().TUIStore.update(o.FRIEND, "friendList", e2);
  }
  onFriendApplicationListUpdated(e2) {
    const { friendApplicationList: t2, unreadCount: s2 = 0 } = e2, n2 = this.getEngine();
    n2.TUIStore.update(o.FRIEND, "friendApplicationList", t2), n2.TUIStore.update(o.FRIEND, "friendApplicationUnreadCount", s2);
  }
  getFriendInitData() {
    const e2 = this.getEngine();
    e2.chat.isReady() && (e2.chat.getFriendList().then((e3) => {
      const t2 = e3.data || [];
      console.log(`TUIFriendService.init, getFriendList count:${t2.length}`), t2.length > 0 && this.onFriendListUpdated(t2);
    }), e2.chat.getFriendApplicationList().then((e3) => {
      this.onFriendApplicationListUpdated(e3.data);
    }));
  }
  getFriendList() {
    return this.getEngine().chat.getFriendList();
  }
  getFriendRemark(e2) {
    const t2 = this.getEngine().TUIStore.getData(o.FRIEND, "friendList"), s2 = {};
    return e2.forEach((e3) => {
      for (let n2 = 0; n2 < t2.length; n2++)
        t2[n2].userID !== e3 || (s2[e3] = t2[n2].remark);
    }), s2;
  }
  addFriend(e2) {
    return this.getEngine().chat.addFriend(e2);
  }
  deleteFriend(e2) {
    return this.getEngine().chat.deleteFriend(e2);
  }
  checkFriend(e2) {
    return this.getEngine().chat.checkFriend(e2);
  }
  getFriendProfile(e2) {
    return this.getEngine().chat.getFriendProfile(e2);
  }
  updateFriend(e2) {
    return this.getEngine().chat.updateFriend(e2);
  }
  acceptFriendApplication(e2) {
    return this.getEngine().chat.acceptFriendApplication(e2);
  }
  refuseFriendApplication(e2) {
    return this.getEngine().chat.refuseFriendApplication({ userID: e2 });
  }
  deleteFriendApplication(e2) {
    return this.getEngine().chat.deleteFriendApplication(e2);
  }
  setFriendApplicationRead() {
    return this.getEngine().chat.setFriendApplicationRead();
  }
};
var Yt = class _Yt extends ne {
  static getInstance() {
    return _Yt.instance || (_Yt.instance = new _Yt()), _Yt.instance;
  }
  reportFeature(e2, t2) {
    var s2;
    return null === (s2 = this.getEngine().chat) || void 0 === s2 ? void 0 : s2.callExperimentalAPI("statTUIKeyFeatures", { code: e2, msg: t2 ? `${e2}-${t2}` : "" });
  }
};
var Bt = class {
  constructor() {
    this.cache = [], this.middlewares = [], this.options = null;
  }
  use(e2) {
    return "function" != typeof e2 && console.error("middleware must be a function"), this.cache.push(e2), this;
  }
  next() {
    if (this.middlewares && this.middlewares.length > 0) {
      return this.middlewares.shift().call(this, this.options, this.next.bind(this));
    }
  }
  run(e2) {
    return this.middlewares = this.cache.map((e3) => e3), this.options = e2, this.next();
  }
};
function Kt(e2, t2, s2) {
  const n2 = /* @__PURE__ */ Object.create(null);
  Object.keys(s2).forEach((s3) => {
    if (!t2[s3])
      return;
    n2[s3] = t2[s3];
    const i2 = new Bt();
    t2[s3] = function() {
      const r2 = Array.from(arguments);
      return i2.use((t3, n3) => e2.isInited ? n3() : Promise.reject({ code: h.NOT_INIT, message: `${s3} | ${d.NOT_INIT}` })).use((e3) => n2[s3].apply(t2, e3)), i2.run(r2);
    };
  });
}
console.log("TUIChatEngine.VERSION:2.4.4");
var qt = ee.getInstance();
var zt = X.getInstance();
var Jt = fe.getInstance();
var Wt = Dt.getInstance();
var Xt = Pt.getInstance();
var Zt = xt.getInstance();
var Qt = Ft.getInstance();
var es = $t.getInstance();
var ts = Ht.getInstance();
var ss = Yt.getInstance();
qt.mount(a.TUIStore, Jt), qt.mount(a.TUITranslate, Wt), qt.mount(a.TUIConversation, Xt), qt.mount(a.TUIUser, Zt), qt.mount(a.TUIChat, Qt), qt.mount(a.TUIGroup, es), qt.mount(a.TUIFriend, ts), qt.mount(a.TUIReport, ss), Kt(qt, qt, f), Kt(qt, Xt, m), Kt(qt, Qt, v), Kt(qt, es, T), Kt(qt, Zt, E), Kt(qt, ts, I), Kt(qt, ss, f);
export {
  o as StoreName,
  qt as TUIChatEngine,
  Qt as TUIChatService,
  Xt as TUIConversationService,
  ts as TUIFriendService,
  zt as TUIGlobal,
  es as TUIGroupService,
  ss as TUIReportService,
  Jt as TUIStore,
  Wt as TUITranslateService,
  Zt as TUIUserService,
  qt as default
};
//# sourceMappingURL=@tencentcloud_chat-uikit-engine.js.map
