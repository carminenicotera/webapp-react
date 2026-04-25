import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { useGlobalContext } from "../contexts/GlobalContext"
import AppLoader from "../components/AppLoader"
import { Link } from "react-router-dom"

export default function HomePage() {

  // Memorizza la lista dei film e il film selezionato per la modale 
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Accediamo alla funzione setIsLoading dal contesto globale per poter aggiornare lo stato di caricamento durante le fetch
  const { setIsLoading } = useGlobalContext()

  useEffect(() => {
    setIsLoading(true) // Inizio caricamento
    const api_url = import.meta.env.VITE_API_URL + "/api/movies"
    fetch(api_url)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Errore fetch:", err))
      .finally(() => {
        setIsLoading(false) // Fine caricamento
      })
  }, [])

  return (
    <>
      {/* Banner */ }
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Movie Reviews</h1>
          <p className="col-md-8 fs-4">Esplora la nostra collezione curata di recensioni cinematografiche.
            Dai grandi classici alle ultime uscite, condividiamo la passione per il grande schermo.</p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            { movies.map(movie => (
              /* PROPS: Passiamo la funzione setSelectedMovie alla card per "catturare" il click */
              <MovieCard key={ movie.id } movie={ movie } onShowModal={ setSelectedMovie } />
            )) }
          </div>
        </div>
      </section>

      {/* MODALE: Compare solo se selectedMovie non è null */ }
      { selectedMovie && (
        <div className="modal fade show d-block" tabIndex="-1" style={ { backgroundColor: 'rgba(0,0,0,0.8)' } }>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">{ selectedMovie.title }</h5>
                {/* CLICK: Resettlo stato a null per chiudere la modale */ }
                <button type="button" className="btn-close btn-close-white" onClick={ () => setSelectedMovie(null) }></button>
              </div>
              <div className="modal-body p-4">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      src={ `${import.meta.env.VITE_API_URL}/img/${selectedMovie.image}` }
                      className="img-fluid rounded shadow"
                      alt={ selectedMovie.title }
                    />
                  </div>
                  <div className="col-md-7">
                    <h4 className="fw-bold text-primary">Dettagli Film</h4>
                    <p><strong>Regista:</strong> { selectedMovie.director }</p>
                    <p><strong>Anno:</strong> { selectedMovie.release_year }</p>
                    <hr />
                    <p className="text-muted">{ selectedMovie.abstract }</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary" onClick={ () => setSelectedMovie(null) }>Chiudi</button>
                {/* NAVIGAZIONE: Porta alla pagina singola del film */ }
                <Link
                  to={ `/movies/${selectedMovie.id}` }
                  className="btn btn-primary shadow-sm"
                  onClick={ () => setSelectedMovie(null) }
                >
                  Visita Film Completo
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) }
    </>
  )
}
