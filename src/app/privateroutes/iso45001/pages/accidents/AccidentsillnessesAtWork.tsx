import { Content } from '@zeus/app/_zeus/layout/components/content';
import { ToolbarWrapper } from '@zeus/app/_zeus/layout/components/toolbar';
import { useEffect, useState } from 'react';
import AccidentReportingModal from './AccidentReportingModal';
import { AccidentsResponse, RegistersResponse } from '../../../../@services/api/dtos/AccidentModel';
import Swal from 'sweetalert2';
import AccidentsTable from './AccidentTable';
import AccidentRegistersModal from './AccidentRegistersModal';
//import { BASE_URL } from '../../../../../@services/api/requests/accident.requests';

export function AccidentsillnessesAtWork(): JSX.Element {
    const [dataSourceReporte, setDataSourceReporte] = useState<AccidentsResponse[]>([]);
    const [selectedReporte, setSelectedReporte] = useState<AccidentsResponse | null>(null);
    const [selectedRegistro, setSelectedRegistro] = useState<RegistersResponse | null>(null); // Nuevo estado
    const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //let apiUrl = `${BASE_URL}/api/accidents`
    let apiUrl = `/api/accidents`

    // Obtener los reportes desde el backend
    const fetchAccidents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/getAccidents`);
            const data = await response.json();
            setDataSourceReporte(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los reportes.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nuevo reporte o editar uno existente
    const handleSaveReporte = async (reporte: AccidentsResponse) => {
        setIsLoading(true);

        console.log(reporte)

        try {
            // Check if _id exists. If not, treat it as a new report and call createAccidente.
            const isNewReport = !reporte._id;

            const response = await fetch(
                `${apiUrl}/${isNewReport ? 'createAccidente' : 'updateAccidente/' + reporte._id}`,
                {
                    method: isNewReport ? 'POST' : 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reporte),
                }
            );

            if (!response.ok) {
                throw new Error('Error al guardar el reporte');
            }

            await fetchAccidents();
            Swal.fire('Éxito', isNewReport ? 'Reporte creado correctamente' : 'Reporte actualizado correctamente', 'success');
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
            title: '¿Está seguro que desea eliminar el reporte?',
            icon: 'error',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${apiUrl}/deleteAccidente/${id}`, { method: 'DELETE' });
                    if (!response.ok) {
                        throw new Error('Error al eliminar el reporte');
                    }
                    await fetchAccidents();
                    Swal.fire('Éxito', 'Reporte eliminado correctamente', 'success');
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

    // Eliminar un registro
    const handleDeleteRegistroData = async (reporte: AccidentsResponse) => {
        setIsLoading(true);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showCancelButton: true,
            showConfirmButton: true,
            timer: undefined,
        })

        Toast.fire({
            title: '¿Está seguro que desea eliminar el registro?',
            icon: 'error',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const dataToUpdate = { ...reporte };
                    dataToUpdate.registroAccidente = [];
                    await fetch(`${apiUrl}/updateAccidente/${reporte._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataToUpdate),
                    })
                    const responseRegistro = await fetch(`${apiUrl}/deleteRegistroAccidente/${reporte.registroAccidente[0]}`, { method: 'DELETE' });
                    if (!responseRegistro.ok) {
                        throw new Error('Error al eliminar el registro');
                    }
                    await fetchAccidents();
                    Swal.fire('Éxito', 'Registro eliminado correctamente', 'success');
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

    // Crear nuevo registro
    const handleSaveRegistro = async (registro: RegistersResponse) => {
        setIsLoading(true);

        console.log(registro)
        try {
            // Check if _id exists. If not, treat it as a new report and call createRegistroAccidente.
            const isNewRegistro = !registro._id;

            const response = await fetch(
                `${apiUrl}/${isNewRegistro ? 'createRegistroAccidente' : 'updateRegistroById/' + registro._id}`,
                {
                    method: isNewRegistro ? 'POST' : 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registro),
                }
            );

            if (!response.ok) {
                throw new Error('Error al guardar el reporte');
            }

            await fetchAccidents();
            Swal.fire('Éxito', isNewRegistro ? 'Registro creado correctamente' : 'Registro actualizado correctamente', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setIsLoading(false);
        }
        // try {
        //     const response = await fetch(
        //         `${apiUrl}/createRegistroAccidente`,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(registro),
        //         }
        //     );

        //     if (!response.ok) {
        //         throw new Error('Error al guardar el registro');
        //     }

        //     await fetchAccidents();
        //     Swal.fire('Éxito', 'Registro creado correctamente', 'success');


        // } catch (error: any) {
        //     Swal.fire('Error', error.message, 'error');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleOpenModal = (mode: 'create' | 'edit' | 'view', reporte: AccidentsResponse | null = null) => {
        console.log("Mode:", mode);
        setModalMode(mode);
        setSelectedReporte(reporte);
    };

    const handleOpenRegistroModal = async (mode: 'create' | 'edit' | 'view', reporte: AccidentsResponse | null = null) => {
        let selectedRegistro = null;

        if (mode !== 'create' && reporte?.registroAccidente[0]) {
            try {
                const response = await fetch(`${apiUrl}/getRegistroAccidenteById/${reporte.registroAccidente[0]}`);
                selectedRegistro = await response.json();
            } catch (error) {
                Swal.fire('Error', 'No se pudo cargar el registro.', 'error');
            }
        }

        setSelectedRegistro(selectedRegistro); // seleccionamos el registro completo
        setSelectedReporte(reporte);
        setModalMode(mode); // Establecemos el modo del modal
    };


    useEffect(() => {
        fetchAccidents();
    }, []);

    return (
        <Content>
            <ToolbarWrapper />
            <AccidentsTable
                dataSource={dataSourceReporte}
                handleDeleteData={handleDeleteData}
                handleDeleteRegistroData={handleDeleteRegistroData}
                handleOpenModal={handleOpenModal}
                handleOpenRegistroModal={handleOpenRegistroModal}
            />
            <AccidentReportingModal
                saveReporte={handleSaveReporte}
                reporte={selectedReporte}
                mode={modalMode}
                isCreatingNew={modalMode === 'create'}
            />
            <AccidentRegistersModal
                reporteSeleccionado={selectedReporte}
                mode={modalMode}
                saveRegistro={handleSaveRegistro}
                selectedRegistro={selectedRegistro} // Pasar el registro seleccionado al modal
                isCreatingNew={modalMode === 'create'}
            />

        </Content>
    );
}
