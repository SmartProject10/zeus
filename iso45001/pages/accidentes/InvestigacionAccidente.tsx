import React, { useState } from "react";
import { Table, Input, Button, Tag, Select, Space } from "antd";
import {
	SearchOutlined,
	PlusOutlined,
	DeleteOutlined,
	ReloadOutlined,
	FileTextOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { ColumnsType } from "antd/es/table";

interface InvestigacionAccidente {
	codigo: string;
	fechaAccidenteIncidente: string;
	tipoAccidente: string;
	empleadoAfectado: string;
	descripcionAccidenteIncidente: string;
	estado: string;
	inItinere: boolean;
	empresa: string;
	centro: string;
	lugarTrabajo: string;
	puesto: string;
	notificacionAccidenteIncidente: string;
}

const InvestigacionAccidente: React.FC = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	const data: InvestigacionAccidente[] = [
		{
			codigo: "INV-001",
			fechaAccidenteIncidente: "01/01/2023",
			tipoAccidente: "Caída",
			empleadoAfectado: "Juan Pérez",
			descripcionAccidenteIncidente: "Caída de un objeto",
			estado: "En Curso",
			inItinere: true,
			empresa: "Empresa A",
			centro: "Centro A",
			lugarTrabajo: "Lugar A",
			puesto: "Puesto A",
			notificacionAccidenteIncidente: "Notificación A",
		},
		{
			codigo: "INV-002",
			fechaAccidenteIncidente: "02/01/2023",
			tipoAccidente: "Golpe",
			empleadoAfectado: "María López",
			descripcionAccidenteIncidente: "Golpe en la cabeza",
			estado: "Pendiente de verificar",
			inItinere: false,
			empresa: "Empresa B",
			centro: "Centro B",
			lugarTrabajo: "Lugar B",
			puesto: "Puesto B",
			notificacionAccidenteIncidente: "Notificación B",
		},
	];

	const columns: ColumnsType<InvestigacionAccidente> = [
		{
			title: "Código",
			dataIndex: "codigo",
			key: "codigo",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar código"
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => confirm()}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90, marginRight: 8 }}
					>
						Buscar
					</Button>
					<Button onClick={clearFilters} size="small" style={{ width: 90 }}>
						Resetear
					</Button>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
			),
			onFilter: (value, record) =>
				record.codigo.toLowerCase().includes(String(value).toLowerCase()),
		},
		{
			title: "Fecha Accidente/Incidente",
			dataIndex: "fechaAccidenteIncidente",
			key: "fechaAccidenteIncidente",
			sorter: (a, b) =>
				moment(a.fechaAccidenteIncidente, "DD/MM/YYYY").unix() -
				moment(b.fechaAccidenteIncidente, "DD/MM/YYYY").unix(),
		},
		{
			title: "Tipo de Accidente",
			dataIndex: "tipoAccidente",
			key: "tipoAccidente",
			filters: [
				{ text: "Caída", value: "Caída" },
				{ text: "Golpe", value: "Golpe" },
			],
			onFilter: (value, record) =>
				record.tipoAccidente.includes(value as string),
		},
		{
			title: "Empleado Afectado",
			dataIndex: "empleadoAfectado",
			key: "empleadoAfectado",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar empleado"
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => confirm()}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90, marginRight: 8 }}
					>
						Buscar
					</Button>
					<Button onClick={clearFilters} size="small" style={{ width: 90 }}>
						Resetear
					</Button>
				</div>
			),
			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
			),
			onFilter: (value, record) =>
				record.empleadoAfectado
					.toLowerCase()
					.includes(String(value).toLowerCase()),
		},
		{
			title: "Descripción",
			dataIndex: "descripcionAccidenteIncidente",
			key: "descripcionAccidenteIncidente",
			onFilter: (value, record) =>
				record.descripcionAccidenteIncidente
					.toLowerCase()
					.includes(String(value).toLowerCase()),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar descripción"
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => confirm()}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90, marginRight: 8 }}
					>
						Buscar
					</Button>
					<Button onClick={clearFilters} size="small" style={{ width: 90 }}>
						Resetear
					</Button>
				</div>
			),
		},
		{
			title: "Estado",
			dataIndex: "estado",
			key: "estado",
			render: (estado: string) => {
				let color = estado === "En Curso" ? "orange" : "red";
				if (estado === "Pendiente de verificar") {
					color = "green";
				}
				return <Tag color={color}>{estado}</Tag>;
			},
			filters: [
				{ text: "En Curso", value: "En Curso" },
				{ text: "Pendiente de verificar", value: "Pendiente de verificar" },
			],
			onFilter: (value, record) => record.estado.includes(value as string),
		},
		{
			title: "In Itinere",
			dataIndex: "inItinere",
			key: "inItinere",
			render: (inItinere: boolean) => (
				<input type="checkbox" checked={inItinere} readOnly />
			),
			filters: [
				{ text: "Sí", value: true },
				{ text: "No", value: false },
			],
			onFilter: (value, record) => record.inItinere === value,
		},
		{
			title: "Empresa",
			dataIndex: "empresa",
			key: "empresa",
			filters: [
				{ text: "Empresa A", value: "Empresa A" },
				{ text: "Empresa B", value: "Empresa B" },
			],
			onFilter: (value, record) => record.empresa.includes(value as string),
		},
		{
			title: "Centro",
			dataIndex: "centro",
			key: "centro",
			filters: [
				{ text: "Centro A", value: "Centro A" },
				{ text: "Centro B", value: "Centro B" },
			],
			onFilter: (value, record) => record.centro.includes(value as string),
		},
		{
			title: "Lugar de Trabajo",
			dataIndex: "lugarTrabajo",
			key: "lugarTrabajo",
			filters: [
				{ text: "Lugar A", value: "Lugar A" },
				{ text: "Lugar B", value: "Lugar B" },
			],
			onFilter: (value, record) =>
				record.lugarTrabajo.includes(value as string),
		},
		{
			title: "Puesto",
			dataIndex: "puesto",
			key: "puesto",
			filters: [
				{ text: "Puesto A", value: "Puesto A" },
				{ text: "Puesto B", value: "Puesto B" },
			],
			onFilter: (value, record) => record.puesto.includes(value as string),
		},
		{
			title: "Notificación",
			dataIndex: "notificacionAccidenteIncidente",
			key: "notificacionAccidenteIncidente",
			filters: [
				{ text: "Notificación A", value: "Notificación A" },
				{ text: "Notificación B", value: "Notificación B" },
			],
			onFilter: (value, record) =>
				record.notificacionAccidenteIncidente.includes(value as string),
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedKeys: React.Key[]) => {
			setSelectedRowKeys(selectedKeys);
		},
	};

	return (
		<>
			<div
				style={{
					marginBottom: 16,
					backgroundColor: "#f5f5f5",
					padding: "16px",
					borderRadius: "4px",
				}}
			>
				<div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
					<div>
						<label>Ámbito: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }} />
					</div>
					<div>
						<label>Etiqueta: </label>
						<Input placeholder="Ingresar" style={{ width: 150 }} />
					</div>
				</div>
				<div style={{ display: "flex", gap: "16px" }}>
					<div>
						<label>Smart: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }}>
							<Select.Option value="all">Ver todos</Select.Option>
						</Select>
					</div>
					<div>
						<label>Ver activos: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }}>
							<Select.Option value="active">Estado activos</Select.Option>
						</Select>
					</div>
				</div>
			</div>
			<div>
				<Space style={{ marginBottom: 16 }}>
					<Button type="primary" icon={<PlusOutlined />}>
						Nuevo
					</Button>
					<Button danger icon={<DeleteOutlined />} />
					<Button icon={<ReloadOutlined />} />
					<Select defaultValue="operaciones" style={{ width: 120 }}>
						<Select.Option value="operaciones">Operaciones</Select.Option>
					</Select>
					<Button icon={<FileTextOutlined />}>Generar Informe</Button>
					<Button icon={<FileTextOutlined />}>Imprimir</Button>
				</Space>
				<Table
					dataSource={data}
					columns={columns}
					rowKey={(record) => record.codigo}
					rowSelection={rowSelection}
					pagination={{
						pageSize,
						showSizeChanger: false,
					}}
					footer={() => (
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Select
								defaultValue={10}
								style={{ width: 120 }}
								onChange={(value) => setPageSize(value)}
							>
								<Select.Option value={5}>5</Select.Option>
								<Select.Option value={10}>10</Select.Option>
								<Select.Option value={20}>20</Select.Option>
							</Select>
							<span>Crear filtro</span>
						</div>
					)}
				/>
			</div>
		</>
	);
};

export default InvestigacionAccidente;
