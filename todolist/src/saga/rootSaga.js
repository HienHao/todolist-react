import { all } from 'redux-saga/effects';
import {getTodoWatcher, postTodoWatcher, deleteTodoWatcher} from './todoSaga';

export default function* rootSagas() {
    yield all([
        getTodoWatcher(),
        postTodoWatcher(),
        deleteTodoWatcher()
    ])
}