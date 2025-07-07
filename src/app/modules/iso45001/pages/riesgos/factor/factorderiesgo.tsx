import React, { useState } from "react";
import {
	Table,
	Input,
	Button,
	DatePicker,
	Tag,
	Progress,
	Select,
	Space,
} from "antd";
import {
	SearchOutlined,
	PlusOutlined,
	DeleteOutlined,
	CloseOutlined,
	SaveOutlined,
	ReloadOutlined,
	FileTextOutlined,
	CheckSquareOutlined,
	StarOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { ColumnsType } from "antd/es/table";

interface RiskData {
	smartIndex: number;
	colorCode: string;
	codigo: string;
	tipoRiesgo: string;
	tituloFactor: string;
	valoracionBinary: string;
	estado: string;
	responsable: string;
	fechaInicio: string;
	fechaVencimiento: string;
	fechaFinalizacion: string;
}

const RiskTable: React.FC = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);

	const data: RiskData[] = [
		{
			smartIndex: 76,
			colorCode: "bg-red-500",
			codigo: "FR-18-00002",
			tipoRiesgo: "110 - Atrapamientos por entre objetos",
			tituloFactor:
				"Actividades de acople y desacople de equipos o elementos voluminosos o pesados...",
			valoracionBinary: "Moderado, Prioridad: Alta, Plazo: 3 meses",
			estado: "En Curso",
			responsable: "AGUILAR, VIRGINIA",
			fechaInicio: "31/10/2018",
			fechaVencimiento: "30/11/2018",
			fechaFinalizacion: "",
		},
		{
			smartIndex: 62,
			colorCode: "bg-yellow-500",
			codigo: "FR-23-00031",
			tipoRiesgo: "350 - Estrés térmico",
			tituloFactor: "Disconfort ambiental",
			valoracionBinary: "Moderado, Prioridad: Alta, Plazo: 3 meses",
			estado: "Pendiente de verificar",
			responsable: "AGUILAR, VIRGINIA",
			fechaInicio: "24/02/2023",
			fechaVencimiento: "24/05/2023",
			fechaFinalizacion: "",
		},
		{
			smartIndex: 50,
			colorCode: "bg-green-500",
			codigo: "FR-23-00032",
			tipoRiesgo: "350 - Estrés térmico",
			tituloFactor: "Disconfort ambiental",
			valoracionBinary: "Moderado, Prioridad: Alta, Plazo: 3 meses",
			estado: "No iniciado",
			responsable: "AGUILAR, VIRGINIA",
			fechaInicio: "24/02/2023",
			fechaVencimiento: "24/05/2023",
			fechaFinalizacion: "",
		},
	];

	const columns: ColumnsType<RiskData> = [
		{
			title: "Smart Index",
			dataIndex: "smartIndex",
			key: "smartIndex",
			sorter: (a, b) => a.smartIndex - b.smartIndex,
			render: (smartIndex: number) => (
				<Progress
					percent={smartIndex}
					status={smartIndex > 50 ? "active" : "normal"}
				/>
			),
		},
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
			render: (codigo: string, record: RiskData) => {
				let color = record.estado === "En Curso" ? "orange" : "red";
				if (record.estado === "Pendiente de verificar") {
					color = "green";
				} else if (record.estado === "No iniciado") {
					color = "red";
				}

				return (
					<div style={{ display: "flex", alignItems: "center" }}>
						<div
							style={{
								width: 16,
								height: 16,
								borderRadius: "50%",
								backgroundColor: color,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginRight: 8,
							}}
						>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									backgroundColor: "white",
								}}
							></div>
						</div>
						{codigo}
					</div>
				);
			},
		},
		{
			title: "Tipo de Riesgo",
			dataIndex: "tipoRiesgo",
			key: "tipoRiesgo",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar tipo de riesgo"
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
				record.tipoRiesgo.toLowerCase().includes(String(value).toLowerCase()),
		},
		{
			title: "Título del Factor",
			dataIndex: "tituloFactor",
			key: "tituloFactor",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar título del factor"
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
				record.tituloFactor.toLowerCase().includes(String(value).toLowerCase()),
		},
		{
			title: "Estado",
			dataIndex: "estado",
			key: "estado",
			onFilter: (value, record) => record.estado.includes(String(value)),
			render: (estado: string) => {
				let color = estado === "En Curso" ? "orange" : "red";
				if (estado === "Pendiente de verificar") {
					color = "green	";
				} else if (estado === "No iniciado") {
					color = "red";
				}
				return <Tag color={color}>{estado}</Tag>;
			},
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar estado"
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
		},
		{
			title: "Responsable",
			dataIndex: "responsable",
			key: "responsable",
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder="Buscar responsable"
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
				record.responsable.toLowerCase().includes(String(value).toLowerCase()),
		},
		{
			title: "Fecha de Inicio",
			dataIndex: "fechaInicio",
			key: "fechaInicio",
			sorter: (a, b) =>
				moment(a.fechaInicio, "DD/MM/YYYY").unix() -
				moment(b.fechaInicio, "DD/MM/YYYY").unix(),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<DatePicker
						onChange={(_, dateString) =>
							setSelectedKeys(
								typeof dateString === "string" && dateString ? [dateString] : []
							)
						}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => confirm()}
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
			title: "Fecha de Vencimiento",
			dataIndex: "fechaVencimiento",
			key: "fechaVencimiento",
			sorter: (a, b) =>
				moment(a.fechaVencimiento, "DD/MM/YYYY").unix() -
				moment(b.fechaVencimiento, "DD/MM/YYYY").unix(),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<DatePicker
						onChange={(_, dateString) =>
							setSelectedKeys(
								typeof dateString === "string" && dateString ? [dateString] : []
							)
						}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => confirm()}
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
			title: "Fecha de Finalización",
			dataIndex: "fechaFinalizacion",
			key: "fechaFinalizacion",
			sorter: (a, b) =>
				moment(a.fechaFinalizacion, "DD/MM/YYYY").unix() -
				moment(b.fechaFinalizacion, "DD/MM/YYYY").unix(),
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<DatePicker
						onChange={(_, dateString) =>
							setSelectedKeys(
								typeof dateString === "string" && dateString ? [dateString] : []
							)
						}
						style={{ marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() => confirm()}
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
						<Select placeholder="Seleccionar" style={{ width: 150 }} />
					</div>
					<div>
						<label>Equipo/Instalación: </label>
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
					<div>
						<label>Origen: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }} />
					</div>
					<div>
						<label>Cargo: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }} />
					</div>
					<div>
						<label>Observador: </label>
						<Select placeholder="Seleccionar" style={{ width: 150 }} />
					</div>
				</div>
			</div>
			<div>
				<Space style={{ marginBottom: 16 }}>
					<Button type="primary" icon={<PlusOutlined />}>
						Nuevo
					</Button>
					<Button danger icon={<DeleteOutlined />} />
					<Button type="primary" icon={<SaveOutlined />}>
						Guardar
					</Button>
					<Button icon={<CloseOutlined />}>Cancelar</Button>
					<Button icon={<ReloadOutlined />} />
					<Button>Operaciones</Button>
					<Button icon={<FileTextOutlined />}>Generar Informe</Button>
					<Button icon={<CheckSquareOutlined />}>Revisar en Bloque</Button>
					<Button icon={<StarOutlined />}>Valorar</Button>
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

export default RiskTable;
