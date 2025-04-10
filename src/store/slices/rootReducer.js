import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
import { default as users } from './users';
import { default as places } from './places';
import { default as explain } from './explain';
import { default as notification } from './notification';
import { default as holdingTrading } from './holdingTrading';
import { default as transaction } from './transaction';
import { default as agency } from './agency';
export * from './customization';
export * from './authentication';
export * from './users';
export * from './notification';
export * from './holdingTrading';
export * from './transaction';
export * from './agency';
const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  places,
  explain,
  notification,
  holdingTrading,
  transaction,
  agency
});

export default rootReducer;
