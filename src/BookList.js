// src/BookList.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import BookCard from './BookCard'
import PurchasedBookList from './PurchasedBookList'

const BookList = ({ user, setUser, showPurchasedList }) => {
	const [books, setBooks] = useState([])
	const [offset, setOffset] = useState(0)
	const [loading, setLoading] = useState(false)
	const [purchasing, setPurchasing] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [selectedBook, setSelectedBook] = useState(null)
	const [purchasedBooks, setPurchasedBooks] = useState([]) // New state for purchased books

	const fetchBooks = () => {
		if (!hasMore) return

		setLoading(true)
		axios
			.get(`http://localhost:3000/api/books?limit=10&offset=${offset}`)
			.then(response => {
				const newBooks = response.data
				console.log(response.data)
				if (newBooks.length === 0) {
					setHasMore(false)
				} else {
					setBooks(prevBooks => [...prevBooks, ...newBooks])
					setOffset(prevOffset => prevOffset + 10)
				}

				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching books:', error)
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchBooks()
	}, [hasMore])

	const handleScroll = () => {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
		const windowHeight = document.documentElement.clientHeight || window.innerHeight
		const scrolled = (scrollTop / (scrollHeight - windowHeight)) * 100

		if (scrolled > 80) {
			setHasMore(true)
		}
	}

	const handleRemove = index => {
		const updatedPurchasedBooks = [...purchasedBooks]
		updatedPurchasedBooks.splice(index, 1)
		setPurchasedBooks(updatedPurchasedBooks)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div>
			{!showPurchasedList && (
				<>
					<Header />
					<div className='book-list'>
						{books.map(book => (
							<BookCard key={book.id} book={book} setUser={setUser} purchasing={purchasing} user={user} />
						))}
					</div>
					{loading && <p>Loading...</p>}
					{!hasMore && <p>No more books to load.</p>}
				</>
			)}

			{showPurchasedList && <PurchasedBookList purchasedBooks={purchasedBooks} onRemove={handleRemove} />}
		</div>
	)
}

export default BookList
