import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from '../src/pages/inputData/InputData';
import Item from '../src/components/toDo/index';
import Footer from "./pages/footer";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {title: 'Ăn cơm', isComplate: false},
                {title: 'Ăn cá', isComplate: false},
                {title: 'Ăn canh', isComplate: false},
                {title: 'uống nước', isComplate: false},
                {title: 'giặt', isComplate: false},
                {title: 'tắm', isComplate: false},
                {title: 'Nấu cơm', isComplate: false},
                {title: 'đi làm', isComplate: false},
                {title: 'deadline', isComplate: false},
                {title: 'ngồi', isComplate: false},
                {title: 'nghỉ ngơi', isComplate: false},
                {title: 'Ăn cơm trưa', isComplate: false},
                {title: 'Ăn sáng', isComplate: false},
                {title: 'Ăn tối', isComplate: false},
                {title: 'đi học', isComplate: false}
            ],
            selected: 'all',
            pageNumberState: 1
        }
    }

    handleAddItem = (item) => {
        const {listItems} = this.state;
        listItems.push({title: item, isComplate: false});
        this.setState({listItems});
    }

    handleClickCheckboxItem = (item, index) => {
        const {listItems} = this.state;
        listItems[index].isComplate = !listItems[index].isComplate;
        this.setState({listItems}); // property shorthand
    }

    handleClickedButtonDeleteItem = (item, index) => {
        const {listItems} = this.state;
        listItems.splice(index, 1);
        return this.setState({listItems});
    }

    handleClicked = (selected) => {
        this.setState({selected})
    }

    handleClearComplate = () => {
        const {listItems} = this.state;
        const newListItems = listItems.filter( item => item.isComplate === false);
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

    handleClickComplateAll = () => {
        const {listItems} = this.state;
        listItems.map(element => element.isComplate = true);
        this.setState({listItems});
    }

    render() {
        const {listItems, selected, pageNumberState} = this.state;
        let startElements = (pageNumberState-1) * 5, endElements = startElements + 5;
        let limitPage = ~~(listItems.length / 4);
        return (
            <div className="App"  style={{width: '800px', margin: 'auto'}}>
                <Header addItem={this.handleAddItem} handleClickComplateAll={this.handleClickComplateAll}/>
                {
                    listItems && listItems.map((item, index) => {
                        let flag = false;
                        if(selected === 'active' && !item.isComplate) flag = true;
                        if(selected === 'complate' && item.isComplate) flag = true;
                        if(selected === 'all') flag = true;
                        if(flag && endElements > index && startElements <= index) {
                            return (<Item item={item}
                                          key={index}
                                          onItemClickedCheckbox={this.handleClickCheckboxItem}
                                          index={index}
                                          onItemClickedButtonDelete={this.handleClickedButtonDeleteItem}
                            />)
                        }
                    })
                }
              <Footer handleClicked={this.handleClicked}
                      handleClearComplate={this.handleClearComplate}
                      handlePagination = {this.handlePagination}
                      pageNumber = {pageNumberState}
                      limitPage = {limitPage}

              />
            </div>
        );
    }
}

// App.propTypes = {
//     listItems: PropTypes.array,
// }
//
// App.defaultProps = {
//     listItems: [],
// }

export default App;
