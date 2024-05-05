import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ToDoListReducer from './reducers/ToDoListReducer'




const rootReducer = combineReducers({
    ToDoListReducer
})

const store = configureStore({ reducer: rootReducer })

export default store
