import './index.css'

const FailureView = ({ onRetry }) => (
  <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
    />
    <h1>Oops! Something Went Wrong</h1>
    <p>We cannot seem to find the page you are looking for.</p>
    <button type="button" onClick={onRetry}>Retry</button>
  </div>
)

export default FailureView
