import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

interface HomeRoutesProps { }

export function HomeRoutes(props: HomeRoutesProps): JSX.Element {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    );
}
