import { Link } from "react-router-dom";
import { useState } from "react";

export default function MovieCard({ movie, onShowModal }) {
  
  const api_url = import.meta.env.VITE_API_URL
  // STATO LOCALE: Gestisce la visibilità dell'occhio quando il mouse entra/esce
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

        {/* CONTENITORE IMMAGINE: Gestisce l'hover e il click per la modale */ }
        <div
          className="position-relative"
          style={ { height: '450px', cursor: 'pointer' } }
          onMouseEnter={ () => setIsHovered(true) } // Mouse sopra: mostra occhio
          onMouseLeave={ () => setIsHovered(false) } // Mouse fuori: nascondi occhio
          onClick={ () => onShowModal(movie) } // Al click invia i dati del film alla HomePage
        >
          { movie.image && (
            <img
              src={ `${api_url}/img/${movie.image}` }
              className="w-100 h-100"
              alt={ movie.title }
              /* TRANSITION: Rende lo scurimento dell'immagine fluido */
              style={ {
                objectFit: 'cover',
                objectPosition: 'top',
                filter: isHovered ? 'brightness(0.5)' : 'none',
                transition: '0.3s'
              } }
            />
          ) }

          {/* OVERLAY OCCHIO: Appare solo se isHovered è true */ }
          <div className={ `position-absolute top-50 start-50 translate-middle text-white transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}` } style={ { transition: '0.3s' } }>
            <span style={ { fontSize: '4rem' } }>👁️</span>
          </div>
        </div>

        <div className="card-body d-flex flex-column text-center">
          <h5 className="card-title fw-bold text-dark">{ movie.title }</h5>
          <div className="mt-auto">
            <Link to={ `/movies/${movie.id}` } className="btn btn-outline-primary btn-sm w-100 rounded-pill">
              Dettagli Completi
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
