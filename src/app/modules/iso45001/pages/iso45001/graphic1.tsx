import { Card, Typography, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Graphic1 = () => {
    const items = [
        { label: 'item 1', key: 'item-1' },
        { label: 'item 2', key: 'item-2' },
    ];

    return (
        <Card style={{ width: '25%' }}>
            <Typography.Title level={5} style={{ fontSize: 'large' }}>Acciones pendientes</Typography.Title>
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={e => e.preventDefault()} style={{ margin: '0', fontSize: 'small', color: 'black' }}>
                    Medidas <DownOutlined style={{ fontSize: '8px', color: 'black' }} />
                </a>
            </Dropdown>
            <Typography.Title level={1} style={{ marginTop: '0.7em' }}>174</Typography.Title>
        </Card>
    );
};

export default Graphic1;
