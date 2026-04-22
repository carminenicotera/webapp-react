import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReviewForm from "../components/ReviewForm"

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
      {/* Banner */ }
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

      {/* Recensioni degli utenti */ }
      <section className="container pb-5">
        <h3 className="mb-4">Recensioni</h3>

        <div className="row g-3">
          { movie.reviews?.length > 0 ? (
            movie.reviews.map((review) => (
              <div className="col-12" key={ review.id }>
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0"><strong>{ review.name }</strong></h5>
                      <span className="badge bg-warning text-dark">
                        Voto: { review.vote }/5
                      </span>
                    </div>
                    <p className="card-text italic">"{ review.text }"</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-muted">Non ci sono ancora recensioni per questo film. Sii il primo a scriverne una!</p>
            </div>
          ) }
        </div>
      </section>

      <hr />

      {/* Form per aggiungere una recensione */ }
      <ReviewForm />
    </>
  )
}