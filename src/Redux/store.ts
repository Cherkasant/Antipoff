import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './Sagas/rootSaga';
import dataReducer from './Reducers/dataReducer';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: { dataReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);
