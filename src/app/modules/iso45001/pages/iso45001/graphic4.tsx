import { Card, Typography, Dropdown, Progress } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Graphic4 = () => {

    const items = [
        { label: 'item 1', key: 'item-1' },
        { label: 'item 2', key: 'item-2' },
    ];

    return (
        <Card style={{ width: '25%' }}>
            <Typography.Title level={5} style={{ fontSize: 'large' }}>Cuestionarios con desviaciones</Typography.Title>
            <div style={{ display: 'flex', marginTop: '1.2em' }}>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={e => e.preventDefault()} style={{ margin: '0', fontSize: 'small', color: 'black' }}>
                        Mes <DownOutlined style={{ fontSize: '8px', color: 'black' }} />
                    </a>
                </Dropdown>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={e => e.preventDefault()} style={{ margin: '0', marginLeft: '45px', fontSize: 'small', color: 'black' }}>
                        03_OPS <DownOutlined style={{ fontSize: '8px', color: 'black' }} />
                    </a>
                </Dropdown>
            </div>
            <Typography.Title level={1} style={{ marginTop: '0.7em' }}>0%</Typography.Title>
            <Progress status="active" showInfo={false} />
        </Card >
    );
};

export default Graphic4;