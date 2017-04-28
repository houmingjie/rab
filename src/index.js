import { browserHistory } from '../router';
import {
  routerMiddleware,
  syncHistoryWithStore,
  routerReducer as routing
} from 'react-router-redux';
import initRab from './initRab';
export createAction from './redux/createAction';
export createActions from './redux/createActions';
export handleAction from './redux/handleAction.js';
export handleActions from './redux/handleActions.js';
export createModel from './createModel.js';
import Lib from './lib';
export const {dispatch,put,getState,call} = Lib;
export default initRab({
    initialReducer: {routing},
    initialActions:{},
    defaultHistory: browserHistory,
    routerMiddleware,
    setupHistory(history) {
        this._history = syncHistoryWithStore(history, this._store);
    }
});
