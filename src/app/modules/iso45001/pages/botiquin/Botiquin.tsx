import { Content } from "@zeus/_zeus/layout/components/content";
import { ToolbarWrapper } from "@zeus/_zeus/layout/components/toolbar";
import { useEffect, useState } from "react";
import BotiquinTable from "./BotiquinTable";
import BotiquinModal from "./BotiquinModal";
import BotiquinButton from "./BotiquinButton";
import { BotiquinResponse } from "./core/_models";

export function Botiquin(): JSX.Element {
    const [dataSource, setDataSource] = useState<BotiquinResponse[]>([])
    const [newData, setNewData] = useState<object>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchBotiquin = () => {
        setIsLoading(true)
        if (Object.keys(newData).length) {
            setDataSource(currData => [...currData, newData])
            setNewData({})
        }
        setIsLoading(false)
    }

    const handleDeleteData = (indice: number) => {
        const newArr = dataSource.filter((data, index) => index !== indice)
        setIsLoading(true)
        setDataSource(newArr)
    }

    useEffect(() => {
        fetchBotiquin()
    }, [newData, isLoading])

    return (
        <Content>
            <BotiquinButton />
            <ToolbarWrapper />
            <BotiquinTable dataSource={dataSource} handleDeleteData={handleDeleteData} />
            <BotiquinModal setNewData={setNewData} />
        </Content>
    )
}
