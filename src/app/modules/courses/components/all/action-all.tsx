import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./action-all.scss";

interface Course {
	id: number;
	title: string;
	cover: string;
	progress: number;
	startDate: string;
	duration: string;
	status: "in-progress" | "new";
	instructor?: string;
	description?: string;
	lessons?: Lesson[];
}

interface Lesson {
	id: number;
	title: string;
	status: "completed" | "in-progress" | "not-started";
	duration: string;
}

// Mock data for multiple courses
const mockCourses: { [key: number]: Course } = {
	1: {
		id: 1,
		title: "React for Beginners",
		cover:
			"https://cdn.pixabay.com/photo/2016/12/28/09/36/web-1935737_1280.png",
		progress: 50,
		startDate: "2023-10-01",
		duration: "14 Horas",
		status: "in-progress",
		instructor: "John Doe",
		description:
			"Learn the basics of React and build interactive web applications. This course covers components, state management, and routing.",
		lessons: [
			{
				id: 1,
				title: "Introduction to React",
				status: "completed",
				duration: "2h",
			},
			{
				id: 2,
				title: "State Management",
				status: "in-progress",
				duration: "3h",
			},
			{
				id: 3,
				title: "Routing in React",
				status: "not-started",
				duration: "2h",
			},
			{ id: 4, title: "Hooks in React", status: "not-started", duration: "2h" },
			{ id: 5, title: "Final Project", status: "not-started", duration: "5h" },
		],
	},
	2: {
		id: 2,
		title: "Advanced JavaScript Concepts",
		cover:
			"https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png",
		progress: 30,
		startDate: "2023-09-15",
		duration: "6 weeks",
		status: "in-progress",
		instructor: "Jane Smith",
		description: "Deep dive into JavaScript advanced features and patterns.",
		lessons: [
			{
				id: 1,
				title: "Closures and Scopes",
				status: "completed",
				duration: "2h",
			},
			{ id: 2, title: "Prototypes", status: "completed", duration: "2h" },
			{
				id: 3,
				title: "Asynchronous JS",
				status: "in-progress",
				duration: "3h",
			},
			{
				id: 4,
				title: "Design Patterns",
				status: "not-started",
				duration: "4h",
			},
			{
				id: 5,
				title: "Final Assessment",
				status: "not-started",
				duration: "2h",
			},
		],
	},
	3: {
		id: 3,
		title: "Node.js Fundamentals",
		cover:
			"https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_1280.png",
		progress: 0,
		startDate: "2023-11-01",
		duration: "5 weeks",
		status: "new",
		instructor: "Michael Johnson",
		description: "Build server-side applications with Node.js.",
		lessons: [
			{
				id: 1,
				title: "Introduction to Node.js",
				status: "not-started",
				duration: "1h",
			},
			{
				id: 2,
				title: "HTTP and Express",
				status: "not-started",
				duration: "3h",
			},
			{
				id: 3,
				title: "Databases with MongoDB",
				status: "not-started",
				duration: "4h",
			},
			{ id: 4, title: "RESTful APIs", status: "not-started", duration: "3h" },
			{
				id: 5,
				title: "Capstone Project",
				status: "not-started",
				duration: "6h",
			},
		],
	},
};

