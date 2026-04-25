import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReviewForm from "../components/ReviewForm"
import ReviewsList from "../components/ReviewsList"
import { useGlobalContext } from "../contexts/GlobalContext"

export default function MoviePage() {

  const [movie, setMovie] = useState(null)
  const { movieId } = useParams()
  const { setIsLoading } = useGlobalContext()

  const api_url = import.meta.env.VITE_API_URL

  function fetchMovieData() {
    setIsLoading(true)
    fetch(`${api_url}/api/movies/${movieId}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error("Errore fetch:", err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchMovieData()
  }, [movieId])

  // Se movie è null e non ci sono ancora i dati evito il crash
  if (!movie) {
    return null
  }


  return (
    <>
      {/* Banner */ }
      <div className="container-fluid bg-light">
        <div className="row align-items-center bg-white g-0">
          <div className="col-md-5 d-flex justify-content-center p-4">
            { movie.image && (
              <img
                src={ `${api_url}/img/${movie.image}` }
                className="img-fluid rounded-3 shadow-lg"
                alt={ movie.title }
                style={ { maxHeight: '500px', width: 'auto', display: 'block' } }
              />
            ) }
          </div>
          <div className="col-md-7 p-5">
            <h2 className="display-5 fw-bold">{ movie?.title }</h2>
            <div className="badge bg-primary mb-3">Director: { movie?.director }</div>
            <div className="text-muted mb-4">Release Year: { movie?.release_year }</div>
            <p className="lead border-start ps-4 italic">{ movie?.abstract }</p>
          </div>
        </div>
      </div>

      {/* Recensioni degli utenti */ }
      <ReviewsList reviews={ movie?.reviews } />

      <hr />

      {/* Form per aggiungere una recensione */ }
      <ReviewForm movieId={ movieId } refreshData={ fetchMovieData } />
    </>
  )
}