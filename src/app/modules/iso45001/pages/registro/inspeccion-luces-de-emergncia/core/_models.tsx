export interface EmergencyLightsResponse {
	id: string;
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string; //TO ISO STRING
}

export interface Inspection {
	id: string;
	fechaInspeccion: string;
	inspeccionadoPor: string;
	cargo: string;
	trabajador: string;
	sede: string;
	luzEmergencia: string;
	// Otras propiedades...
}

export interface InspeccionResponse {
	_id?: string
	fecha: string
	hora: string
	inspeccionadoPor: string
	cargo: string
	trabajador: string
	fotoTrabajador: string
	dni: string
	name: string
	descripcion: string
	imagenes: string[]
	reportadoPor: string
	elaboradoPor: string
	estadoRegistro: string
	registroAccidente: string[]
	createdAt: string //TO ISO STRING
	updatedAt: string //TO ISO STRING
}

export interface EmergencyLightsForm {
	id: string;
	fechaInspeccion: string;
	inspeccionadoPor: string;
	cargo: string;
	trabajador: string;
	sede: string;
	luzEmergencia: string;
	//enumerado
	enumerado: boolean;
	areaEnumerado: string;
	fechaVencimientoEnumerado: string;
	observacionEnumerado: string;
	recomendacionEnumerado: string;
	//ubicacionAdecuada
	ubicacionAdecuada: boolean;
	areaUbicacionAdecuada: string;
	fechaVencimientoUbicacionAdecuada: string;
	observacionUbicacionAdecuada: string;
	recomendacionUbicacionAdecuada: string;
	//enSuLugar
	enSuLugar: boolean;
	areaEnSuLugar: string;
	fechaVencimientoEnSuLugar: string;
	observacionEnSuLugar: string;
	recomendacionEnSuLugar: string;
	//libreDeObstaculos
	libreDeObstaculos: boolean;
	areaLibreDeObstaculos: string;
	fechaVencimientoLibreDeObstaculos: string;
	observacionLibreDeObstaculos: string;
	recomendacionLibreDeObstaculos: string;
	//conectadoTomacorriente
	conectadoTomacorriente: boolean;
	areaConectadoTomacorriente: string;
	fechaVencimientoConectadoTomacorriente: string;
	observacionConectadoTomacorriente: string;
	recomendacionConectadoTomacorriente: string;
	//enciendeSwitchPrueba
	enciendeSwitchPrueba: boolean;
	areaEnciendeSwitchPrueba: string;
	fechaVencimientoEnciendeSwitchPrueba: string;
	observacionEnciendeSwitchPrueba: string;
	recomendacionEnciendeSwitchPrueba: string;
	//buenaIluminacion
	buenaIluminacion: boolean;
	areaBuenaIluminacion: string;
	fechaVencimientoBuenaIluminacion: string;
	observacionBuenaIluminacion: string;
	recomendacionBuenaIluminacion: string;
	//buenaEstado
	buenaEstado: boolean;
	areaBuenaEstado: string;
	fechaVencimientoBuenaEstado: string;
	observacionBuenaEstado: string;
	recomendacionBuenaEstado: string;
	//encendidoQuinceMin
	encendidoQuinceMin: boolean;
	areaEncendidoQuinceMin: string;
	fechaVencimientoEncendidoQuinceMin: string;
	observacionEncendidoQuinceMin: string;
	recomendacionEncendidoQuinceMin: string;

	observacion: string;
	recomendacion: string;
	foto: string;
	nuevoEquipo: boolean;
	PDF: string;
}

//ajuste
export interface EmergencyLightsRequest {
	numero: string;
	sede: string;
	area: string;
	ubicacionEspecifica: string;
	codigo: string;
	marca: string;
	fechaIngresoEmpresa: string;
}
//Ajuste
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
	status: string;
	sedeTrabajo: string;
}

export interface optionType {
	id: string | number;
	name: string;
}

