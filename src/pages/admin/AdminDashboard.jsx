import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function AdminDashboard() {

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
    {/* admin dashboard */}
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h2">Admin Dashboard</h1>
          <Link to="/admin/movies/new" className="btn btn-success d-flex align-items-center gap-2">
            Add New Movie
          </Link>
        </div>

        {/* inserisco una tabella con tutti i film */ }
        <div className="card shadow-sm border-0">
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
                { movies.map(movie => (
                  <tr key={ movie.id }>
                    <td className="ps-4 text-secondary">#{ movie.id }</td>
                    <td className="fw-bold">{ movie.title }</td>
                    <td>{ movie.director }</td>
                    <td><span className="badge bg-light text-dark border">{ movie.release_year }</span></td>
                    <td>
                      <div className="d-flex justify-content-end gap-2 pe-3">
                        <Link to={ `/movies/${movie.id}` } className="btn btn-outline-info btn-sm">
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link to={ `/admin/movies/${movie.id}/edit` } className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button className="btn btn-outline-danger btn-sm">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}