import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react';

const Premium = () => {
  const [premiumUser, setPremiumUser] = React.useState(false)

  useEffect(() => {
    verifyPremiumUser()
  }, []);

  const verifyPremiumUser = async() => {
    try {  
      const res = await axios.get(`${BASE_URL}/payment/verifyPremiumUser`, {}, {
        withCredentials: true,
      });
      console.log(res.data)
      setPremiumUser(res.data.isPremium)
    } catch (error) {
      console.error("Error verifying premium user:", error);
    } 
  }

  const handleBuyPremium = async(type) => {
    try {
      const order = await axios.post(`${BASE_URL}/payment/createOrder/`, {
        memberShipType: type
      } ,{
        withCredentials: true,
      });

      console.log(order.data);

      const { keyId, amount, currency, orderId, notes } = order.data

      if(order.status == 200) {
          const options = {
          key: keyId,
          amount,
          currency,
          name: 'DevTinder',
          description: '',
          order_id: orderId,
          prefill: {
            name: notes.name,
            email: notes.email,
            memberShipType: notes.memberShip,
          },
          theme: {
            color: '#F37254'
          },
          handler: verifyPremiumUser
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }

    } catch (error) {
      console.error("Error buying premium membership:", error);
    }
  }

  if(premiumUser) {
    return (
      <div className="flex justify-center items-center my-10">
        <h1 className="text-2xl font-bold text-gray-500">Premium User</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-20 p-15 justify-center items-center my-10">
      <div className="card w-[320px] h-[380px] bg-gradient-to-br from-[#5c4400] to-[#b08d00] shadow-xl border border-yellow-700 rounded-2xl hover:scale-105 transition-transform duration-300">
        <div className="card-body text-gray-200">
          <h1 className="card-title text-3xl font-bold text-yellow-400">Gold Membership</h1>
          <p className="text-gray-400 text-2xl">Exclusive benefits for premium users. Early access, VIP support, and more!</p>
          <ul className='text-1xl'>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full transition-all duration-300" onClick={() => handleBuyPremium("gold")}>Join Gold</button>
          </div>
        </div>
      </div>

      <div className="card w-[320px] h-[380px] bg-gradient-to-br from-[#4f4f4f] to-[#9c9c9c] shadow-xl border border-gray-500 rounded-2xl hover:scale-105 transition-transform duration-300">
        <div className="card-body text-gray-200">
          <h1 className="card-title text-3xl font-bold text-gray-300">Silver Membership</h1>
          <p className="text-gray-400 text-2xl">Priority support and member-only offers. Perfect for active users!</p>
          <ul className='text-1xl'>  
            <li> - Chat with other people</li>
            <li> - Inifinite connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-lg bg-gray-400 hover:bg-gray-300 text-black font-semibold rounded-full transition-all duration-300" onClick={() => handleBuyPremium("silver")}>Join Silver</button>
          </div>
        </div>
      </div>

    </div>

  )
}

export default Premium