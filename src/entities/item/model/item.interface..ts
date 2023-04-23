export interface IItem {
    _id: string
    id: number
    name: string
    price: Price[]
    __v: number
}

export interface Price {
    price: number
    _id: string
    date: string
}

