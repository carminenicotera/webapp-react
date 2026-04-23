import { Outlet, Link } from "react-router-dom"

export default function AdminLayout() {

  return (
    <>
      {/* Layout per la pagina di admin */}
      <div className="wrapper d-flex flex-column flex-md-row vh-100">

        {/* Sidebar */}
        <div className="sidebar bg-dark text-white p-3 d-flex flex-column"
          style={{ minWidth: "250px" }}>
          <h4 className="text-center py-2 border-bottom mb-3 d-none d-md-block">Admin Panel</h4>
          <ul className="nav nav-pills flex-row flex-md-column mb-auto justify-content-around justify-content-md-start">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/users">Users </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/movies"> Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/reviews">Settings</Link>
            </li>
          </ul>

          {/* Aggiunto tasto Home in fondo alla sidebar */}
          <div className="mt-auto border-top pt-3 text-center">
            <Link className="nav-link text-secondary" to="/">
              <i className="bi bi-house-door me-2"></i> Torna alla Home
            </Link>
          </div>
        </div>

        {/* Area Contenuto */}
        <div className="content flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}
