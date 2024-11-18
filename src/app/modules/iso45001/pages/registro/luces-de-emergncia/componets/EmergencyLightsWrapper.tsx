import { Content } from "@zeus/_zeus/layout/components/content";
import { EmergencyLightsButton } from "./EmergencyLightsButton";
import { EmergencylightsTable } from "./EmergencyLightsTable";
import { KTCard } from "@zeus/_zeus/helpers";
import { EmergencyLightsHeader } from "./EmergencyLightsHeader";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";
import { useEffect } from "react";
import { useState } from "react";

export const EmergencyLightsWrapper = () => {
	const [lightsData, setLightsData] = useState<any[]>([]);

	useEffect(() => {
		console.log("dataList actualizado:", lightsData);
	}, [lightsData]);

	const handleAddData = (newData: any, mode: "create" | "edit" | "delete" | "view" | "change") => {
		if (mode === "edit" || mode === "change") {
			// Editar el dato
			setLightsData(prevData => {
				const updatedData = prevData.map(item =>
					item.id === newData.id ? { ...item, ...newData } : item
				);
				return updatedData;
			});
		} else {
			// Agregar nuevo dato (modo create)
			setLightsData(prevData => [...prevData, newData]);
		}
	};

	const handleDataUpdate = (newData: any, mode: "create" | "edit" | "delete" | "view" | "change") => {
		console.log('Datos actualizados desde el hijo:', newData);
		if (mode === 'edit' || mode === "change") {
			setLightsData(prevData =>
				prevData.map(item =>
					item.id === newData.id ? { ...item, ...newData } : item
				)
			);
		} else if (mode === "delete") {
			// Eliminar el dato con el id proporcionado
			setLightsData(prevData => prevData.filter(item => item.id !== newData.id));
			console.log('Dato elimiando:', newData);
		}
	};

	return (
		<Content>
			<EmergencyLightsButton onSubmit={handleAddData} />
			<ToolbarWrapper />
			<KTCard>
				<EmergencyLightsHeader />
				<EmergencylightsTable
					data={lightsData}
					onDataUpdate={handleDataUpdate}
				/>
			</KTCard>
		</Content>
	);
};
