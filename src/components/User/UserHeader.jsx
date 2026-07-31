import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

function UserHeader(){
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await AuthService.logoutUser();
            navigate('/login');
        } catch(error) {
            console.error(error);
        }
    };
    return(
        <>
  {/* Navbar & Hero Start */}
  <div className="container-fluid header-top">
    <div className="nav-shaps-2" />
    <div className="container d-flex align-items-center">
      <div className="d-flex align-items-center h-100">
        <a href="#" className="navbar-brand" style={{ height: 125 }}>
          <h1 className="text-primary mb-0">
            <i className="fas fa-hand-rock me-2" /> Fitness
          </h1>
          {/* <img src="img/logo.png" alt="Logo"> */}
        </a>
      </div>
      <div className="w-100 h-100">
        <div
          className="topbar px-0 py-2 d-none d-lg-block"
          style={{ height: 45 }}
        >
          <div className="row gx-0 align-items-center">
            <div className="col-lg-8 text-center text-lg-center mb-lg-0">
              <div className="d-flex flex-wrap">
                <div className="pe-4">
                  <a
                    href="mailto:example@gmail.com"
                    className="text-muted small"
                  >
                    <i className="fas fa-envelope text-primary me-2" />
                    example@gmail.com
                  </a>
                </div>
                <div className="pe-0">
                  <a
                    href="mailto:example@gmail.com"
                    className="text-muted small"
                  >
                    <i className="fa fa-clock text-primary me-2" />
                    Mon - Sat: 8.00 am-7.00 pm
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <div className="d-flex justify-content-end">
                <div className="d-flex align-items-center small">
                  {!user ? (
                    <>
                      <Link to="/login" className="login-btn text-body me-3 pe-3">
                        <span>Login</span>
                      </Link>
                      <Link to="/register" className="text-body me-3">
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="text-body me-3 pe-3 border-end">
                        Dashboard
                      </Link>
                      <Link to="#" onClick={handleLogout} className="login-btn text-body me-3">
                        <span>Logout</span>
                      </Link>
                    </>
                  )}
                </div>
                <div className="d-flex pe-3">
                  <a className="btn p-0 text-primary me-3" href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn p-0 text-primary me-3" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn p-0 text-primary me-3" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                  <a className="btn p-0 text-primary me-0" href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bar px-0 py-lg-0" style={{ height: 80 }}>
          <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-lg-end">
            <a href="#" className="navbar-brand-2">
              <h1 className="text-primary mb-0">
                <i className="fas fa-hand-rock me-2" /> Fitness
              </h1>
              {/* <img src="img/logo.png" alt="Logo"> */}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-0 mx-lg-auto">
                {!user ? (
                  <>
                    <Link to="/" className="nav-item nav-link active">Home</Link>
                    <Link to="/about" className="nav-item nav-link">About</Link>
                    <Link to="/course" className="nav-item nav-link">Courses</Link>
                    <a href="blog.html" className="nav-item nav-link">Blogs</a>
                    <div className="nav-item dropdown">
                      <a href="#" className="nav-link" data-bs-toggle="dropdown">
                        <span className="dropdown-toggle">Pages</span>
                      </a>
                      <div className="dropdown-menu">
                        <a href="feature.html" className="dropdown-item">Our Features</a>
                        <a href="team.html" className="dropdown-item">Our team</a>
                        <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                        <a href="404.html" className="dropdown-item">404 Page</a>
                      </div>
                    </div>
                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="nav-item nav-link active">Dashboard</Link>
                    <Link to="/browse-memberships" className="nav-item nav-link">Memberships</Link>
                    <Link to="/membership-details" className="nav-item nav-link">My Plan</Link>
                    <Link to="/view-workouts" className="nav-item nav-link">Workouts</Link>
                    <Link to="/view-diet-plans" className="nav-item nav-link">Diet Plans</Link>
                    <Link to="/track-progress" className="nav-item nav-link">Progress</Link>
                    <Link to="/manage-profile" className="nav-item nav-link">Profile</Link>
                  </>
                )}
                
                {/* Mobile Auth Links */}
                {!user ? (
                    <div className="d-lg-none mt-2">
                        <Link to="/login" className="nav-item nav-link text-primary">Login</Link>
                        <Link to="/register" className="nav-item nav-link text-primary">Register</Link>
                    </div>
                ) : (
                    <div className="d-lg-none mt-2">
                        <Link to="#" onClick={handleLogout} className="nav-item nav-link text-danger">Logout</Link>
                    </div>
                )}
                <div className="nav-btn ps-3">
                  <button
                    className="btn-search btn btn-primary btn-md-square mt-2 mt-lg-0 mb-4 mb-lg-0 flex-shrink-0"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <i className="fas fa-search" />
                  </button>
                  <a
                    href="#"
                    className="btn btn-primary py-2 px-4 ms-0 ms-lg-3"
                  >
                    {" "}
                    <span>Get Quote</span>
                  </a>
                </div>
                <div className="nav-shaps-1" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  {/* Navbar & Hero End */}
</>
    )
}
export default UserHeader