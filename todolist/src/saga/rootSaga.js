import { all } from 'redux-saga/effects';
import {getTodoWatcher, postTodoWatcher, deleteTodoWatcher, addChildTodoWatcher, toggleTodoWatcher} from './todoSaga';

export default function* rootSagas() {
    yield all([
        getTodoWatcher(),
        postTodoWatcher(),
        deleteTodoWatcher(),
        addChildTodoWatcher(),
        toggleTodoWatcher()
    ])
}