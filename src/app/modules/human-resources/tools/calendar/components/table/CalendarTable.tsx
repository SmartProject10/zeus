import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { KTCardBody } from '../../../../../../../_zeus/helpers'
import { appStateService } from '../../../../../../services/appState.service'
import { dayMonthYear } from '../../../../../../utils/dateFormat'
import { WorkerRequest, WorkerResponse } from '../../../../../../../@services/api/dtos/WorkerModel'
import ModalTrabajador from './ModalTrabajador'
import { backyService } from '@zeus/@services/api'

import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface WorkerForm {
  area: string
  cargo: string
  firmaDigital: string
  recFacial: string
  nacionalidad: string
  estadoCivil: string
  genero: string
  dni: string
  fechaNacimiento: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  distrito: string
  direccion: string
  correoTrabajo: string
  correoPersonal: string
  telefonoPersonal: string
  fechaIngresoArea: string
  fechaIngresoEmpresa: string
  rollSistemaDigitalizado: string
  status: string
  sedeTrabajo: string
}

const CalendarTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [workers, setWorkers] = useState<WorkerResponse[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<WorkerResponse[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limitPerPage, setLimitPerPage] = useState<number>(10)
  const [idWorker, setIdWorker] = useState('')
  const [formData, setFormData] = useState<WorkerForm>({
    area: '',
    cargo: '',
    firmaDigital: '',
    recFacial: '',
    nacionalidad: '',
    estadoCivil: '',
    genero: '',
    dni: '',
    fechaNacimiento: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    distrito: '',
    direccion: '',
    correoTrabajo: '',
    correoPersonal: '',
    telefonoPersonal: '',
    fechaIngresoArea: '',
    fechaIngresoEmpresa: '',
    rollSistemaDigitalizado: '',
    status: '',
    sedeTrabajo: '',
  })
  const [activeModal, setActiveModal] = useState<boolean>(false)

  useEffect(() => {

    const workersInit = async () => {

      try {
        //const response = await get();
        const filters = `?limit=${limitPerPage}`
        const response = await backyService.worker.getFiltered(filters)

        if (response.status == 200) {
          setTotalPages(response.data.totalPages)
          setCurrentPage(response.data.currentPage)
          const workers: WorkerResponse[] = response.data.trabajadores
          appStateService.setWorkersSubject(workers)
        }

      } catch (error: any) {
        console.error(error)
      }

    }
    workersInit()

    const workersSubj = appStateService.getSubject().subscribe((workers: WorkerResponse[]) => {
      setWorkers(workers)
      setFilteredWorkers(workers)
    })

    const activeModalSubj = appStateService.getActiveModalSubject().subscribe((state: boolean) => {
      setActiveModal(state)
    })

    return () => {
      workersSubj.unsubscribe()
      activeModalSubj.unsubscribe()
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
    //     if(formData[key as keyof WorkerForm] != "" && formData[key as keyof WorkerForm] != null){
    //       filters=filters+`${key}=${formData[key as keyof WorkerForm]}&`
    //     }
    //   }
    // }
  }

  function showModalWorker(id: string) {
    setIdWorker(id)
    appStateService.setActiveModalSubject()
  }

  async function applyFilters() {
    // eslint-disable-next-line max-len
    const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&limit=${limitPerPage}`

    try {
      const response = await backyService.worker.getFiltered(filters)
      console.log(response)

      if (response.status == 200) {
        setTotalPages(response.data.totalPages)
        setCurrentPage(response.data.currentPage)
        setFilteredWorkers(response.data.trabajadores)
      }

    } catch (e: any) {
      console.error(e)
    }

  }

  async function selectPageNavigate(page: number) {

    // eslint-disable-next-line max-len
    const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&page=${page}&limit=${limitPerPage}`

    try {

      const response: any = await backyService.worker.getFiltered(filters)

      if (response.status == 200) {
        setCurrentPage(response.data.currentPage)
        setTotalPages(response.data.totalPages)
        setFilteredWorkers(response.data.trabajadores)
      }

    } catch (e: any) {
      console.error(e)
    }

  }

  function changeStatusWorker(state: boolean, Worker: WorkerResponse) {

    Swal.fire({
      icon: 'question',
      title: '¿Estas segur@ de realizar esta acción?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      confirmButtonColor: '#1b84ff',
    }).then((result) => {
      if (result.isConfirmed) {
        if (state == true) {//Inactivo
          try {
            const editWorker = async () => {

              const request: WorkerRequest = {
                dni: Worker.dni,
                apellidoPaterno: Worker.apellidoPaterno,
                apellidoMaterno: Worker.apellidoMaterno,
                nombres: Worker.nombres,
                direccion: Worker.direccion,
                distrito: Worker.distrito,
                correoTrabajo: Worker.correoTrabajo,
                correoPersonal: Worker.correoPersonal,
                nacionalidad: Worker.nacionalidad,
                genero: Worker.genero,
                estadoCivil: Worker.estadoCivil,
                fechaNacimiento: Worker.fechaNacimiento,
                telefonoPersonal: Worker.telefonoPersonal,
                reconocimientoFacial: '',
                firmaDigital: Worker.firmaDigital,
                area: Worker.area,
                cargo: Worker.cargo,
                rollSistemaDigitalizado: Worker.rollSistemaDigitalizado,
                fechaIngresoArea: Worker.fechaIngresoArea,
                fechaIngresoEmpresa: Worker.fechaIngresoEmpresa,
                status: 'Activo',
                sedeTrabajo: Worker.sedeTrabajo,
              }

              const response = await backyService.worker.put(Worker._id, request)

              if (response.status == 200) {

                appStateService.putWorkerSubject(Worker._id, request)

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer
                    toast.onmouseleave = Swal.resumeTimer
                  },
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Estado del trabajador modificado correctamente',
                })
              }

            }
            editWorker()

          } catch (e: any) {
            console.error(e)
          }
        } else {//Activo
          try {
            const editWorker = async () => {

              const request: WorkerRequest = {
                dni: Worker.dni,
                apellidoPaterno: Worker.apellidoPaterno,
                apellidoMaterno: Worker.apellidoMaterno,
                nombres: Worker.nombres,
                direccion: Worker.direccion,
                distrito: Worker.distrito,
                correoTrabajo: Worker.correoTrabajo,
                correoPersonal: Worker.correoPersonal,
                nacionalidad: Worker.nacionalidad,
                genero: Worker.genero,
                estadoCivil: Worker.estadoCivil,
                fechaNacimiento: Worker.fechaNacimiento,
                telefonoPersonal: Worker.telefonoPersonal,
                reconocimientoFacial: '',
                firmaDigital: Worker.firmaDigital,
                area: Worker.area,
                cargo: Worker.cargo,
                rollSistemaDigitalizado: Worker.rollSistemaDigitalizado,
                fechaIngresoArea: Worker.fechaIngresoArea,
                fechaIngresoEmpresa: Worker.fechaIngresoEmpresa,
                status: 'Inactivo',
                sedeTrabajo: Worker.sedeTrabajo,
              }

              const response = await backyService.worker.put(Worker._id, request)

              if (response.status == 200) {

                appStateService.putWorkerSubject(Worker._id, request)

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer
                    toast.onmouseleave = Swal.resumeTimer
                  },
                })
                Toast.fire({
                  icon: 'success',
                  title: 'Estado del trabajador modificado correctamente',
                })
              }

            }
            editWorker()

          } catch (e: any) {
            console.error(e)
          }
        }

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  async function navigatePage(action: string) {

    if (action == 'next') {

      // eslint-disable-next-line max-len
      const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&page=${currentPage + 1}&limit=${limitPerPage}`

      try {

        const response: any = await backyService.worker.getFiltered(filters)

        if (response.status == 200) {
          setCurrentPage(response.data.currentPage)
          setTotalPages(response.data.totalPages)
          setFilteredWorkers(response.data.trabajadores)
        }

      } catch (e: any) {
        console.error(e)
      }

    } else if (action == 'previous') {

      // eslint-disable-next-line max-len
      const filters = `?area=${formData.area}&cargo=${formData.cargo}&dni=${formData.dni.replace(' ', '%20')}&apellidoPaterno=${formData.apellidoPaterno.replace(' ', '%20')}&apellidoMaterno=${formData.apellidoMaterno.replace(' ', '%20')}&estadoCivil=${formData.estadoCivil}&genero=${formData.genero}&nacionalidad=${formData.nacionalidad}&distrito=${formData.distrito}&direccion=${formData.direccion.replace(' ', '%20')}&status=${formData.status}&page=${currentPage - 1}&limit=${limitPerPage}`

      try {

        const response: any = await backyService.worker.getFiltered(filters)

        if (response.status == 200) {
          setCurrentPage(response.data.currentPage)
          setTotalPages(response.data.totalPages)
          setFilteredWorkers(response.data.trabajadores)
        }

      } catch (e: any) {
        console.error(e)
      }

    }

  }

  const exportFilteredWorkersToExcel = () => {

    // Crear una hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(filteredWorkers)

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trabajadores')

    // Generar un archivo de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Guardar el archivo usando file-saver
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })

    saveAs(data, 'reporteEmpleadosFiltrados.xlsx')
  }

  const exportWorkerToExcel = (Worker: WorkerResponse) => {

    const workerArray: WorkerResponse[] = []
    workerArray.push(Worker)

    // Crear una hoja de trabajo a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(workerArray)

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
        idWorker={idWorker}></ModalTrabajador> : ''}

      <p>Filtros de búsqueda</p>

      <form>
        <div
          className="row g-1">

          <div
            className="col-2">
            <label
              htmlFor="areaSelect"
              className="form-label-sm d-block mb-1">
              Área
            </label>
            <select
              className="form-select form-select-sm"
              id="areaSelect"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
            >
              <option
                value="">Seleccione</option>
              <option
                value="Gerencia">Gerencia</option>
              <option
                value="Seguridad Industrial">Seguridad Industrial</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="cargoInput"
              className="form-label-sm d-block mb-1">
              Cargo
            </label>
            <select
              className="form-select form-select-sm"
              id="cargoInput"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
            >
              <option
                value="">Seleccione</option>
              <option
                value="Gerente">Gerente</option>
              <option
                value="Jefe">Jefe</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              className="form-label-sm d-block mb-1"
              htmlFor="dniInput">
              Dni
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="dniInput"
              name="dni"
              placeholder="Número de dni"
              value={formData.dni}
              onChange={handleInputChange}
            />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="aPaternoInput"
              className="form-label-sm d-block mb-1">
              Apellido paterno
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="aPaternoInput"
              name="apellidoPaterno"
              placeholder="Apellido paterno"
              value={formData.apellidoPaterno}
              onChange={handleInputChange}
            />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="aMaternoInput"
              className="form-label-sm d-block mb-1">
              Apellido materno
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="aMaternoInput"
              name="apellidoMaterno"
              placeholder="Apellido materno"
              value={formData.apellidoMaterno}
              onChange={handleInputChange}
            />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="estadoCivil"
              className="form-label-sm d-block mb-1">
              Estado civil
            </label>
            <select
              className="form-select form-select-sm"
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleInputChange}
            >
              <option
                value="">Seleccione</option>
              <option
                value="Soltero">Soltero</option>
              <option
                value="Casado">Casado</option>
              <option
                value="Divorciado">Divorciado</option>
              <option
                value="Conviviente">Conviviente</option>
              <option
                value="Viudo/a">Viudo/a</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="genero"
              className="form-label-sm d-block mb-1">
              Género
            </label>
            <select
              className="form-select form-select-sm"
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option
                value="">Seleccione</option>
              <option
                value="Masculino">Masculino</option>
              <option
                value="Femenino">Femenino</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="labelselect"
              className="form-label-sm d-block mb-1">
              Nacionalidad
            </label>
            <select
              className="form-select form-select-sm"
              id="labelselect"
              name="nacionalidad"
              value={formData.nacionalidad}
              onChange={handleInputChange}
              aria-label="Select example"
            >
              <option
                value="">Seleccione</option>
              <option
                value="Peruano">Peruano</option>
              <option
                value="Estado Unidense">Estado Unidense</option>
              <option
                value="Canadiense">Canadiense</option>
              <option
                value="Panameña">Panameña</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="distritoSelect"
              className="form-label-sm d-block mb-1">
              Distrito
            </label>
            <select
              className="form-select form-select-sm"
              id="distritoSelect"
              name="distrito"
              value={formData.distrito}
              onChange={handleInputChange}
              aria-label="Distritos">
              <option
                value="">Seleccione</option>
              <option
                value="Distrito 1">Distrito 1</option>
              <option
                value="Distrito 2">Distrito 2</option>
              <option
                value="Distrito 3">Distrito 3</option>
            </select>
          </div>

          <div
            className="col-2">
            <label
              htmlFor="direccionInput"
              className="form-label-sm d-block mb-1">
              Dirección
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="direccionInput"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleInputChange} />
          </div>

          <div
            className="col-2">
            <label
              htmlFor="statusSelect"
              className="form-label-sm d-block mb-1">
              Status trabajador
            </label>
            <select
              className="form-select form-select-sm"
              id="statusSelect"
              name="status"
              value={formData.status}
              onChange={handleInputChange}>
              <option
                value="">Seleccione</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>

          {/* Otros campos del formulario */}
        </div>
      </form>

      <hr />

      <p>{'Coincidencias' + ': ' + filteredWorkers.length}</p>

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
          onClick={exportFilteredWorkersToExcel}
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
            {filteredWorkers.length > 0 && filteredWorkers.map((Worker, index) => (
              <tr
                key={index}>
                <td>{index + 1}</td>
                <td>{Worker.dni}</td>
                <td>{Worker.nombres}</td>
                <td>{Worker.apellidoMaterno}</td>
                <td>{Worker.apellidoPaterno}</td>
                <td>{dayMonthYear(Worker.fechaNacimiento)}</td>
                <td>{Worker.cargo}</td>
                <td>{Worker.area}</td>
                <td>{dayMonthYear(Worker.fechaIngresoEmpresa)}</td>
                <td>{dayMonthYear(Worker.fechaIngresoArea)}</td>
                <td>{Worker.direccion}</td>
                <td>{Worker.distrito}</td>
                <td>{Worker.correoTrabajo}</td>
                <td>{Worker.correoPersonal}</td>
                <td>{Worker.nacionalidad}</td>
                <td>{Worker.genero}</td>
                <td>{Worker.estadoCivil}</td>
                <td>{Worker.telefonoPersonal}</td>
                <td>{Worker.firmaDigital}</td>
                <td>{Worker.status}</td>
                <td>{Worker.sedeTrabajo}</td>
                <td>{Worker.rollSistemaDigitalizado}</td>
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
                        onChange={(e: any) => changeStatusWorker(e.target.checked, Worker)}
                        checked={Worker.status == 'Activo' ? true : false} />
                      <label
                        className="form-label-sm ms-2"
                        htmlFor="statusSwitch">
                        {Worker.status == 'Activo' ? 'Activo' : 'Inactivo'}
                      </label>
                    </div>
                    {/* <button className="btn btn-sm btn-bg-light btn-active-color-primary">
                      Editar/modificar/actualizar
                    </button> */}
                    <button
                      className="btn btn-sm btn-bg-light btn-active-color-primary"
                      onClick={() => showModalWorker(Worker._id)}>
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
                      onClick={() => exportWorkerToExcel(Worker)}
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

      {filteredWorkers.length == 0 && <p
        className="text-center mb-5">No se encontraron trabajadores</p>}

      {filteredWorkers.length != 0 && (
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
