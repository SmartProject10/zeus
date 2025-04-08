import { Content } from '../../../../generalcomponents/layouts/content';
import { ToolbarWrapper } from '../../../../generalcomponents/layouts/toolbar';
import AsistenciaTable from './AsistenciaTable'

export function Asistencia(): JSX.Element {
  const dataSource = [
    // eslint-disable-next-line max-len
    { sede: 'Sede 1', numero: 1, area: 'Área 1', ubicacion: 'Ubicación 1' , dni: '40221323434812', cargo: 'Cargo 1', fecha: '2022-01-01', elaboradoPor: 'Elaborado por 1', subidoPor: 'Subido por 1' , tipo: 'Tipo 2' , firma: 'Mi Firma' },
  ]

  const handleEditData = (index: number) => {
    console.log('Editado', index)
  }

  return (
    <Content>
      <ToolbarWrapper />
			<AsistenciaTable dataSource={dataSource} handleDeleteData={handleEditData} />
    </Content>
  )
}