const BitacoraTable: React.FC = () => {
	const rows = [
		{ id: 1, date: "01 enero 1980", action: "Área", element: "Consulta" },
		{ id: 2, date: "01 enero 1980", action: "Área", element: "Registro" },
		{ id: 3, date: "01 enero 1980", action: "Área", element: "Consulta" },
		{ id: 4, date: "01 enero 1980", action: "Área", element: "Registro" },
		{ id: 5, date: "01 enero 1980", action: "Área", element: "Consulta" },
	];

	return (
		<div className="bitacora-container">
			<table className="bitacora-table" role="table" aria-label="Bitácora">
				<thead>
					<tr>
						<th>#</th>
						<th>Fecha</th>
						<th>Acción</th>
						<th>Elemento</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.id}>
							<td>{row.id}</td>
							<td>{row.date}</td>
							<td>{row.action}</td>
							<td>{row.element}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const CourseContent: React.FC<{ course: Course }> = ({ course }) => {
	const [activeLesson, setActiveLesson] = useState<number | null>(null);

	return (
		<section className="course-content-section">
			<div className="lessons-list">
				{course.lessons?.map((lesson) => (
					<div
						key={lesson.id}
						className={`lesson-item ${
							activeLesson === lesson.id ? "active" : ""
						}`}
						onClick={() => setActiveLesson(lesson.id)}
					>
						<div className="lesson-info">
							<h3 className="lesson-title">{lesson.title}</h3>
							<span className="lesson-duration">{lesson.duration}</span>
						</div>
						<div className="lesson-rating">
							<span className="star-rating">★ ★ ★ ★ ☆</span>
						</div>
						<div className="lesson-status">
							{lesson.status === "completed" && (
								<span className="status completed">Completado</span>
							)}
							{lesson.status === "in-progress" && (
								<span className="status in-progress">En progreso</span>
							)}
							{lesson.status === "not-started" && (
								<button
									className="start-lesson-btn"
									onClick={() => {
										if (lesson.id === 5) {
											window.location.href = `/courses/exam/${course.id}`;
										} else {
											window.location.href = `/courses/start-course/${course.id}`;
										}
									}}
								>
									{lesson.id === 5 ? "Iniciar Evaluación" : "Iniciar"}
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

const ActionAll: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const courseId = parseInt(id || "1", 10);
	const course = mockCourses[courseId];

	if (!course) {
		return <div className="course-not-found">Curso no encontrado</div>;
	}

	return (
		<div className="course-detail-container">
			<div className="course-content">
				<header className="course-header">
					<div
						className="course-image-container"
						style={{ float: "right", width: "300px", marginLeft: "20px" }}
					>
						<img
							src="https://cdn.pixabay.com/photo/2018/09/18/11/19/artificial-intelligence-3685928_1280.png"
							alt="Ilustración decorativa"
							className="decorative-image"
							style={{ width: "100%", height: "auto" }}
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src =
									"https://cdn.pixabay.com/photo/2018/09/18/11/19/artificial-intelligence-3685928_1280.png";
							}}
						/>
					</div>
					<h1 className="course-title">{course.title}</h1>
					<h2 className="course-instructor">{course.instructor}</h2>
					<p className="course-description">{course.description}</p>

					<div className="course-meta">
						<div className="meta-item">
							<i className="icon-calendar"></i>
							<span>Inicio: {course.startDate}</span>
						</div>
						<div className="meta-item">
							<i className="icon-clock"></i>
							<span>Duración: {course.duration}</span>
						</div>
					</div>

					<button
						className="start-course-btn"
						onClick={() => {
							window.location.href = `/courses/start-course/${course.id}`;
						}}
					>
						Iniciar Curso
					</button>
				</header>

				{/* Tabs navigation */}
				<ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x fs-5">
					<li className="nav-item">
						<a
							className="nav-link active btn-active-light-secondary"
							data-bs-toggle="tab"
							href="#kt_tab_pane_content"
						>
							Contenido del Curso
						</a>
					</li>

					<li className="nav-item">
						<a
							className="nav-link"
							data-bs-toggle="tab"
							href="#kt_tab_pane_bitacora"
						>
							Bitácora
						</a>
					</li>
				</ul>

				{/* Tabs content */}
				<div className="tab-content" id="myTabContent">
					<div
						className="tab-pane fade active show"
						id="kt_tab_pane_content"
						role="tabpanel"
					>
						<CourseContent course={course} />
					</div>
					<div
						className="tab-pane fade"
						id="kt_tab_pane_bitacora"
						role="tabpanel"
					>
						<BitacoraTable />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActionAll;
