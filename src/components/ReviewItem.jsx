export default function ReviewItem({ review }) {
  return (
    <div className="col-12 mb-3">
      {/* 
          1. Cambiamo la classe "card" con "review-item" 
          2. Rimuoviamo shadow-sm e bg-white (gestiti dal CSS)
      */}
      <div className="review-item">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {/* 3. Usiamo la classe "review-name" per il colore verde */}
          <h5 className="review-name mb-0">{ review.name }</h5>

          <div className="rating-display">
            { [1, 2, 3, 4, 5].map((starIndex) => (
              <span
                key={ starIndex }
                style={ {
                  // Verde Letterboxd per le stelle piene, grigio-blu per quelle vuote
                  color: starIndex <= review.vote ? "#00e054" : "#445566",
                  fontSize: "1.2rem",
                  marginRight: "2px"
                } }
              > ★ </span>
            )) }
          </div>
        </div>
        
        {/* 4. Usiamo "review-text" per il font e il colore del commento */}
        <p className="review-text italic">"{ review.text }"</p>
      </div>
    </div>
  );
}
