import { useEffect, useState } from "react"

export default function HomePage() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL + "/movies"
    fetch(api_url)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Errore fetch:", err))
  }, [])


  return (
    <>
     <h1>Lista Film</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title}
          </li>
        ))}
      </ul>
    </>
  )
}