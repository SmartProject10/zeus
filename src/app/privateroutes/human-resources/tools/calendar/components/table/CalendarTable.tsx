import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { KTCardBody } from '@zeus/app/generalcomponents/helpers'
import { dayMonthYear } from '@zeus/app/generalcomponents/utils/dateformat/dateFormat'
import { Employee } from '@zeus/models/apimodels/Employee'
import ModalTrabajador from './ModalTrabajador'
import { backyService } from '@zeus/app/@services/api'

import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface EmployeeForm {
    name?: string | null;
    lastname?: string | null;
    email: string;
    dni: string;
    mothers_lastname: string;
    fathers_lastname: string;
    birthDate: string;
    companyAreaId: string;
    charge: string;
    entryDate: string;
    contractTerminationDate?: string | null;
    areaEntryDate: string;
    province: string;
    city: string;
    address: string;
    district: string;
    corporateEmail: string;
    nationalityId: string;
    gender: 'Masculino' | 'Femenino';
    civilStatus: 'Soltero/a' | 'Casado/a' | 'Divorciado/a' | 'Conviviente' | 'Viudo/a';
    personalPhone: string;
    facialRecognition?: string | null;
    digitalSignature?: string | null;
    status: 'Activo' | 'Inactivo';
    employeeSiteId: string;
    rolId: string;
    sizePants: 26 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 44;
    sizePolo: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    sizeShoe: 36 | 38 | 40 | 42 | 44;
}

const CalendarTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limitPerPage, setLimitPerPage] = useState<number>(10)
  const [idEmployee, setIdEmployee] = useState('')
  const [formData, setFormData] = useState<EmployeeForm>({
        name: null,
        lastname: null,
        email: '',
        dni: '',
        mothers_lastname: '',
        fathers_lastname: '',
        birthDate: '',
        companyAreaId: '',
        charge: '',
        entryDate: '',
        contractTerminationDate: null,
        areaEntryDate: '',
        province: '',
        city: '',
        address: '',
        district: '',
        corporateEmail: '',
        nationalityId: '',
        gender: 'Masculino',
        civilStatus: 'Soltero/a',
        personalPhone: '',
        facialRecognition: null,
        digitalSignature: null,
        status: 'Activo',
        employeeSiteId: '',
        rolId: '',
        sizePants: 26,
        sizePolo: 'XS',
        sizeShoe: 36,
  })
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {

    const employeesInit = async () => {

      // try {
      //   //const response = await get();
      //   const filters = `?limit=${limitPerPage}`
      //   const response = await backyService.employee.getFiltered(filters)

      //   if (response.status == 200) {
      //     setTotalPages(response.data.totalPages)
      //     setCurrentPage(response.data.currentPage)
      //     const employees: Employee[] = response.data.trabajadores
      //     appStateService.setEmployeesSubject(employees)
      //   }

      // } catch (error: any) {
      //   console.error(error)
      // }

    }
    employeesInit()

    //const employeesSubj = appStateService.getSubject().subscribe((employees: Employee[]) => {
    //  setEmployees(employees)
    //  setFilteredEmployees(employees)
    //})

    // const activeModalSubj = appStateService.getActiveModalSubject().subscribe((state: boolean) => {
    //   setActiveModal(state)
    // })

    return () => {
      //employeesSubj.unsubscribe()
      //activeModalSubj.unsubscribe()
    }

  }, [])

  useEffect(() => {
    applyFilters()
  }, [formData])

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))

    // let filters:string = "?";
    // for(const key in formData){
    //   if(formData.hasOwnProperty(key)){
    //     if(formData[key as keyof EmployeeForm] != "" && formData[key as keyof EmployeeForm] != null){
    //       filters=filters+`${key}=${formData[key as keyof EmployeeForm]}&`
    //     }
    //   }
    // }
  }

  function showModalEmployee(id: string) {
    setIdEmployee(id)
    //appStateService.setActiveModalSubject()
  }

  async function applyFilters() {
    // eslint-disable-next-line max-len
    const filters = `?name=${formData.name ? formData.name.replace(' ', '%20') : ''}&lastname=${formData.lastname ? formData.lastname.replace(' ', '%20') : ''}&email=${formData.email.replace(' ', '%20')}&dni=${formData.dni.replace(' ', '%20')}&mothers_lastname=${formData.mothers_lastname ? formData.mothers_lastname.replace(' ', '%20') : ''}&fathers_lastname=${formData.fathers_lastname ? formData.fathers_lastname.replace(' ', '%20') : ''}&birthDate=${formData.birthDate}&companyAreaId=${formData.companyAreaId}&charge=${formData.charge}&entryDate=${formData.entryDate}&contractTerminationDate=${formData.contractTerminationDate ? formData.contractTerminationDate : ''}&areaEntryDate=${formData.areaEntryDate}&province=${formData.province ? formData.province.replace(' ', '%20') : ''}&city=${formData.city ? formData.city.replace(' ', '%20') : ''}&address=${formData.address ? formData.address.replace(' ', '%20') : ''}&district=${formData.district ? formData.district.replace(' ', '%20') : ''}&corporateEmail=${formData.corporateEmail.replace(' ', '%20')}&nationalityId=${formData.nationalityId}&gender=${formData.gender}&civilStatus=${formData.civilStatus}&personalPhone=${formData.personalPhone.replace(' ', '%20')}&status=${formData.status}&employeeSiteId=${formData.employeeSiteId}&rolId=${formData.rolId}&sizePants=${formData.sizePants}&sizePolo=${formData.sizePolo}&sizeShoe=${formData.sizeShoe}&facialRecognition=${formData.facialRecognition ? formData.facialRecognition : ''}&digitalSignature=${formData.digitalSignature ? formData.digitalSignature : ''}&limit=${limitPerPage}`;

    // try {
    //   const response = await backyService.employee.getFiltered(filters)
    //   console.log(response)

    //   if (response.status == 200) {
    //     setTotalPages(response.data.totalPages)
    //     setCurrentPage(response.data.currentPage)
    //     setFilteredEmployees(response.data.trabajadores)
    //   }

    // } catch (e: any) {
    //   console.error(e)
    // }

  }

  async function selectPageNavigate(page: number) {

    // eslint-disable-next-line max-len
    const filters = `?name=${formData.name ? formData.name.replace(' ', '%20') : ''}&lastname=${formData.lastname ? formData.lastname.replace(' ', '%20') : ''}&email=${formData.email.replace(' ', '%20')}&dni=${formData.dni.replace(' ', '%20')}&mothers_lastname=${formData.mothers_lastname ? formData.mothers_lastname.replace(' ', '%20') : ''}&fathers_lastname=${formData.fathers_lastname ? formData.fathers_lastname.replace(' ', '%20') : ''}&birthDate=${formData.birthDate}&companyAreaId=${formData.companyAreaId}&charge=${formData.charge}&entryDate=${formData.entryDate}&contractTerminationDate=${formData.contractTerminationDate ? formData.contractTerminationDate : ''}&areaEntryDate=${formData.areaEntryDate}&province=${formData.province ? formData.province.replace(' ', '%20') : ''}&city=${formData.city ? formData.city.replace(' ', '%20') : ''}&address=${formData.address ? formData.address.replace(' ', '%20') : ''}&district=${formData.district ? formData.district.replace(' ', '%20') : ''}&corporateEmail=${formData.corporateEmail.replace(' ', '%20')}&nationalityId=${formData.nationalityId}&gender=${formData.gender}&civilStatus=${formData.civilStatus}&personalPhone=${formData.personalPhone.replace(' ', '%20')}&status=${formData.status}&employeeSiteId=${formData.employeeSiteId}&rolId=${formData.rolId}&sizePants=${formData.sizePants}&sizePolo=${formData.sizePolo}&sizeShoe=${formData.sizeShoe}&facialRecognition=${formData.facialRecognition ? formData.facialRecognition : ''}&digitalSignature=${formData.digitalSignature ? formData.digitalSignature : ''}&limit=${limitPerPage}`;

    // try {

    //   const response: any = await backyService.employee.getFiltered(filters)

    //   if (response.status == 200) {
    //     setCurrentPage(response.data.currentPage)
    //     setTotalPages(response.data.totalPages)
    //     setFilteredEmployees(response.data.trabajadores)
    //   }

    // } catch (e: any) {
    //   console.error(e)
    // }

  }

  function changeStatusEmployee(state: boolean, Employee: Employee) {

    Swal.fire({
      icon: 'question',
      title: '¿Estas segur@ de realizar esta acción?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      confirmButtonColor: '#1b84ff',
    }).then((result) => {
      // if (result.isConfirmed) {
      //   if (state == true) {//Inactivo
      //     try {
      //       const editEmployee = async () => {

      //         const request: Employee = {
      //           _id:Employee._id,
      //           name: Employee.name,
      //           password:null,
      //           companyIds:[],
      //           lastname: Employee.lastname,
      //           email: Employee.email,
      //           dni: Employee.dni,
      //           mothers_lastname: Employee.mothers_lastname,
      //           fathers_lastname: Employee.fathers_lastname,
      //           birthDate: Employee.birthDate,
      //           companyAreaId: Employee.companyAreaId, 
      //           charge: Employee.charge, 
      //           entryDate: Employee.entryDate, 
      //           contractTerminationDate: Employee.contractTerminationDate,
      //           areaEntryDate: Employee.areaEntryDate, 
      //           province: Employee.province,
      //           city: Employee.city,
      //           address: Employee.address,
      //           district: Employee.district,
      //           corporateEmail: Employee.corporateEmail,
      //           nationalityId: Employee.nationalityId, 
      //           gender: Employee.gender,
      //           civilStatus: Employee.civilStatus,
      //           personalPhone: Employee.personalPhone,
      //           facialRecognition: Employee.facialRecognition,
      //           digitalSignature: Employee.digitalSignature,
      //           status: "Activo",
      //           employeeSiteId: Employee.employeeSiteId,
      //           rolId: Employee.rolId,
      //           sizePants: Employee.sizePants,
      //           sizePolo: Employee.sizePolo,
      //           sizeShoe: Employee.sizeShoe,
      //         }

      //         const response = await backyService.employee.put(Employee._id, request)

      //         if (response.status == 200) {

      //           appStateService.putEmployeeSubject(Employee._id, request)

      //           const Toast = Swal.mixin({
      //             toast: true,
      //             position: 'top-end',
      //             showConfirmButton: false,
      //             timer: 3000,
      //             timerProgressBar: true,
      //             didOpen: (toast) => {
      //               toast.onmouseenter = Swal.stopTimer
      //               toast.onmouseleave = Swal.resumeTimer
      //             },
      //           })
      //           Toast.fire({
      //             icon: 'success',
      //             title: 'Estado del trabajador modificado correctamente',
      //           })
      //         }

      //       }
      //       editEmployee()

      //     } catch (e: any) {
      //       console.error(e)
      //     }
      //   } else {//Activo
      //     try {
      //       const editEmployee = async () => {

      //         const request: Employee = {
      //           name: Employee.name,
      //           lastname: Employee.lastname,
      //           email: Employee.email,
      //           dni: Employee.dni,
      //           mothers_lastname: Employee.mothers_lastname,
      //           fathers_lastname: Employee.fathers_lastname,
      //           birthDate: Employee.birthDate,
      //           companyAreaId: Employee.companyAreaId, 
      //           charge: Employee.charge, 
      //           entryDate: Employee.entryDate, 
      //           contractTerminationDate: Employee.contractTerminationDate,
      //           areaEntryDate: Employee.areaEntryDate, 
      //           province: Employee.province,
      //           city: Employee.city,
      //           address: Employee.address,
      //           district: Employee.district,
      //           corporateEmail: Employee.corporateEmail,
      //           nationalityId: Employee.nationalityId, 
      //           gender: Employee.gender,
      //           civilStatus: Employee.civilStatus,
      //           personalPhone: Employee.personalPhone,
      //           facialRecognition: Employee.facialRecognition,
      //           digitalSignature: Employee.digitalSignature,
      //           status: "Inactivo",
      //           employeeSiteId: Employee.employeeSiteId,
      //           rolId: Employee.rolId,
      //           sizePants: Employee.sizePants,
      //           sizePolo: Employee.sizePolo,
      //           sizeShoe: Employee.sizeShoe,
      //         }

      //         const response = await backyService.employee.put(Employee._id, request)

      //         if (response.status == 200) {

      //           appStateService.putEmployeeSubject(Employee._id, request)

      //           const Toast = Swal.mixin({
      //             toast: true,
      //             position: 'top-end',
      //             showConfirmButton: false,
      //             timer: 3000,
      //             timerProgressBar: true,
      //             didOpen: (toast) => {
      //               toast.onmouseenter = Swal.stopTimer
      //               toast.onmouseleave = Swal.resumeTimer
      //             },
      //           })
      //           Toast.fire({
      //             icon: 'success',
      //             title: 'Estado del trabajador modificado correctamente',
      //           })
      //         }

      //       }
      //       editEmployee()

      //     } catch (e: any) {
      //       console.error(e)
      //     }
      //   }

      // } else if (result.isDenied) {
      //   // Swal.fire('Changes are not saved', '', 'info')
      // }
    })

  }

  async function navigatePage(action: string) {

    if (action == 'next') {

      // eslint-disable-next-line max-len
      const filters = `?name=${formData.name ? formData.name.replace(' ', '%20') : ''}&lastname=${formData.lastname ? formData.lastname.replace(' ', '%20') : ''}&email=${formData.email.replace(' ', '%20')}&dni=${formData.dni.replace(' ', '%20')}&mothers_lastname=${formData.mothers_lastname ? formData.mothers_lastname.replace(' ', '%20') : ''}&fathers_lastname=${formData.fathers_lastname ? formData.fathers_lastname.replace(' ', '%20') : ''}&birthDate=${formData.birthDate}&companyAreaId=${formData.companyAreaId}&charge=${formData.charge}&entryDate=${formData.entryDate}&contractTerminationDate=${formData.contractTerminationDate ? formData.contractTerminationDate : ''}&areaEntryDate=${formData.areaEntryDate}&province=${formData.province ? formData.province.replace(' ', '%20') : ''}&city=${formData.city ? formData.city.replace(' ', '%20') : ''}&address=${formData.address ? formData.address.replace(' ', '%20') : ''}&district=${formData.district ? formData.district.replace(' ', '%20') : ''}&corporateEmail=${formData.corporateEmail.replace(' ', '%20')}&nationalityId=${formData.nationalityId}&gender=${formData.gender}&civilStatus=${formData.civilStatus}&personalPhone=${formData.personalPhone.replace(' ', '%20')}&status=${formData.status}&employeeSiteId=${formData.employeeSiteId}&rolId=${formData.rolId}&sizePants=${formData.sizePants}&sizePolo=${formData.sizePolo}&sizeShoe=${formData.sizeShoe}&facialRecognition=${formData.facialRecognition ? formData.facialRecognition : ''}&digitalSignature=${formData.digitalSignature ? formData.digitalSignature : ''}&limit=${limitPerPage}`;
      // try {

      //   const response: any = await backyService.employee.getFiltered(filters)

      //   if (response.status == 200) {
      //     setCurrentPage(response.data.currentPage)
      //     setTotalPages(response.data.totalPages)
      //     setFilteredEmployees(response.data.trabajadores)
      //   }

      // } catch (e: any) {
      //   console.error(e)
      // }

    } else if (action == 'previous') {

      // eslint-disable-next-line max-len
      const filters = `?name=${formData.name ? formData.name.replace(' ', '%20') : ''}&lastname=${formData.lastname ? formData.lastname.replace(' ', '%20') : ''}&email=${formData.email.replace(' ', '%20')}&dni=${formData.dni.replace(' ', '%20')}&mothers_lastname=${formData.mothers_lastname ? formData.mothers_lastname.replace(' ', '%20') : ''}&fathers_lastname=${formData.fathers_lastname ? formData.fathers_lastname.replace(' ', '%20') : ''}&birthDate=${formData.birthDate}&companyAreaId=${formData.companyAreaId}&charge=${formData.charge}&entryDate=${formData.entryDate}&contractTerminationDate=${formData.contractTerminationDate ? formData.contractTerminationDate : ''}&areaEntryDate=${formData.areaEntryDate}&province=${formData.province ? formData.province.replace(' ', '%20') : ''}&city=${formData.city ? formData.city.replace(' ', '%20') : ''}&address=${formData.address ? formData.address.replace(' ', '%20') : ''}&district=${formData.district ? formData.district.replace(' ', '%20') : ''}&corporateEmail=${formData.corporateEmail.replace(' ', '%20')}&nationalityId=${formData.nationalityId}&gender=${formData.gender}&civilStatus=${formData.civilStatus}&personalPhone=${formData.personalPhone.replace(' ', '%20')}&status=${formData.status}&employeeSiteId=${formData.employeeSiteId}&rolId=${formData.rolId}&sizePants=${formData.sizePants}&sizePolo=${formData.sizePolo}&sizeShoe=${formData.sizeShoe}&facialRecognition=${formData.facialRecognition ? formData.facialRecognition : ''}&digitalSignature=${formData.digitalSignature ? formData.digitalSignature : ''}&limit=${limitPerPage}`;
      
      // try {

      //   const response: any = await backyService.employee.getFiltered(filters)

      //   if (response.status == 200) {
      //     setCurrentPage(response.data.currentPage)
      //     setTotalPages(response.data.totalPages)
      //     setFilteredEmployees(response.data.trabajadores)
      //   }

      // } catch (e: any) {
      //   console.error(e)
      // }

    }

  }

  const exportFilteredEmployeesToExcel = () => {

    // Crear una hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees)

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

    // Generar un archivo de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Guardar el archivo usando file-saver
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

    saveAs(data, 'reporteEmpleadosFiltrados.xlsx')
  }

  const exportEmployeeToExcel = (Employee: Employee) => {

    const employeeArray: Employee[] = []
    employeeArray.push(Employee)

    // Crear una hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(employeeArray)

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

    // Generar un archivo de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Guardar el archivo usando file-saver
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

    saveAs(data, 'reporteEmpleado.xlsx')
  }

  return (
    <KTCardBody
      className="py-4 card card-grid min-w-full">

      {activeModal ? <ModalTrabajador
        idEmployee={idEmployee}></ModalTrabajador> : ''}

      <p>Filtros de búsqueda</p>

      <form>
        <div
          className="row g-1">

          <div
            className="col-2">
            <label
              htmlFor="calendartable_areaSelect"
              className="form-label-sm d-block mb-1">
              Área
            </label>
            <select
              className="form-select form-select-sm"
              id="calendartable_areaSelect"
              name="area"
              value={formData.companyAreaId}
              onChange={handleInputChange}
            >
              //acá deben ir todas las áreas de la empresa en la base de datos
              {/* <option value="">Seleccione un área</option>
              <option value="area1">area 1</option>
              <option value="area2">area 2</option>
              <option value="area3">area 3</option> */}
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_cargoInput"
              className="form-label-sm d-block mb-1">
              Cargo
            </label>
            <select
              className="form-select form-select-sm"
              id="calendartable_cargoInput"
              name="cargo"
              value={formData.charge}
              onChange={handleInputChange}
            >
              //las opciones deben venir de acuerdo al área que se elija, porque cada área tiene sus cargos
              {/* <option value="">Seleccione un cargo</option>
              <option value="cargo1">Cargo 1</option>
              <option value="cargo2">Cargo 2</option>
              <option value="cargo3">Cargo 3</option> */}
            </select>
          </div>

          <div
            className="col-2">
            <label
              className="form-label-sm d-block mb-1"
              htmlFor="calendartable_dniInput">
              Dni
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="calendartable_dniInput"
              name="dni"
              placeholder="Número de dni"
              value={formData.dni}
              onChange={handleInputChange}
            />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_aPaternoInput"
              className="form-label-sm d-block mb-1">
              Apellido paterno
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="calendartable_aPaternoInput"
              name="apellidoPaterno"
              placeholder="Apellido paterno"
              value={formData.fathers_lastname}
              onChange={handleInputChange}
            />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_aMaternoInput"
              className="form-label-sm d-block mb-1">
              Apellido materno
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="calendartable_aMaternoInput"
              name="apellidoMaterno"
              placeholder="Apellido materno"
              value={formData.mothers_lastname}
              onChange={handleInputChange}
            />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_estadoCivil"
              className="form-label-sm d-block mb-1">
              Estado civil
            </label>
            <select
              className="form-select form-select-sm"
              id="calendartable_estadoCivil"
              name="estadoCivil"
              value={formData.civilStatus}
              onChange={handleInputChange}
            >
              <option value="">Seleccione estado civil</option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Divorciado/a">Divorciado/a</option>
              <option value="Conviviente">Conviviente</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_genero"
              className="form-label-sm d-block mb-1">
              Género
            </label>
            <select
              className="form-select form-select-sm"
              id="calendartable_genero"
              name="genero"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Seleccione género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_nacionalidad"
              className="form-label-sm d-block mb-1">
              Nacionalidad
            </label>
            <select
              className="form-select form-select-sm"
              id="calendartable_nacionalidad"
              name="nacionalidad"
              value={formData.nationalityId}
              onChange={handleInputChange}
            >
              //las opciones deben venir de las nacionalidades de la base de datos
              {/* <option value="">Seleccione un cargo</option>
              <option value="cargo1">Cargo 1</option>
              <option value="cargo2">Cargo 2</option>
              <option value="cargo3">Cargo 3</option> */}
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_direccionInput"
              className="form-label-sm d-block mb-1">
              Dirección
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="calendartable_direccionInput"
              name="direccion"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleInputChange} />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="calendartable_statusSelect"
              className="form-label-sm d-block mb-1">
              Status trabajador
            </label>
            <select
              className="form-select form-select-sm"
              id="calendartable_statusSelect"
              name="status"
              value={formData.status}
              onChange={handleInputChange}>
              <option value="">Seleccione estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          {/* Otros campos del formulario */}
        </div>
      </form>

      <hr />

      <p>{'Coincidencias' + ': ' + filteredEmployees.length}</p>

      <div
        className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-success btn-sm disabled"
          type="button">
          <i
            className="bi bi-file-earmark-spreadsheet-fill"></i>
          Importar a Excel
        </button>
        <button
          onClick={exportFilteredEmployeesToExcel}
          className="btn btn-success btn-sm"
          type="button">
          <i
            className="bi bi-file-earmark-spreadsheet-fill"></i>
          Exportar a Excel
        </button>
      </div>

      <div
        className="table-responsive">
        <table
          className="table table-striped gy-7 gs-7">
          <thead>
            <tr
              className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200 text-center">
              <th
                className="min-w-50px">Nro</th>
              <th
                className="min-w-200px">Dni</th>
              <th
                className="min-w-200px">Nombres</th>
              <th
                className="min-w-200px">Ape. Materno</th>
              <th
                className="min-w-200px">Ape. Paterno</th>
              <th
                className="min-w-200px">Fecha. Naci</th>
              <th
                className="min-w-200px">Cargo</th>
              <th
                className="min-w-200px">Área</th>
              <th
                className="min-w-200px">F. Ingreso Empresa</th>
              <th
                className="min-w-200px">F. ingreso Area</th>
              <th
                className="min-w-500px">Dirección</th>
              <th
                className="min-w-500px">Distrito</th>
              <th
                className="min-w-500px">Email. Corp</th>
              <th
                className="min-w-500px">Email. Pers</th>
              <th
                className="min-w-500px">Nacionalidad</th>
              <th
                className="min-w-500px">Género</th>
              <th
                className="min-w-500px">Estado Civil</th>
              <th
                className="min-w-500px">Teléfono</th>
              <th
                className="min-w-500px">Firma Digital</th>
              <th
                className="min-w-500px">Status</th>
              <th
                className="min-w-500px">Sede Trabajo</th>
              <th
                className="min-w-500px">Tipo De Rol</th>
              <th
                className="min-w-500px">Opciones</th>
            </tr>
          </thead>
          <tbody
            className="text-center">
            {filteredEmployees.length > 0 && filteredEmployees.map((Employee, index) => (
              <tr
                key={index}>
                <td>{index + 1}</td>
                <td>{Employee.dni}</td>
                <td>{Employee.name}</td>
                <td>{Employee.mothers_lastname}</td>
                <td>{Employee.fathers_lastname}</td>
                <td>{dayMonthYear(Employee.birthDate.toString())}</td>
                <td>{Employee.charge}</td>
                <td>{Employee.companyAreaId}</td>
                <td>{dayMonthYear(Employee.entryDate.toString())}</td>
                <td>{dayMonthYear(Employee.areaEntryDate.toString())}</td>
                <td>{Employee.address}</td>
                <td>{Employee.district}</td>
                <td>{Employee.corporateEmail}</td>
                <td>{Employee.email}</td>
                <td>{Employee.nationalityId}</td>
                <td>{Employee.gender}</td>
                <td>{Employee.civilStatus}</td>
                <td>{Employee.personalPhone}</td>
                <td>{Employee.digitalSignature}</td>
                <td>{Employee.status}</td>
                <td>{Employee.employeeSiteId}</td>
                <td>
                  <div
                    className="d-grid gap-2 d-md-flex">

                    <div
                      className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input h-20px w-30px"
                        type="checkbox"
                        value=""
                        id="statusSwitch"
                        onChange={(e: any) => changeStatusEmployee(e.target.checked, Employee)}
                        checked={Employee.status == 'Activo' ? true : false} />
                      <label
                        className="form-label-sm ms-2"
                        htmlFor="statusSwitch">
                        {Employee.status == 'Activo' ? 'Activo' : 'Inactivo'}
                      </label>
                    </div>
                    {/* <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Editar/modificar/actualizar
                    </button> */}
                    <button
                      className="btn btn-sm btn-bg-light btn-active-color-primary"
                      onClick={() => showModalEmployee(Employee._id)}>
                      Ver detalle
                    </button>
                    <button
                      className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Historial
                    </button>
                    <button
                      className="btn btn-sm btn-bg-light btn-active-color-primary disabled"
                      type="button">
                      <i
                        className="bi bi-file-earmark-spreadsheet-fill"></i>
                      Importar a Excel
                    </button>
                    <button
                      onClick={() => exportEmployeeToExcel(Employee)}
                      className="btn btn-sm btn-bg-light btn-active-color-primary"
                      type="button">
                      <i
                        className="bi bi-file-earmark-spreadsheet-fill"></i>
                      Exportar a Excel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length == 0 && <p
        className="text-center mb-5">No se encontraron trabajadores</p>}

      {filteredEmployees.length != 0 && (
        <div
          className="mt-2">
          <ul
            className="pagination">
            <li
              className={currentPage == 1 ? 'page-item previous disabled' : 'page-item previous'}>
              <button
                onClick={() => navigatePage('previous')}
                className="page-link">
                <i
                  className="previous"></i>
              </button>
            </li>
            {[...Array(totalPages)].map((page, i) => (
              <li
                key={i}
                className={currentPage == i + 1 ? 'page-item active' : 'page-item'}>
                <button
                  onClick={() => selectPageNavigate(i + 1)}
                  className="page-link ">
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={currentPage == totalPages ? 'page-item next disabled' : 'page-item next'}>
              <button
                onClick={() => navigatePage('next')}
                className="page-link">
                <i
                  className="next"></i>
              </button>
            </li>
          </ul>
        </div>
      )}

      <hr />

    </KTCardBody>
  )
}

export { CalendarTable }
