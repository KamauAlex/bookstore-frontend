// src/BookCard.js

import axios from 'axios'
import React, { useState } from 'react'

const BookCard = ({ book, user, setUser }) => {
	const [purchasing, setPurchasing] = useState(false)

	const handlePurchase = async book => {
		if (user.points >= book.price) {
			setPurchasing(true)
			const updatedUser = { ...user, points: user.points - book.price }
			const order = book
			order.customer_id = user.id
			order.title = book.title
			order.thumbnail = book.cover_image_url
			localStorage.setItem('user', JSON.stringify(updatedUser))

			console.log(order.customer_id)
			console.log(user.id)

			try {
				await axios.post(`http://localhost:3000/api/orders`, order)
				setUser(updatedUser) // Update the user state to trigger re-render
				// Add the purchased book to the list
				setPurchasing(false)
				alert(`Book purchased: ${book.title}`)
			} catch (err) {
				console.error(err)
				alert('Failed to purchase book')
				setPurchasing(false)
			}
		} else {
			alert('Insufficient points')
		}
	}

	return (
		<div className='book-card'>
			<img src={book.cover_image_url} alt={book.title} />
			<div className='book-details'>
				<h3>{book.title}</h3>
				<p>By {book.writer}</p>
				<p>Price: ${book.price}</p>
				<p>Tags: {book.tags.join(', ')}</p>
				<button disabled={purchasing} onClick={() => handlePurchase(book)}>
					{purchasing ? 'please wait...' : 'Purchase'}
				</button>
			</div>
		</div>
	)
}

export default BookCard
