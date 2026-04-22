export default function ReviewForm(){

  return(
    <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 p-4">
              <h3 className="mb-4 text-center">Aggiungi la tua recensione</h3>

              <form>
                {/* Campo Nome */ }
                <div className="mb-3">
                  <label className="form-label fw-bold">Nome Utente</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci il tuo nome"
                  />
                </div>

                {/* Campo Voto */ }
                <div className="mb-3">
                  <label className="form-label fw-bold">Voto (1-5)</label>
                  <select className="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                {/* Campo Recensione */ }
                <div className="mb-3">
                  <label className="form-label fw-bold">La tua recensione</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Scrivi qui il tuo commento..."
                  ></textarea>
                </div>

                {/* Bottone Invio */ }
                <button type="submit" className="btn btn-primary px-4">
                  Invia
                </button>
              </form>

            </div>
          </div>
        </div>
      </section>
  )
}