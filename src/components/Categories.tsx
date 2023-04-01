import React from 'react';

type CategoriesProps = {
    categoryName: number,
    onChangeCategory: (idx: number) => void,
}
const Categories: React.FC<CategoriesProps> = React.memo( ({categoryName, onChangeCategory}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];


    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => (
                    <li key={value} onClick={() => onChangeCategory(index)} className={categoryName === index ? "active" : ''}>
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;