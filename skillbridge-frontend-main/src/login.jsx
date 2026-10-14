
import { useState } from 'react'
import './login.css'
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://skillbridge-backend-n2rn.onrender.com'

const internships = [
  {
    id: 1,
    title: 'Java Developer Intern',
    company: 'TechNova Solutions',
    location: 'Hyderabad / Remote',
    type: 'Remote / Hybrid',
    skills: ['Java', 'Spring Boot', 'SQL'],
    description: 'Learn backend development and build Java applications.',
    duration: '3 months',
    stipend: 'Sample: ₹8,000/month',
  },
  {
    id: 2,
    title: 'Python Developer Intern',
    company: 'CodeCraft Technologies',
    location: 'Remote',
    type: 'Remote',
    skills: ['Python', 'SQL'],
    description: 'Work on Python programming and data-driven applications.',
    duration: '2–3 months',
    stipend: 'Sample: ₹7,000/month',
  },
  {
    id: 3,
    title: 'Frontend Developer Intern',
    company: 'WebSpark Studio',
    location: 'Hyderabad / Remote',
    type: 'Hybrid',
    skills: ['HTML & CSS', 'JavaScript', 'React'],
    description: 'Create responsive web pages using modern frontend tools.',
    duration: '3 months',
    stipend: 'Sample: ₹6,000/month',
  },
  {
    id: 4,
    title: 'Full Stack Developer Intern',
    company: 'Innovate Labs',
    location: 'Remote',
    type: 'Remote',
    skills: ['Java', 'Spring Boot', 'React', 'SQL'],
    description: 'Explore frontend and backend application development.',
    duration: '3–6 months',
    stipend: 'Sample: ₹10,000/month',
  },
  {
    id: 5,
    title: 'Data and SQL Intern',
    company: 'DataPath Analytics',
    location: 'Hyderabad',
    type: 'On-site',
    skills: ['Python', 'SQL'],
    description: 'Practice database queries and basic data analysis.',
    duration: '2 months',
    stipend: 'Sample: ₹5,000/month',
  },
  {
    id: 6,
    title: 'Programming Trainee',
    company: 'NextStep Learning',
    location: 'Remote',
    type: 'Remote',
    skills: ['C Programming', 'Data Structures', 'Communication'],
    description: 'Strengthen programming fundamentals and problem-solving.',
    duration: '2 months',
    stipend: 'Sample: Not specified',
  },
]

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [student, setStudent] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Login failed. Please check your details.'
        )
      }

      // Fetch the full profile, including saved skills.
      setProfileLoading(true)

      try {
        const profileResponse = await fetch(
          `${API_BASE_URL}/api/students/${data.id}`
        )

        if (!profileResponse.ok) {
          throw new Error('Could not load your student profile.')
        }

        const profile = await profileResponse.json()

        setStudent({
          ...data,
          ...profile,
          skills: profile.skills || [],
        })
      } catch (profileError) {
        // Keep login usable even if the profile request fails.
        setStudent({
          ...data,
          skills: [],
          profileError: profileError.message,
        })
      } finally {
        setProfileLoading(false)
      }

      setPassword('')
      setActiveTab('dashboard')
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          'Cannot connect to the backend. Make sure Spring Boot is running on port 8080.'
        )
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
      setProfileLoading(false)
    }
  }

  function handleLogout() {
    setStudent(null)
    setEmail('')
    setPassword('')
    setError('')
    setActiveTab('dashboard')
  }

  const studentSkills = student?.skills || []

  const normalizedSkills = studentSkills.map((skill) =>
    String(skill).trim().toLowerCase()
  )

  const matchedInternships = internships
    .map((internship) => {
      const matchedSkills = internship.skills.filter((skill) =>
        normalizedSkills.includes(skill.toLowerCase())
      )

      return {
        ...internship,
        matchedSkills,
        matchCount: matchedSkills.length,
      }
    })
    .filter((internship) => internship.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)

  if (student) {
    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <a href="/" className="dashboard-logo">
            Skill<span>Bridge</span>
          </a>

          <div className="header-right">
            <span className="student-greeting">
              Hi, {student.fullName}
            </span>
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="sidebar-profile">
              <div className="profile-avatar">
                {(student.fullName || 'S').charAt(0).toUpperCase()}
              </div>
              <h3>{student.fullName}</h3>
              <p>{student.email}</p>
              <span className="student-badge">Student</span>
            </div>

            <nav className="dashboard-nav">
              <button
                type="button"
                className={activeTab === 'dashboard' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveTab('dashboard')}
              >
                <span>⌂</span> Dashboard
              </button>

              <button
                type="button"
                className={activeTab === 'profile' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveTab('profile')}
              >
                <span>♙</span> My Profile
              </button>

              <button
                type="button"
                className={activeTab === 'skills' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveTab('skills')}
              >
                <span>✦</span> My Skills
              </button>

              <button
                type="button"
                className={activeTab === 'internships' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveTab('internships')}
              >
                <span>▣</span> Explore Internships
              </button>
            </nav>

            <div className="sidebar-note">
              <strong>Your career starts here!</strong>
              <p>Discover opportunities that match your skills.</p>
            </div>
          </aside>

          <main className="dashboard-main">
            {activeTab === 'dashboard' && (
              <>
                <section className="welcome-banner">
                  <div>
                    <p className="eyebrow">STUDENT DASHBOARD</p>
                    <h1>Welcome back, {student.fullName}!</h1>
                    <p>
                      Build your skills, discover internships, and take
                      the next step in your career.
                    </p>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => setActiveTab('internships')}
                    >
                      Find My Internships →
                    </button>
                  </div>
                  <div className="welcome-illustration" aria-hidden="true">
                    🎓
                  </div>
                </section>

                <section className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-icon purple">✦</span>
                    <div>
                      <p>My Skills</p>
                      <h2>{studentSkills.length}</h2>
                    </div>
                  </div>

                  <div className="stat-card">
                    <span className="stat-icon green">✓</span>
                    <div>
                      <p>Matched Internships</p>
                      <h2>{matchedInternships.length}</h2>
                    </div>
                  </div>

                  <div className="stat-card">
                    <span className="stat-icon orange">♙</span>
                    <div>
                      <p>Student ID</p>
                      <h2>#{student.id}</h2>
                    </div>
                  </div>
                </section>

                <section className="content-card">
                  <div className="section-heading">
                    <div>
                      <h2>Recommended for You</h2>
                      <p>Opportunities matched to your saved skills.</p>
                    </div>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setActiveTab('internships')}
                    >
                      View all →
                    </button>
                  </div>

                  {profileLoading ? (
                    <p>Loading your profile...</p>
                  ) : matchedInternships.length === 0 ? (
                    <div className="empty-state">
                      <span>💡</span>
                      <h3>No matches yet</h3>
                      <p>
                        Select skills during registration to receive
                        matching internship recommendations.
                      </p>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => setActiveTab('skills')}
                      >
                        View My Skills
                      </button>
                    </div>
                  ) : (
                    <div className="internship-grid">
                      {matchedInternships.slice(0, 3).map((internship) => (
                        <InternshipCard
                          key={internship.id}
                          internship={internship}
                        />
                      ))}
                    </div>
                  )}

                  {student.profileError && (
                    <p className="notice">
                      {student.profileError} Your login still succeeded.
                    </p>
                  )}
                </section>
              </>
            )}

            {activeTab === 'profile' && (
              <section className="content-card">
                <div className="page-heading">
                  <p className="eyebrow">YOUR ACCOUNT</p>
                  <h1>My Profile</h1>
                  <p>Review your registered student information.</p>
                </div>

                <div className="profile-details">
                  <div className="large-avatar">
                    {(student.fullName || 'S').charAt(0).toUpperCase()}
                  </div>

                  <div className="profile-detail-row">
                    <span>Student ID</span>
                    <strong>{student.id}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Full Name</span>
                    <strong>{student.fullName}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Email Address</span>
                    <strong>{student.email}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Department</span>
                    <strong>{student.department || 'Not provided'}</strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Study Year</span>
                    <strong>
                      {student.studyYear
                        ? `Year ${student.studyYear}`
                        : 'Not provided'}
                    </strong>
                  </div>
                  <div className="profile-detail-row">
                    <span>Registered Skills</span>
                    <strong>{studentSkills.length}</strong>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'skills' && (
              <section className="content-card">
                <div className="page-heading">
                  <p className="eyebrow">YOUR STRENGTHS</p>
                  <h1>My Skills</h1>
                  <p>
                    These skills were loaded from your student profile.
                  </p>
                </div>

                {studentSkills.length > 0 ? (
                  <>
                    <div className="skills-summary">
                      <span className="skills-summary-icon">✦</span>
                      <div>
                        <h3>{studentSkills.length} skills registered</h3>
                        <p>
                          We use these skills to find relevant internships.
                        </p>
                      </div>
                    </div>

                    <div className="skills-list">
                      {studentSkills.map((skill, index) => (
                        <span className="skill-chip" key={`${skill}-${index}`}>
                          <span>✓</span> {skill}
                        </span>
                      ))}
                    </div>

                    <div className="skills-tip">
                      <strong>Tip:</strong> Choose skills that reflect your
                      actual knowledge and practice them regularly.
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <span>✦</span>
                    <h3>No saved skills found</h3>
                    <p>
                      Your account has no skills stored yet. Older accounts
                      may need to register again with selected skills.
                    </p>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'internships' && (
              <section className="content-card">
                <div className="page-heading">
                  <p className="eyebrow">CAREER OPPORTUNITIES</p>
                  <h1>Internship Recommendations</h1>
                  <p>
                    Sample opportunities ranked by the number of skills
                    that match your profile.
                  </p>
                </div>

                <div className="recommendation-info">
                  <span>✦</span>
                  <p>
                    Matching based on <strong>{studentSkills.length}</strong>{' '}
                    saved skill(s). More matching skills appear first.
                  </p>
                </div>

                {matchedInternships.length > 0 ? (
                  <div className="internship-grid all-internships">
                    {matchedInternships.map((internship) => (
                      <InternshipCard
                        key={internship.id}
                        internship={internship}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <span>🔎</span>
                    <h3>No matching internships yet</h3>
                    <p>
                      Register your skills to see sample internships that
                      match your profile.
                    </p>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => setActiveTab('skills')}
                    >
                      Check My Skills
                    </button>
                  </div>
                )}

                <p className="demo-disclaimer">
                  Demo notice: Internship listings, companies, and stipend
                  figures on this page are sample project data. They are
                  not verified live vacancies.
                </p>
              </section>
            )}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <a href="/" className="register-logo">
          Skill<span>Bridge</span>
        </a>

        <div className="login-icon">🎓</div>
        <h1>Welcome Back!</h1>
        <p className="login-subtitle">
          Login to continue your career journey.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to SkillBridge'}
          </button>
        </form>

        <p className="register-footer">
          Don't have an account? <a href="/register">Register</a>
        </p>
        <p className="register-footer">
          <a href="/">← Back to Home</a>
        </p>
      </div>
    </div>
  )
}

function InternshipCard({ internship }) {
  return (
    <article className="internship-card">
      <div className="internship-card-top">
        <div className="company-icon">💼</div>
        <span className="match-badge">
          {internship.matchCount} skill
          {internship.matchCount === 1 ? '' : 's'} matched
        </span>
      </div>

      <h3>{internship.title}</h3>
      <p className="company-name">{internship.company}</p>
      <p className="internship-description">{internship.description}</p>

      <div className="internship-meta">
        <span>📍 {internship.location}</span>
        <span>🕒 {internship.duration}</span>
        <span>💰 {internship.stipend}</span>
      </div>

      <div className="internship-skills">
        {internship.skills.map((skill) => {
          const matched = internship.matchedSkills.includes(skill)

          return (
            <span
              key={skill}
              className={matched ? 'internship-skill matched' : 'internship-skill'}
            >
              {matched ? '✓ ' : ''}{skill}
            </span>
          )
        })}
      </div>
    </article>
  )
}

export default Login

