import React, {Component} from 'react';
import Item from '../../components/toDo/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'

import * as TodoAction from '../../redux/actions/TodoAction';
class TodosSection extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        const {TodosSectionActions: {getTodo}, listItems} = this.props;
        debugger;
        getTodo();
    }

    handleAddChild = (idParent) => {
        const {TodosSectionActions: {addChildTodo}, textContent} = this.props;
        // const {textContent} = this.state;
        addChildTodo(textContent, idParent);
    }

    handleComplete = (id, idParent) => {
        const {TodosSectionActions: {completeTodo}} = this.props;
        completeTodo(id ,idParent);
    }

    render() {
        const {searchTextContent, selected, pageNumberState, copyListItems ,listItems, TodosSectionActions, textContent} = this.props;
        debugger
        let startElements = (pageNumberState-1) * 5, endElements = startElements + 5;
        const _listItem = !searchTextContent ? listItems : copyListItems;
        debugger;
        if(!_listItem) return null;
        return(
            <div>
                {
                    Object.keys(_listItem).length !== 0 && _listItem.map((item, index) => {
                        let flag = false;
                        if(selected === 'active' && !item.isComplete) flag = true;
                        if(selected === 'complate' && item.isComplete) flag = true;
                        if(selected === 'all') flag = true;
                        if(flag && startElements <= index && endElements > index) {
                            return (
                                <div>
                                    <Item item={item}
                                          key={index}
                                          handleComplete={this.handleComplete}
                                          index={index}
                                          handleDelete={() => this.handleDelete()}
                                          handleAddChild={this.handleAddChild}
                                          id={item._id}
                                          _deleteTodo={TodosSectionActions._deleteTodo}
                                          handleAddChild={TodosSectionActions.addChildTodo}
                                          textContent={textContent}
                                    />
                                    <div style={{marginLeft: '60px'}}>
                                        {item.children && item.children.map((element) => {
                                            return (<Item item={element}
                                                          key={index}
                                                          handleDelete={this.handleDelete }
                                                          handleComplete={this.handleComplete}
                                                          id={element._id}
                                                          idParent={item._id}
                                                          _deleteTodo={TodosSectionActions._deleteTodo}
                                            />);
                                        } )}
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}
function change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim();
    return str;
}

const getState = (state) => state;

const getSort = createSelector(
    [getState],
    (state) => {
        const b = [...state.TodoReducer.listItems].sort((a, b) => {
                const titleA = change_alias(a.title);
                const titleB = change_alias(b.title);
                if(titleA < titleB) return -1;
                if(titleA > titleB) return 1;
                return 0;
            });
        return b;
    },
);

function mapStateToProps(state, ownProps) {
    const {enableSort} = ownProps;
    return {
        listItems: !enableSort ? state.TodoReducer.listItems : getSort(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        TodosSectionActions: bindActionCreators(TodoAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosSection);
