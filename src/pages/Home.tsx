import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setPage, setFilters, selectFilter} from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizza} from "../redux/slices/pizzasSlice";


const Home: React.FC = () => {
    const dispatch = useDispatch();
    const {categoryId, sort, page, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizza);
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false);


    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx));
    };

    const onChangePage = (page: number) => {
        dispatch(setPage(page));
    };
    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            // @ts-ignore
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                page,
            })
        )
    }
    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                page,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, searchValue, page])

    // Если был первй рендер, то провеяем URL-параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params, sort
                })
            )
            isSearch.current = true
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццу
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, page]);


    const pizzas = items && items.map((obj: any) =>
        <PizzaBlock key={obj.id} {...obj}/>
    )
    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryName={categoryId} categoryHandler={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                ?
                <div className='content__error-info'>
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить позже.</p>
                </div>
                :
                <div className="content__items">
                    {status === 'loading'
                        ? skeletons
                        : pizzas
                    }
                </div>
            }

            <Pagination value={page} changePageHandler={onChangePage}/>
        </div>
    );
};

export default Home;