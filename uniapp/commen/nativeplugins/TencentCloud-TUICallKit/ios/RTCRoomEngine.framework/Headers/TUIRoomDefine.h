/**
 * Copyright (c) 2024 Tencent. All rights reserved.
 * Module:   TUIRoomDefine @ TUIKitEngine
 * Function: TUIRoomEngine 关键类型定义
 */
#import <Foundation/Foundation.h>
#import "TUICommonDefine.h"

/////////////////////////////////////////////////////////////////////////////////
//
//                    房间、角色相关枚举值定义
//
/////////////////////////////////////////////////////////////////////////////////

/**
 * 1.1 房间类型
 */
typedef NS_ENUM(NSUInteger, TUIRoomType) {

    /// 会议类型房间，适用于会议，教育场景，该房间中可以开启自由发言，申请发言、上麦发言等不同模式。
    TUIRoomTypeConference = 1,

    /// 直播类型房间，适用于直播场景，该房间可以开启自由发言，上麦发言模式。
    TUIRoomTypeLive = 2,

};

/**
 * 1.2 上麦模式
 */
typedef NS_ENUM(NSUInteger, TUISeatMode) {

    /// 自由上麦模式，台下观众可以自由上麦，无需申请。
    TUISeatModeFreeToTake = 1,

    /// 申请上麦模式，台下观众上麦需要房主或者管理员同意后才能上麦。
    TUISeatModeApplyToTake = 2,

};

/**
 * 1.3 房间内媒体设备类型
 */
typedef NS_ENUM(NSUInteger, TUIMediaDevice) {

    /// 麦克风。
    TUIMediaDeviceMicrophone = 1,

    /// 摄像头。
    TUIMediaDeviceCamera = 2,

    /// 屏幕共享。
    TUIMediaDeviceScreenSharing = 3,

};

/**
 * 1.4 房间内角色类型
 */
typedef NS_ENUM(NSUInteger, TUIRole) {

    /// 房主，一般指房间的创建者，房间内最高权限拥有者。
    TUIRoleRoomOwner = 0,

    /// 房间管理员。
    TUIRoleAdministrator = 1,

    /// 房间内普通成员。
    TUIRoleGeneralUser = 2,

};

/**
 * 1.5 房间解散原因
 */
typedef NS_ENUM(NSUInteger, TUIRoomDismissedReason) {

    /// 被房主解散。
    TUIRoomDismissedReasonByOwner = 1,

    /// 被服务器解散。
    TUIRoomDismissedReasonByServer = 2,

};

/////////////////////////////////////////////////////////////////////////////////
//
//                    音视频相关枚举值定义
//
/////////////////////////////////////////////////////////////////////////////////

/**
 * 2.1 视频质量
 */
typedef NS_ENUM(NSUInteger, TUIVideoQuality) {

    /// 低清360P。
    TUIVideoQuality360P = 1,

    /// 标清540P。
    TUIVideoQuality540P = 2,

    /// 高清720P。
    TUIVideoQuality720P = 3,

    /// 超清1080P。
    TUIVideoQuality1080P = 4,

};

/**
 * 2.2 音频质量
 */
typedef NS_ENUM(NSUInteger, TUIAudioQuality) {

    /// 人声模式。
    TUIAudioQualitySpeech = 0,

    /// 默认模式。
    TUIAudioQualityDefault = 1,

    /// 音乐模式。
    TUIAudioQualityMusic = 2,

};

/**
 * 2.3 视频流类型
 */
typedef NS_ENUM(NSUInteger, TUIVideoStreamType) {

    /// 高清摄像头视频流。
    TUIVideoStreamTypeCameraStream = 0,

    /// 屏幕分享视频流。
    TUIVideoStreamTypeScreenStream = 1,

    /// 低清摄像头视频流。
    TUIVideoStreamTypeCameraStreamLow = 2,

};

/**
 * 2.4 音视频状态更改原因（分类: 自己主动修改 或者 被房主、管理员修改）
 */
typedef NS_ENUM(NSUInteger, TUIChangeReason) {

    /// 自己操作。
    TUIChangeReasonBySelf = 0,

    /// 房主或管理员操作。
    TUIChangeReasonByAdmin = 1,

};

/**
 * 2.5 用户被踢出房间原因（分类: 被主持人或管理员踢出、在其它设备进入房间被踢出 或者 被服务端踢出）
 */
typedef NS_ENUM(NSUInteger, TUIKickedOutOfRoomReason) {

    /// 被主持人或管理员踢出。
    TUIKickedOutOfRoomReasonByAdmin = 0,

    /// 在其它设备进入房间被踢出。
    TUIKickedOutOfRoomReasonByLoggedOnOtherDevice = 1,

    /// 被服务端踢出。
    TUIKickedOutOfRoomReasonByServer = 2,

};

