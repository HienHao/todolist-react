import {  call, put, take, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as ActionTypes from './../redux/actions/ActionTypes';

// lắng nghe action sau đó chuyển hướng sang worker để thực hiện
export function* getTodoWatcher() {
    // yield takeLatest(GET_TODOS_REQUEST, getTodoWorker);
    // console.log('worker: ', getTodoWorker().next());
    while(true) {
        yield take(ActionTypes.GET_TODOS_REQUEST);
        yield fork(getTodoWorker)
    }
}

export function* postTodoWatcher() {
    const result = yield take(ActionTypes.POST_TODO_REQUEST);
    yield fork(postTodoWorker, result); // truyen doi so trong side effect
}

export function* deleteTodoWatcher() {
    debugger
    const result = yield take(ActionTypes.DELETE_TODO_REQUEST);
    debugger
    yield fork(deleteTodoWorker, result);
    debugger
}
//khai báo đường dẫn đến api
function getTodo() {
    // debugger
    return axios.get('http://localhost:5005/user');
}

function postTodo(title) {
    return axios({
        method: 'POST',
        url: 'http://localhost:5005/user',
        data: {
            title
        }
    })
}

function _deleteTodo(id) {
    debugger
    return axios({
        method: 'DELETE',
        url: 'http://localhost:5005/user?id='+id,
    })
}

// gọi đếm api và trả về action de worker chuyen huong sang reducers
function* getTodoWorker() {

    try{
        // khong tra ve du lieu va khong chay xuong'??? ==> do call()
        const _response = yield call(() => getTodo());
        const todos = _response.data;
        yield put({type: ActionTypes.GET_TODOS_SUCCES, todos});
     } catch(error) {
        yield put({ type: ActionTypes.GET_TODOS_FAILRE, error });
    }
}

function* postTodoWorker(data) {
    try {
        const response = yield call(() => postTodo(data.data));
        yield put({type: ActionTypes.POST_TODO_SUCCESS, response});
    } catch(error) {
        yield put({type: ActionTypes.POST_TODO_FAILRE, error});
    }
}
function* deleteTodoWorker(data) {
    debugger
    try{
        debugger
        const response = yield call(() => _deleteTodo(data));
        yield put({type: ActionTypes.DELETE_TODO_SUCCESS, response});
        debugger
    } catch {

    }
}