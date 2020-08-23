import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoAction from './redux/actions/TodoAction';

import Header from '../src/pages/inputData/InputData';
import Item from '../src/components/toDo/index';
import Footer from "./pages/footer";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {
                    title: 'Ăn cơm',
                    isComplete: false,
                    children: [
                        {title: 'Ăn cháo', isComplete: false, isChildren: true},
                        {title: 'Ăn cá', isComplete: false, isChildren: true},
                        {title: 'Ăn tôm', isComplete: false, isChildren: true},
                    ],
                    isHaveChildren: true,
                },
                {title: 'Ăn cá', isComplete: false, children: [], isHaveChildren: false},
                {title: 'Ăn canh', isComplete: false, children: [], isHaveChildren: false },
                {title: 'uống nước', isComplete: false, children: [], isHaveChildren: false},
                {title: 'giặt', isComplete: false, children: [], isHaveChildren: false},
                {title: 'tắm', isComplete: false, children: [], isHaveChildren: false},
                {title: 'Nấu cơm', isComplete: false, children: [], isHaveChildren: false},
                {title: 'đi làm', isComplete: false, children: [], isHaveChildren: false},
                {title: 'deadline', isComplete: false, children: [], isHaveChildren: false},
                {title: 'ngồi', isComplete: false, children: [], isHaveChildren: false},
                {title: 'nghỉ ngơi', isComplete: false, children: [], isHaveChildren: false},
                {title: 'Ăn cơm trưa', isComplete: false, children: [], isHaveChildren: false},
                {title: 'Ăn sáng', isComplete: false, children: [], isHaveChildren: false},
                {title: 'Ăn tối', isComplete: false, children: [], isHaveChildren: false},
                {title: 'đi học', isComplete: false, children: [], isHaveChildren: false}
            ],
            copyListItems: [],
            selected: 'all',
            textContent: '',
            searchTextContent: '',
            pageNumberState: 1,
            selectFiltersOption: 0
        }
    }

    handleAddItem = (item) => {
        const {listItems} = this.state;
        listItems.push({title: item, isComplete: false});
        this.setState({listItems});
    }

    handleClickCheckboxItem = (item, index, indexParent) => {
        const {listItems} = this.state;
        if(item.isChildren) {
            item.isComplete = !item.isComplete;
            !item.isComplete && (listItems[indexParent].isComplete = false);
            this.setState({listItems});
        } else {
            listItems[index].isComplete = !listItems[index].isComplete;
            listItems[index].children.map( childItem => {
                childItem.isComplete = !childItem.isComplete;
            });
            this.setState({listItems}); // property shorthand
        }
    }

    handleClickedButtonDeleteItem = (item, index, indexParent) => {
        const {listItems} = this.state;
        item.isChildren ? listItems[indexParent].children.splice(index, 1) : listItems.splice(index, 1);
        // item.isComplete ? listItems.children.splice(index, 1) : listItems.splice(index, 1);
        return this.setState({listItems});
    }

    handleClicked = (selected) => {
        this.setState({selected})
    }

    handleClearComplate = () => {
        const {listItems} = this.state;
        const newListItems = listItems.filter( item => item.isComplete === false);
        this.setState({listItems: newListItems})
    }

    handlePagination = (pageNumber) => {
        let {pageNumberState, listItems} = this.state;
        let limitPage = ~~(listItems.length / 4);
        if(pageNumberState >= 1 && pageNumberState <= limitPage) {
            if(pageNumber === 0 && pageNumberState < limitPage) {
                pageNumberState = pageNumberState + 1;
                this.setState({pageNumberState});
            }
            if(pageNumber === -1 && pageNumberState > 1) {
                pageNumberState = pageNumberState - 1;
                this.setState({pageNumberState});
            }
        }
    }
    change_alias = (alias) => {
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

    handleClickComplateAll = () => {
        const {listItems} = this.state;
        listItems.map(element => element.isComplete = true);
        this.setState({listItems});
    }

    handleClickButtonAddChild = (index) => {
        const {listItems, textContent} = this.state;
        let pattenDataChildTodo = {
            title: textContent,
            isComplete: false,
            isChildren: true
        }
        listItems[index].children.push(pattenDataChildTodo);
        this.setState({listItems, isHaveChildren: true});
    }

    handleChangeText = (textContent) => {
        this.setState({textContent});
    }

    handleSaveTextInputSearch = (value) => {
        this.setState({searchTextContent: value});
    }

    handleSearch = (values) => {
        const {listItems,searchTextContent} = this.state;
        let {copyListItems} = this.state;
        copyListItems = listItems;
        // convert và filter
        let testFilter = copyListItems.filter( item => this.change_alias(item.title).includes(this.change_alias(values)));
        this.setState({copyListItems: testFilter});
    }

    handleSort = (selected) => {
        const {listItems} = this.state;
        debugger;
        if(parseInt(selected) === 1) {
            listItems.sort((a, b) => {
                const titleA = this.change_alias(a.title);
                const titleB = this.change_alias(b.title);
                if(titleA < titleB) return -1;
                if(titleA > titleB) return 1;
                return 0;
            });
        }
        this.setState({listItems});
    }
    // redux
    handleAddTodo = (text) => {
        const {TodoActions: {addTodo}} = this.props;
        addTodo(text);
    }

    render() {
        // listItems
        const {TodoItems: {listItems}, TodoActions: {deleteTodo}} = this.props;
        const {copyListItems, selected, searchTextContent, pageNumberState} = this.state;
        let startElements = (pageNumberState-1) * 5, endElements = startElements + 5;
        if(!listItems) return;
        let limitPage = ~~(listItems.length / 4);
        console.log('Props from app: ',this.props);
        
        return (
            <div className="App" style={{width: '900px', margin: 'auto'}}>
                <Header
                    addItem={this.handleAddItem}
                    handleClickComplateAll={this.handleClickComplateAll}
                    handleChangeText ={this.handleChangeText}
                    handleSaveTextInputSearch = {this.handleSaveTextInputSearch}
                    handleSearch = {this.handleSearch}
                    handleAddTodo = {this.handleAddTodo}
                />
                {
                    !searchTextContent ? (listItems && listItems.map((item, index) => {
                        let flag = false;
                        if(selected === 'active' && !item.isComplete) flag = true;
                        if(selected === 'complate' && item.isComplete) flag = true;
                        if(selected === 'all') flag = true;
                        if(flag && startElements <= index && endElements > index) {
                            return (
                                <div>
                                    <Item item={item}
                                          key={index}
                                          onItemClickedCheckbox={this.handleClickCheckboxItem}
                                          index={index}
                                          onItemClickedButtonDelete={this.handleClickedButtonDeleteItem}
                                          onClickButtonAddChild={this.handleClickButtonAddChild}
                                          handleDeleteTodo = {() => { deleteTodo(item.id)} }
                                    />
                                    <div style={{marginLeft: '60px'}}>
                                        {item.children && item.children.map( (element, indexChild) => {
                                            return (<Item item={element}
                                                          key={index}
                                                          onItemClickedCheckbox={this.handleClickCheckboxItem}
                                                          index={indexChild}
                                                          indexParent ={index}
                                                          onItemClickedButtonDelete={this.handleClickedButtonDeleteItem}
                                                          handleDeleteTodo = {() => { deleteTodo(item.id ,item.children[indexChild].id)} }
                                            />)
                                        } )}
                                    </div>
                                </div>
                            )
                        }
                        // neu search
                    })) : (copyListItems.map((item, index) => {
                        let flag = false;
                        if(selected === 'active' && !item.isComplete) flag = true;
                        if(selected === 'complate' && item.isComplete) flag = true;
                        if(selected === 'all') flag = true;
                        if(flag) {
                            return (
                                <div>
                                    <Item item={item}
                                          key={index}
                                          onItemClickedCheckbox={this.handleClickCheckboxItem}
                                          index={index}
                                          onItemClickedButtonDelete={this.handleClickedButtonDeleteItem}
                                          onClickButtonAddChild={this.handleClickButtonAddChild}
                                    />
                                    <div style={{marginLeft: '60px'}}>
                                        {item.children && item.children.map( (element, indexChild) => {
                                            return (<Item item={element}
                                                          key={index}
                                                          onItemClickedCheckbox={this.handleClickCheckboxItem}
                                                          index={indexChild}
                                                          indexParent ={index}
                                                          onItemClickedButtonDelete={this.handleClickedButtonDeleteItem}
                                            />)
                                        } )}
                                    </div>
                                </div>
                            )
                        }
                    }))
                }

                <Footer handleClicked={this.handleClicked}
                        handleClearComplate={this.handleClearComplate}
                        handlePagination = {this.handlePagination}
                        pageNumber = {pageNumberState}
                        limitPage = {limitPage}
                        handleSort = {this.handleSort}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        TodoItems: state.TodoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        TodoActions: bindActionCreators(TodoAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
