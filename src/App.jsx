import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"

import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CreateMovie from "./pages/admin/CreateMovie"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={ <DefaultLayout /> }>
            <Route index element={ <HomePage /> } />
            <Route path="/movies/:movieId" element={ <MoviePage /> } />
          </Route>

          <Route element={ <AdminLayout /> }>
            <Route path="/admin" element={ <AdminDashboard /> } />
            <Route path="/admin/movies/new" element={ <CreateMovie /> } />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
