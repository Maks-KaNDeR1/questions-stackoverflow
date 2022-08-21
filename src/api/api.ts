import axios, { AxiosResponse } from 'axios'
import { ResponseType } from './types'

export const instance = axios.create({
    baseURL: 'https://api.stackexchange.com/2.3/',
})


export const questionAPI = {
    getQuestion(
        fromdate: number,
        page: number,
        pagesize: number,
        title: string
    ): Promise<AxiosResponse<ResponseType>> {
        return instance.get<ResponseType>(
            'search/advanced', {
            params: {
                fromdate,
                page,
                pagesize,
                order: 'desc',
                sort: 'votes',
                title,
                site: 'stackoverflow'
            }
        })

    }
}


