import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import LoaderView from '../Loader'
import Header from '../Header'
import FailureView from '../FailureView'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const JobItemDetails = () => {
  const { id } = useParams()
  const [jobDetails, setJobDetails] = useState({})
  const [similarJobs, setSimilarJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getJobDetails = async () => {
    setLoading(true)
    setError(false)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      setJobDetails(data.job_details)
      setSimilarJobs(data.similar_jobs)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getJobDetails()
  }, [])

  const onRetry = () => getJobDetails()

  return (
    <>
      <Header />
      <div className="job-details-container">
        {loading ? (
          <LoaderView />
        ) : error ? (
          <FailureView onRetry={onRetry} />
        ) : (
          <>
            <div className="job-details-card">
              <img
                src={jobDetails.company_logo_url}
                alt="job details company logo"
              />
              <h2>{jobDetails.title}</h2>
              <p>{jobDetails.rating} ⭐</p>
              <p>{jobDetails.location}</p>
              <p>{jobDetails.employment_type}</p>
              <p>{jobDetails.package_per_annum}</p>
              <h3>Description</h3>
              <p>{jobDetails.job_description}</p>
              <a href={jobDetails.company_website_url} target="_blank" rel="noreferrer">
                <button type="button">Visit</button>
              </a>
              <h3>Skills</h3>
              <ul>
                {jobDetails.skills?.map(skill => (
                  <li key={skill.name}>
                    <img src={skill.image_url} alt={skill.name} />
                    <p>{skill.name}</p>
                  </li>
                ))}
              </ul>
              <h3>Life at Company</h3>
              <p>{jobDetails.life_at_company?.description}</p>
              <img
                src={jobDetails.life_at_company?.image_url}
                alt="life at company"
              />
            </div>
            <h3>Similar Jobs</h3>
            <ul style={{ paddingInlineStart: 0,display: 'flex', gap: '16px', flexWrap: 'wrap' }} >
              {similarJobs.map(job => (
                <SimilarJobCard key={job.id} job={job} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default JobItemDetails
