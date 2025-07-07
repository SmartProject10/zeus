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

interface GestionFormaciones {
	estado: string;
	empleado: string;
	curso: string;
	numero: string;
	fechaAsistencia: string;
	fechaVencimiento: string;
	convocatoria: string;
	gestionLibre: boolean;
	anularNecesidad: boolean;
}

const GestionFormaciones: React.FC = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	const data: GestionFormaciones[] = [
		{
			estado: "Pendiente",
			empleado: "Juan Pérez",
			curso: "Curso de Seguridad",
			numero: "FA - 12345",
			fechaAsistencia: "01/01/2023",
			fechaVencimiento: "01/01/2024",
			convocatoria: "Convocatoria A",
			gestionLibre: true,
			anularNecesidad: false,
		},
		{
			estado: "Completado",
			empleado: "María López",
			curso: "Curso de Primeros Auxilios",
			numero: "CA - 67890",
			fechaAsistencia: "02/01/2023",
			fechaVencimiento: "02/01/2024",
			convocatoria: "Convocatoria B",
			gestionLibre: false,
			anularNecesidad: true,
		},
	];

	const columns: ColumnsType<GestionFormaciones> = [
		{
			title: "Estado",
			dataIndex: "estado",
			key: "estado",
			render: (estado: string) => {
				let color = estado === "Completado" ? "green" : "orange";
				if (estado === "Pendiente") {
					color = "red";
				}
				return <Tag color={color}>{estado}</Tag>;
			},
			filters: [
				{ text: "Completado", value: "Completado" },
				{ text: "Pendiente", value: "Pendiente" },
			],
			onFilter: (value, record) => record.estado.includes(value as string),
		},
		{
			title: "Empleado",
			dataIndex: "empleado",
			key: "empleado",
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
				record.empleado.toLowerCase().includes(String(value).toLowerCase()),
		},
		{
			title: "Curso",
			dataIndex: "curso",
			key: "curso",
			filters: [
				{ text: "Curso de Seguridad", value: "Curso de Seguridad" },
				{
					text: "Curso de Primeros Auxilios",
					value: "Curso de Primeros Auxilios",
				},
			],
			onFilter: (value, record) => record.curso.includes(value as string),
		},
		{
			title: "Número",
			dataIndex: "numero",
			key: "numero",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar número"
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
				record.numero.toLowerCase().includes(String(value).toLowerCase()),
		},
		{
			title: "Fecha de Asistencia",
			dataIndex: "fechaAsistencia",
			key: "fechaAsistencia",
			sorter: (a, b) =>
				moment(a.fechaAsistencia, "DD/MM/YYYY").unix() -
				moment(b.fechaAsistencia, "DD/MM/YYYY").unix(),
		},
		{
			title: "Fecha de Vencimiento",
			dataIndex: "fechaVencimiento",
			key: "fechaVencimiento",
			sorter: (a, b) =>
				moment(a.fechaVencimiento, "DD/MM/YYYY").unix() -
				moment(b.fechaVencimiento, "DD/MM/YYYY").unix(),
		},
		{
			title: "Convocatoria",
			dataIndex: "convocatoria",
			key: "convocatoria",
			filters: [
				{ text: "Convocatoria A", value: "Convocatoria A" },
				{ text: "Convocatoria B", value: "Convocatoria B" },
			],
			onFilter: (value, record) =>
				record.convocatoria.includes(value as string),
		},
		{
			title: "Gestión Libre",
			dataIndex: "gestionLibre",
			key: "gestionLibre",
			render: (gestionLibre: boolean) => (
				<input type="checkbox" checked={gestionLibre} readOnly />
			),
			filters: [
				{ text: "Sí", value: true },
				{ text: "No", value: false },
			],
			onFilter: (value, record) => record.gestionLibre === value,
		},
		{
			title: "Anular Necesidad",
			dataIndex: "anularNecesidad",
			key: "anularNecesidad",
			render: (anularNecesidad: boolean) => (
				<input type="checkbox" checked={anularNecesidad} readOnly />
			),
			filters: [
				{ text: "Sí", value: true },
				{ text: "No", value: false },
			],
			onFilter: (value, record) => record.anularNecesidad === value,
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
						<label>Actividad: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }}></Select>
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
					<Button danger icon={<DeleteOutlined />} />
					<Button type="primary" icon={<PlusOutlined />}>
						Guardar
					</Button>
					<Button
						icon={<ReloadOutlined />}
						onClick={() => setSelectedRowKeys([])}
					>
						Cancelar
					</Button>
					<Button icon={<ReloadOutlined />} />
					<Select defaultValue="operaciones" style={{ width: 120 }}>
						<Select.Option value="operaciones">Operaciones</Select.Option>
					</Select>
					<Button icon={<FileTextOutlined />}>Generar Informe</Button>
				</Space>
				<Table
					dataSource={data}
					columns={columns}
					rowKey={(record) => record.numero}
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

export default GestionFormaciones;
