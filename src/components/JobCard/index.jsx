import { Link } from 'react-router-dom'
import './index.css'

const JobCard = ({ job }) => (
  <li className="job-card">
    <Link to={`/jobs/${job.id}`} className="job-link">
      <div className="job-card-header">
        <img src={job.company_logo_url} alt="company logo" />
        <div>
          <h2>{job.title}</h2>
          <p>{job.rating} ⭐</p>
        </div>
      </div>
      <div className="job-card-body">
        <p>{job.location}</p>
        <p>{job.employment_type}</p>
        <p>Package: {job.package_per_annum}</p>
      </div>
      <p>{job.job_description}</p>
    </Link>
  </li>
)

export default JobCard
