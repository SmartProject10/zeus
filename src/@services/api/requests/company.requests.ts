import { IService, SConstructor } from '../types/apiService.types'

export const CompaniesRequests = <TClass extends SConstructor<IService>>(Base: TClass) => {
    return class extends Base {
        companies = {
            getCompanies: () => {
                return this.http.get('/companies')
            },
        }
    }
}
