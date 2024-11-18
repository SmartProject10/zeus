import { useState } from "react";
import { Content } from "@zeus/_zeus/layout/components/content";
import { InspectionEmergencyLightsButton } from "./InspectionEmergencyLightsButton";
import { InspectionEmergencylightsTable } from "./InspectionEmergencyLightsTable";
import { KTCard } from "@zeus/_zeus/helpers";
import { InspectionEmergencyLightsHeader } from "./InspectionEmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";
import { useEffect } from "react";

export const InspectionEmergencyLightsWrapper = () => {
	const [dataList, setDataList] = useState<any[]>([]);

	useEffect(() => {
		console.log("dataList actualizado:", dataList);
	}, [dataList]);

	const handleDataUpdate = (newData: any, mode: "create" | "edit" | "delete" | "view") => {
		if (mode === 'edit') {
			setDataList(prevData =>
				prevData.map(item =>
					item.id === newData.id ? { ...item, ...newData } : item
				)
			);
		} else if (mode === "delete") {
			// Eliminar el dato con el id proporcionado
			setDataList(prevData => prevData.filter(item => item.id !== newData.id));
			console.log('Dato elimiando:', newData);
		}
	};

	const handleAddData = (newData: any, mode: "create" | "edit" | "delete" | "view") => {
		if (mode === "edit") {
			// Editar el dato
			setDataList(prevData => {
				const updatedData = prevData.map(item =>
					item.id === newData.id ? { ...item, ...newData } : item
				);
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
