import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <DefaultLayout /> }>

            <Route index element={ <HomePage /> } />
            <Route path="/movies/:movieId" element={ <MoviePage /> } />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
