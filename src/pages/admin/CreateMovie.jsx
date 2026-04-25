import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Per riportare l'utente alla lista dopo il salvataggio

export default function CreateMovie() {
  // Stato iniziale per tutti i campi del film
  const initialFormData = {
    title: "",
    director: "",
    genre: "",
    release_year: new Date().getFullYear(),
    abstract: "",
    image: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  // Gestore unico per tutti gli input
  function handleInputChange(e) {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      // Se l'input è di tipo number, converte il valore in numero
      [name]: type === "number" ? parseInt(value) : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const api_url = import.meta.env.VITE_API_URL

    fetch(`${api_url}/api/movies`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Film creato:", data);
        // Dopo la creazione, torna alla dashboard dell'admin
        navigate("/admin");
      })
      .catch(err => console.error("Errore:", err));
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Add New Movie</h1>
        <button className="btn btn-outline-secondary" onClick={ () => navigate("/admin") }>
          Back to List
        </button>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <form onSubmit={ handleSubmit }>
          <div className="row">
            {/* Titolo e Regista (Obbligatori) */ }
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Title *</label>
              <input type="text" name="title" className="form-control" value={ formData.title } onChange={ handleInputChange } required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Director *</label>
              <input type="text" name="director" className="form-control" value={ formData.director } onChange={ handleInputChange } required />
            </div>

            {/* Genere e Anno */ }
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Genre</label>
              <input type="text" name="genre" className="form-control" value={ formData.genre } onChange={ handleInputChange } />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Release Year</label>
              <input type="number" name="release_year" className="form-control" value={ formData.release_year } onChange={ handleInputChange } min="1900" max="2100" />
            </div>

            {/* Immagine */ }
            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Image File Name</label>
              <input type="text" name="image" className="form-control" placeholder="es: inception.jpg" value={ formData.image } onChange={ handleInputChange } />
            </div>

            {/* Abstract */ }
            <div className="col-12 mb-4">
              <label className="form-label fw-bold">Abstract / Plot</label>
              <textarea name="abstract" className="form-control" rows="5" value={ formData.abstract } onChange={ handleInputChange }></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg shadow-sm">
            Save Movie
          </button>
        </form>
      </div>
    </div>
  );
}
