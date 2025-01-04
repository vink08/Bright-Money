import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import { billsReducer } from './reducers'; 

const rootReducer = combineReducers({
  bills: billsReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;