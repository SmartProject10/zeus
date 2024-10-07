import { Content } from "@zeus/_zeus/layout/components/content";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";
import { useEffect, useState } from "react";
import { KitResponse } from "./core/_models";
import KitButton from "./KitButton";
import KitTable from "./KitTable";
import KitModal from "./KitModal";

export function Kit(): JSX.Element {
	const [dataSource, setDataSource] = useState<KitResponse[]>([]);
	const [newData, setNewData] = useState<object>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchKit = () => {
		setIsLoading(true);
		if (Object.keys(newData).length) {
			setDataSource((currData) => [...currData, newData]);
			setNewData({});
		}
		setIsLoading(false);
	};

	const handleDeleteData = (indice: number) => {
		const newArr = dataSource.filter((data, index) => index !== indice);
		setIsLoading(true);
		setDataSource(newArr);
	};

	useEffect(() => {
		fetchKit();
	}, [newData, isLoading]);

	return (
		<Content>
			<KitButton />
			<ToolbarWrapper />
			<KitTable dataSource={dataSource} handleDeleteData={handleDeleteData} />
			<KitModal setNewData={setNewData} />
		</Content>
	);
}
