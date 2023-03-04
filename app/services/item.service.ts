import axios from "axios";
import {IItem} from "@/pages";

const API_URL = 'https://elegant-apron-ray.cyclic.app/api/'

axios.defaults.baseURL = API_URL

export const ItemService = {
    async getAll() {
        return axios.get<IItem[]>('/items')
    },

    async addItem(id: number) {
        return axios.post('/items', {id},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    async deleteOne(id: number) {
        return axios.delete(`/items/${id}`)
    }
}