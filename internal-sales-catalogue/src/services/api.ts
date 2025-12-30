import type { CartItem } from '../store/cartStore'

interface CustomerData {
  name: string
  email: string
  phone: string
  company: string
}

interface OrderData {
  customer: CustomerData
  cart: CartItem[]
  total: number
  notes: string
}

export const submitOrder = async (orderData: OrderData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
      mode: 'no-cors' // Handle CORS for Google Apps Script
    })

    // With 'no-cors' mode, we can't read the response body
    // We assume success if no error is thrown
    return {
      success: true,
      message: 'Order submitted successfully'
    }
  } catch (error) {
    console.error('Order submission error:', error)
    return {
      success: false,
      message: 'Failed to submit order. Please check your connection and try again.'
    }
  }
}
