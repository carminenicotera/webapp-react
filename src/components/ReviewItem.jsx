export default function ReviewItem({ review }) {

  return (
    <div className="col-12" >
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0"><strong>{ review.name }</strong></h5>

                      <div className="rating-display">
                        { [1, 2, 3, 4, 5].map((starIndex) => (
                          <span
                            key={ starIndex }
                            style={ {
                              color: starIndex <= review.vote ? "#21d07a" : "#445566",
                              fontSize: "1.2rem",
                              marginRight: "2px"
                            } }
                          > ★ </span>
                        )) }
                      </div>
                    </div>
                    <p className="card-text italic">"{ review.text }"</p>
                  </div>
                </div>
              </div>
  )
}