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