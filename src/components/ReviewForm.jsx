import { useState } from "react"

export default function ReviewForm({ movieId, refreshData }) {

  const initialFormData = {
    "name": "",
    "vote": 5,
    "text": ""
  }

  const [formData, setFormData] = useState(initialFormData)
  const [submissionStatus, setSubmissionStatus] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Dati inviati:", formData)

    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000"

    fetch(`${api_url}/api/movies/${movieId}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Recensione aggiunta:", data)
        if (data.message) {
          setSubmissionStatus('success')
          // Aggiorna i dati del film per mostrare la nuova recensione
          refreshData()
          // Svuota il form dopo l'invio
          setFormData(initialFormData)
          // Nasconde il messaggio di successo dopo 3 secondi
          setTimeout(() => setSubmissionStatus(null), 3000);
        }
        if (data.error) {
          setSubmissionStatus('error')
        }

      })
      .catch(err => {
        console.error("Errore durante l'invio della recensione:", err)
        setSubmissionStatus('error')
      })
  }

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="mb-4 text-center">Aggiungi la tua recensione</h3>

            { submissionStatus === 'success' && <div className="alert alert-success">Recensione inviata con successo!</div> }
            { submissionStatus === 'error' && <div className="alert alert-danger">Si è verificato un errore durante l'invio della recensione. Riprova</div> }
            <form onSubmit={ handleSubmit }>

              {/* Campo Nome */ }
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Inserisci il tuo nome"
                  value={ formData.name }
                  onChange={ (e) => setFormData({ ...formData, name: e.target.value }) }
                  required
                />
              </div>

              {/* Campo Voto */ }
              <div className="mb-3">
                <label htmlFor="vote" className="form-label fw-bold">Voto (1-5)</label>
                <select className="form-select" value={ formData.vote } onChange={ (e) => setFormData({ ...formData, vote: parseInt(e.target.value) }) } required >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              {/* Campo Recensione */ }
              <div className="mb-3">
                <label htmlFor="text" className="form-label fw-bold">La tua recensione</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Scrivi qui il tuo commento..."
                  value={ formData.text }
                  onChange={ (e) => setFormData({ ...formData, text: e.target.value }) }
                  required
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