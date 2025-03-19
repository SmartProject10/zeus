import { BehaviorSubject, Observable } from 'rxjs'
import { Employee, EmployeeRequest } from '../../@services/api/dtos/EmployeeModel'

class AppState {

    private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([])
    private activeModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    //Gets
    getEmployeesSubject(): Observable<Employee[]> {
        return this.employeesSubject.asObservable()
    }

    getActiveModalSubject() {
        return this.activeModalSubject.asObservable()
    }

    //Sets
    setActiveModalSubject() {
        this.activeModalSubject.next(!this.activeModalSubject.getValue())
    }

    setEmployeesSubject(employees: Employee[]) {
        this.employeesSubject.next(employees)
    }

    setEmployeeSubject(Employee: Employee) {
        const newEmployees = [...this.employeesSubject.getValue(), Employee]
        console.log(newEmployees)
        this.employeesSubject.next(newEmployees)
    }

    //Puts
    putEmployeeSubject(id: string, emp: EmployeeRequest) {

        const Employee: Employee = {
            _id: id,
            name: emp.name,
            lastname: emp.lastname,
            email: emp.email,
            dni: emp.dni,
            mothers_lastname: emp.mothers_lastname,
            fathers_lastname: emp.fathers_lastname,
            birthDate: emp.birthDate,
            companyAreaId: emp.companyAreaId,
            charge: emp.charge,
            entryDate: emp.entryDate,
            contractTerminationDate: emp.contractTerminationDate,
            areaEntryDate: emp.areaEntryDate,
            province: emp.province,
            city: emp.city,
            address: emp.address,
            district: emp.district,
            corporateEmail: emp.corporateEmail,
            nationalityId: emp.nationalityId,
            gender: emp.gender,
            civilStatus: emp.civilStatus,
            personalPhone: emp.personalPhone,
            facialRecognition: emp.facialRecognition,
            digitalSignature: emp.digitalSignature,
            status: emp.status,
            employeeSiteId: emp.employeeSiteId,
            rolId: emp.rolId,
            sizePants: emp.sizePants,
            sizePolo: emp.sizePolo,
            sizeShoe: emp.sizeShoe,
            companyIds: emp.companyIds,
        }

        const newEmployees = this.employeesSubject.getValue().map((e: Employee) => {
            if (e._id == id) {
                return Employee
            } else {
                return e
            }
        })

        this.employeesSubject.next(newEmployees)
    }

    //Deletes
    deleteEmployeeSubject(id: string) {
        const newEmployees = this.employeesSubject.getValue().filter((e: Employee) => e._id != id)
        this.employeesSubject.next(newEmployees)
    }

}

export default AppState