/**
 * 2.6 分辨率模式（横屏 or 竖屏）
 */
typedef NS_ENUM(NSUInteger, TUIResolutionMode) {

    /// 横屏。
    TUIResolutionModeLandscape = 0,

    /// 竖屏。
    TUIResolutionModePortrait = 1,

};

/**
 * 2.7 屏幕分享捕获源类型
 */
typedef NS_ENUM(NSInteger, TUICaptureSourceType) {

    /// 未定义。
    TUICaptureSourceTypeUnknown = -1,

    /// 窗口。
    TUICaptureSourceTypeWindow = 0,

    /// 屏幕。
    TUICaptureSourceTypeScreen = 1,

};

/////////////////////////////////////////////////////////////////////////////////
//
//                    信令请求相关枚举值定义
//
/////////////////////////////////////////////////////////////////////////////////

/**
 * 4.1 请求类型
 */
typedef NS_ENUM(NSUInteger, TUIRequestAction) {

    /// 无效请求。
    TUIRequestActionInvalidAction = 0,

    /// 请求远端用户打开摄像头。
    TUIRequestActionOpenRemoteCamera = 1,

    /// 请求远端用户打开麦克风。
    TUIRequestActionOpenRemoteMicrophone = 2,

    /// 请求上麦。
    TUIRequestActionTakeSeat = 4,

    /// 请求远端用户上麦。
    TUIRequestActionRemoteUserOnSeat = 5,

    /// 向管理员请求打开本地摄像头。
    TUIRequestActionApplyToAdminToOpenLocalCamera = 6,

    /// 向管理员请求打开本地麦克风。
    TUIRequestActionApplyToAdminToOpenLocalMicrophone = 7,

    /// 向管理员请求打开屏幕分享。
    TUIRequestActionApplyToAdminToOpenLocalScreenShare = 8,

};

NS_ASSUME_NONNULL_BEGIN

/////////////////////////////////////////////////////////////////////////////////
//
//                      TUIRoomEngine 核心类型定义
//
/////////////////////////////////////////////////////////////////////////////////
///

/**
 * 5.1 房间信息
 *
 * TUIRoomEngine 只支持字符串房间ID。
 */
TUIENGINE_EXPORT @interface TUIRoomInfo : NSObject

/// 房间ID (创建房间必填参数，最大支持48个字节)。
@property(nonatomic, strong, nonnull) NSString* roomId;

/// 房主ID: 默认为房间创建者ID（只读）。
@property(nonatomic, readonly, nonnull) NSString* ownerId;

/// 房主昵称: 默认为房间创建者昵称（只读）。
@property(nonatomic, readonly, nonnull) NSString* ownerName;

/// 房主头像URL: 默认为房间创建者头像URL（只读）。
@property(nonatomic, readonly, nonnull) NSString* ownerAvatarUrl;

/// 房间类型（创建房间可选参数），请参见：{@link TUIRoomType}。
@property(nonatomic, assign) TUIRoomType roomType;

/// 房间名称（创建房间可选参数，默认房间ID，最大支持100个字节）。
@property(nonatomic, copy, nonnull) NSString* name;

/// 是否禁止打开摄像头（创建房间可选参数），默认值：{@link NO}。
@property(nonatomic, assign) BOOL isCameraDisableForAllUser;

/// 是否禁止打开麦克风（创建房间可选参数），默认值：{@link NO}。
@property(nonatomic, assign) BOOL isMicrophoneDisableForAllUser;

/// 是否禁止打开屏幕分享（创建房间可选参数），默认值：{@link NO}。
@property(nonatomic, assign) BOOL isScreenShareDisableForAllUser;

/// 是否禁止发送消息（创建房间可选参数），默认值：{@link NO}。
@property(nonatomic, assign) BOOL isMessageDisableForAllUser;

/// 是否开启麦位控制。
@property(nonatomic, assign) BOOL isSeatEnabled;

/// 上麦模式(只有开启麦位控制后生效)。
@property(nonatomic, assign) TUISeatMode seatMode;

/// 最大麦位数。
@property(nonatomic, assign) NSInteger maxSeatCount;

/// 房间创建时间（只读）。
@property(nonatomic, readonly) NSUInteger createTime;

/// 房间内成员数量（只读）。
@property(nonatomic, readonly) NSInteger memberCount;

/// 房间密码。
@property(nonatomic, copy, nonnull) NSString* password;

@end

/**
 * 5.2 用户登录信息
 */
TUIENGINE_EXPORT @interface TUILoginUserInfo : NSObject

/// 用户ID。
@property(nonatomic, copy, nonnull) NSString* userId;

