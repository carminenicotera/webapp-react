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
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <h3 className="mb-4 text-center">Aggiungi la tua recensione</h3>

              <form>
                {/* Campo Nome */ }
                <div className="mb-3">
                  <label className="form-label fw-bold">Nome Utente</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci il tuo nome"
                  />
                </div>

                {/* Campo Voto */ }
                <div className="mb-3">
                  <label className="form-label fw-bold">Voto (1-5)</label>
                  <select className="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                {/* Campo Recensione */ }
                <div className="mb-3">
                  <label className="form-label fw-bold">La tua recensione</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Scrivi qui il tuo commento..."
                  ></textarea>
                </div>

                {/* Bottone Invio */ }
                <button type="submit" className="btn btn-primary px-4">
                  Invia
                </button>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}