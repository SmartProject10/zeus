export interface WorkerResponse {
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
	fechaIngresoArea: string; //TO ISO STRING
	fechaIngresoEmpresa: string; //TO ISO STRING
	fechaNacimiento: string; //TO ISO STRING
	firmaDigital: string;
	genero: string;
	nacionalidad: string;
	nombres: string;
	reconocimientoFacial: string;
	rollSistemaDigitalizado: string;
	sedeTrabajo: string;
	status: string;
	telefonoPersonal: string;
	updatedAt: string; //TO ISO STRING
}

export interface WorkerRequest {
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
	status: string;
	sedeTrabajo: string;
}

export interface Worker {
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
}