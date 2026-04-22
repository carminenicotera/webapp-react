import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function MoviePage() {

  const [movie, setMovie] = useState(null)
  const { movieId } = useParams()

  const api_url = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${api_url}/movies/${movieId}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error("Errore fetch:", err))
  }, [movieId])

  // Se movie è null, mostra un messaggio di caricamento
  if (!movie) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <div>
      <h1>{ movie.title }</h1>
      <img src={ movie.image } alt={ movie.title } />
      <p>Regista: { movie.director }</p>
      <p>Anno: { movie.release_year }</p>
      <p>Genere: { movie.genre }</p>
      <p>Trama: { movie.abstract }</p>

      <hr />

      <h3>Recensioni</h3>
      { movie.reviews?.map(review => (
        <div key={ review.id }>
          <p>Utente: { review.name }</p>
          <p>Voto: { review.vote }</p>
          <p>Testo: { review.text }</p>
          <br />
        </div>
      )) }
    </div>
  )
}