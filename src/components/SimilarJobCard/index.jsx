import './index.css'

const SimilarJobCard = ({ job }) => (
  <li className="similar-job-card">
    <img src={job.company_logo_url} alt="similar job company logo" />
    <h3>{job.title}</h3>
    <p>{job.rating} ⭐</p>
    <p>{job.location}</p>
    <p>{job.employment_type}</p>
    <p>{job.job_description}</p>
  </li>
)

export default SimilarJobCard
