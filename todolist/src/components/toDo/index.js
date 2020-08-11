import React, {Component} from 'react';
import './index.css';
export default class Item extends Component {
    constructor(props) {
        super(props);
    }
    clickedCheckbox = () => {
        this.props.onItemClickedCheckbox(this.props.item, this.props.index);
    }
    clickedButtonDeleteItem = () => {
        this.props.onItemClickedButtonDelete(this.props.item, this.props.index);
    }
    render() {
        const { isComplate, title, index} = this.props.item;
        const checkedItem = isComplate ? true : false;
        return(
            <div className= {`item-${index} ${isComplate ? 'isComplate':''} itemTodo`} >
              <div className={'row'}>
                  <div className="col-md-4 bg-primary">
                      <input type="checkbox"
                             className={'inputCheckbox'}
                             checked={checkedItem}
                             onClick={this.clickedCheckbox}
                      />
                  </div>
                  <div className="col-md-4 bg-success">
                      <p>{title}</p>
                  </div>
                  <div className="col-md-4 bg-success">
                      <button onClick={this.clickedButtonDeleteItem}>Xóa</button>
                  </div>
              </div>
          </div>
        );
    }
}

