/**
 * Copyright (c) 2024 Tencent. All rights reserved.
 * Module:   TUICommonDefine @ TUIKitEngine
 * Function: TUIKitEngine 复用型定义
 */
#import <Foundation/Foundation.h>
#import "TUIEngineSymbolExport.h"

#if TARGET_OS_IPHONE || TARGET_OS_SIMULATOR
#import <UIKit/UIKit.h>
typedef UIView TUIVideoView;
typedef UIImage TUIImage;
typedef UIEdgeInsets TUIEdgeInsets;
#elif TARGET_OS_MAC
#import <AppKit/AppKit.h>
typedef NSView TUIVideoView;
typedef NSImage TUIImage;
typedef NSEdgeInsets TUIEdgeInsets;
#endif

/**
 * 1.1 错误码枚举定义
 */
typedef NS_ENUM(NSInteger, TUIError) {

    /// 操作成功。
    TUIErrorSuccess = 0,

    /// 暂未归类的通用错误。
    TUIErrorFailed = -1,

    /// 请求被限频，请稍后重试。
    TUIErrorFreqLimit = -2,

    /// 重复操作。
    TUIErrorRepeatOperation = -3,

    /// 房间 ID 不匹配，请检查是否退房或者切换了房间。
    TUIErrorRoomMismatch = -4,

    /// 未找到SDKAppID，请在腾讯云视立方SDK[控制台](https://console.cloud.tencent.com/vcube/project/manage)确认应用信息。
    TUIErrorSDKAppIDNotFound = -1000,

    /// 调用 API 时，传入的参数不合法，检查入参是否合法。
    TUIErrorInvalidParameter = -1001,

    /// 未登录,请调用Login接口。
    TUIErrorSdkNotInitialized = -1002,

    /// 获取权限失败，当前未授权音/视频权限，请查看是否开启设备权限。Room场景下请使用以下错误码来处理:
    /// 摄像头没有系统授权: ERR_CAMERA_NOT_AUTHORIZED。
    /// 麦克风没有系统授权: ERR_MICROPHONE_NOT_AUTHORIZED。
    TUIErrorPermissionDenied = -1003,

    /// 该功能需要开通额外的套餐，请在腾讯云视立方SDK [控制台](https://console.cloud.tencent.com/vcube/project/manage) 按需开通对应套餐。
    TUIErrorRequirePayment = -1004,

    /// 系统问题，打开摄像头失败。检查摄像头设备是否正常。
    TUIErrorCameraStartFail = -1100,

    /// 摄像头没有系统授权, 检查系统授权。
    TUIErrorCameraNotAuthorized = -1101,

    /// 摄像头被占用，检查是否有其他进程使用摄像头。
    TUIErrorCameraOccupied = -1102,

    /// 当前无摄像头设备，请插入摄像头设备解决该问题。
    TUIErrorCameraDeviceEmpty = -1103,

    /// 系统问题，打开麦克风失败。检查麦克风设备是否正常。
    TUIErrorMicrophoneStartFail = -1104,

    /// 麦克风没有系统授权，检查系统授权。
    TUIErrorMicrophoneNotAuthorized = -1105,

    /// 麦克风被占用。
    TUIErrorMicrophoneOccupied = -1106,

    /// 当前无麦克风设备。
    TUIErrorMicrophoneDeviceEmpty = -1107,

    /// 获取屏幕分享源（屏幕和窗口）失败，检查屏幕录制权限。
    TUIErrorGetScreenSharingTargetFailed = -1108,

    /// 开启屏幕分享失败，检查房间内是否有人正在屏幕分享。
    TUIErrorStartScreenSharingFailed = -1109,

    /// 需要进房后才可使用此功能。
    TUIErrorOperationInvalidBeforeEnterRoom = -2101,

    /// 房主不支持退房操作，Conference(会议)房间类型: 可以先转让房主，再退房。LivingRoom(直播)房间类型: 房主只能解散房间。
    TUIErrorExitNotSupportedForRoomOwner = -2102,

    /// 当前房间类型下不支持该操作。
    TUIErrorOperationNotSupportedInCurrentRoomType = -2103,

    /// 创建房间ID 非法，自定义 ID 必须为可打印 ASCII 字符（0x20-0x7e），最长48个字节。
    TUIErrorRoomIdInvalid = -2105,

    /// 房间名称非法，名称最长30字节，如果包含中文，字符编码必须是 UTF-8。
    TUIErrorRoomNameInvalid = -2107,

    /// 当前用户已在别的房间内，需要先退房才能加入新的房间:
    /// 单个roomEngine实例只支持用户进入一个房间，如果要进入不同的房间请先退房或者使用新的roomEngine实例。
    TUIErrorAlreadyInOtherRoom = -2108,

    /// 用户不存在。
    TUIErrorUserNotExist = -2200,

    /// 需要房主权限才能操作。
    TUIErrorUserNeedOwnerPermission = -2300,

    /// 需要房主或者管理员权限才能操作。
    TUIErrorUserNeedAdminPermission = -2301,

    /// 信令请求无权限，例如取消非自己发起的邀请。
    TUIErrorRequestNoPermission = -2310,

    /// 信令请求ID 无效或已经被处理过。
    TUIErrorRequestIdInvalid = -2311,

    /// 信令请求重复。
    TUIErrorRequestIdRepeat = -2312,

    /// 最大麦位超出套餐包数量限制。
    TUIErrorMaxSeatCountLimit = -2340,

    /// 麦位编号不存在。
    TUIErrorSeatIndexNotExist = -2344,

    /// 当前麦位音频被锁。
    TUIErrorOpenMicrophoneNeedSeatUnlock = -2360,

    /// 需要向房主或管理员申请后打开麦克风。
    TUIErrorOpenMicrophoneNeedPermissionFromAdmin = -2361,

    /// 当前麦位视频被锁, 需要由房主解锁麦位后，才能打开摄像头。
    TUIErrorOpenCameraNeedSeatUnlock = -2370,

    /// 需要向房主或管理员申请后打开摄像头。
    TUIErrorOpenCameraNeedPermissionFromAdmin = -2371,

    /// 当前麦位视频被锁, 需要由房主解锁麦位后，才能打开屏幕分享。
    TUIErrorOpenScreenShareNeedSeatUnlock = -2372,

    /// 需要向房主或管理员申请后打开屏幕分享。
    TUIErrorOpenScreenShareNeedPermissionFromAdmin = -2373,

    /// 当前房间已开启全员禁言。
    TUIErrorSendMessageDisabledForAll = -2380,

    /// 当前房间内，您已被已禁言。
    TUIErrorSendMessageDisabledForCurrent = -2381,

    /// 当前房间不支持预加载。
    TUIErrorRoomNotSupportPreloading = -4001,

    /// 房间ID 已被使用，请选择别的房间ID。
    TUIErrorRoomIdOccupied = 100003,

    /// 进房时房间不存在，或许已被解散。
    TUIErrorRoomIdNotExist = 100004,

    /// 用户不在当前房间内。
    TUIErrorUserNotEntered = 100005,

    /// 房间成员已满。
    TUIErrorRoomUserFull = 100008,

    /// 当前房间需要密码才能进入。
    TUIErrorNeedPassword = 100018,

    /// 进房密码错误。
    TUIErrorWrongPassword = 100019,

    /// 信令请求冲突。
    TUIErrorRequestIdConflict = 100102,

    /// 当前麦位被锁。
    TUIErrorSeatLocked = 100200,

    /// 当前麦位已经有人了。
    TUIErrorSeatOccupied = 100210,

    /// 当前用户已经在麦位上。
    TUIErrorAlreadyInSeat = 100203,

    /// 上麦人数已满。
    TUIErrorAllSeatOccupied = 100205,

    /// 当前用户没有在麦上。
    TUIErrorUserNotInSeat = 100206,

    /// 不支持连麦。
    TUIErrorSeatNotSupportLinkMic = 100211,

    /// 当前房间已连线。
    TUIErrorRoomAlreadyConnected = 100401,

    /// 当前房间与其他房间连线中。
    TUIErrorRoomConnectedInOther = 100403,

    /// 当前房间连线超出最大数量限制。
    TUIErrorMaxConnectedCountLimit = 100404,

    /// 房间自定义信息 key 数量超过上限
    TUIErrorRoomMetadataExceedKeyCountLimit = 100500,

    /// 房间自定义信息 value 字节大小超过上限
    TUIErrorRoomMetadataExceedValueSizeLimit = 100501,

};

