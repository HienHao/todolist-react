import React, {Component} from 'react';

import './index.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoAction from '../../redux/actions/TodoAction';
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.clickedCheckbox = this.clickedCheckbox.bind(this);
    }
    clickedCheckbox() {
        const {item, index, indexParent, onItemClickedCheckbox} = this.props;
        onItemClickedCheckbox(item,index, indexParent);
    }
    clickedButtonDeleteItem = () => {
        const {item, index, indexParent, onItemClickedButtonDelete} = this.props;
        onItemClickedButtonDelete(item, index, indexParent);
    }

    // redux
    handleDeleteTodo = () => {
        const {id, idParent, _deleteTodo} = this.props;
        debugger;
        _deleteTodo(id, idParent);
    }

    handleAddChild = () => {
        const {id, handleAddChild, textContent} = this.props;
        handleAddChild(textContent, id);
    }

    render() {
    const { item, id, index, idParent, handleComplete } = this.props;
        const checkedItem = item.isComplete ? true : false;
        return(
            <div className= {`item-${index} ${item.isComplete ? 'isComplate':''} itemTodo`} >
              <div className={'row'}>
                  <div className="col-md-2">
                      <input type="checkbox"
                             className={'inputCheckbox'}
                             checked={checkedItem}
                            //  onClick={this.clickedCheckbox}
                            onClick={() => handleComplete(id, idParent)}
                      />
                  </div>
                      <div className="col-md-6">
                          <p>{item.title}</p>
                          <div className={'child-todo'}></div>
                      </div>
                      <div className="col-md-4">
                          {
                              !item.isChildren && <button
                                  className={'add-chid btn btn-outline-success'}
                                //   onClick={() => onClickButtonAddChild(index)}
                                // onClick={() => handleAddChild(id)}
                                onClick={this.handleAddChild}
                              >Add child</button>
                          }
                          <button
                            //   onClick={this.clickedButtonDeleteItem}
                                onClick={this.handleDeleteTodo}
                                className={'btn btn-outline-danger'}
                                style={{marginLeft: '5px'}}
                          >Delete</button>
                      </div>
              </div>
          </div>
        );
    }
}
