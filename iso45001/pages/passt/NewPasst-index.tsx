import { Content } from "@zeus/_zeus/layout/components/content";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";
import { useEffect, useState } from "react";
import NewPasstTable from "./NewPasstTable";
import NewPasstModal from "./NewPasstModal";
import ModalPasst2 from "./ModalPasst2";
import NewPasstButton from "./NewPasstButton";
import { PasstResponse } from "./core/_models";
import Swal from "sweetalert2";

export function NewPasst(): JSX.Element {
	const [dataSource, setDataSource] = useState<PasstResponse[]>([]);
	const [newData, setNewData] = useState<any>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchBotiquin = () => {
		setIsLoading(true);
		if (Object.keys(newData).length) {
			setDataSource((currData) => [...currData, newData]);
			setNewData({});
		}
		setIsLoading(false);
	};

	const handleDeleteData = (indice: number) => {
		const Toast = Swal.mixin({
			toast: true,
			position: "top",
			showCancelButton: true,
			showConfirmButton: true,
			timer: undefined,
		});

		Toast.fire({
			title: "¿Está seguro que desea eliminar el botiquín?",
			icon: "error",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				const newArr = dataSource.filter((_, index) => index !== indice);
				setIsLoading(true);
				setDataSource(newArr);
			}
		});
	};

	useEffect(() => {
		fetchBotiquin();
	}, [newData, isLoading]);

	return (
		<Content>
			<NewPasstButton />
			<ToolbarWrapper />
			<NewPasstTable
				dataSource={dataSource}
				handleDeleteData={handleDeleteData}
			/>
			<NewPasstModal setNewData={setNewData} />
			<ModalPasst2 />
		</Content>
	);
}
