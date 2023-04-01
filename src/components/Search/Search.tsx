import React, {ChangeEventHandler, useCallback, useRef, useState} from 'react';
import style from './Search.module.scss'
import debounce from 'lodash.debounce'
import {setSearchValue} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../redux/store";

const Search: React.FC = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const cleanAndFocus = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    }

    const updateChangeInputHandler = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 300),
        [],
    );

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateChangeInputHandler(event.target.value);
    }
    return (
        <div className={style.root}>
            <svg className={style.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px"
                 height="50px">
                <path
                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={changeInputHandler}
                className={style.input}
                placeholder='Найти пиццу...'/>
            {value &&
                <svg
                    className={style.cleanIcon}
                    onClick={cleanAndFocus}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="50px"
                    height="50px">
                    <path
                        d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/>
                </svg>
            }
        </div>
    );
};

export default Search;