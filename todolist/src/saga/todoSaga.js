import {  call, put, take, takeLatest, fork, retry } from 'redux-saga/effects';
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
    while(true) {
        const result = yield take(ActionTypes.POST_TODO_REQUEST);
        yield fork(postTodoWorker, result); // truyen doi so trong side effect
    }
}

export function* deleteTodoWatcher() {
    while(true) {
        const result = yield take(ActionTypes.DELETE_TODO_REQUEST);
        yield fork(deleteTodoWorker, result);
    }
}

export function* addChildTodoWatcher() {
    while(true) {
        const result = yield take(ActionTypes.ADD_TODO_CHILD);
        yield fork(addChildTodoWorker, result);
    }
}

export function* toggleTodoWatcher() {
    while(true) {
        const result = yield take(ActionTypes.TOGGLE_TODO);
        debugger;
        yield fork(toggleTodoWorker, result);
    }
}
//khai báo đường dẫn đến api
function getTodo() {
    debugger
    return axios.get('http://localhost:5005/user');
}

function postTodo(title) {
    debugger;
    return axios({
        method: 'POST',
        url: 'http://localhost:5005/user',
        data: {
            title
        }
    });
}

function _deleteTodo(id, idParent) {
    if(id && idParent) {
        debugger;
        return axios({
            method: 'DELETE',
            url: 'http://localhost:5005/user/'+idParent,
            data: {
                idChild: id,
            }
        })
    } else {
        debugger;
        return axios({
            method: 'DELETE',
            url: 'http://localhost:5005/user/'+id,
        }); 
    }    
}

function addChildTodo(text ,idParent) {
    debugger
    return axios({
        method: 'POST',
        url: 'http://localhost:5005/user/'+idParent,
        data: {title: text},
    });
}

function toggleTodo(id, idParent, item) {
    if(id && idParent) {
        return axios({
            method: 'PUT',
            url: 'http://localhost:5005/user?id='+idParent,
            data: {item}
        });
    } else {
        return axios({
            method: 'PUT',
            url: 'http://localhost:5005/user?id='+id,
            data: {item}
        });
    }
}

// gọi đếm api và trả về action de worker chuyen huong sang reducers
function* getTodoWorker() {
    debugger;
    try{
        // khong tra ve du lieu va khong chay xuong'??? ==> do call()
        const _response = yield call(() => getTodo());
        const todos = _response.data;
        // console.log('data todo: ', todos);
        yield put({type: ActionTypes.GET_TODOS_SUCCES, todos});
     } catch(error) {
        yield put({ type: ActionTypes.GET_TODOS_FAILRE, error });
    }
}

function* postTodoWorker(data) {
    try {
        const response = yield call(() => postTodo(data.data));
        debugger;
        yield put({type: ActionTypes.POST_TODO_SUCCESS, response});
    } catch(error) {
        yield put({type: ActionTypes.POST_TODO_FAILRE, error});
    }
}

function* deleteTodoWorker(data) {
    debugger;
    try{
        if(data.id && data.idParent) {
            const response = yield call(() => _deleteTodo(data.id, data.idParent));
            yield put({type: ActionTypes.DELETE_TODO_SUCCESS, data});
        } else {
            const response = yield call(() => _deleteTodo(data.id));
            yield put({type: ActionTypes.DELETE_TODO_SUCCESS, data});
        }
    } catch(error){
        yield put({type: ActionTypes.DELETE_TODO_FAILRE});
    }
}

function* addChildTodoWorker(data) {
    try{
        yield call(() => addChildTodo(data.text, data.idParent));
        yield put({type: ActionTypes.ADD_TODO_CHILD_SUCCESS, data});
    } catch(error) {
        // yield put({type: ActionTypes., error});
    }
}

function* toggleTodoWorker(data) {
    try {
        const {id, idParent, item} = data;
        if (id && idParent) {
            yield call(() => toggleTodo(id, idParent, item));
            yield put({type: ActionTypes.TOGGLE_TODO_SUCCESS, data});
        } else {
            yield call(() => toggleTodo(id, item));
            yield put({type: ActionTypes.TOGGLE_TODO_SUCCESS, data});
        }
        
    } catch(error) {

    }
}

function* toggleAllWorker(data) {
    try {

    } catch(error) {

    }
}