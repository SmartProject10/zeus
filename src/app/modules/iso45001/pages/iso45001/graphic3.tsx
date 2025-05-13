import { Card, Typography, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Graphic3 = () => {

    const items = [
        { label: 'item 1', key: 'item-1' },
        { label: 'item 2', key: 'item-2' },
    ];

    return (
        <Card style={{ width: '25%' }}>
            <Typography.Title level={5} style={{ fontSize: 'large' }}>Cuestionarios reportados</Typography.Title>
            <div style={{ display: 'flex', marginTop: '1.2em' }}>
                <div style={{ margin: '0', fontSize: 'small' }}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={e => e.preventDefault()} style={{ color: 'black' }}>
                            Año <DownOutlined style={{ fontSize: '8px', color: 'black' }} />
                        </a>
                    </Dropdown>
                </div>
                <div style={{ margin: '0', marginLeft: '45px', fontSize: 'small' }}>
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={e => e.preventDefault()} style={{ color: 'black' }}>
                            03_OPS <DownOutlined style={{ fontSize: '8px', color: 'black' }} />
                        </a>
                    </Dropdown>
                </div>

            </div>
            <Typography.Title level={1} style={{ marginTop: '0.7em' }}>0</Typography.Title>


        </Card >
    );
};

export default Graphic3;