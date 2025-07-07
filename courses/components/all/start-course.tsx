import React from "react";

const StartCourse: React.FC = () => {
	const [selectedRating, setSelectedRating] = React.useState<number>(0);

	function handleRatingSelection(star: number): void {
		setSelectedRating(star);
	}
	return (
		<div className="start-course-container" style={styles.container}>
			{/* Header Section */}
			<header style={styles.header}>
				<h1 style={styles.mainTitle}>Lección 1</h1>
				<div style={styles.breadcrumbContainer}>
					<span
						style={{ ...styles.breadcrumbItem, cursor: "pointer" }}
						onClick={() => (window.location.href = "/courses/")}
					>
						Cursos
					</span>
					<span style={styles.breadcrumbSeparator}>&gt;</span>
					<span
						style={{ ...styles.breadcrumbItem, cursor: "pointer" }}
						onClick={() => (window.location.href = "/courses/action-all/1")}
					>
						Lecciones
					</span>
					<span style={styles.breadcrumbSeparator}>&gt;</span>
					<span style={styles.breadcrumbItemActive}>Lección 1</span>
				</div>
			</header>

			{/* Video Section */}
			<div style={styles.videoContainer}>
				<div style={styles.videoPlayer}>
					{/* Video Element */}
					<video
						style={styles.videoElement}
						controls
						src="https://www.w3schools.com/html/mov_bbb.mp4"
					>
						Tu navegador no soporta el elemento de video.
					</video>
				</div>
			</div>

			{/* Observations and Rating Section */}
			<div style={styles.feedbackContainer}>
				{/* Observations Box */}
				<div style={styles.observationsBox}>
					<h3 style={styles.feedbackTitle}>Caja de Observaciones</h3>
					<textarea
						style={styles.textArea}
						placeholder="Escribe tus observaciones aquí..."
					></textarea>
					<button
						style={styles.navButton}
						onClick={() => alert("Observación enviada")}
					>
						Enviar Observación
					</button>
				</div>

				{/* Rating Section */}
				<div style={styles.ratingSection}>
					<h3 style={styles.feedbackTitle}>Valorar con Estrellas</h3>
					<div style={styles.starsContainer}>
						{[1, 2, 3, 4, 5].map((star) => (
							<span
								key={star}
								style={{
									...styles.star,
									color: selectedRating >= star ? "#FFD700" : "#ccc",
								}}
								onClick={() => handleRatingSelection(star)}
							>
								&#9733;
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Navigation Buttons */}
			<div style={styles.navigation}>
				<button style={styles.navButton}>Anterior</button>
				<button style={styles.navButton}>Siguiente</button>
			</div>
		</div>
	);
};

const styles = {
	container: {
		backgroundColor: "#f9f9f9",
		padding: "20px",
		fontFamily: "Roboto, Arial, sans-serif",
	},
	header: {
		textAlign: "left" as const,
		marginBottom: "20px",
	},
	mainTitle: {
		fontSize: "2rem",
		fontWeight: "bold" as const,
		color: "#333",
	},
	breadcrumbContainer: {
		display: "flex",
		alignItems: "center",
		margin: "10px 0",
	},
	breadcrumbItem: {
		color: "#666",
		fontSize: "0.9rem",
	},
	breadcrumbItemActive: {
		color: "#007BFF",
		fontWeight: "bold" as const,
		fontSize: "0.9rem",
	},
	breadcrumbSeparator: {
		margin: "0 5px",
		color: "#999",
		fontSize: "0.9rem",
	},
	videoContainer: {
		display: "flex",
		justifyContent: "center",
		marginBottom: "20px",
	},
	videoPlayer: {
		width: "90%",
		maxWidth: "800px",
		backgroundColor: "#000",
		borderRadius: "10px",
		overflow: "hidden",
		position: "relative" as const,
	},
	videoElement: {
		width: "100%",
		height: "450px",
		borderRadius: "10px",
	},
	feedbackContainer: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: "20px",
	},
	observationsBox: {
		width: "48%",
	},
	ratingSection: {
		width: "48%",
		textAlign: "center" as const,
	},
	feedbackTitle: {
		fontSize: "1.2rem",
		fontWeight: "bold" as const,
		marginBottom: "10px",
		color: "#333",
	},
	textArea: {
		width: "100%",
		height: "100px",
		border: "1px solid #ccc",
		borderRadius: "5px",
		padding: "10px",
		fontSize: "1rem",
	},
	starsContainer: {
		display: "flex",
		justifyContent: "center",
	},
	star: {
		fontSize: "2rem",
		color: "#FFD700",
		cursor: "pointer",
		margin: "0 5px",
	},
	navigation: {
		display: "flex",
		justifyContent: "space-between",
	},
	navButton: {
		backgroundColor: "#007BFF",
		color: "#fff",
		border: "none",
		borderRadius: "5px",
		padding: "10px 20px",
		cursor: "pointer",
		transition: "background-color 0.3s",
	},
};

export default StartCourse;
