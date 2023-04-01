export type PizzaItems = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number,
}

export interface PizzaSliceState {
    items: PizzaItems[],
    status: Status
}

export type FetchPizzaParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    page: string,
}



export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',

}
