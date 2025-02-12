import { Content } from '@zeus/_zeus/layout/components/content'
import { ToolbarWrapper } from '@zeus/_zeus/layout/components/toolbar'
import { useEffect, useState } from 'react'
import BotiquinTable from './BotiquinTable'
import BotiquinModal from './BotiquinModal'
import BotiquinButton from './BotiquinButton'
import { BotiquinResponse } from '../../../../../@services/api/dtos/BotiquinModel'
import Swal from 'sweetalert2'

export function Botiquin(): JSX.Element {
    const [dataSource, setDataSource] = useState<BotiquinResponse[]>([])
    const [newData, setNewData] = useState<any>({})
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
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showCancelButton: true,
            showConfirmButton: true,
            timer: undefined,
        })

        Toast.fire({
            title: '¿Está seguro que desea eliminar el botiquín?',
            icon: 'error',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                const newArr = dataSource.filter((_, index) => index !== indice)
                setIsLoading(true)
                setDataSource(newArr)
            }
        })

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
