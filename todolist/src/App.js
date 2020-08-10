import React, {Component} from 'react';
import Header from '../src/pages/inputData/InputData';
import Item from '../src/components/toDo/index';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listItem: [
                {title: 'An com', isComplate: true},
                {title: 'An com', isComplate: false},
                {title: 'An com', isComplate: true},
                {title: 'An com', isComplate: false},
            ]
        }
    }
    render() {
      return (
          <div className="App">
              <Header/>
              {this.state.listItem.map( (item, index) => { <Item />})}
          </div>
      );
  }
}

export default App;
