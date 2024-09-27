import { Card, Typography, Progress, Badge, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const Graphic6 = () => {
    const percentage1 = 15
    const percentage2 = 15

    const accidentes1 = 5
    const accidentes2 = 5

    const items = [
        { label: 'item 1', key: 'item-1' },
        { label: 'item 2', key: 'item-2' },
    ]

    return (
        <Card style={{ width: '25%' }}>
            <div>
                <Typography.Title level={5} style={{ fontSize: 'large' }}>Índice de frecuencia</Typography.Title>
                <div style={{ visibility: 'hidden' }}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={e => e.preventDefault()} style={{ margin: '0', fontSize: 'small', color: 'black' }}>
                            Empleados internos <DownOutlined style={{ fontSize: '8px', color: 'black' }} />
                        </a>
                    </Dropdown>
                </div>
            </div>

            <div style={{ width: '150px', height: '90px' }}>
                {/* Primer semicírculo (2022) */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Progress
                        type="dashboard"
                        percent={percentage1}
                        strokeWidth={10}
                        strokeColor={{
                            '0%': '#FF6384',
                            '100%': '#FFCE56',
                        }}
                        format={() => ''}
                        gapDegree={180}
                        gapPosition="bottom"
                        style={{ zIndex: 2 }}
                    />
                </div>

                {/* Segundo semicírculo (2023) */}
                <div style={{ position: 'absolute', top: '0px', left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Progress
                        type="dashboard"
                        percent={percentage2}
                        strokeWidth={10}
                        strokeColor={{
                            '0%': '#87d068',
                            '100%': '#108ee9',
                        }}
                        format={() => ''}
                        gapDegree={180}
                        gapPosition="bottom"
                        style={{ zIndex: 1, transform: 'scale(0.75)' }}
                    />
                </div>

                <Typography.Title style={{ fontSize: 'smaller', position: 'absolute', bottom: '48%', left: '22%' }}>{percentage1 + '%'}</Typography.Title>

                <Typography.Title style={{ fontSize: 'smaller', position: 'absolute', bottom: '48%', left: '40%' }}>{percentage2 + '%'}</Typography.Title>
            </div>

            {/* fila uno */}
            <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, fontSize: '12px' }}>Objetivo</p>
                    <p style={{ margin: 0, textAlign: 'start', fontSize: 'smaller' }}>Objetivo</p>
                </div>
                <div style={{ alignContent: 'center' }}>
                    <Badge count={accidentes1} style={{ backgroundColor: '#FF6384', fontSize: '1.0rem', marginTop: 'Auto' }} />
                </div>
            </div>

            {/* fila dos */}
            <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, fontSize: '12px' }}>Valor IFG</p>
                    <p style={{ margin: 0, textAlign: 'start', fontSize: 'smaller' }}>Valor IFG</p>
                </div>
                <div style={{ alignContent: 'center' }}>
                    <Badge count={accidentes2} style={{ backgroundColor: '#87d068', fontSize: '1.0rem', marginTop: 'Auto' }} />
                </div>
            </div>
        </Card>
    )
}

export default Graphic6
