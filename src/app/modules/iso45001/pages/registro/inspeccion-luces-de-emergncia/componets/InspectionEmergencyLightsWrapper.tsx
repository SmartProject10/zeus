import { useState } from "react";
import { Content } from "@zeus/_zeus/layout/components/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "@zeus/_zeus/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";

export const InspectionEmergencyLightsWrapper = () => {
	const [dataList, setDataList] = useState<any[]>([]);

	// Función que el hijo va a invocar para pasar datos
	const handleDataUpdate = (newData: any) => {
		console.log('Datos actualizados desde el hijo:', newData);
		// Aquí actualizamos los datos en el estado con la lógica de actualización.
		setDataList(prevData =>
			prevData.map(item =>
				item.id === newData.id ? { ...item, ...newData } : item
			)
		);
	};

	// Define handleAddData function, que maneja agregar, editar y eliminar
	const handleAddData = (newData: any, mode: "create" | "edit" | "delete") => {
		if (mode === "edit") {
			// Editar el dato
			setDataList(prevData => {
				const updatedData = prevData.map(item =>
					item.id === newData.id ? { ...item, ...newData } : item
				);
				return updatedData;
			});
		} else if (mode === "delete") {
			// Eliminar el dato con el id proporcionado
			setDataList(prevData => {
				const updatedData = prevData.filter(item => item.id !== newData.id);
				// Llamar a handleDataUpdate después de eliminar el dato
				handleDataUpdate(newData);  // Pasar los datos actualizados a través de handleDataUpdate
				return updatedData;
			});
		} else {
			// Agregar nuevo dato (modo create)
			setDataList(prevData => [...prevData, newData]);
		}
	};

	return (
		<Content>
			<InspectionEmergencyLightsButton onSubmit={handleAddData} />
			<ToolbarWrapper />
			<KTCard>
				<InspectionEmergencyLightsHeader />
				<InspectionEmergencylightsTable
					dataList={dataList}
					onDataUpdate={handleDataUpdate}
				/>
			</KTCard>
		</Content>
	);
};
