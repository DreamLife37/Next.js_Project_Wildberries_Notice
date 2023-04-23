import axios from "axios";
import {IItem} from "@/entities/item/model/item.interface.";


const API_URL = 'https://nodejswildberriesnotice-production.up.railway.app/api/'

axios.defaults.baseURL = API_URL

export const itemService = {
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