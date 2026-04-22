import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function MoviePage() {

  const [movie, setMovie] = useState(null)
  const { movieId } = useParams()

  const api_url = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${api_url}/api/movies/${movieId}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error("Errore fetch:", err))
  }, [movieId])

  // Se movie è null, mostra un messaggio di caricamento
  if (!movie) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <>
      <div className="container-fluid bg-light">
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white" >
              <img src={ movie?.image } alt={ movie?.title } />
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5">
              <h2>{ movie?.title }</h2>
              <div className="card-text">Director: { movie?.director }</div>
              <div className="card-text">Release Year: { movie?.release_year }</div>
              <p className="lead">{ movie?.abstract }</p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}