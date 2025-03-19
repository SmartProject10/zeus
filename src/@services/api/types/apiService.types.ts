/* eslint-disable @typescript-eslint/ban-types */
import { AxiosInstance } from 'axios'

export type SConstructor<T = {}> = new (...args: any[]) => T

export type IService = {
    http: AxiosInstance
    // config: BaseConfig
    debug?: boolean
}
