import { Outlet } from "react-router-dom"

export default function AdminLayout() {

  return (
    <>
      {/* Layout per la pagina di admin */ }
      <div className="wrapper d-flex flex-column flex-md-row vh-100">

        {/* Sidebar */ }
        <div className="sidebar bg-dark text-white p-3 d-flex flex-column"
          style={ { minWidth: "250px" } }>
          <h4 className="text-center py-2 border-bottom mb-3 d-none d-md-block">Admin Panel</h4>
          <ul className="nav nav-pills flex-row flex-md-column mb-auto justify-content-around justify-content-md-start">
            <li className="nav-item">
              <a className="nav-link text-white" href="/admin/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/admin/users">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/admin/movies">Movies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/admin/reviews">Settings</a>
            </li>
          </ul>
        </div>

        {/* Area Contenuto */ }
        <div className="content flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}