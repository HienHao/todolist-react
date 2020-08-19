import React, {Component} from 'react';

import ChildTodo from "../../pages/inputData/childTodo";

import './index.css';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.clickedCheckbox = this.clickedCheckbox.bind(this);
    }
    clickedCheckbox() {
        const {item, index, indexParent} = this.props;
        this.props.onItemClickedCheckbox(item,index, indexParent);
    }
    clickedButtonDeleteItem = () => {
        const {item, index, indexParent} = this.props;
        this.props.onItemClickedButtonDelete(item, index, indexParent);
    }

    render() {
        const { item, index, onClickButtonAddChild } = this.props;
        const checkedItem = item.isComplete ? true : false;
        return(
            <div className= {`item-${index} ${item.isComplete ? 'isComplate':''} itemTodo`} >
              <div className={'row'}>
                  <div className="col-md-2">
                      <input type="checkbox"
                             className={'inputCheckbox'}
                             checked={checkedItem}
                             onClick={this.clickedCheckbox}
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
                                  onClick={() => onClickButtonAddChild(index)}
                              >Add child</button>
                          }
                          <button
                              onClick={this.clickedButtonDeleteItem}
                              className={'btn btn-outline-danger'}
                              style={{marginLeft: '5px'}}
                          >Delete</button>
                      </div>
              </div>
          </div>
        );
    }
}

