import React, {Component} from "react";
import './index.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }
    handleChange = (event) => {
        this.props.handleSort(event.target.value);
    }
    render() {
        const { handleClicked, handleClearComplate, handlePagination, pageNumber, limitPage, handleFilter } = this.props;

        return(
            <div className={'footer'} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className={'button'}>
                    <button className={'btn btn-outline-primary'} onClick={() => handleClicked('all')}>All</button>
                    <button className={'btn btn-outline-success'} onClick={ () => handleClicked('active')}>Active</button>
                    <button className={'btn btn-outline-danger'} onClick={() => handleClicked('complate')}>Complated</button>
                    <button className={'btn btn-outline-secondary'} onClick={handleClearComplate}>Clear Complate</button>
                </div>
                <div className={'drop-filter'} style={{marginTop: '10px'}}>
                    Sort with: <select onChange={this.handleChange}>
                    <option value={0} selected={true}>Select</option>
                    <option value={1}>A-Z</option>
                    <option value={2}>No</option>
                </select>
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