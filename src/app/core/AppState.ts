import { BehaviorSubject, Observable } from 'rxjs'
import { Worker, WorkerRequest } from '../../@services/api/dtos/WorkerModel'

class AppState {

    private workersSubject: BehaviorSubject<Worker[]> = new BehaviorSubject<Worker[]>([])
    private activeModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    //Gets
    getWorkersSubject(): Observable<Worker[]> {
        return this.workersSubject.asObservable()
    }

    getActiveModalSubject() {
        return this.activeModalSubject.asObservable()
    }

    //Sets
    setActiveModalSubject() {
        this.activeModalSubject.next(!this.activeModalSubject.getValue())
    }

    setWorkersSubject(workers: Worker[]) {
        this.workersSubject.next(workers)
    }

    setWorkerSubject(Worker: Worker) {
        const newWorkers = [...this.workersSubject.getValue(), Worker]
        console.log(newWorkers)
        this.workersSubject.next(newWorkers)
    }

    //Puts
    putWorkerSubject(id: string, emp: WorkerRequest) {

        const Worker: Worker = {
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

        const newWorkers = this.workersSubject.getValue().map((e: Worker) => {
            if (e._id == id) {
                return Worker
            } else {
                return e
            }
        })

        this.workersSubject.next(newWorkers)
    }

    //Deletes
    deleteWorkerSubject(id: string) {
        const newWorkers = this.workersSubject.getValue().filter((e: Worker) => e._id != id)
        this.workersSubject.next(newWorkers)
    }

}

export default AppState
