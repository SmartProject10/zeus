import { BehaviorSubject, Observable } from "rxjs";
import { Employee } from "../modules/human-resources/tools/calendar/core/_models";

class AppState {

    private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

    constructor() {

    }

    getEmployeesSubject(): Observable<Employee[]> {
        return this.employeesSubject.asObservable();
    }

    setEmployeesSubject(employees: Employee[]) {
        this.employeesSubject.next(employees);
    }

    setEmployeeSubject(employee: Employee) {

        const newEmployees = [...this.employeesSubject.getValue(), employee];
        console.log(newEmployees);
        this.employeesSubject.next(newEmployees);

    }

}

export default AppState;