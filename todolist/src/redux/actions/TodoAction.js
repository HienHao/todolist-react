import { ADD_TODO,
    DELETE_TODO,
    ADD_TODO_CHILD,
    COMPLETE_TODO,
    TOGGLE_TODO,
    STATUS_FILTER_BUTTON, 
    DELETE_CHILD_TODO} from '../actions/ActionTypes'

const addTodo = text => {
    return {
        type: ADD_TODO,
        text
    }
};

const deleteTodo = (id, idChild) => {
    return {
        type: DELETE_TODO,
        id,
        idChild
    }
};

const deleteChildTodo = (id, idParent) => {
    return {
        type: DELETE_CHILD_TODO,
        id,
        idParent
    }
}
const completeTodo = id => {
    return {
        type: COMPLETE_TODO,
        id
    }
};

const addChildTodo = (text, idParent) => {
    return {
        type: ADD_TODO_CHILD,
        text,
        idParent
    }
}

const toggleTodo = () => {
    return {
        type: TOGGLE_TODO
    }
}

const statusFilterButton = () => {
    return {
        type: STATUS_FILTER_BUTTON  
    }
}

export {
    addTodo, 
    deleteTodo,
    completeTodo,
    addChildTodo,
    toggleTodo,
    statusFilterButton
}