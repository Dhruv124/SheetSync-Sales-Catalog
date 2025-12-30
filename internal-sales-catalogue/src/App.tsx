import { useState } from 'react'
import Login from './components/Login'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'

type AppState = 'login' | 'products' | 'cart' | 'checkout' | 'success'

export default function App() {
  const [appState, setAppState] = useState<AppState>('login')

  const handleLogin = () => {
    setAppState('products')
  }

  const handleViewCart = () => {
    setAppState('cart')
  }

  const handleCheckout = () => {
    setAppState('checkout')
  }

  const handleBackToProducts = () => {
    setAppState('products')
  }

  const handleBackToCart = () => {
    setAppState('cart')
  }

  const handleOrderComplete = () => {
    setAppState('success')
  }

  const renderCurrentView = () => {
    switch (appState) {
      case 'login':
        return <Login onLogin={handleLogin} />
      case 'products':
        return <ProductList onViewCart={handleViewCart} />
      case 'cart':
        return <Cart onBackToProducts={handleBackToProducts} onCheckout={handleCheckout} />
      case 'checkout':
        return <CheckoutForm onBackToCart={handleBackToCart} onOrderComplete={handleOrderComplete} />
      case 'success':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="text-center">
              <svg className="mx-auto h-24 w-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Order Submitted Successfully!</h3>
              <p className="mt-1 text-gray-500">Thank you for your order. We'll process it shortly.</p>
              <div className="mt-6">
                <button
                  onClick={() => setAppState('products')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return <Login onLogin={handleLogin} />
    }
  }

  return renderCurrentView()
}
