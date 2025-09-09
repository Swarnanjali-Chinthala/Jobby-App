import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState } from 'react'
import './index.css'

/* inline SVG icons (no extra packages) */
const HomeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" fill="currentColor"/>
  </svg>
)
const JobsIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M9 4h6a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v3H1V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm6 3V6H9v1h6Zm8 5v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6h8v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h8Z" fill="currentColor"/>
  </svg>
)
const LogoutIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M10 3a1 1 0 0 0-1 1v4h2V5h8v14h-8v-3H9v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H10Zm2.293 7.293L10.586 12l1.707 1.707L15 11l-2.707-2.707Z" fill="currentColor"/>
    <path d="M3 11h9v2H3z" fill="currentColor"/>
  </svg>
)

const Header = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)

  const handleLogoutClick = () => setShowPopup(true)
  const confirmLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }
  const cancelLogout = () => setShowPopup(false)

  return (
    <nav className="header">
      <Link to="/" className="brand">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-btn" aria-label="Home" title="Home">
            <HomeIcon className="nav-icon" />
            <span className="nav-label">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-btn" aria-label="Jobs" title="Jobs">
            <JobsIcon className="nav-icon" />
            <span className="nav-label">Jobs</span>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="nav-btn logout-btn"
            onClick={handleLogoutClick}
            aria-label="Logout"
            title="Logout"
          >
            <LogoutIcon className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        </li>
      </ul>

      {showPopup && (
        <div className="logout-popup" role="dialog" aria-modal="true">
          <div className="popup-content">
            <p>Are you sure you want to logout?</p>
            <div className="popup-actions">
              <button type="button" className="yes-btn" onClick={confirmLogout}>Yes</button>
              <button type="button" className="no-btn" onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
