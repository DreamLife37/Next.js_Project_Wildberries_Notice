import axios from "axios";
import {IItem} from "@/app/components/items/Item/item.interface.";


// const API_URL = 'http://localhost:5000/api'
// const API_URL = 'https://elegant-apron-ray.cyclic.app/api/'
const API_URL = 'https://nodejswildberriesnotice-production.up.railway.app/api/'

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