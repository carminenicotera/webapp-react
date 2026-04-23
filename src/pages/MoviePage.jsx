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

                      <div className="rating-display">
                        { [1, 2, 3, 4, 5].map((starIndex) => (
                          <span
                            key={ starIndex }
                            style={ {
                              color: starIndex <= review.vote ? "#21d07a" : "#445566",
                              fontSize: "1.2rem",
                              marginRight: "2px"
                            } }
                          > ★ </span>
                        )) }
                      </div>
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