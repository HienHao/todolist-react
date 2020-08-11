import React, {Component} from "react";
import './index.css';

export default class Footer extends Component {
    render() {
        const { handleClicked, handleClearComplate } = this.props;
        return(
            <div>
                <button onClick={() => handleClicked('all')}>All</button>
                <button onClick={ () => handleClicked('active')}>Active</button>
                <button onClick={() => handleClicked('complate')}>Complated</button>
                <button onClick={handleClearComplate}>Clear Complate</button>
            </div>
        );
    }
}