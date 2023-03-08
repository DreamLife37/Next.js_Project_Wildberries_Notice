import axios from "axios";
import {IItem} from "@/app/components/items/Item/item.interface.";

const API_URL = process.env.NEXT_PUBLIC_API_URL

axios.defaults.baseURL = API_URL

export const ItemService = {
    async getAll() {
        return axios.get<IItem[]>('/items')
    },

    async addItem(id: number) {
        return axios.post('/items', {id}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    async deleteOne(id: number) {
        return axios.delete(`/items/${id}`)
    }
}