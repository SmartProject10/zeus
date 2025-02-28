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
            workSiteId: emp.workSiteId,
            rolId: emp.rolId,
            sizePants: emp.sizePants,
            sizePolo: emp.sizePolo,
            sizeShoe: emp.sizeShoe,
            companyIds: emp.companyIds,
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
