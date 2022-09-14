import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import servers from './servers'
import channels from './channels'
import allservers from './allservers'
import voicechat from './voicechat'
import messages from './messages'
import allusers from './allusers'
import friends from './friends'

const rootReducer = combineReducers({
  session,
  servers,
  channels,
  allservers,
  voicechat,
  messages,
  allusers,
  friends

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