export interface Sede {
	id: string;
	name: string;
}

export interface LuzEmergencia {
	id: string;
	name: string;
}

export interface AreaResponsable {
	id: string;
	name: string;
}

export interface InspeccionadoPor {
	id: string;
	name: string;
}

export interface Cargo {
	id: string;
	name: string;
	area: string;
}

export interface Trabajador {
	id: string;
	name: string;
	cargo: string;
	dni: string;
	foto: string;
}

export const validateForm = (form: EmergencyLightsForm) => {
	// Primero validamos los campos generales
	if (!form.fechaInspeccion || !form.inspeccionadoPor || !form.cargo ||
		!form.trabajador || !form.sede || !form.luzEmergencia) {
		return true; // Si alguno de estos campos está vacío, retornamos true (hay un error)
	}

	// Si form.enumerado es true, no validamos los campos adicionales relacionados con enumerado
	if (form.enumerado) {
		console.log('');
	} else {
		// Si form.enumerado es false, validamos los campos adicionales
		if (!form.areaEnumerado || !form.fechaVencimientoEnumerado ||
			!form.observacionEnumerado || !form.recomendacionEnumerado) {
			return true; // Si alguno de estos campos está vacío, retornamos true (hay un error)
		}
	}

	if (form.ubicacionAdecuada) {
		console.log('');
	} else {
		if (!form.areaUbicacionAdecuada || !form.fechaVencimientoUbicacionAdecuada ||
			!form.observacionUbicacionAdecuada || !form.recomendacionUbicacionAdecuada) {
			return true;
		}
	}

	if (form.enSuLugar) {
		console.log('');
	} else {
		if (!form.areaEnSuLugar || !form.fechaVencimientoEnSuLugar ||
			!form.observacionUbicacionAdecuada || !form.recomendacionUbicacionAdecuada) {
			return true;
		}
	}

	if (form.libreDeObstaculos) {
		console.log('');
	} else {
		if (!form.areaLibreDeObstaculos || !form.fechaVencimientoLibreDeObstaculos ||
			!form.observacionLibreDeObstaculos || !form.recomendacionLibreDeObstaculos) {
			return true;
		}
	}

	if (form.conectadoTomacorriente) {
		console.log('');
	} else {
		if (!form.areaConectadoTomacorriente || !form.fechaVencimientoConectadoTomacorriente ||
			!form.observacionConectadoTomacorriente || !form.recomendacionConectadoTomacorriente) {
			return true;
		}
	}

	if (form.enciendeSwitchPrueba) {
		console.log('');
	} else {
		if (!form.areaEnciendeSwitchPrueba || !form.fechaVencimientoEnciendeSwitchPrueba ||
			!form.observacionEnciendeSwitchPrueba || !form.recomendacionEnciendeSwitchPrueba) {
			return true;
		}
	}

	if (form.buenaIluminacion) {
		console.log('');
	} else {
		if (!form.areaBuenaIluminacion || !form.fechaVencimientoBuenaIluminacion ||
			!form.observacionBuenaIluminacion || !form.recomendacionBuenaIluminacion) {
			return true;
		}
	}

	if (form.buenaEstado) {
		console.log('');
	} else {
		if (!form.areaBuenaEstado || !form.fechaVencimientoBuenaEstado ||
			!form.observacionBuenaEstado || !form.recomendacionBuenaEstado) {
			return true;
		}
	}

	if (form.encendidoQuinceMin) {
		console.log('');
	} else {
		if (!form.areaEncendidoQuinceMin || !form.fechaVencimientoEncendidoQuinceMin ||
			!form.observacionEncendidoQuinceMin || !form.recomendacionEncendidoQuinceMin) {
			return true;
		}
	}

	// Si todos los campos están completos, retornamos false (no hay error)
	return false;

	//!form.observacion ||
	//!form.recomendacion ||
	//!form.foto ||
	//!form.nuevoEquipo ||
	//!form.PDF;
};
