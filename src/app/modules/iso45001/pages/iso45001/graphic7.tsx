import { Card, Typography, Progress } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'

const Graphic7 = () => {
    const percentage = 35

    return (
        <Card style={{ width: '25%' }}>
            <Typography.Title level={5} style={{ fontSize: 'large', marginBottom: '0px' }}>Empleados formados</Typography.Title>
            <Typography.Title level={5} style={{ fontSize: 'large', marginTop: '0px', visibility: 'hidden' }}>Empleados formados</Typography.Title>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px',
                }}>
                <Progress
                    type="circle"
                    percent={percentage}
                    strokeWidth={10}
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    format={percent => `${percent}%`}
                />
            </div>

            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <CheckCircleFilled style={{ color: '#1890ff', fontSize: '16px', marginRight: '8px' }} />
                    <span style={{ flexGrow: 1 }}>Empleados formados</span>
                    <span style={{ fontWeight: 'bold' }}>4</span>
                    <span style={{ marginLeft: '8px' }}>(35%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleFilled style={{ color: '#d9d9d9', fontSize: '16px', marginRight: '8px' }} />
                    <span style={{ flexGrow: 1 }}>Empleados no formados</span>
                    <span style={{ fontWeight: 'bold' }}>15</span>
                    <span style={{ marginLeft: '8px' }}>(65%)</span>
                </div>
            </div>
        </Card>
    )
}

export default Graphic7
