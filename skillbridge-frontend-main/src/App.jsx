import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Register from './Register.jsx'
import Login from './login.jsx'
import './App.css'

function Home() {
  return (
    <main style={styles.page}>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          SkillBridge
        </Link>
        <div style={styles.navLinks}>
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
          <Link to="/register" style={styles.navButton}>
            Get Started
          </Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.tag}>STUDENT CAREER PLATFORM</div>

        <h1 style={styles.heading}>
          Build Your Skills.
          <br />
          Discover Your <span style={styles.highlight}>Future.</span>
        </h1>

        <p style={styles.description}>
          SkillBridge helps students discover internships that match their
          skills, explore career opportunities, and prepare for their
          professional journey.
        </p>

        <div style={styles.actions}>
          <Link to="/register" style={styles.primaryButton}>
            Create Student Account →
          </Link>
          <Link to="/login" style={styles.secondaryButton}>
            Student Login
          </Link>
        </div>

        <div style={styles.features}>
          <article style={styles.card}>
            <div style={styles.icon}>🎯</div>
            <h3>Skill-Based Matching</h3>
            <p>
              Find opportunities that match the skills you already have.
            </p>
          </article>

          <article style={styles.card}>
            <div style={styles.icon}>💼</div>
            <h3>Internship Discovery</h3>
            <p>
              Explore internship opportunities and their required skills.
            </p>
          </article>

          <article style={styles.card}>
            <div style={styles.icon}>🚀</div>
            <h3>Career Growth</h3>
            <p>
              Identify skills to improve and take your next career step.
            </p>
          </article>
        </div>
      </section>

      <footer style={styles.footer}>
        © 2026 SkillBridge | Student Skill and Internship Recommendation
        System
      </footer>
    </main>
  )
}

function NotFound() {
  return (
    <main style={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={styles.primaryButton}>
        Return Home
      </Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f7ff',
    color: '#172033',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 8%',
    background: '#ffffff',
    borderBottom: '1px solid #e6e9f2',
    flexWrap: 'wrap',
    gap: '16px',
  },
  logo: {
    color: '#4f46e5',
    fontSize: '26px',
    fontWeight: '800',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '22px',
  },
  navLink: {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '600',
  },
  navButton: {
    background: '#4f46e5',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '700',
  },
  hero: {
    maxWidth: '1050px',
    margin: '0 auto',
    padding: '65px 24px 45px',
    textAlign: 'center',
  },
  tag: {
    display: 'inline-block',
    background: '#e5e7ff',
    color: '#4338ca',
    borderRadius: '30px',
    padding: '9px 16px',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '1px',
  },
  heading: {
    fontSize: 'clamp(38px, 6vw, 64px)',
    lineHeight: '1.12',
    margin: '25px 0 20px',
    letterSpacing: '-2px',
  },
  highlight: {
    color: '#4f46e5',
  },
  description: {
    maxWidth: '680px',
    margin: '0 auto',
    color: '#596579',
    fontSize: '18px',
    lineHeight: '1.8',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    flexWrap: 'wrap',
    marginTop: '32px',
  },
  primaryButton: {
    display: 'inline-block',
    background: '#4f46e5',
    color: '#ffffff',
    padding: '15px 23px',
    borderRadius: '9px',
    textDecoration: 'none',
    fontWeight: '700',
  },
  secondaryButton: {
    display: 'inline-block',
    background: '#ffffff',
    color: '#3730a3',
    padding: '15px 23px',
    borderRadius: '9px',
    border: '1px solid #c7d2fe',
    textDecoration: 'none',
    fontWeight: '700',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '22px',
    marginTop: '65px',
    textAlign: 'left',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '27px',
    boxShadow: '0 8px 25px rgba(30, 41, 59, 0.05)',
  },
  icon: {
    fontSize: '32px',
    marginBottom: '16px',
  },
  footer: {
    textAlign: 'center',
    padding: '25px 16px',
    color: '#6b7280',
    fontSize: '13px',
  },
  notFound: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '80px 20px',
  },
}

export default App