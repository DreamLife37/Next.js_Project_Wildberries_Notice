import axios from "axios";
import {IItem} from "@/pages";

const API_URL = 'http://localhost:5000/api'

axios.defaults.baseURL = API_URL

export const ItemService = {
    async getAll() {
        return axios.get<IItem[]>('/items3')
    },

    async deleteOne(id:number) {
        return axios.delete(`/items/${id}`)
    }
}