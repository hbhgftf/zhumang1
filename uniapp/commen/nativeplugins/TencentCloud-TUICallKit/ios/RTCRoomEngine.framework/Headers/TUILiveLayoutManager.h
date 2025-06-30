/**
 * Copyright (c) 2024 Tencent. All rights reserved.
 * Module:   TUILiveLayoutManager @ TUIKitEngine
 * Function: 直播画面装饰相关接口
 */

#import <Foundation/Foundation.h>
#import "TUICommonDefine.h"
#import "TUIRoomDefine.h"

NS_ASSUME_NONNULL_BEGIN

@protocol TUILiveLayoutObserver <NSObject>

/**
 * 直播画面布局发生改变
 *
 * @param roomId 房间ID
 * @param layoutInfo 最新的画面布局信息
 */
- (void)onLiveVideoLayoutChanged:(NSString *)roomId
                      layoutInfo:(NSString *)layoutInfo
    NS_SWIFT_NAME(onLiveVideoLayoutChanged(roomId:layoutInfo:));

@end

TUIENGINE_EXPORT @interface TUILiveLayoutManager : NSObject

/**
 * 添加事件回调
 *
 * @param observer 监听的实例。
 */
- (void)addObserver:(id<TUILiveLayoutObserver>)observer NS_SWIFT_NAME(addObserver(_:));

/**
 * 移除事件回调
 *
 * @param observer 监听的实例。
 */
- (void)removeObserver:(id<TUILiveLayoutObserver>)observer NS_SWIFT_NAME(removeObserver(_:));

/**
 * 自定义设置视频流布局
 *
 * @param roomID 房间ID。
 * @param layoutInfo 布局Json信息。
 */
- (void)setLiveStreamLayoutInfo:(NSString *)roomID
                     layoutInfo:(NSString *)layoutInfo
                      onSuccess:(TUISuccessBlock)onSuccess
                        onError:(TUIErrorBlock)onError
    NS_SWIFT_NAME(setLiveStreamLayoutInfo(roomID:layoutInfo:onSuccess:onError:));

@end
NS_ASSUME_NONNULL_END
