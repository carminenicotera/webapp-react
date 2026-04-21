import { useParams } from "react-router-dom"

export default function MoviePage() {

  const { movieId } = useParams()

  return (
    <h1>Movie Page: { movieId } </h1>
  )
}