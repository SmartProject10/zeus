import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./courses-index.scss";

interface Course {
	id: number;
	title: string;
	cover: string;
	progress: number;
	startDate: string;
	duration: string;
	status: "in-progress" | "new";
}

const courses: Course[] = [
	{
		id: 1,
		title: "Liderazgo Efectivo",
		cover:
			"https://images.unsplash.com/photo-1580894726043-34c8533f6f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		progress: 80,
		startDate: "2023-10-10",
		duration: "4 semanas",
		status: "in-progress",
	},
	{
		id: 2,
		title: "Gestión de Proyectos",
		cover:
			"https://images.unsplash.com/photo-1542744166-e35939358c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
		progress: 50,
		startDate: "2023-09-20",
		duration: "6 semanas",
		status: "in-progress",
	},
	{
		id: 3,
		title: "Comunicación Asertiva",
		cover:
			"https://images.unsplash.com/photo-1507842214779-87a4e9056b2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1290&q=80",
		progress: 0,
		startDate: "2023-11-05",
		duration: "3 semanas",
		status: "new",
	},
	{
		id: 4,
		title: "Inteligencia Emocional",
		cover:
			"https://images.unsplash.com/photo-1589792747195-7169ea5189e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		progress: 0,
		startDate: "2023-12-10",
		duration: "5 semanas",
		status: "new",
	},
	{
		id: 5,
		title: "Toma de Decisiones",
		cover:
			"https://images.unsplash.com/photo-1517245386804-bb43f63fb166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
		progress: 0,
		startDate: "2023-12-20",
		duration: "4 semanas",
		status: "new",
	},
	{
		id: 6,
		title: "Trabajo en Equipo",
		cover:
			"https://images.unsplash.com/photo-1556761175-b413da4ca6d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
		progress: 0,
		startDate: "2024-01-15",
		duration: "6 semanas",
		status: "new",
	},
];

const CourseCard: React.FC<Course> = ({
	id,
	title,
	cover,
	progress,
	startDate,
	duration,
	status,
}) => {
	const navigate = useNavigate();

	return (
		<div
			className="course-card"
			onClick={() => navigate(`/courses/action-all/${id}`)}
			style={{ cursor: "pointer" }}
		>
			<div className="course-detail-container">
				<img src={cover} alt={`Cover for ${title}`} className="course-cover" />
			</div>
			<h3>{title}</h3>
			{status === "in-progress" && (
				<>
					<div className="progress-bar">
						<div className="progress" style={{ width: `${progress}%` }}></div>
					</div>
					<p>{progress}% completado</p>
				</>
			)}
			<p>Inicio: {startDate}</p>
			<p>Duración: {duration}</p>
		</div>
	);
};

const LearningIndex: React.FC = () => {
	const [search, setSearch] = useState("");
	const [visibleCourses, setVisibleCourses] = useState(2);

	const filteredCourses = courses.filter((course) =>
		course.title.toLowerCase().includes(search.toLowerCase())
	);

	const inProgressCourses = filteredCourses.filter(
		(course) => course.status === "in-progress"
	);
	const newCourses = filteredCourses.filter(
		(course) => course.status === "new"
	);

	return (
		<div className="courses-container">
			<header className="search-bar">
				<input
					type="text"
					placeholder="Buscar cursos..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					aria-label="Search courses"
				/>
			</header>
			<section className="courses-section">
				<h2>Programa aprendizaje corporativo</h2>
				<div className="courses-grid">
					{inProgressCourses.map((course) => (
						<CourseCard key={course.id} {...course} />
					))}
				</div>
			</section>
			<section className="courses-section">
				<div className="courses-grid">
					{newCourses.slice(0, visibleCourses).map((course) => (
						<CourseCard key={course.id} {...course} />
					))}
				</div>
				{visibleCourses < newCourses.length && (
					<button
						onClick={() => setVisibleCourses(visibleCourses + 2)}
						className="view-more-btn"
					>
						Ver más
					</button>
				)}
			</section>
		</div>
	);
};

export default LearningIndex;
