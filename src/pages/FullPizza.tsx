import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios
                    .get('https://641ad7ee9b82ded29d432801.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Error')
                navigate('/')
            }
        }

        fetchPizza();
    }, [])

    if (!pizza) {
        return <>'Loading...'</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{id}. {pizza.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam animi assumenda atque
                beatae corporis culpa dicta dignissimos dolores ducimus earum eligendi esse est facilis harum hic ipsam
                ipsum iusto labore libero modi neque nesciunt nobis, nostrum obcaecati omnis optio perspiciatis placeat
                praesentium quae quas qui quibusdam quod quos repellendus, vel. Aut, impedit ipsa modi molestiae
                officiis saepe vitae. Accusamus atque autem illum iusto magnam magni perferendis quasi veniam! Ab ad
                alias amet aspernatur assumenda consequuntur deleniti fugiat maiores, nulla odio perspiciatis porro
                provident quibusdam, repellendus sint soluta ut. Aliquam culpa eligendi excepturi hic illo incidunt
                molestiae, qui veritatis!</p>
            <h4>{pizza.price}p</h4>
        </div>
    );
};

export default FullPizza;