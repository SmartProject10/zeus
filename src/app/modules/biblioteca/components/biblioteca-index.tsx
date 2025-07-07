import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
	return (
		<div
			style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
		>
			<input
				type="text"
				placeholder="Nombre o descripción"
				style={{
					flex: 1,
					padding: "10px",
					border: "1px solid #ccc",
					borderRadius: "4px",
					marginRight: "10px",
				}}
			/>
			<button
				style={{
					padding: "10px 20px",
					backgroundColor: "#007BFF",
					color: "#fff",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
				}}
			>
				Buscar
			</button>
		</div>
	);
};

interface FolderCardProps {
	title: string;
	description: string;
	onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
	title,
	description,
	onClick,
}) => {
	return (
		<div
			onClick={onClick}
			style={{
				border: "1px solid #ddd",
				borderRadius: "8px",
				padding: "20px",
				textAlign: "center",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				backgroundColor: "#fff",
				cursor: "pointer",
				transition: "transform 0.2s, box-shadow 0.2s",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "scale(1.05)";
				e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "scale(1)";
				e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
			}}
		>
			<div style={{ fontSize: "40px", marginBottom: "10px" }}>📁</div>
			<h3 style={{ margin: "10px 0", fontSize: "16px", color: "#000" }}>
				{title}
			</h3>
			<p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
				{description}
			</p>
		</div>
	);
};

const BibliotecaIndex: React.FC = () => {
	const navigate = useNavigate();

	const folders = [
		{ title: "Clínica San Felipe", description: "4 archivos" },
		{ title: "Corporativo", description: "12 archivos" },
		{ title: "Corporativo Centros Clínicos", description: "2 archivos" },
		{ title: "Equidad Ahora", description: "4 archivos" },
		{
			title: "Formularios de Cumplimiento Corporativo",
			description: "38 archivos",
		},
		{ title: "Herramientas para el Líder", description: "1 archivo" },
		{ title: "Pacífico EPS", description: "24 archivos" },
		{ title: "SANNA Clínica Del Sur", description: "6 archivos" },
		{ title: "SANNA Clínica Sánchez Ferrer", description: "6 archivos" },
	];

	return (
		<div
			style={{
				padding: "20px",
				fontFamily: "Arial, sans-serif",
				backgroundColor: "#f9f9f9",
			}}
		>
			<h1 style={{ marginBottom: "20px", fontSize: "24px", color: "#000" }}>
				Biblioteca
			</h1>
			<SearchBar />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
					gap: "20px",
				}}
			>
				{folders.map((folder, index) => (
					<FolderCard
						key={index}
						title={folder.title}
						description={folder.description}
						onClick={() => navigate("/biblioteca/archivos-index")}
					/>
				))}
			</div>
		</div>
	);
};

export default BibliotecaIndex;
