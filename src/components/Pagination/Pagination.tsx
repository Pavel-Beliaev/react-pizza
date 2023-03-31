import React from 'react';
import ReactPaginate from "react-paginate";
import style from './Pagination.module.scss'

type PaginationProps = {
    changePageHandler: (page: number) => void,
    value: number,
}
const Pagination: React.FC<PaginationProps> = ({changePageHandler, value}) => {
    return (
        <ReactPaginate
            className={style.paginate}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => changePageHandler(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={value - 1}
        />
    );
};

export default Pagination;