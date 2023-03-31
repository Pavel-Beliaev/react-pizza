import React from 'react';

type CategoriesProps = {
    categoryName: number,
    categoryHandler: any,
}
const Categories: React.FC<CategoriesProps> = ({categoryName, categoryHandler}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((value, index) => (
                    <li key={value} onClick={() => categoryHandler(index)} className={categoryName === index ? "active" : ''}>
                        {value}
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Categories;