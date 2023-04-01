import React from 'react';
import style from "./NotFounfBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
    return (
        <div className={style.root}>
            <h1>
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p>
                К сожалению данная странница отсутствует
            </p>
        </div>
    );
};

