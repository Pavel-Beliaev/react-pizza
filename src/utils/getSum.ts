import {CartItemType} from "../redux/cart/types";

export const getSumCount = (items: CartItemType[] ) => {
    return items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);
}

export const getSumPrice = (items: CartItemType[]) => {
    return items.reduce((sum: number, item: CartItemType) => sum + (item.count * item.price), 0);
}