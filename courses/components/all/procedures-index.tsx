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
		title: "Corporate Leadership Training",
		cover:
			"https://cdn.pixabay.com/photo/2016/11/29/03/53/office-1869510_1280.jpg",
		progress: 75,
		startDate: "2023-10-01",
		duration: "6 weeks",
		status: "in-progress",
	},
	{
		id: 2,
		title: "Advanced Financial Analysis",
		cover:
			"https://cdn.pixabay.com/photo/2017/08/10/03/47/analysis-2618277_1280.jpg",
		progress: 40,
		startDate: "2023-09-15",
		duration: "8 weeks",
		status: "in-progress",
	},
	{
		id: 3,
		title: "Introduction to Business Strategy",
		cover:
			"https://cdn.pixabay.com/photo/2017/08/06/07/00/people-2590999_1280.jpg",
		progress: 0,
		startDate: "2023-11-01",
		duration: "5 weeks",
		status: "new",
	},
	{
		id: 4,
		title: "Project Management Essentials",
		cover:
			"https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
		progress: 0,
		startDate: "2023-12-01",
		duration: "10 weeks",
		status: "new",
	},
	{
		id: 5,
		title: "Effective Communication in Teams",
		cover:
			"https://cdn.pixabay.com/photo/2016/11/29/05/08/adult-1868750_1280.jpg",
		progress: 0,
		startDate: "2023-12-15",
		duration: "4 weeks",
		status: "new",
	},
	{
		id: 6,
		title: "Data-Driven Decision Making",
		cover:
			"https://cdn.pixabay.com/photo/2017/08/10/03/47/analysis-2618277_1280.jpg",
		progress: 0,
		startDate: "2024-01-01",
		duration: "6 weeks",
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

const ProceduresIndex: React.FC = () => {
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
				<h2>Procedimientos institucionales</h2>
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

export default ProceduresIndex;
