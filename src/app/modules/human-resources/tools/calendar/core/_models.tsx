export interface EmployeeResponse {
	_id: string;
	area: string;
	cargo: string;
	firmaDigital: string;
	reconocimientoFacial: string;
	nacionalidad: string;
	estadoCivil: string;
	genero: string;
	dni: string;
	fechaNacimiento: string;
	nombres: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	distrito: string;
	direccion: string;
	correoTrabajo: string;
	correoPersonal: string;
	telefonoPersonal: string;
	fechaIngresoArea: string;
	fechaIngresoEmpresa: string;
	fechaFinContrato: string;
	rollSistemaDigitalizado: string;
	status: string;
	sedeTrabajo: string;
	indicativoTel?: string;
	createdAt: string;
	updatedAt: string;
	indicativoTelLaboral: string;
	telefonoLaboral: string;
	codigoTrabajador: string;
	tipoContrato: string;
	tallaCamiseta?: string
	tallaPantalon?: string
	tallaZapatos?: string
	brevete?: Array<{ tipo: string; fechaVencimiento: string; numero: string; documento?: string }>
}

export interface EmployeeRequest {
	dni: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	nombres: string;
	direccion: string;
	distrito: string;
	correoTrabajo: string;
	correoPersonal: string;
	nacionalidad: string;
	genero: string;
	estadoCivil: string;
	fechaNacimiento: string;
	telefonoPersonal: string;
	reconocimientoFacial: string;
	firmaDigital: string;
	area: string;
	cargo: string;
	rollSistemaDigitalizado: string;
	fechaIngresoArea: string;
	fechaIngresoEmpresa: string;
	fechaFinContrato: string;
	status: string;
	sedeTrabajo: string;
	codigoTrabajador: string;
	brevete?: Array<{ tipo: string; fechaVencimiento: string; numero: string; documento?: string }>
	indicativoTel?: string;
	tipoContrato: string;
	tallaCamiseta?: string
	tallaPantalon?: string
	tallaZapatos?: string
}

export interface Employee {
	_id: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	area: string;
	cargo: string;
	correoPersonal: string;
	correoTrabajo: string;
	createdAt: string; //TO ISO STRING
	direccion: string;
	distrito: string;
	dni: string;
	estadoCivil: string;
	fechaIngresoArea: string;
	fechaIngresoEmpresa: string;
	fechaFinContrato: string; //TO ISO STRING
	fechaNacimiento: string; //TO ISO STRING
	firmaDigital: string;
	genero: string;
	nacionalidad: string;
	nombres: string;
	reconocimientoFacial: string; //Preguntar porque string
	rollSistemaDigitalizado: string;
	sedeTrabajo: string;
	status: string; //Cambiar a boolean
	telefonoPersonal: string;
	updatedAt: string;
	indicativoTelLaboral: string;
	telefonoLaboral: string;
	indicativoTel: string;
	codigoTrabajador: string;
	brevete?: Array<{ tipo: string; fechaVencimiento: string; numero: string; documento?: string }>
	tipoContrato: string;
	tallaCamiseta?: string
	tallaPantalon?: string
	tallaZapatos?: string
}

export interface EmergencyLightsResponse {
	_id: string;
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string; //TO ISO STRING
}

export interface EmergencyLightsRequest {
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

export interface EmergencyLights {
	_id: string;
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}

export interface CompanyForm {
	ruc: string
	razonSocial: string
	pais: string
	provincia: string
	ciudad: string
	direccion: string
	actividadEconomica: string
	sectorEconomico: string
	tamanoEmpresa: string
}

export interface SedeForm {
	nombreSede: string;
	direccionSede: string;
	ciudad: string;
	provincia: string;
}

export interface AreaForm {
	nombreArea: string
	cargosArea: string
}

export interface SubWorker {
	dni: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	nombres: string;
	direccion: string;
	distrito: string;
	correoTrabajo: string;
	correoPersonal: string;
	nacionalidad: string;
	genero: string;
	estadoCivil: string;
	fechaNacimiento: string;
	telefonoPersonal: string;
	reconocimientoFacial: string;
	firmaDigital: string;
	area: string;
	cargo: string;
	fechaIngresoArea: string;
	fechaIngresoEmpresa: string;
	fechaFinContrato: string;
	status: string;
	sedeTrabajo: string;
	codigoTrabajador: string;
	indicativoTel?: string;
	tipoContrato: string;
	tallaCamiseta?: string
	tallaPantalon?: string
	tallaZapatos?: string
	brevete?: Array<{ tipo: string; fechaVencimiento: string; numero: string; documento?: string }>
}
export interface Employeee {
	codigoTrabajador: string
	telefonoCasa: string
	telefonoTrabajo: string
	puesto: string
	area: string
	gerencia: string
	servicio: string
	empresa: string
	razonSocial: string
	lugarTrabajo: string
}