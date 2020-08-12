import React, {Component} from "react";
import './index.css';

export default class Footer extends Component {
    render() {
        const { handleClicked, handleClearComplate, handlePagination, pageNumber, limitPage } = this.props;
        return(
            <div>
                <div className={'button'}>
                    <button onClick={() => handleClicked('all')}>All</button>
                    <button onClick={ () => handleClicked('active')}>Active</button>
                    <button onClick={() => handleClicked('complate')}>Complated</button>
                    <button onClick={handleClearComplate}>Clear Complate</button>
                </div>
                <div className={'pagination'}>
                    <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous" onClick={ () => handlePagination(-1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {/*<li className="page-item" onClick={ () => handlePagination('1')}><a className="page-link" >1</a></li>*/}
                        {/*<li className="page-item" onClick={ () => handlePagination('2') }><a className="page-link" >2</a></li>*/}
                        {/*<li className="page-item" onClick={ () => handlePagination('3')}><a className="page-link" >3</a></li>*/}
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