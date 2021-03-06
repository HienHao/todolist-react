import React, { Component } from 'react';
import './index.css';

class InputData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentInput:'',
            contentInputSearch:''
        }
    }

    handleInput = event => {
        const {value} = event.target;
        this.setState( {contentInput: value});
        this.props.handleChangeText(value);
    }

    handleKeyDown = event => {
        const {contentInput} = this.state;
        if(event.key === 'Enter') {
            this.props.handleAddTodo(contentInput);
        }
    }

    handleSaveTextInputSearch = (event) => {
        const {value} = event.target;
        this.setState( {contentInputSearch: value});
        this.props.handleSaveTextInputSearch(value);
        this.props.handleSearch(value);
    }

    render() {
        const {handleToggleTodo} = this.props;
        return(
            <header className={'header'} >
                <h1>todos</h1>
                <div className={'newInputData'} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button className={'complateAll'} 
                    onClick={() => handleToggleTodo()}
                    >complete all</button>
                    <input className={'filter-todos'}
                           type={'text'} style={{width: '200px', fontSize: '30px'}}
                           placeholder={'Search here...'}
                           value={this.state.contentInputSearch}
                           onChange={this.handleSaveTextInputSearch}
                    />
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