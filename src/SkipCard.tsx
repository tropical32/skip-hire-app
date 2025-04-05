import React from 'react';
import { AlertTriangle, Check, ArrowRight } from 'lucide-react';

function SkipCard({ skip, isSelected, onSelect, hasHeavyWaste = false }) {
  const isSelectable = !(hasHeavyWaste && !skip.allows_heavy_waste);
  const isDisabled = !isSelectable;

  const handleSelect = () => {
    if (isSelectable) {
      onSelect(skip);
    }
  };

  // Determine price display logic (RoRo skips might use per_tonne_cost)
  const displayPrice = skip.price_before_vat !== null && skip.price_before_vat > 0
    ? `£${skip.price_before_vat.toFixed(2)}`
    : (skip.transport_cost && skip.per_tonne_cost)
      ? `£${skip.transport_cost.toFixed(2)} Transport + £${skip.per_tonne_cost.toFixed(2)}/tonne`
      : 'Price on Application';

  const pricePeriodText = skip.price_before_vat !== null && skip.price_before_vat > 0
    ? 'ex. VAT'
    : '';


  return (
    <div
      onClick={handleSelect}
      className={`group relative rounded-lg border-2 p-4 md:p-6 transition-all duration-200 ease-in-out flex flex-col
        ${isSelected ? 'border-primary bg-primary/10 shadow-lg scale-[1.02]' :
          isDisabled ? 'border-dark-border bg-dark-card opacity-60 cursor-not-allowed' :
            'border-dark-border bg-dark-card hover:border-primary/50 cursor-pointer hover:shadow-md'}
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary rounded-full p-1 z-10">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      )}

      <div className="relative mb-4 aspect-video"> {/* Changed aspect ratio */}
        <img
          src={skip.image_url || 'https://via.placeholder.com/400x300/1C1C1C/2A2A2A?text=Skip'} // Placeholder
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-cover rounded-md transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 z-10 bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
          {skip.size} Yards
        </div>
        <div className="absolute bottom-2 right-2 z-10 space-y-1.5 flex flex-col items-end">
          {!skip.allowed_on_road && (
            <div className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 max-w-max">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-yellow shrink-0" />
              <span className="text-xs font-medium text-accent-yellow whitespace-nowrap">Private Property Only</span>
            </div>
          )}
          {/* Conditionally show heavy waste warning *based on the prop passed in* */}
          {isDisabled && (
            <div className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 max-w-max">
              <AlertTriangle className="w-3.5 h-3.5 text-accent-red shrink-0" />
              <span className="text-xs font-medium text-accent-red whitespace-nowrap">Not for Heavy Waste</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <h3 className="text-lg md:text-xl font-bold mb-1 text-white">{skip.size} Yard Skip</h3>
        <p className="text-sm text-gray-400 mb-4">{skip.hire_period_days} day hire period</p>

        <div className="mt-auto"> {/* Pushes price and button down */}
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-xl md:text-2xl font-bold text-primary">
              {displayPrice}
            </span>
            {pricePeriodText && <span className="text-xs text-gray-400 ml-1">{pricePeriodText}</span>}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleSelect(); }} // Prevent card click from double triggering
            disabled={isDisabled}
            className={`w-full py-2.5 px-4 rounded-md transition-all duration-200 ease-in-out flex items-center justify-center space-x-2 text-sm font-medium
              ${isSelected ? 'bg-primary text-white hover:bg-primary-dark' :
                isDisabled ? 'bg-dark-border text-gray-500 cursor-not-allowed' :
                  'bg-dark-border text-white hover:bg-dark-hover'}
            `}
          >
            <span>{isSelected ? 'Selected' : 'Select This Skip'}</span>
            {!isSelected && !isDisabled && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkipCard;
