import { v4 as uuidv4 } from 'uuid';
import * as ActionTypes from '../actions/ActionTypes';
// container se map action va reducer
const initialState = {
    listItems: [
        // {
        //     id: 1,
        //     title: 'Ăn cơm',
        //     isComplete: false,
        //     children: [
        //         {id: uuidv4(),title: 'Ăn cháo', isComplete: false, isChildren: true},
        //         {id: uuidv4(),title: 'Ăn cá', isComplete: false, isChildren: true},
        //         {id: uuidv4(),title: 'Ăn tôm', isComplete: false, isChildren: true},
        //     ],
        //     isHaveChildren: true,
        // },
        // {id: 2, title: 'Ăn cá', isComplete: false, children: [], isHaveChildren: false},
        // {id: 3, title: 'Ăn canh', isComplete: false, children: [], isHaveChildren: false },
        // {id: 4, title: 'uống nước', isComplete: false, children: [], isHaveChildren: false},
        // {id: 5, title: 'giặt', isComplete: false, children: [], isHaveChildren: false},
        // {id: 6, title: 'tắm', isComplete: false, children: [], isHaveChildren: false},
        // {id: 7, title: 'Nấu cơm', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'giặt', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'tắm', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'Nấu cơm', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'đi làm', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'deadline', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'ngồi', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'nghỉ ngơi', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'Ăn cơm trưa', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'Ăn sáng', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'Ăn tối', isComplete: false, children: [], isHaveChildren: false},
        // {id: 0, title: 'đi học', isComplete: false, children: [], isHaveChildren: false}
    ],
    fetching: false,
    error: false
};

export default function TodoReducer(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.ADD_TODO:
            console.log('ADD TODO');
            const todo = {
                title: action.text,
                isComplete: false,
                children: [],
                isHaveChildren: false
            }
            state.listItems.push(todo);
            return Object.assign({}, state);
        case ActionTypes.DELETE_TODO:
            console.log('DELETE_TODO, id: ', action.id, action.idChild);
            if(action.idChild) {
                const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.id);
                const newListItems = state.listItems[indexParent].children.filter(itemChild => itemChild.id !== action.idChild);
                state.listItems[indexParent].children = newListItems;
            } else {
                 const newListItems = state.listItems.filter(todo => todo.id !== action.id);
                state.listItems = newListItems;
            }
            
            return {...state};
        case ActionTypes.COMPLETE_TODO:
            console.log('COMPLETE_TODO');
            debugger;
            // if(!action.idParent) { // complete parent
            //     const index = state.listItems.findIndex(item => item.id === action.id);
            //     state.listItems[index].isComplete = !state.listItems[index].isComplete;
            //     if(state.listItems[index].children.length > 0 ) {
            //         state.listItems[index].children.map(itemChild => itemChild.isComplete = state.listItems[index].isComplete);
            //     }
            // } else { //complete child
            //     const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.idParent);
            //     const index = state.listItems[indexParent].children.findIndex(item => item.id === action.id);
            //     let flag = false;
            //     state.listItems[indexParent].children[index].isComplete = !state.listItems[indexParent].children[index].isComplete;
            //     // co 1 phan tu chua complete
            //     if(state.listItems[indexParent].isComplete) {
            //         const isFlag = (itemChild) => itemChild.isComplete === false;
            //         flag = state.listItems[indexParent].children.some(isFlag);
            //     }
            //     if(flag) state.listItems[indexParent].isComplete = false
                
            // }
            return {...state};
        case ActionTypes.TOGGLE_TODO:
            console.log('TOGGLE_TODO');
            state.listItems.map(item => {
                item.isComplete = true;
                item.children.length > 0 && item.children.map(itemChild => itemChild.isComplete = true);
            });
            return {...state};
        case ActionTypes.STATUS_FILTER_BUTTON:
            console.log('STATUS_FILTER_BUTTON');
            return state;
        case ActionTypes.ADD_TODO_CHILD:
            console.log('ADD_TODO_CHILD, id = ', action.idParent);
            // const indexParent = state.listItems.findIndex(itemParent => itemParent.id === action.idParent);
            // const newItem = {
            //     id: uuidv4(),
            //     title: action.text,
            //     isComplete: false, 
            //     isChildren: true
            // }
            // state.listItems[indexParent].children.push(newItem);
            return {...state};
        case ActionTypes.SORT_TODO:
            return {...state};
        case ActionTypes.CLEAR_COMPLETE:
            const newListItems = state.listItems.filter(item => item.isComplete === false);
            state.listItems = newListItems;
            return {...state};
        case ActionTypes.GET_TODOS_SUCCES:
            state.listItems = action.todos;            
            return {...state};
        case ActionTypes.GET_TODOS_FAILRE:
            state.listItems = {};
            return {...state};
        case ActionTypes.POST_TODO_SUCCESS:
            const {listItems} = state;
            // debugger
            // state.listItems.push(action.response.data);

            // return Object.assign({}, state);
            // debugger;
            // state.listItems.push(action.response.data);
            // const newState = {...state};
            listItems.push(action.response.data)
            // console.log(newState === state);
            // console.log(state === state);
            debugger;
            const newState = {listItems: [...listItems]};
            debugger;
            return {...newState};
        case ActionTypes.POST_TODO_FAILRE:
            debugger
            return {};
        case ActionTypes.DELETE_TODO_SUCCESS:
            const {id, idParent} = action.data;
            debugger;
            // if(id && idParent) {
            //     const indexParent = newItems.findIndex(itemParent => itemParent.id === idParent);
            //     const newListItems = newItems[indexParent].children.filter(itemChild => itemChild.id !== id);
            //     newItems[indexParent].children = newListItems;
            //     debugger;
            // } else {
            //     const newListItems = newItems.filter(todo => todo.id !== id);
            //     newItems = newListItems;
            //     debugger;
            // }
            const indexParent = state.listItems.findIndex(itemParent => itemParent._id === idParent);
            const listFilter = state.listItems[indexParent].children.filter(itemChild => itemChild._id !== id);
            const newListChildren = [...state.listItems[indexParent]];
            debugger;
            const newStateItems = {newListChildren: [...listFilter]};
            debugger;
            // newListChildren = listFilter;
            // const newStateItems = {listItems: {children: [...listFilter]}};
            const asadasd = Object.assign({}, state.listItems[indexParent], listFilter)
            debugger;
            return {...asadasd};
        case ActionTypes.ADD_TODO_CHILD_SUCCESS:
            // debugger;
            const {text} = action.data; 
            // const asas = state.listItems.push({title: text, isComplete: false, isChilrend: true});
            state.listItems.push({title: text, isComplete: false, isChilrend: true})
            debugger
            return Object.assign({}, state);
        default:
            return state;
    }
} 