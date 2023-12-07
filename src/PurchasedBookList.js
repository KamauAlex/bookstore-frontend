// src/PurchasedBookList.js

import React, { useEffect, useState } from 'react'
import PurchasedBookCard from './PurchasedBookCard'
import axios from 'axios'

const PurchasedBookList = ({ purchasedBooks, onRemove }) => {
	const [orders, setOrders] = useState([])

	const user = JSON.parse(localStorage.getItem('user'))

	useEffect(() => {
		try {
			handleGetOrders()
		} catch (e) {
			alert('Error getting orders')
		}
	}, [])

	async function handleGetOrders() {
		const res = await axios.get(`http://localhost:3000/api/orders/${user.id}`)
		setOrders(res.data)
	}
	console.log(orders)
	return (
		<div>
			<h3>Purchased Books</h3>
			{orders.map((order, index) => (
				<PurchasedBookCard key={index} handleGetOrders={handleGetOrders} order={order} onRemove={() => onRemove(index)} />
			))}
		</div>
	)
}

export default PurchasedBookList
