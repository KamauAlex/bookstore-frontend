import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = ({ onLogin }) => {
	const [username, setUsername] = useState('')

	const handleLogin = async () => {
		// For simplicity, let's assume the login is successful
		const user = {
			id: Math.floor(Math.random() * 100000).toString(),
			username,
			points: 100,
		}
		user.name = user.username
		await axios.post(`http://localhost:3000/api/customers`, user)

		// Save user information to local storage
		localStorage.setItem('user', JSON.stringify(user))

		// Trigger the onLogin callback with the user data
		onLogin(user)
	}

	return (
		<div>
			<h2>Login</h2>
			<label>
				Username:
				<input type='text' value={username} onChange={e => setUsername(e.target.value)} />
			</label>
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default LoginForm
