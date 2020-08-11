import React, {Component} from 'react';
import Header from '../src/pages/inputData/InputData';
import Item from '../src/components/toDo/index';
import Footer from "./pages/footer";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                {title: 'Ăn cơm', isComplate: false},
                {title: 'Ăn cơm', isComplate: false},
                {title: 'Ăn cơm', isComplate: false},
                {title: 'Ăn cơm', isComplate: false},
                {title: 'Ăn cơm', isComplate: false},
                {title: 'Ăn cơm', isComplate: false}
            ],
            selected: 'all'
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
        this.setState({listItems});
    }

    handleClickedButtonDeleteItem = (item, index) => {
        const {listItems} = this.state;
        listItems.splice(index, 1);
        this.setState({listItems});
    }

    handleClicked = (selected) => {
        this.setState({selected: selected})
    }
    handleClearComplate = () => {
        const {listItems} = this.state;
        const newListItems = listItems.filter( item => item.isComplate === false);
        this.setState({listItems: newListItems})
    }

    render() {
        const {listItems, selected} = this.state;
        return (
            <div className="App">
                <Header addItem={this.handleAddItem} />
                {
                    listItems.map((item, index) => {
                        let flag = false;
                        if(selected === 'active' && !item.isComplate) flag = true;
                        if(selected === 'complate' && item.isComplate) flag = true;
                        if(selected === 'all') flag = true;
                        if(flag) {
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
              />
            </div>
        );
  }
}

export default App;
