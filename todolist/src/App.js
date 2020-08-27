import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoAction from './redux/actions/TodoAction';

import Header from '../src/pages/inputData/InputData';
import Item from '../src/components/toDo/index';
import Footer from "./pages/footer";
import TodosSection from './pages/TodosSection/TodosSection';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            copyListItems: [],
            selected: 'all',
            textContent: '',
            searchTextContent: '',
            pageNumberState: 1,
            enableSort: false
        }
    }
    
    // handleAddItem = (item) => {
    //     const {listItems} = this.state;
    //     listItems.push({title: item, isComplete: false});
    //     this.setState({listItems});
    // }

    handleClicked = (selected) => {
        this.setState({selected})
    }

    handlePagination = (pageNumber) => {
        const {TodoItems: {listItems}} =  this.props;
        const {pageNumberState} = this.state;
        const limitPage = ~~(listItems.length / 4);
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

    handleChangeText = (textContent) => {
        this.setState({textContent});
    }

    handleSaveTextInputSearch = (value) => {
        this.setState({searchTextContent: value});
    }

    handleSearch = (values) => {
        const {TodoItems: {listItems}} = this.props;
        let {copyListItems} = this.state;
        const {TodoActions: {sortTodo}, } = this.props; 
        copyListItems = listItems;
        // convert và filter
        let itemFilter = copyListItems.filter( item => this.change_alias(item.title).includes(this.change_alias(values)));
        this.setState({copyListItems: itemFilter});
    }

    handleSort = (selected) => {
        debugger
        if(parseInt(selected) === 1) {
            this.setState({enableSort: true});
        } else {
            this.setState({enableSort: false});
        }
    }
    // redux
    handleAddTodo = (text) => {
        const {TodoActions: {addTodo, postTodo}} = this.props;
        debugger
        postTodo(text);
        debugger
        // addTodo(text);
    }

    handleToggleTodo = () => {
        const {TodoActions: {toggleTodo}} = this.props;
        toggleTodo();
    }

    hanldeClearComplete = () => {
        const {TodoActions: {clearComplete}} = this.props;
        clearComplete();
    }

    handleDeleteTodo = (id, idParent) => {
        const {TodoActions: {deleteTodo}} = this.props;
        deleteTodo(id, idParent);
    }

    render() {
        // listItems
        // const {TodoItems: {listItems}, TodoActions: {deleteTodo}} = this.props;
        
        const {TodoItems, TodoActions: {postTodo}} = this.props;
        // debugger
        const listItems = TodoItems.listItems;
        const {copyListItems, selected, searchTextContent, pageNumberState, textContent, enableSort} = this.state;
        let startElements = (pageNumberState-1) * 5, endElements = startElements + 5;
        if(!listItems) return;
        let limitPage = ~~(listItems.length / 4);
        // console.log('Props from app: ',this.props);
        return (
            <div className="App" style={{width: '900px', margin: 'auto'}}>
                <Header
                    // addItem={this.handleAddItem}
                    handleClickComplateAll={this.handleClickComplateAll}
                    handleChangeText ={this.handleChangeText}
                    handleSaveTextInputSearch = {this.handleSaveTextInputSearch}
                    handleSearch = {this.handleSearch}
                    handleAddTodo = {this.handleAddTodo}
                    handleToggleTodo = {this.handleToggleTodo}
                    postTodo = {postTodo}
                />
                <TodosSection
                    searchTextContent = {searchTextContent}
                    // TodoItems = {TodoItems}
                    selected = {selected}
                    pageNumberState={pageNumberState}
                    deleteTodo={this.handleDeleteTodo}
                    copyListItems={copyListItems}
                    enableSort={enableSort}
                    textContent={textContent}
                />
                <Footer handleClicked={this.handleClicked}
                        // handleClearComplate={this.handleClearComplate}
                        hanldeClearComplete = {this.hanldeClearComplete}
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
        TodoActions: bindActionCreators(TodoAction, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
