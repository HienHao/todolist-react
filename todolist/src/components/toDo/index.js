import React, {Component} from 'react';
import './index.css';
import Footer from '../../pages/footer';
export default class Item extends Component {
    constructor(props) {
        debugger;
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

    // redux
    handleDeleteTodo = () => {
        const {handleDeleteTodo} = this.props;
        handleDeleteTodo();
    }
    render() {
    const { item, id, index, idParent, handleComplete, onClickButtonAddChild, handleAddChild } = this.props;
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
                                onClick={() => handleAddChild(id)}
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

// function sum(list) {
//     let sum = 0;
//     for(let x of list)
//         sum+=x;
//     return sum;
// }

// function sumAbsolute(list) {
//     for(let i =0; i < list.length; i++){
//         list[i] = -list[i];
//     }
//     return sum(list);
// }

// let asList = [-5, -3, -2];

// console.log(sumAbsolute([...asList]));
// console.log(asList);
// console.log(sum(asList));