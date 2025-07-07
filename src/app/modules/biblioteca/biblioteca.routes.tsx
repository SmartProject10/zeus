import { Route, Routes } from "react-router-dom";
import BibliotecaIndex from "./components/biblioteca-index";
import ArchivosIndex from "./components/archivos-index";
import ArchivosInsideIndex from "./components/archivos-inside-index";

export const BibliotecaRoutes = () => (
	<Routes>
		<Route path="/biblioteca-index/" element={<BibliotecaIndex />} />
		<Route index element={<BibliotecaIndex />} />
		<Route path="/archivos-index/" element={<ArchivosIndex />} />
		<Route path="/archivos-index/:id" element={<ArchivosIndex />} />
		<Route path="/archivos-inside-index/" element={<ArchivosInsideIndex />} />
	</Routes>
);
