import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";

export function ISO9001Routes(): JSX.Element {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
        </Routes>
    );
}
