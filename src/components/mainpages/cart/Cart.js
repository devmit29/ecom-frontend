import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import useRazorpay from "react-razorpay"

function Cart() {
    const Razorpay = useRazorpay()
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    

    

    const initPayment = (data) => {
        
		const options = {
			key_id: "rzp_test_RFa5lENXkSlzru",
			amount: data.amount,
			currency: data.currency,
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
					console.log(response)
					const { data } = await axios.post('/api/verify', {response});
                    const paymentID = response.razorpay_payment_id
                    await axios.post('/api/payment',{cart, paymentID}, {
                        headers: {Authorization: token}
                    })
                    setCart([])
                    addToCart([])
                    alert('You can view your order in order in History')
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new Razorpay(options);
        console.log(rzp1)
		rzp1.open();
	};

    const handlePayment = async() => {
        try {
			const { data } = await axios.post('/api/orders', { amount: total },  {
                headers: {Authorization: token}
            });
			console.log(data);
            
			initPayment(data.data);
            
            
		} catch (error) {
			console.log(error);
		}
        
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div className="cart-container">
    <div className='cart'>
        {
            cart.map(product => (
                <div className="cart-item" key={product._id}>
                    <img src={product.images.url} alt={product.title} className="product-image" />

                    <div className="details">
                        <div className='first-row'>
                            <div className="title">{product.title}</div>
                            <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                            </div>

                        <h3 className="price">Rs. {product.price * product.quantity}</h3>
                        <p className="description">{product.description}</p>
                        <p className="content">{product.content}</p>

                        <div className="amount">
                            <button onClick={() => decrement(product._id)} className="btn">-</button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increment(product._id)} className="btn">+</button>
                        </div>

                    </div>
                </div>
            ))
        }

        <div className="total-section">
            <h3>Total: Rs. {total}</h3>
            <button onClick={() => handlePayment()} className="payment-btn">Buy Now</button>
        </div>
    </div>
</div>
    )
}

export default Cart
