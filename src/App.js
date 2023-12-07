import React, { useState } from 'react'
import BookList from './BookList'
import LoginForm from './LoginForm'
import './styles.css'
import axios from 'axios'

function App() {
	const [user, setUser] = useState(getUserFromLocalStorage())
	const [showPurchasedList, setShowPurchasedList] = useState(false)

	const handleLogin = loggedInUser => {
		setUser(loggedInUser)
	}

	// Set the base URL for Axios to point to the backend on port 3000
	axios.defaults.baseURL = 'http://localhost:3000'

	return (
		<div className='App'>
			{!user ? (
				<LoginForm onLogin={handleLogin} />
			) : (
				<div>
					<h2>Welcome, {user.username}!</h2>
					<p>Points: {user.points}</p>
					<div className='purchased-cart' onClick={() => setShowPurchasedList(true)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							class='bi bi-bag-check-fill'
							viewBox='0 0 16 16'
						>
							<path
								fill-rule='evenodd'
								d='M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z'
							/>
						</svg>
						<p>Purchased Items:</p>
					</div>
					<BookList user={user} setUser={setUser} showPurchasedList={showPurchasedList} />
				</div>
			)}
		</div>
	)
}

// Function to get user from local storage
function getUserFromLocalStorage() {
	const userString = localStorage.getItem('user')
	return userString ? JSON.parse(userString) : null
}

export default App
