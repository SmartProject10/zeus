import { AxiosResponse } from 'axios'
import { ID,Response } from '@zeus/app/generalcomponents/helpers'
import { User, UsersQueryResponse } from '../../../../models/apimodels/UserManagementModel'
import { IService, SConstructor } from '../types/apiService.types'
import axios from 'axios' // Para axios.all

export const UserManagementRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
  return class extends Base {
    userManagementRequests = {
      update: (user: User): Promise<User | undefined> => {
        return this.http.put(`/user/${user.id}`, user)
          .then((response: AxiosResponse<Response<User>>) => response.data.data)
      },
      delete: (userId: ID): Promise<void> => {
        return this.http.delete(`/user/${userId}`).then(() => Promise.resolve())
      },
      getById: (id: ID): Promise<User | undefined> => {
        return this.http.get(`/user/${id}`)
          .then((response: AxiosResponse<Response<User>>) => response.data.data)
      },
      deleteSelected: (userIds: Array<ID>): Promise<void> => {
        const requests = userIds.map((id) => this.http.delete(`/user/${id}`))
        return Promise.all(requests).then(() => Promise.resolve())
      },
      getAll: (query: string): Promise<UsersQueryResponse> => {
        return this.http.get(`/users/query?${query}`)
          .then((response: AxiosResponse<UsersQueryResponse>) => response.data)
      },
      create: (user: User): Promise<User | undefined> => {
        return this.http.post(`/user`, user) // Cambié `/users` a `/user` si la API lo requiere
          .then((response: AxiosResponse<Response<User>>) => response.data.data)
      },
    }
  }
}