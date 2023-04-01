import {getSumPrice} from "./getSum";
import {CartItemType} from "../redux/cart/types";

export const getCardFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = getSumPrice(items);

    return {
        items: items as CartItemType[],
        totalPrice,
    }
}