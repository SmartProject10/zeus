import { Card, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Graphic10 = () => {

    return (
        <Card style={{ width: '25%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography.Title level={4} style={{ width: '60%' }}>Adjuntos destacados</Typography.Title>
                <Button
                    shape="circle"
                    style={{
                        backgroundColor: '#f0f0f0',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ArrowRightOutlined style={{ fontSize: '13px', color: '#1890ff' }} />
                </Button>
            </div>
        </Card>
    )
}

export default Graphic10
