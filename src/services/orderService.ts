// src/services/orderService.ts - VERCEL + RENDER LIVE VERSION
import axios from 'axios';

// Backend Render URL
const API_URL = 'https://harvestbites-backend-ht9i.onrender.com/api/orders/create_order/';

export const saveOrderToDatabase = async (orderData: any) => {
  try {
    console.log('🔥 Saving to Neon PG:', orderData.orderNumber);
    
    const response = await axios.post(
      API_URL,  // ← Render Backend URL
      {
        order_number: orderData.orderNumber,
        transaction_id: orderData.transactionId,
        order_date: new Date().toISOString(),
        total_amount: orderData.total,
        items_count: orderData.items,
        payment_method: orderData.paymentMethod,
        customer_name: orderData.customer.name,
        customer_phone: orderData.customer.phone,
        customer_address: orderData.customer.address,
        customer_pincode: orderData.customer.pincode,
        customer_email: orderData.customer.email,
        status: 'confirmed'  // Conformed → confirmed (fix)
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    console.log('✅ LIVE DATABASE + NOTIFICATIONS:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ LIVE SAVE FAILED:', error.response?.data || error.message);
    throw error;
  }
};
