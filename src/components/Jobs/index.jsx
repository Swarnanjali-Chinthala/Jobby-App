import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import LoaderView from '../Loader'
import Header from '../Header'
import FailureView from '../FailureView'
import NoJobsView from '../NoJobsView'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
]

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
  { salaryRangeId: '4000000', label: '40 LPA and above' },
]

const Jobs = () => {
  const [profile, setProfile] = useState({})
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [employmentType, setEmploymentType] = useState([])
  const [salaryRange, setSalaryRange] = useState('')

  const getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = { headers: { Authorization: `Bearer ${jwtToken}` } }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      setProfile(data.profile_details)
    } else {
      setError(true)
    }
  }

  const getJobs = async () => {
    setLoading(true)
    setError(false)
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeQuery = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${search}`
    const options = { headers: { Authorization: `Bearer ${jwtToken}` } }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      setJobs(data.jobs)
    } else {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => { getProfile() }, [])
  useEffect(() => { getJobs() }, [employmentType, salaryRange, search])

  const toggleEmploymentType = id => {
    setEmploymentType(prev =>
      prev.includes(id) ? prev.filter(each => each !== id) : [...prev, id]
    )
  }

  const onSalaryChange = id => setSalaryRange(id)
  const onSearchInput = e => setSearchInput(e.target.value)
  const onSearchClick = () => setSearch(searchInput)
  const onRetry = () => { getProfile(); getJobs() }

  return (
    <>
      <Header />
      <div className="jobs-container">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="profile-section">
            <img src={profile.profile_image_url} alt="profile" className="userProfile" />
            <h2>{profile.name}</h2>
            <p>{profile.short_bio}</p>
          </div>

          <div className="filters-section">
            <h4>Employment Type</h4>
            {employmentTypesList.map(item => (
              <div key={item.employmentTypeId}>
                <input
                  type="checkbox"
                  checked={employmentType.includes(item.employmentTypeId)}
                  onChange={() => toggleEmploymentType(item.employmentTypeId)}
                />
                <label>{item.label}</label>
              </div>
            ))}

            <h4>Salary Range</h4>
            {salaryRangesList.map(item => (
              <div key={item.salaryRangeId}>
                <input
                  type="radio"
                  checked={salaryRange === item.salaryRangeId}
                  onChange={() => onSalaryChange(item.salaryRangeId)}
                  name="salary"
                />
                <label>{item.label}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="jobs-list-section">
          <div className="search-bar">
            <input
              type="search"
              value={searchInput}
              onChange={onSearchInput}
              placeholder="Search Jobs"
            />
            <button type="button" data-testid="searchButton" onClick={onSearchClick}>
              <img src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png" alt="search" />
            </button>
          </div>

          {loading ? (
            <LoaderView />
          ) : error ? (
            <FailureView onRetry={onRetry} />
          ) : jobs.length === 0 ? (
            <NoJobsView />
          ) : (
            <ul className="jobs-list">
              {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

export default Jobs
