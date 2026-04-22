import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {


  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm border-0">
        { movie.image && <img src={ movie.image } className="card-img-top" alt={ movie.title } /> }
        <div className="card-body">
          <h5 className="card-title fw-bold">{ movie.title }</h5>
          <div className="card-text">Director: { movie.director }</div>
          <div className="card-text">Release Year: { movie.release_year }</div>
          {/* <p className="card-text">Rating: {movie.rating}/5</p> */ }
          <Link to={`/movies/${movie.id}`} className="btn btn-outline-primary btn-sm"> Read Review </Link>
        </div>
      </div>
    </div>
  )
}