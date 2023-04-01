import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../redux/store";
import {setSort} from "../redux/filter/slice";
import {SortItem, SortPropertyEnum} from "../redux/filter/types";

type SortItems = {
    name: string,
    sortProperty: SortPropertyEnum,
}

type SortProps = {
    sort: SortItem
}
export const sortList: SortItems[] = [
    {name: 'популярности ↓', sortProperty: SortPropertyEnum.RATING_DESC},
    {name: 'популярности ↑', sortProperty: SortPropertyEnum.RATING_ASC},
    {name: 'цене ↓', sortProperty: SortPropertyEnum.PRICE_DESC},
    {name: 'цене ↑', sortProperty: SortPropertyEnum.PRICE_ASC},
    {name: 'алфавиту ↓', sortProperty: SortPropertyEnum.TITLE_DESC},
    {name: 'алфавиту ↑', sortProperty: SortPropertyEnum.TITLE_ASC},
];
export const Sort: React.FC<SortProps> = React.memo(({sort}) => {
    const dispatch = useAppDispatch();
    const sortRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(false);

    const sortHandler = (obj: SortItems) => {
        dispatch(setSort(obj));
        setIsVisible(false);
    }


    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };
        document.body.addEventListener('click', handleClick)
        return () => document.body.removeEventListener('click', handleClick)
    }, [])
    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    style={isVisible ? {rotate: '180deg'} : {}}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
            </div>
            {isVisible &&
                <div className="sort__popup">
                    <ul>
                        {sortList.map((obj, index) => (
                            <li
                                key={index}
                                onClick={() => sortHandler(obj)}
                                className={sort.sortProperty === obj.sortProperty ? "active" : ''}
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
})

