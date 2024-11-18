export interface AccidentesResponse {
    _id?: string
    fecha: string
    hora: string
    area: string
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

export interface RegistrosResponse {
    _id?: string
    noRegistro: string
    razonSocialEmpleadorPrincipal: string
    sedeEmpleadorPrincipal: string
    rucEmpleadorPrincipal: string
    noTrabajadoresEmpleadorPrincipal: number
    tipoActividadEconomicaEmpleadorPrincipal: string
    direccionEmpleadorPrincipal: string
    distritoEmpleadorPrincipal: string
    departamentoEmpleadorPrincipal: string
    provinciaEmpleadorPrincipal: string
    noTrabajadoresAfiliadosSCTREmpleadorPrincipal: number
    noTrabajadoresNoAfiliadosSCTREmpleadorPrincipal: number
    nombreAseguradoraEmpleadorPrincipal: string

    razonSocialEmpleadorIntermediacion: string
    sedeEmpleadorIntermediacion: string
    rucEmpleadorIntermediacion: string
    noTrabajadoresEmpleadorIntermediacion: number
    tipoActividadEconomicaEmpleadorIntermediacion: string
    direccionEmpleadorIntermediacion: string
    distritoEmpleadorIntermediacion: string
    departamentoEmpleadorIntermediacion: string
    provinciaEmpleadorIntermediacion: string
    noTrabajadoresAfiliadosSCTREmpleadorIntermediacion: number
    noTrabajadoresNoAfiliadosSCTREmpleadorIntermediacion: number
    nombreAseguradoraEmpleadorIntermediacion: string

    nombreTrabajador: string
    apPatTrabajador: string
    apMatTrabajador: string
    dniTrabajador: string
    edadTrabajador: number
    sexoTrabajador: string
    areaTrabajador: string
    cargoTrabajador: string
    trabajador: string
    antiguedadPuestoTrabajador: number
    tipoContratoTrabajador: string
    tiempoExperienciaTrabajador: string
    capacitadoTareaTrabajador: string
    noHorasTrabajadasJornadaLabTrabajador: number

    fechaOcurrenciaAccidente: string
    horaOcurrenciaAccidente: string
    fechaInicioInvestigacionAccidente: string
    lugarExactoAccidente: string
    areaAccidente: string
    gravedadAccidenteTrabajo: string
    gradoAccidenteIncapacitante: string
    centroSalud: string
    medicoTratante: string
    diagnosticoMedico: string
    fechaDescansoMedico: string
    diasDescansoMedico: number
    idReporteAccidente: string
}