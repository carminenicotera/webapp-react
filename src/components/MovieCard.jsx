import { Link } from "react-router-dom";

export default function MovieCard({ movie, onShowModal }) {
  const api_url = import.meta.env.VITE_API_URL

  return (
    <div className="col-12 col-md-6 col-lg-4">
      {/* 
          Aggiungiamo una classe personalizzata "movie-card" 
          che useremo nel file CSS per gestire l'hover 
      */}
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden movie-card">

        <div
          className="position-relative image-container"
          style={ { height: '450px', cursor: 'pointer' } }
          onClick={ () => onShowModal(movie) }
        >
          { movie.image && (
            <img
              src={ `${api_url}/img/${movie.image}` }
              className="w-100 h-100 movie-img"
              alt={ movie.title }
              style={ { objectFit: 'cover', objectPosition: 'top' } }
            />
          ) }

          <div className="eye-overlay position-absolute top-50 start-50 translate-middle text-white text-center">
            <i className="bi bi-eye" style={ { fontSize: '3rem' } }></i>
            <p className="fw-bold">Dettagli</p>
          </div>
        </div>

        <div className="card-body d-flex flex-column text-center">
          <h5 className="card-title fw-bold">{ movie.title }</h5>
          <div className="mt-auto">
            <Link to={ `/movies/${movie.id}` } className="btn btn-outline-primary btn-sm w-100 rounded-pill">
              Vedi Recensioni
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
