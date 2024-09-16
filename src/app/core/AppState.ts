import { BehaviorSubject, Observable } from 'rxjs'
import { Employee, EmployeeRequest } from '../modules/human-resources/tools/calendar/core/_models'

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

    setEmployeeSubject(employee: Employee) {
        const newEmployees = [...this.employeesSubject.getValue(), employee]
        console.log(newEmployees)
        this.employeesSubject.next(newEmployees)
    }

    //Puts
    putEmployeeSubject(id: string, emp: EmployeeRequest) {

        const employee: Employee = {
            _id: id,
            apellidoMaterno: emp.apellidoMaterno,
            apellidoPaterno: emp.apellidoPaterno,
            area: emp.area,
            cargo: emp.cargo,
            correoPersonal: emp.correoPersonal,
            correoTrabajo: emp.correoTrabajo,
            createdAt: '', //TO ISO STRING
            direccion: emp.direccion,
            distrito: emp.distrito,
            dni: emp.dni,
            estadoCivil: emp.estadoCivil,
            fechaIngresoArea: emp.fechaIngresoArea,
            fechaIngresoEmpresa: emp.fechaIngresoEmpresa,
            fechaNacimiento: emp.fechaNacimiento, //TO ISO STRING
            firmaDigital: emp.firmaDigital,
            genero: emp.genero,
            nacionalidad: emp.nacionalidad,
            nombres: emp.nombres,
            reconocimientoFacial: emp.reconocimientoFacial, //Preguntar porque string
            rollSistemaDigitalizado: emp.rollSistemaDigitalizado,
            sedeTrabajo: emp.sedeTrabajo,
            status: emp.status, //Cambiar a boolean
            telefonoPersonal: emp.telefonoPersonal,
            updatedAt: '',
        }

        const newEmployees = this.employeesSubject.getValue().map((e: Employee) => {
            if (e._id == id) {
                return employee
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
