
import { useState } from 'react';
import './Register.css';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  'https://skillbridge-backend-n2rn.onrender.com'
).replace(/\/+$/, '');

const AVAILABLE_SKILLS = [
  'Java',
  'Python',
  'C Programming',
  'SQL',
  'HTML & CSS',
  'JavaScript',
  'React',
  'Spring Boot',
  'Data Structures',
  'Communication',
];

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'Computer Science',
    studyYear: '3',
  });

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };

  const handleSkillChange = (skill) => {
    setSkills((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill]
    );

    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const {
      fullName,
      email,
      password,
      confirmPassword,
      department,
      studyYear,
    } = formData;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (skills.length === 0) {
      setError('Please select at least one skill.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            department,
            studyYear: Number(studyYear),
            skills,
          }),
        }
      );

      const responseText = await response.text();
      let result = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = { message: responseText };
        }
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            (response.status === 409
              ? 'This email is already registered.'
              : `Registration failed (${response.status}).`)
        );
      }

      setSuccess(
        'Registration successful! You can now log in.'
      );

      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: 'Computer Science',
        studyYear: '3',
      });

      setSkills([]);
    } catch (err) {
      console.error('Registration error:', err);

      if (err instanceof TypeError) {
        setError(
          'Cannot connect to the backend. Check the Render service status and CORS settings.'
        );
      } else {
        setError(
          err.message || 'Registration failed. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>🎓 SkillBridge</h1>
          <h2>Create Your Account</h2>
          <p>
            Join SkillBridge and discover internships that match
            your skills.
          </p>
        </div>

        {error && (
          <div
            className="register-message error-message"
            role="alert"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="register-message success-message"
            role="status"
          >
            {success}
            <p>
              <a href="/login">Go to Login</a>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="register-form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Electronics and Communication">
                Electronics and Communication
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">
                Civil Engineering
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="register-form-group">
            <label htmlFor="studyYear">Study Year</label>
            <select
              id="studyYear"
              name="studyYear"
              value={formData.studyYear}
              onChange={handleChange}
              required
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <fieldset className="register-skills">
            <legend>Select Your Skills</legend>
            <p>Choose all the skills you currently have.</p>

            <div className="register-skills-grid">
              {AVAILABLE_SKILLS.map((skill) => (
                <label
                  key={skill}
                  className="register-skill-option"
                >
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>

            <p className="selected-skills-count">
              {skills.length} skill
              {skills.length === 1 ? '' : 's'} selected
            </p>
          </fieldset>

          <button
            className="register-submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="register-login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
