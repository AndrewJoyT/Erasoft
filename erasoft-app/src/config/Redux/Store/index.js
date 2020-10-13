import {createStore,applyMiddleware} from 'redux';
import reducer from '../Reducer';
import reduxThunk from 'redux-thunk';

const store = createStore(reducer,applyMiddleware(reduxThunk))

export default(store)