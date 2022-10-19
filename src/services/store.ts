import { rootReducer } from '../services/reducers/index';
import { compose, applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { ALL_ORDER_WS_CONNECTION_START,
    ALL_ORDER_WS_CONNECTION_SUCCESS,
    ALL_ORDER_WS_CONNECTION_ERROR,
    ALL_ORDER_WS_CONNECTION_CLOSED,
    ALL_ORDER_WS_GET_MESSAGE,
    ALL_ORDER_WS_SEND_MESSAGE } from './actions/wsAllOrders';
import { socketMiddleware } from './middleware/socketMiddleware';
import { wsBaseUrl } from '../utils/constants';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const wsAllOrderrsActions = {
    wsInit: ALL_ORDER_WS_CONNECTION_START, 
    wsSendMessage: ALL_ORDER_WS_SEND_MESSAGE, 
    onOpen: ALL_ORDER_WS_CONNECTION_SUCCESS, 
    onClose :ALL_ORDER_WS_CONNECTION_CLOSED, 
    onError: ALL_ORDER_WS_CONNECTION_ERROR, 
    onMessage: ALL_ORDER_WS_GET_MESSAGE
}
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(`${wsBaseUrl}/orders/all`, wsAllOrderrsActions)));     
export const store = createStore(rootReducer, enhancer); 