/// 用户名称。
@property(nonatomic, copy, nonnull) NSString* userName;

/// 用户头像URL。
@property(nonatomic, copy, nonnull) NSString* avatarUrl;

/// 自定义信息。
@property(nonatomic, strong, nullable) NSDictionary<NSString*, NSData*>* customInfo __attribute__((deprecated("use customInfo in TUIUserInfo instead")));

@end

/**
 * 5.3 房间内用户信息
 */
TUIENGINE_EXPORT @interface TUIUserInfo : NSObject

/// 用户ID。
@property(nonatomic, copy, nonnull) NSString* userId;

/// 用户名称。
@property(nonatomic, copy, nonnull) NSString* userName;

/// 房间内用户昵称，最大支持32个字节。
@property(nonatomic, copy, nonnull) NSString* nameCard;

/// 用户头像URL。
@property(nonatomic, copy, nonnull) NSString* avatarUrl;

/// 用户角色类型，会议类型的房间角色仅存在于房间内，退房后再进入角色为普通用户。直播可以在进房前设置，房间不解散，角色依然存在。详情参见：{@link TUIRole}。
@property(nonatomic, assign) TUIRole userRole;

/// 是否有音频流，默认值：{@link NO}。
@property(nonatomic, assign) BOOL hasAudioStream;

/// 是否有视频流，默认值：{@link NO}。
@property(nonatomic, assign) BOOL hasVideoStream;

/// 是否有屏幕分享流，默认值：{@link NO}。
@property(nonatomic, assign) BOOL hasScreenStream;

/// 是否被禁止发送消息，默认值：{@link NO}。
@property(nonatomic, assign) BOOL isMessageDisabled;

/// 房间成员自定义信息。
@property(nonatomic, strong, nullable) NSDictionary<NSString*, NSData*>* roomCustomInfo;

@end

/**
 * 5.4 房间内用户信息变更参数key。
 */
typedef NS_OPTIONS(NSUInteger, TUIUserInfoModifyFlag) {

    TUIUserInfoModifyFlagNone = 0x00,

    /// userRole 参数发生变更。
    TUIUserInfoModifyFlagUserRole = 0x01 << 0,

    /// nameCard 参数发生变更。
    TUIUserInfoModifyFlagNameCard = 0x01 << 1,

};

/**
 * 5.5 视频编码参数
 */
TUIENGINE_EXPORT @interface TUIRoomVideoEncoderParams : NSObject

/// 视频质量, 请参见：{@link TUIVideoQuality}。
@property(nonatomic, assign) TUIVideoQuality videoResolution;

/// 分辨率模式, 请参见：{@link TUIResolutionMode}。
@property(nonatomic, assign) TUIResolutionMode resolutionMode;

/// 视频采集帧率。
@property(nonatomic, assign) NSInteger fps;

/// 目标视频码率。
@property(nonatomic, assign) NSInteger bitrate;

@end

/**
 * 5.6 房间内座位信息
 */
TUIENGINE_EXPORT @interface TUISeatInfo : NSObject

/// 麦位序号。
@property(nonatomic, assign) NSInteger index;

/// 用户ID。
@property(nonatomic, copy, nullable) NSString* userId;

/// 用户昵称
@property(nonatomic, copy, nullable) NSString* userName;

/// 房间内用户昵称
@property(nonatomic, copy, nullable) NSString* nameCard;

/// 用户头像URL
@property(nonatomic, copy, nullable) NSString* avatarUrl;

/// 麦位是否被锁定，默认值：{@link NO}。
@property(nonatomic, assign) BOOL isLocked;

/// 麦位是否被禁止打开摄像头，默认值：{@link NO}。
@property(nonatomic, assign) BOOL isVideoLocked;

/// 麦位是否被禁止打开麦克风，默认值：{@link NO}。
@property(nonatomic, assign) BOOL isAudioLocked;

@end

/**
 * 5.7 锁定麦位操作参数
 */
TUIENGINE_EXPORT @interface TUISeatLockParams : NSObject

/// 锁定麦位，默认值：{@link NO}。
@property(nonatomic, assign) BOOL lockSeat;

/// 锁定麦位摄像头，默认值：{@link NO}。
@property(nonatomic, assign) BOOL lockVideo;

/// 锁定麦位麦克风，默认值：{@link NO}。
@property(nonatomic, assign) BOOL lockAudio;

@end

/**
 * 5.8 房间内用户音量
 */
TUIENGINE_EXPORT @interface TUIUserVoiceVolume : NSObject

/// 用户ID。
@property(nonatomic, copy, nonnull) NSString* userId;

/// 音量 用于承载所有正在说话的用户的音量大小，取值范围 0 - 100。
@property(nonatomic, assign) NSUInteger volume;

