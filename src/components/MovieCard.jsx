import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {

  const api_url = import.meta.env.VITE_API_URL

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
        <div style={ { height: '450px', overflow: 'hidden', backgroundColor: '#f8f9fa' } }>
          { movie.image && (
            <img
              src={ `${api_url}/img/${movie.image}` }
              className="w-100 h-100"
              alt={ movie.title }
              style={ { objectFit: 'cover', objectPosition: 'top' } }
            />
          ) }
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{ movie.title }</h5>
          <div className="card-text text-secondary mb-1">Director: { movie.director }</div>
          <div className="card-text text-secondary mb-3">Release Year: { movie.release_year }</div>

          <div className="mt-auto">
            <Link to={ `/movies/${movie.id}` } className="btn btn-outline-primary btn-sm w-100">
              Read Review
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}