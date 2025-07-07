import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
	return (
		<div style={{ textAlign: "center", marginBottom: "20px" }}>
			<input
				type="text"
				placeholder="Nombre o descripción"
				style={{
					padding: "10px",
					borderRadius: "8px",
					border: "1px solid #ccc",
					width: "300px",
					marginRight: "10px",
				}}
			/>
			<button
				style={{
					padding: "10px 20px",
					borderRadius: "8px",
					backgroundColor: "#007BFF",
					color: "#fff",
					border: "none",
					cursor: "pointer",
				}}
				onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
				onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
			>
				Buscar
			</button>
		</div>
	);
};

const FolderCard: React.FC<{
	title: string;
	description: string;
	onClick?: () => void;
}> = ({ title, description, onClick }) => {
	const [showOptions, setShowOptions] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			style={{
				backgroundColor: "#fff",
				borderRadius: "8px",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				padding: "20px",
				textAlign: "center",
				cursor: "pointer",
				transition: "transform 0.2s, box-shadow 0.2s",
				position: "relative",
			}}
			onClick={() => {
				onClick?.();
				navigate("/biblioteca/archivos-inside-index");
			}}
			onMouseOver={(e) => {
				e.currentTarget.style.transform = "scale(1.05)";
				e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.transform = "scale(1)";
				e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
			}}
		>
			<div style={{ fontSize: "40px", marginBottom: "10px" }}>📁</div>
			<h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>{title}</h3>
			<p style={{ color: "#666" }}>{description}</p>
			<div
				style={{
					position: "absolute",
					top: "10px",
					right: "10px",
					cursor: "pointer",
				}}
				onClick={(e) => {
					e.stopPropagation();
					setShowOptions(!showOptions);
				}}
			>
				⋮
			</div>
			{showOptions && (
				<div
					style={{
						position: "absolute",
						top: "30px",
						right: "10px",
						backgroundColor: "#fff",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						borderRadius: "8px",
						overflow: "hidden",
						zIndex: 10,
					}}
				>
					<div
						style={{
							padding: "10px",
							cursor: "pointer",
							borderBottom: "1px solid #ccc",
						}}
						onClick={() => alert("Descargar")}
					>
						Descargar
					</div>
					<div
						style={{
							padding: "10px",
							cursor: "pointer",
							borderBottom: "1px solid #ccc",
						}}
						onClick={() => alert("Compartir")}
					>
						Compartir
					</div>
					<div
						style={{
							padding: "10px",
							cursor: "pointer",
						}}
						onClick={() => alert("Eliminar")}
					>
						Eliminar
					</div>
				</div>
			)}
		</div>
	);
};

const ArchivosIndex: React.FC = () => {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const navigate = useNavigate();
	const folders = [
		{ title: "Bioseguridad", description: "1 archivo" },
		{ title: "Covid-19", description: "2 archivos" },
		{ title: "Formato quinta categoría", description: "1 archivo" },
		{ title: "Documentos legales", description: "3 archivos" },
	];

	return (
		<div style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
			<header style={{ textAlign: "center", marginBottom: "30px" }}>
				<h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
					Clínica San Felipe
				</h1>
				<div style={{ color: "#666", marginBottom: "10px" }}>
					<span
						style={{ cursor: "pointer", color: "#007BFF" }}
						onClick={() =>
							(window.location.href = "/biblioteca/biblioteca-index")
						}
					>
						Inicio
					</span>
					<span style={{ margin: "0 5px" }}>&gt;</span>
					<span style={{ fontWeight: "bold" }}>Clinica San Felipe</span>
				</div>
				<p style={{ color: "#666" }}>4 carpetas</p>
			</header>
			<SearchBar />
			<div style={{ textAlign: "center", marginBottom: "20px" }}>
				<button
					style={{
						padding: "10px 20px",
						borderRadius: "8px",
						backgroundColor: viewMode === "grid" ? "#007BFF" : "#ccc",
						color: "#fff",
						border: "none",
						cursor: "pointer",
						marginRight: "10px",
					}}
					onClick={() => setViewMode("grid")}
				>
					Vista en cuadrícula
				</button>
				<button
					style={{
						padding: "10px 20px",
						borderRadius: "8px",
						backgroundColor: viewMode === "list" ? "#007BFF" : "#ccc",
						color: "#fff",
						border: "none",
						cursor: "pointer",
					}}
					onClick={() => setViewMode("list")}
				>
					Vista en lista
				</button>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						viewMode === "grid"
							? "repeat(auto-fit, minmax(250px, 1fr))"
							: "1fr",
					gap: "20px",
				}}
			>
				{folders.map((folder, index) => (
					<FolderCard
						key={index}
						title={folder.title}
						description={folder.description}
						onClick={() => navigate("/biblioteca/archivos-inside-index")}
					/>
				))}
			</div>
		</div>
	);
};

export default ArchivosIndex;
