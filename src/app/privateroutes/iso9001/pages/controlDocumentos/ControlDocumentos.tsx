import { KTCard, KTCardBody } from '@zeus/app/generalcomponents/helpers';
import { Content } from '@zeus/app/generalcomponents/layouts/content';
import { ToolbarWrapper } from '@zeus/app/generalcomponents/layouts/toolbar';
import { useEffect, useState } from 'react';
// import { AccidentsResponse, RegistersResponse } from './core/_models';
import Swal from 'sweetalert2';
import BotonesModales from './BotonesModales';
import TipoDocumentoModal from './TipoDocumentoModal';
import { ControlDocsResponse, LogoCorporativoResponse, ProyectosResponse, SubAreasResponse, TipoDocumentoResponse } from './core/_models';
import ProyectosModal from './ProyectosModal';
import LogoCorporativoModal from './LogoCorporativoModal';
import AreasModal from './AreasModal';
import SubAreasModal from './SubAreasModal';
import ControlDocumentosModal from './ControlDocumentosModal';
import ControlDocumentosTable from './ControlDocumentosTable';
//import { BASE_URL } from '@zeus/@services/api/requests/accident.requests';

export function ControlDocumentos(): JSX.Element {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const [selectedControlDoc, setSelectedControlDoc] = useState<ControlDocsResponse | null>(null);
    const [dataSourceControlDocs, setDataSourceControlDocs] = useState<ControlDocsResponse[]>([]);

    //let apiUrl = `${BASE_URL}/api/control-documentos`
    let apiUrl = `/api/control-documentos`

    // Obtener los registro de Contro de Documentos desde el backend
    const fetchControlDocs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/getControlDocumentos`);
            const data = await response.json();
            setDataSourceControlDocs(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los registros de control de documentos.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nuevo tipo documento
    const handleSaveTipoDocumento = async (reportes: TipoDocumentoResponse[]) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/createTipoDocumento`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportes),  // Enviar todo el arreglo de reportes
            });

            if (!response.ok) {
                throw new Error('Error al guardar los documentos');
            }

            // Manejo exitoso
            Swal.fire('Éxito', 'Tipos de documento creados correctamente', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nuevo Proyecto
    const handleSaveProyecto = async (proyectos: ProyectosResponse[]) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/createProyecto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proyectos),  // Enviar todo el arreglo de proyectos
            });

            if (!response.ok) {
                throw new Error('Error al guardar los proyectos');
            }

            // Manejo exitoso
            Swal.fire('Éxito', 'Proyectos creados correctamente', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nuevo Logo Corporativo
    const handleSaveLogoCorporativo = async (logosCorporativos: LogoCorporativoResponse[]) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/createLogoCorporativo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logosCorporativos),  // Enviar todo el arreglo de logos corporativos
            });

            if (!response.ok) {
                throw new Error('Error al guardar los logos corporativos');
            }

            // Manejo exitoso
            Swal.fire('Éxito', 'Logos corporativos creados correctamente', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nueva sub area
    const handleSaveSubArea = async (subAreas: SubAreasResponse[]) => {
        setIsLoading(true);


        try {
            const response = await fetch(`${apiUrl}/createSubArea`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subAreas),  // Enviar todo el arreglo de SubAreas
            });

            if (!response.ok) {
                throw new Error('Error al guardar las sub areas');
            }

            // Manejo exitoso
            Swal.fire('Éxito', 'Sub areas creadas correctamente', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nueva sub area
    const handleSaveControlDocumento = async (controlDoc: ControlDocsResponse) => {
        setIsLoading(true);

        try {
            // Check if _id exists. If not, treat it as a new report and call createAccidente.
            const isNewReport = !controlDoc._id;

            const response = await fetch(
                `${apiUrl}/${isNewReport ? 'createControlDocumento' : 'updateControlDocumento/' + controlDoc._id}`, {
                method: isNewReport ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(controlDoc),  // Enviar todo el arreglo de Control de documentos
            });

            if (!response.ok) {
                throw new Error('Error al guardar los controles de documentos');
            }

            // Manejo exitoso
            await fetchControlDocs();
            Swal.fire('Éxito', 'Controles de documentos creados correctamente', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Eliminar un reporte
    const handleDeleteData = async (id: string) => {
        setIsLoading(true);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showCancelButton: true,
            showConfirmButton: true,
            timer: undefined,
        })

        Toast.fire({
            title: '¿Está seguro que desea eliminar el registro de control de documento?',
            icon: 'error',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${apiUrl}/deleteControlDocumento/${id}`, { method: 'DELETE' });
                    if (!response.ok) {
                        throw new Error('Error al eliminar el registro de control de documento');
                    }
                    await fetchControlDocs();
                    Swal.fire('Éxito', 'Control de documento eliminado correctamente', 'success');
                } catch (error) {
                    if (error instanceof Error) {
                        Swal.fire('Error', error.message, 'error');
                    } else {
                        Swal.fire('Error', 'Ha ocurrido un error desconocido.', 'error');
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        })

    };

    const handleOpenModal = (mode: 'create' | 'edit' | 'view', controlDoc: ControlDocsResponse | null = null) => {
        setModalMode(mode);
        setSelectedControlDoc(controlDoc);
    };

    useEffect(() => {
        fetchControlDocs();
    }, []);

    return (
        <Content>
            <ToolbarWrapper />
            <BotonesModales
                handleOpenModal={handleOpenModal}
            />
            <ControlDocumentosTable
                dataSource={dataSourceControlDocs}
                handleOpenModal={handleOpenModal}
                handleDeleteData={handleDeleteData}
            />
            <TipoDocumentoModal
                saveTipoDocumento={handleSaveTipoDocumento}
            />
            <ProyectosModal
                saveProyecto={handleSaveProyecto}
            />
            <LogoCorporativoModal
                saveLogoCorporativo={handleSaveLogoCorporativo}
            />
            <AreasModal />
            <SubAreasModal
                saveSubArea={handleSaveSubArea}
            />
            <ControlDocumentosModal
                saveControlDocumento={handleSaveControlDocumento}
                controlDocumento={selectedControlDoc}
                mode={modalMode}
                isCreatingNew={modalMode === 'create'}
            />
        </Content>
    );
}
