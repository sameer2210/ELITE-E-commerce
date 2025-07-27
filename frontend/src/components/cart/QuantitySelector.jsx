import React, { useState } from 'react'

const QuantitySelector = () => {
      const [quantity, setQuantity] = useState(1);
    
     // Handle quantity changes
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };
  return (
    <div>

         {/* Quantity Selector */}
                          <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(-1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                                disabled={quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-medium">{quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
      
    </div>
  )
}

export default QuantitySelector
