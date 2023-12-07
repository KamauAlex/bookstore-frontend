// src/PurchasedBookListCard.js

import React, { useState } from 'react'
import axios from 'axios'

const PurchasedBookCard = ({ order, handleGetOrders }) => {
	const [deleting, setDeleting] = useState(false)

	async function handleCancelOrder() {
		setDeleting(true)
		try {
			await axios.delete(`http://localhost:3000/api/orders/${order.id}`)
			alert(`Order ID ${order.id} has been cancelled`)
			setDeleting(false)
			handleGetOrders()
		} catch (err) {
			console.error(err)
			alert(`Could not delete order.`)
		}
	}
	return (
		<div className='purchased-book-card'>
			<img src={order.thumbnail} alt={order.title} />
			<p>{order.title}</p>
			<button onClick={handleCancelOrder} disabled={deleting}>
				{deleting ? 'Please wait' : 'Cancel Order'}
			</button>
		</div>
	)
}

export default PurchasedBookCard
