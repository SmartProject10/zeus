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
		title: "React for Beginners",
		cover:
			"https://cdn.pixabay.com/photo/2016/12/28/09/36/web-1935737_1280.png",
		progress: 50,
		startDate: "2023-10-01",
		duration: "4 weeks",
		status: "in-progress",
	},
	{
		id: 2,
		title: "Advanced TypeScript",
		cover:
			"https://cdn.pixabay.com/photo/2017/07/10/23/45/cubes-2492010_1280.jpg",
		progress: 20,
		startDate: "2023-09-15",
		duration: "6 weeks",
		status: "in-progress",
	},
	{
		id: 3,
		title: "Introduction to AI",
		cover:
			"https://cdn.pixabay.com/photo/2018/09/18/11/19/artificial-intelligence-3685928_1280.png",
		progress: 0,
		startDate: "2023-11-01",
		duration: "8 weeks",
		status: "new",
	},
	{
		id: 4,
		title: "Web Development Bootcamp",
		cover:
			"https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
		progress: 0,
		startDate: "2023-12-01",
		duration: "12 weeks",
		status: "new",
	},
	{
		id: 5,
		title: "Data Science with Python",
		cover:
			"https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
		progress: 0,
		startDate: "2023-12-15",
		duration: "10 weeks",
		status: "new",
	},
	{
		id: 6,
		title: "Machine Learning Basics",
		cover:
			"https://cdn.pixabay.com/photo/2018/09/18/11/19/artificial-intelligence-3685928_1280.png",
		progress: 0,
		startDate: "2024-01-01",
		duration: "8 weeks",
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
					<p>{progress}% completed</p>
				</>
			)}
			<p>Inicio: {startDate}</p>
			<p>Duración: {duration}</p>
		</div>
	);
};

const CoursesIndex: React.FC = () => {
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
				<h2>Cursos en progreso</h2>
				<div className="courses-grid">
					{inProgressCourses.map((course) => (
						<CourseCard key={course.id} {...course} />
					))}
				</div>
			</section>
			<section className="courses-section">
				<h2>Cursos normativos de cumplimiento</h2>
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

export default CoursesIndex;
