'use client';

import { useState } from 'react';
import { X, Plus, Minus, Printer } from 'lucide-react';
import { Product } from '@/data/mockData';

interface CartItem extends Product {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: (buyerDetails: { name: string; phone: string }, salesperson: string) => void;
  orderSuccess: boolean;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onAddToCart, 
  onRemoveFromCart, 
  onCheckout,
  orderSuccess 
}: CartDrawerProps) {
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [salesperson, setSalesperson] = useState('');

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (buyerName && buyerPhone) {
      onCheckout({ name: buyerName, phone: buyerPhone }, salesperson);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold text-onyx">
          {orderSuccess ? 'Order Success' : `Cart (${totalItems} items)`}
        </h2>
        <button onClick={onClose} className="p-2 bg-transparent text-onyx hover:bg-gray-100 rounded opacity-100">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {orderSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-2xl font-bold mb-4">Order Placed Successfully!</div>
            <div className="text-gray-600 mb-8">Thank you for your purchase</div>
            <button
              onClick={handlePrint}
              className="bg-casa-magenta text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-pink-700 opacity-100"
            >
              <Printer size={20} />
              PRINT INVOICE
            </button>
            
            <div className="mt-8 text-left bg-gray-50 p-4 rounded">
              <h3 className="font-bold mb-2">Order Summary:</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4 font-bold text-lg flex justify-between">
                <span>Total:</span>
                <span className="text-casa-magenta">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded">
                      <div className="flex-1">
                        <h4 className="font-semibold text-onyx">{item.name}</h4>
                        <p className="text-gray-500 text-sm">{item.size}</p>
                        <p className="text-casa-magenta font-bold">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1 bg-transparent text-onyx hover:bg-gray-200 rounded opacity-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="p-1 bg-transparent text-onyx hover:bg-gray-200 rounded opacity-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total:</span>
                    <span className="text-casa-magenta">₹{totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buyer Name *
                      </label>
                      <input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-casa-magenta"
                        placeholder="Enter buyer name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buyer Phone *
                      </label>
                      <input
                        type="tel"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-casa-magenta"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salesperson Name
                      </label>
                      <input
                        type="text"
                        value={salesperson}
                        onChange={(e) => setSalesperson(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-casa-magenta"
                        placeholder="Enter salesperson name"
                      />
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={!buyerName || !buyerPhone}
                      className="w-full bg-casa-magenta text-white py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors opacity-100"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