@end

/**
 * 5.9 信令请求
 */
TUIENGINE_EXPORT @interface TUIRequest : NSObject

/// 请求ID。
@property(nonatomic, readonly, nonnull) NSString* requestId;

/// 请求类型。
@property(nonatomic, assign) TUIRequestAction requestAction;

/// 用户ID。
@property(nonatomic, copy, nonnull) NSString* userId;

/// 用户昵称。
@property(nonatomic, copy, nonnull) NSString* userName;

/// 房间内用户昵称。
@property(nonatomic, copy, nonnull) NSString* nameCard;

/// 用户头像URL。
@property(nonatomic, copy, nonnull) NSString* avatarUrl;

/// 信令内容。
@property(nonatomic, copy, nonnull) NSString* content;

/// 时间戳。
@property(nonatomic, assign) NSUInteger timestamp;

@end

/**
 * 5.10 进房参数
 */
TUIENGINE_EXPORT @interface TUIEnterRoomOptions : NSObject

/// 房间密码。
@property(nonatomic, copy, nonnull) NSString* password;

@end

/**
 * 5.11 搜索参数
 */
TUIENGINE_EXPORT @interface TUIUserSearchParam : NSObject

/// 搜索关键字，目前支持用户昵称搜索
@property(nonatomic, copy, nonnull) NSString* keyword;

/// 获取分页列表的下标。
@property(nonatomic, copy, nonnull) NSString* cursor;

@end

/////////////////////////////////////////////////////////////////////////////////
//
//                      TUIRoomEngine 基本类型定义
//
/////////////////////////////////////////////////////////////////////////////////
///

#if TARGET_OS_MAC && !TARGET_OS_IPHONE

/**
 * 屏幕分享采集源信息
 */
TUIENGINE_EXPORT @interface TUIShareTarget : NSObject

/// 采集源的ID，对于窗口，该字段代表窗口的 ID；对于屏幕，该字段代表显示器的 ID。
@property(nonatomic, readonly, nonnull) NSString* targetId;

/// 采集源类型。
@property(nonatomic, readonly) TUICaptureSourceType sourceType;

/// 采集源名称。
@property(nonatomic, readonly, nullable) NSString* sourceName;

/// 缩略图。
@property(nonatomic, readonly, nullable) TUIImage* thumbnailImage;

/// 图标。
@property(nonatomic, readonly, nullable) TUIImage* iconImage;

/// 窗口的扩展信息。
@property(nonatomic, readonly, nullable) NSDictionary* extInfo;

@end

#endif

typedef void (^TUIRoomListBlock)(NSArray* _Nonnull list);

typedef void (^TUIRoomInfoBlock)(TUIRoomInfo* _Nullable roomInfo);
typedef void (^TUIRoomListResponseBlock)(NSArray<TUIRoomInfo*>* _Nonnull list);
typedef void (^TUIUserInfoBlock)(TUIUserInfo* _Nullable userInfo);
typedef void (^TUIUserListResponseBlock)(NSArray<TUIUserInfo*>* _Nonnull list, NSInteger nextSequence);
typedef void (^TUISeatListResponseBlock)(NSArray<TUISeatInfo*>* _Nonnull list);
typedef void (^TUIRequestListResponseBlock)(NSArray<TUIRequest*>* _Nonnull list);
typedef void (^TUIRoomMetadataResponseBlock)(NSDictionary<NSString*, NSString*>* _Nonnull metadata);
typedef void (^TUIUserSearchResponseBlock)(NSArray<TUIUserInfo*>* _Nonnull list, NSString* cursor);

typedef void (^TUIPlayOnPlayingBlock)(NSString* _Nonnull userId);
typedef void (^TUIPlayOnLoadingBlock)(NSString* _Nonnull userId);
typedef void (^TUIPlayOnErrorBlock)(NSString* _Nonnull userId, TUIError code, NSString* _Nonnull message);

typedef void (^TUIRequestAcceptedBlock)(NSString* _Nonnull requestId, NSString* _Nonnull userId);
typedef void (^TUIRequestRejectedBlock)(NSString* _Nonnull requestId, NSString* _Nonnull userId, NSString* _Nonnull message);
typedef void (^TUIRequestCancelledBlock)(NSString* _Nonnull requestId, NSString* _Nonnull userId);
typedef void (^TUIRequestTimeoutBlock)(NSString* _Nonnull requestId, NSString* _Nonnull userId);
typedef void (^TUIRequestErrorBlock)(NSString* _Nonnull requestId, NSString* _Nonnull userId, TUIError code, NSString* _Nonnull message);

typedef void (^TUIExperimentalAPIResponseBlock)(NSString* _Nonnull jsonData);

NS_ASSUME_NONNULL_END
