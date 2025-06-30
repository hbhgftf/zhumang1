import TUIChatEngine, { IMessageModel } from '@tencentcloud/chat-uikit-engine';
import { isCustomerServicePluginMessage } from './message-desk-elements/index';

export function isPluginMessage(message: IMessageModel): boolean {
  return (
    message.type === TUIChatEngine.TYPES.MSG_CUSTOM
    && isCustomerServicePluginMessage(message as any)
  );
}
