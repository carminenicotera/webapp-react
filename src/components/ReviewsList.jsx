import ReviewItem from "../components/ReviewItem"

export default function ReviewsList({ reviews }) {

  return (
    <section className="container pb-5">
      <h3 className="mb-4">Recensioni</h3>

      <div className="row g-3">
        { reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={ review.id } review={ review } />
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">Non ci sono ancora recensioni per questo film. Sii il primo a scriverne una!</p>
          </div>
        ) }
      </div>
    </section>
  )
}