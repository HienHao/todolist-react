import React, { Component } from 'react';
import './index.css';

class InputData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentInput:'',
        }
    }

    handleInput = event => {
        this.setState( {contentInput: event.target.value});
    }
    handleKeyDown = event => {
        if(event.key === 'Enter') {
            this.props.addItem(this.state.contentInput);
        }
    }
    render() {

        return(
            <header className={'header'}>
                <h1>todos</h1>
                {/* <App test={'test'} />*/}
                <div className={'newInputData'}>
                    <button className={'complateAll'}>complate all</button>
                    <input
                        className={'newTodo'}
                        type="text"
                        placeholder={'What needs to be done?'}
                        value={this.state.contentInput}
                        onChange={this.handleInput}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
            </header>
        );
    }
}

export default InputData;