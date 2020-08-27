import * as ActionTypes from '../actions/ActionTypes'
// reducer se goi den day
const addTodo = text => {
    return {
        type: ActionTypes.ADD_TODO,
        text
    }
};

const deleteTodo = (id, idChild) => {
    debugger
    return {
        type: ActionTypes.DELETE_TODO,
        id,
        idChild
    }
};

const completeTodo = (id, idParent) => {
    debugger;
    return {
        type: ActionTypes.COMPLETE_TODO,
        id,
        idParent
    }
};

const addChildTodo = (text, idParent) => {
    debugger;
    return {
        type: ActionTypes.ADD_TODO_CHILD,
        text,
        idParent
    }
}

const toggleTodo = () => {
    return {
        type: ActionTypes.TOGGLE_TODO
    }
}

const statusFilterButton = () => {
    return {
        type: ActionTypes.STATUS_FILTER_BUTTON  
    }
}

const sortTodo = (listItems) => {
    const lis = listItems;
    debugger
    return {
        type: ActionTypes.SORT_TODO,
        listItems
    }
}
const clearComplete = () => {
    return {
        type: ActionTypes.CLEAR_COMPLETE,
    }
}
// const saveTextInput = (text) => {
//     return {
//         type: SAVE_TEXT_INPUT,
//         text
//     }
// }
const getTodo = () => {
    return {
        type: ActionTypes.GET_TODOS_REQUEST
    }
}

const postTodo = (data) => {
    
    return {
        type: ActionTypes.POST_TODO_REQUEST,
        data
    }
}

const putTodo = () => {
    return {
        type: ActionTypes.PUT_TODO_REQUEST
    }
}

const _deleteTodo = () => {
    return {
        type: ActionTypes.DELETE_TODO_REQUEST
    }
}

export {
    addTodo, 
    deleteTodo,
    completeTodo,
    addChildTodo,
    toggleTodo,
    statusFilterButton,
    sortTodo,
    clearComplete,
    getTodo,
    postTodo,
    _deleteTodo,
    putTodo
    // saveTextInput
}