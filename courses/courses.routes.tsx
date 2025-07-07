import { Route, Routes } from "react-router-dom";
import CoursesIndex from "./components/all/courses-index";
import NormativeIndex from "./components/all/normative-index";
import LearningIndex from "./components/all/learning-index";
import ProceduresIndex from "./components/all/procedures-index";
import ActionAll from "./components/all/action-all";
import StartCourse from "./components/all/start-course";
import Exam from "./components/all/exam";

export const CoursesRoutes = () => (
	<Routes>
		<Route path="/courses-index/" element={<CoursesIndex />} />
		<Route path="/normative-index/" element={<NormativeIndex />} />
		<Route path="/learning-index/" element={<LearningIndex />} />
		<Route path="/procedures-index/" element={<ProceduresIndex />} />
		<Route path="/action-all/:id" element={<ActionAll />} />
		<Route index element={<CoursesIndex />} />
		<Route path="/start-course/:id" element={<StartCourse />} />
		<Route path="/exam/:id" element={<Exam />} />
	</Routes>
);
