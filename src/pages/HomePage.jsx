import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

export default function HomePage() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL + "/api/movies"
    fetch(api_url)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Errore fetch:", err))
  }, [])


  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Movie Reviews</h1>
          <p className="col-md-8 fs-4">
            Esplora la nostra collezione curata di recensioni cinematografiche.
            Dai grandi classici alle ultime uscite, condividiamo la passione per il grande schermo.
          </p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4"> 
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}