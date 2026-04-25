export default function AppFooter() {
  return (
    <footer>
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-6">
            <h5 className="text-uppercase">Movie Reviews</h5>
            <p className="small">La tua piattaforma preferita per scoprire e recensire i grandi classici e le ultime novità del cinema.</p>
          </div>
          <div className="col-md-3 offset-md-3">
            <h5>Social</h5>
            <div className="d-flex gap-3 fs-4">
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter-x"></i>
              <i className="bi bi-facebook"></i>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>&copy; {new Date().getFullYear()} Movie Reviews - Made with ❤️ for Cinema</p>
        </div>
      </div>
    </footer>
  );
}
