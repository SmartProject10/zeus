export interface TipoDocumentoResponse {
    _id?: string
    tipoDocumento: string
    nomenclatura: string
}

export interface ProyectosResponse {
    _id?: string
    nombre: string
    nomenclatura: string
    logo: string[]
}

export interface LogoCorporativoResponse {
    _id?: string
    nombre: string
    logo: string[]
    nomenclatura: string
}

export interface AreasResponse {
    _id?: string
    area: string
    sistemaGestion: string
    nomenclatura: string
}

export interface SubAreasResponse {
    _id?: string
    area: string
    subArea: string
    sistemaGestion: string
    nomenclatura: string
}

export interface ControlDocsResponse {
    _id?: string
    horizontal: boolean
    vertical: boolean
    tipoDocumento: string
    corporativo: string
    proyectos: string
    todos: boolean
    tipoLetra: string
    tipoNomenclatura: string[]
    datosHorizontal: Array<{
        tipoHorizontal: string
        noHojasHorizontal: string
    }>
    datosVertical: Array<{
        tipoVertical: string
        noHojasVertical: string
    }>
}
