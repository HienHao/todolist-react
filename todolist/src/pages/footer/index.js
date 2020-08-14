import React, {Component} from "react";
import './index.css';

export default class Footer extends Component {
    render() {
        const { handleClicked, handleClearComplate, handlePagination, pageNumber, limitPage } = this.props;
        return(
            <div className={'footer'} style={{display: 'flex'}}>
                <div className={'button'}>
                    <button className={'btn btn-outline-primary'} onClick={() => handleClicked('all')}>All</button>
                    <button className={'btn btn-outline-success'} onClick={ () => handleClicked('active')}>Active</button>
                    <button className={'btn btn-outline-danger'} onClick={() => handleClicked('complate')}>Complated</button>
                    <button className={'btn btn-outline-secondary'} onClick={handleClearComplate}>Clear Complate</button>
                </div>
                <div className={'pagination'} style={{display: 'flex'}}>
                    <nav>
                    <ul className="pagination" style={{margin: 0, alignItems: 'center'}}>
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous" onClick={ () => handlePagination(-1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" aria-label="Next" onClick={ () => handlePagination(0)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        <li>
                            {`Trang ${pageNumber}/${limitPage}`}
                        </li>
                    </ul>
                </nav>
                </div>
            </div>
        );
    }
}