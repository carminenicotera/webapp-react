import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../../contexts/GlobalContext"

export default function AdminDashboard() {

  const [movies, setMovies] = useState([])
  const { setIsLoading } = useGlobalContext()

  const api_url = import.meta.env.VITE_API_URL + "/api/movies"

  const fetchMovies = () => {
    setIsLoading(true)
    fetch(api_url)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Errore fetch:", err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  // funzione per eliminare un film
  const deleteMovie = (id) => {
    if (!confirm("Sei sicuro di voler eliminare definitivamente questo film?")) return

    setIsLoading(true)
    fetch(`${api_url}/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.ok) {
          // rimuovo il film dallo stato senza rifare la fetch
          setMovies(movies.filter(movie => movie.id !== id))
        } else {
          alert("Errore durante l'eliminazione.")
        }
      })
      .catch(err => console.error("Errore delete:", err))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {/* admin dashboard */ }
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Admin Dashboard</h1>
          <Link to="/admin/movies/new" className="btn btn-success d-flex align-items-center gap-2">
            <i className="bi bi-plus-lg"></i> Add New Movie
          </Link>
        </div>

        {/* inserisco una tabella con tutti i film */ }
        <div className="card admin-card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Year</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* popolo la tabella con i dati dei film */ }
                { movies.length > 0 ? (
                  movies.map(movie => (
                    <tr key={ movie.id }>
                      <td className="ps-4 text-secondary">#{ movie.id }</td>
                      <td className="fw-bold">{ movie.title }</td>
                      <td>{ movie.director }</td>
                      <td><span className="badge bg-light text-dark border">{ movie.release_year }</span></td>
                      <td>
                        <div className="d-flex justify-content-end gap-2 pe-3">
                          <Link to={ `/movies/${movie.id}` } className="btn btn-outline-info btn-sm" title="View details">
                            <i className="bi bi-eye"></i>
                          </Link>
                          {/* Rotta edit (da implementare in futuro) */ }
                          <Link to={ `/admin/movies/${movie.id}/edit` } className="btn btn-outline-primary btn-sm" title="Edit movie">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            onClick={ () => deleteMovie(movie.id) }
                            className="btn btn-outline-danger btn-sm"
                            title="Delete movie"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Nessun film trovato nel database.
                    </td>
                  </tr>
                ) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
