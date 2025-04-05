import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

function SelectionFooter({ selectedSkip, onBack, onContinue }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedSkip) {
      // Delay slightly to allow CSS transition
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [selectedSkip]);

  if (!selectedSkip) {
    return null;
  }

  // Determine price display logic (similar to SkipCard)
  const displayPrice = selectedSkip.price_before_vat !== null && selectedSkip.price_before_vat > 0
    ? `£${selectedSkip.price_before_vat.toFixed(2)}`
    : (selectedSkip.transport_cost && selectedSkip.per_tonne_cost)
      ? `£${selectedSkip.transport_cost.toFixed(2)} Transport + £${selectedSkip.per_tonne_cost.toFixed(2)}/tonne`
      : 'Price on Application';

  const pricePeriodText = selectedSkip.price_before_vat !== null && selectedSkip.price_before_vat > 0
    ? 'ex. VAT'
    : '';


  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border p-4 shadow-lg transition-transform duration-300 ease-out z-50 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">{selectedSkip.size} Yard Skip</h3>
            <div>
              <span className="text-xl font-bold text-primary">{displayPrice}</span>
              {pricePeriodText && <span className="text-sm text-gray-400 ml-1">{pricePeriodText}</span>}
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">{selectedSkip.hire_period_days} day hire</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onBack}
              className="w-full py-2.5 px-4 rounded-md bg-dark-border text-white hover:bg-dark-hover transition-colors text-sm font-medium"
            >
              Back
            </button>
            <button
              onClick={onContinue}
              className="w-full py-2.5 px-4 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors flex items-center justify-center space-x-1.5 text-sm font-medium"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h3 className="font-medium text-white">{selectedSkip.size} Yard Skip</h3>
              <p className="text-sm text-gray-400">{selectedSkip.hire_period_days} day hire</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">{displayPrice}</span>
              {pricePeriodText && <span className="text-sm text-gray-400 ml-1">{pricePeriodText}</span>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="py-2.5 px-6 rounded-md bg-dark-border text-white hover:bg-dark-hover transition-colors text-sm font-medium"
            >
              Back
            </button>
            <button
              onClick={onContinue}
              className="py-2.5 px-6 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors flex items-center gap-2 text-sm font-medium"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectionFooter;
