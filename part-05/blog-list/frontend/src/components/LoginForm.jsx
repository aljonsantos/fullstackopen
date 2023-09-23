import { useState } from 'react'

const LoginForm = ({ handleLoginUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleLoginUser(formData)
    setFormData({
      username: '',
      password: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleFormChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
        />
      </div>
      <button type="submit" id="login-btn">login</button>
    </form>
  )
}

export default LoginForm