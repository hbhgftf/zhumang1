import TUICustomerPluginServer from './server';
import { isMessageInvisible } from './utils/index';

const TUICustomerServer = TUICustomerPluginServer.getInstance();

const isCustomerServicePluginMessage = TUICustomerServer.isCustomerServicePluginMessage.bind(TUICustomerServer);

const isCustomerConversation = TUICustomerServer.isCustomerConversation.bind(TUICustomerServer);

export {
  isCustomerServicePluginMessage,
  isMessageInvisible,
  isCustomerConversation,
};

export default TUICustomerServer;
