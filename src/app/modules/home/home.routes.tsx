import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'

export function HomeRoutes(): JSX.Element {
    return (
        <Routes>
            <Route
                index
                element={<Home />} />
        </Routes>
    )
}
