import React, {Component} from 'react';
import './index.css';
export default class ToDo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div className={'container'}>
              <div className={'row'}>
                  <div className="col-md-4 bg-primary">
                      <input type="checkbox" className={'inputCheckbox'}/>
                  </div>
                  <div className="col-md-8 bg-success">
                      <p>{this.props.title}</p>
                  </div>
              </div>
          </div>
        );
    }
}