/**
 * 1.2 网络质量
 */
typedef NS_ENUM(NSUInteger, TUINetworkQuality) {

    /// 未定义。
    TUINetworkQualityUnknown = 0,

    /// 当前网络非常好。
    TUINetworkQualityExcellent = 1,

    /// 当前网络比较好。
    TUINetworkQualityGood = 2,

    /// 当前网络一般。
    TUINetworkQualityPoor = 3,

    /// 当前网络较差。
    TUINetworkQualityBad = 4,

    /// 当前网络很差。
    TUINetworkQualityVeryBad = 5,

    /// 当前网络不满足 TRTC 的最低要求。
    TUINetworkQualityDown = 6,

};

/**
 * 1.3 插件类型
 */
typedef NS_ENUM(NSUInteger, TUIExtensionType) {

    /// 设备管理插件。
    TUIExtensionTypeDeviceManager = 1,

    /// 直播管理插件。
    TUIExtensionTypeLiveListManager = 2,

    /// 会议列表插件。
    TUIExtensionTypeConferenceListManager = 3,

    /// 会中呼叫插件。
    TUIExtensionTypeConferenceInvitationManager = 4,

    /// 直播布局插件。
    TUIExtensionTypeLiveLayoutManager = 5,

};

/**
 * 1.3 网络质量信息
 */
