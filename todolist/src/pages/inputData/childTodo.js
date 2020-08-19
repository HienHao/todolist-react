import React, {Component} from 'react';

export default class ChildTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentChildTodo: ''
        }
    }
    render() {
        return(
            <input type={'text'} placeholder={'What needs to be done?'}/>
        )
    }
}