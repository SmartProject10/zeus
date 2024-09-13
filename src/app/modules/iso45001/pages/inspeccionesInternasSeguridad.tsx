import { TitleBar } from "@zeus/@components/titleBar"

interface InspeccionesInternasSeguridadProps { }

export function InspeccionesInternasSeguridad(props: InspeccionesInternasSeguridadProps): JSX.Element {
    return (
        <div>
            <TitleBar label="Inspecciones internas de seguridad" />

            <ol className="mt-4">
                <li><a href="#">Inspeccion de superficie y subterráneo</a></li>
                <li><a href="#">Inspección de talleres</a></li>
                <li><a href="#">Inspección de campamentos</a></li>
                <li><a href="#">Inspección de polvorin y explosivos</a></li>
                <li><a href="#">Inspección de almacenes</a></li>
                <li><a href="#">Inspección de oficinas</a></li>
                <li><a href="#">Inspección general de vehiculos y equipos</a></li>
                <li><a href="#">Inspección de gruas</a></li>
                <li><a href="#">Inspección sisterna de combustible</a></li>
                <li><a href="#">Inspección de grupo electrogeno/generador electrico</a></li>
                <li><a href="#">Inspección de luminarias y torre de iluminación</a></li>
                <li><a href="#">Inspección de tableros electricos e instalaciones electricas</a></li>
                <li><a href="#">Inspección de herramientas manuales y electricas</a></li>
                <li><a href="#">Inspección de escaleras portatiles</a></li>
                <li><a href="#">Inspección bombas sumergibles</a></li>
                <li><a href="#">Inspección de andamios</a></li>
                <li><a href="#">Inspecciones de EPPS</a></li>
                <li><a href="#">Inspecciones de arneses y lineas de vida</a></li>
                <li><a href="#">Inspección de sistema de izaje/dispositivo de izaje/cables de izaje</a></li>
                <li><a href="#">Inspección de extintores</a></li>
                <li><a href="#">Inspección de sistemas de protección contra incendios</a></li>
                <li><a href="#">Monitoreo de velocidad de vehiculos</a></li>
                <li><a href="#">Monitoreo de control de iluminación</a></li>
                <li><a href="#">Monitoreo de control de gases de vehiculos y equipos que ingresan a labores subterraneas</a></li>
                <li><a href="#">Monitoreo de velocidad de viento en labores subterraneas</a></li>
            </ol>
        </div>
    );
}