TUIENGINE_EXPORT @interface TUINetworkInfo : NSObject

/// 用户ID。
@property(nonatomic, copy, nullable) NSString* userId;

/// 网络质量。
@property(nonatomic, assign) TUINetworkQuality quality;

/// 上行丢包率，单位 (%) 该数值越小越好。
/// 如果 upLoss 为 0%，则意味着上行链路的网络质量很好，上传到云端的数据包基本不发生丢失。
/// 如果 upLoss 为 30%，则意味着 SDK 向云端发送的音视频数据包中，会有 30%丢失在传输链路中。
@property(nonatomic, assign) uint32_t upLoss;

/// 下行丢包率，单位 (%) 该数值越小越好。
/// 如果 downLoss 为 0%，则意味着下行链路的网络质量很好，从云端接收的数据包基本不发生丢失。
/// 如果 downLoss 为 30%，则意味着云端向 SDK 传输的音视频数据包中，会有 30%丢失在传输链路中。
@property(nonatomic, assign) uint32_t downLoss;

/// 网络延迟，单位 ms。
@property(nonatomic, assign) uint32_t delay;

@end

/// 播放设备：听筒 或 麦克风
typedef NS_ENUM(NSUInteger, TUIAudioPlaybackDevice) {
    TUIAudioPlaybackDeviceSpeakerphone,
    TUIAudioPlaybackDeviceEarpiece,
};

/// 摄像头：前置 或 后置
typedef NS_ENUM(NSUInteger, TUICamera) {
    TUICameraFront,
    TUICameraBack,
};

/**
 * 网络质量信息
 */
TUIENGINE_EXPORT @interface TUINetworkQualityInfo : NSObject

@property(nonatomic, copy, nullable) NSString* userId;

@property(nonatomic, assign) TUINetworkQuality quality;

@end

typedef void (^TUISuccessBlock)(void);
typedef void (^TUIErrorBlock)(TUIError code, NSString* _Nonnull message);

typedef NS_ENUM(NSInteger, TUIVideoRenderParamsFillMode) {
    // 0,填充模式：即将画面内容居中等比缩放以充满整个显示区域，超出显示区域的部分将会被裁剪掉，此模式下画面可能不完整
    TUIVideoRenderParamsFillModeFill = 0,
    // 1,适应模式：即按画面长边进行缩放以适应显示区域，短边部分会被填充为黑色，此模式下图像完整但可能留有黑边
    TUIVideoRenderParamsFillModeFit = 1,
};

typedef NS_ENUM(NSInteger, TUIVideoRenderParamsRotation) {
    // 0, 不旋转
    TUIVideoRenderParamsRotation_0 = 0,
    // 1, 顺时针旋转90度
    TUIVideoRenderParamsRotation_90 = 1,
    // 2, 顺时针旋转180度
    TUIVideoRenderParamsRotation_180 = 2,
    // 3, 顺时针旋转270度
    TUIVideoRenderParamsRotation_270 = 3,
};

typedef NS_ENUM(NSInteger, TUIVideoEncoderParamsResolutionMode) {
    // 0, 横屏分辨率,例如：Resolution_640_360 + Landscape = 640x360
    TUIVideoEncoderParamsResolutionModeLandscape = 0,
    // 1, 竖屏分辨率,例如：Resolution_640_360 + Portrait = 360x640
    TUIVideoEncoderParamsResolutionModePortrait = 1,
};

typedef NS_ENUM(NSInteger, TUIVideoEncoderParamsResolution) {
    // 宽高比 16:9；分辨率 640x360；建议码率（VideoCall）500kbps
    TUIVideoEncoderParamsResolution_640_360 = 1,
    // 宽高比 16:9；分辨率 960x540；建议码率（VideoCall）850kbps
    TUIVideoEncoderParamsResolution_960_540 = 2,
    // 宽高比 16:9；分辨率 1280x720；建议码率（VideoCall）1200kbps
    TUIVideoEncoderParamsResolution_1280_720 = 3,
    // 宽高比 16:9；分辨率 1920x1080；建议码率（VideoCall）2000kbps
    TUIVideoEncoderParamsResolution_1920_1080 = 4,
};

NS_ASSUME_NONNULL_BEGIN

@interface TUIRoomId : NSObject

@property(nonatomic, assign) UInt32 intRoomId;
@property(nonatomic, copy) NSString* strRoomId;

@end

@interface TUIVideoRenderParams : NSObject

@property(nonatomic, assign) TUIVideoRenderParamsFillMode fillMode;
@property(nonatomic, assign) TUIVideoRenderParamsRotation rotation;

@end

@interface TUIVideoEncoderParams : NSObject

@property(nonatomic, assign) TUIVideoEncoderParamsResolution resolution;
@property(nonatomic, assign) TUIVideoEncoderParamsResolutionMode resolutionMode;

@end

NS_ASSUME_NONNULL_END
