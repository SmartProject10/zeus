import React from "react";

const Exam: React.FC = () => {
	const [showModal, setShowModal] = React.useState(false);

	const handleFinish = () => {
		alert("Examen finalizado. ¡Gracias por participar!");
	};

	const questions = [
		{
			id: 1,
			text: "El impacto emocional afecta:",
			options: [
				{ id: "1", text: "Create new users", defaultChecked: true },
				{ id: "2", text: "Update existing users", defaultChecked: false },
				{
					id: "3",
					text: "Send email notification on password change",
					defaultChecked: true,
				},
				{
					id: "4",
					text: "Include external IDs in import results",
					defaultChecked: false,
				},
			],
		},
		{
			id: 2,
			text: "El impacto emocional afecta:",
			options: [
				{ id: "1", text: "Create new users", defaultChecked: false },
				{ id: "2", text: "Update existing users", defaultChecked: true },
				{
					id: "3",
					text: "Send email notification on password change",
					defaultChecked: false,
				},
				{
					id: "4",
					text: "Include external IDs in import results",
					defaultChecked: true,
				},
			],
		},
		{
			id: 3,
			text: "El impacto emocional afecta:",
			options: [
				{ id: "1", text: "Create new users", defaultChecked: true },
				{ id: "2", text: "Update existing users", defaultChecked: false },
				{
					id: "3",
					text: "Send email notification on password change",
					defaultChecked: true,
				},
				{
					id: "4",
					text: "Include external IDs in import results",
					defaultChecked: false,
				},
			],
		},
	];

	return (
		<div
			style={{
				fontFamily: "Roboto, Arial, sans-serif",
				backgroundColor: "#fff",
				color: "#333",
				padding: "20px",
			}}
		>
			<header style={{ textAlign: "center", marginBottom: "20px" }}>
				<h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
					Prevención de Hostigamiento Sexual Laboral - Covid-19 lección 1
				</h1>
				<p style={{ fontSize: "16px", color: "#555" }}>
					Cada pregunta vale 4 puntos.
				</p>
			</header>

			<main>
				{questions.map((question) => (
					<div
						key={question.id}
						style={{
							marginBottom: "20px",
							borderBottom: "1px solid #ccc",
							paddingBottom: "10px",
						}}
					>
						<h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
							Pregunta {question.id}
						</h2>
						<p>{question.text}</p>
						<div>
							{question.options.map((option) => (
								<div key={option.id} style={{ marginBottom: "10px" }}>
									<label>
										<input
											type="checkbox"
											defaultChecked={option.defaultChecked}
											style={{ marginRight: "10px" }}
										/>
										{option.text}
									</label>
								</div>
							))}
						</div>
					</div>
				))}
			</main>

			<footer style={{ textAlign: "center", marginTop: "20px" }}>
				<button
					onClick={() => setShowModal(true)}
					style={{
						backgroundColor: "#007BFF",
						color: "#fff",
						padding: "10px 20px",
						border: "none",
						borderRadius: "5px",
						fontSize: "16px",
						cursor: "pointer",
					}}
					onMouseOver={(e) =>
						(e.currentTarget.style.backgroundColor = "#0056b3")
					}
					onMouseOut={(e) =>
						(e.currentTarget.style.backgroundColor = "#007BFF")
					}
				>
					Finalizar
				</button>

				{showModal && (
					<div
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "#fff",
							padding: "20px",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
							borderRadius: "10px",
							zIndex: 1000,
							textAlign: "center",
						}}
					>
						<p style={{ fontSize: "16px", marginBottom: "20px" }}>
							¿Estás seguro que deseas enviar tu evaluación? Esta acción es
							irreversible.
						</p>
						<div
							style={{ display: "flex", justifyContent: "center", gap: "10px" }}
						>
							<button
								onClick={() => {
									setShowModal(false);
									handleFinish();
								}}
								style={{
									backgroundColor: "#007BFF",
									color: "#fff",
									padding: "10px 20px",
									border: "none",
									borderRadius: "5px",
									fontSize: "14px",
									cursor: "pointer",
								}}
								onMouseOver={(e) =>
									(e.currentTarget.style.backgroundColor = "#0056b3")
								}
								onMouseOut={(e) =>
									(e.currentTarget.style.backgroundColor = "#007BFF")
								}
							>
								Enviar
							</button>
							<button
								onClick={() => setShowModal(false)}
								style={{
									backgroundColor: "#ccc",
									color: "#333",
									padding: "10px 20px",
									border: "none",
									borderRadius: "5px",
									fontSize: "14px",
									cursor: "pointer",
								}}
								onMouseOver={(e) =>
									(e.currentTarget.style.backgroundColor = "#bbb")
								}
								onMouseOut={(e) =>
									(e.currentTarget.style.backgroundColor = "#ccc")
								}
							>
								Cancelar
							</button>
						</div>
					</div>
				)}
			</footer>
		</div>
	);
};

export default Exam;
