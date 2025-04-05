import { useState, useMemo } from "react";

import roadSkip from "../public/road.png";
import heavySkip from "../public/heavy.png";
import useSWR from "swr";

interface Skip {
  id: number;
  size: number;
  price_before_vat: number | null;
  vat: number;
  hire_period_days: number;
  postcode: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  area: string | null;
  per_tonne_cost: number | null;
  transport_cost: number | null;
}

const AlertTriangleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#eab308"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" x2="10" y1="11" y2="17"></line>
    <line x1="14" x2="14" y1="11" y2="17"></line>
  </svg>
);

const TruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
    <path d="M15 18H9"></path>
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
    <circle cx="17" cy="18" r="2"></circle>
    <circle cx="7" cy="18" r="2"></circle>
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2v4"></path>
    <path d="M16 2v4"></path>
    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    <path d="M3 10h18"></path>
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
    <line x1="2" x2="22" y1="10" y2="10"></line>
  </svg>
);

// Sun icon for theme toggle
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

// Moon icon for theme toggle
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

// Theme Toggle Component
const ThemeToggle = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`absolute top-4 right-4 p-2 rounded-full z-50 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-blue-100 text-blue-900 hover:bg-blue-200"
      }`}
      aria-label="Toggle theme"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

// --- Step Nav Component ---
const StepNav = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div
      className={`flex justify-center mb-8 overflow-x-auto px-4 py-6 ${darkMode ? "bg-gray-900" : "bg-gray-50 shadow-md"}`}
    >
      <div className="flex items-center overflow-x-auto gap-4">
        {/* Active steps */}
        <button
          className={`flex items-center whitespace-nowrap transition-colors ${darkMode ? "text-blue-500" : "text-blue-600"} cursor-pointer hover:text-blue-500`}
        >
          <MapPinIcon />
          <span className={`ml-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Postcode
          </span>
        </button>
        <div className="min-w-8 w-16 h-px bg-blue-600"></div>

        <button
          className={`flex items-center whitespace-nowrap transition-colors ${darkMode ? "text-blue-500" : "text-blue-600"} cursor-pointer hover:text-blue-500`}
        >
          <TrashIcon />
          <span className={`ml-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Waste Type
          </span>
        </button>
        <div className="w-16 min-w-8 h-px bg-blue-600"></div>

        <button
          className={`flex items-center whitespace-nowrap transition-colors ${darkMode ? "text-blue-500" : "text-blue-600"} cursor-pointer hover:text-blue-500`}
        >
          <TruckIcon />
          <span
            className={`ml-2 ${darkMode ? "text-white" : "text-gray-800"} font-medium`}
          >
            Select Skip
          </span>
        </button>

        {/* Inactive steps */}
        <div
          className={`w-16 min-w-8 h-px ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        ></div>
        <button
          disabled
          className={`flex items-center whitespace-nowrap transition-colors ${darkMode ? "text-white/60" : "text-gray-400"} cursor-not-allowed opacity-50`}
        >
          <ShieldIcon />
          <span className={`ml-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Permit Check
          </span>
        </button>

        <div
          className={`w-16 min-w-8 h-px ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        ></div>
        <button
          disabled
          className={`flex items-center whitespace-nowrap transition-colors ${darkMode ? "text-white/60" : "text-gray-400"} cursor-not-allowed opacity-50`}
        >
          <CalendarIcon />
          <span className={`ml-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Choose Date
          </span>
        </button>

        <div
          className={`w-16 min-w-8 h-px ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        ></div>
        <button
          disabled
          className={`flex items-center whitespace-nowrap transition-colors ${darkMode ? "text-white/60" : "text-gray-400"} cursor-not-allowed opacity-50`}
        >
          <CreditCardIcon />
          <span className={`ml-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Payment
          </span>
        </button>
      </div>
    </div>
  );
};

// --- Skip Card Component ---
const SkipCard = ({
  skip,
  selectedSkip,
  onSelect,
  darkMode,
}: {
  skip: Skip;
  selectedSkip: Skip | null;
  onSelect: (skip: Skip) => void;
  darkMode: boolean;
}) => {
  const isSelected = selectedSkip?.id === skip.id;

  return (
    <div
      className={`relative rounded-lg border-2 p-6 transition-all duration-300 ${
        darkMode
          ? `${isSelected ? "border-blue-600 bg-blue-900/10 shadow-lg shadow-blue-900/20" : "border-gray-700 hover:border-blue-600/50 hover:shadow-md hover:shadow-blue-900/10"} bg-gray-900 text-white`
          : `${isSelected ? "border-blue-600 bg-blue-50 shadow-lg shadow-blue-200" : "border-gray-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100"} bg-white text-gray-800`
      } cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1`}
      onClick={() => onSelect(skip)}
    >
      <div className="relative">
        {skip.allows_heavy_waste && skip.allowed_on_road ? (
          <div className="relative h-48 w-full overflow-hidden rounded-md mb-4 shadow-md">
            {/* Diagonal split container */}
            <div className="absolute inset-0">
              {/* First image - covers the entire area */}
              <img
                src={roadSkip}
                alt={`${skip.size} Yard Road Skip`}
                className="absolute w-full h-full object-cover"
              />

              {/* Second image - shown with clip path for diagonal effect */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={heavySkip}
                  alt={`${skip.size} Yard Heavy Skip`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Diagonal dividing line */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom right, transparent calc(50% - 1px), white, transparent calc(50% + 1px))",
                }}
              ></div>
            </div>
          </div>
        ) : skip.allowed_on_road ? (
          <img
            src={roadSkip}
            alt={`${skip.size} Yard Skip`}
            className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
          />
        ) : (
          <img
            src={heavySkip}
            alt={`${skip.size} Yard Skip`}
            className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
          />
        )}

        <div className="absolute top-3 right-2 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          {skip.size} Yards
        </div>

        <div className="absolute bottom-3 left-2 z-10 flex flex-col gap-2">
          {!skip.allowed_on_road && (
            <div
              className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${darkMode ? "bg-black/90" : "bg-white/100"}`}
            >
              <AlertTriangleIcon />
              <span
                className={`text-xs font-medium text-slate-800 ${darkMode ? "text-yellow-500" : "text-slate-800"}`}
              >
                Private Property Only
              </span>
            </div>
          )}
          {!skip.allows_heavy_waste && (
            <div
              className={`backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 ${darkMode ? "bg-black/90" : "bg-white/100"}`}
            >
              <AlertTriangleIcon />
              <span
                className={`text-xs font-medium text-slate-800 ${darkMode ? "text-yellow-500" : "text-slate-800"}`}
              >
                No Heavy Waste
              </span>
            </div>
          )}
        </div>
      </div>

      <h3
        className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
      >
        {skip.size} Yard Skip
      </h3>
      <p
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mb-6`}
      >
        {skip.hire_period_days} day hire period
      </p>

      <div className="flex justify-between items-center mb-4">
        <div>
          {skip.price_before_vat !== null ? (
            <>
              <span className="text-2xl font-bold text-blue-600">
                £{skip.price_before_vat.toFixed(2)}
              </span>
              <span
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}
              >
                per week
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-blue-600">POA</span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          onSelect(skip);
        }}
        className={`w-full py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium
        ${
          isSelected
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : darkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        <span>{isSelected ? "Selected" : "Select This Skip"}</span>
        {!isSelected && <ArrowRightIcon />}
      </button>
    </div>
  );
};

// --- Selection Footer Component ---
const SelectionFooter = ({
  selectedSkip,
  darkMode,
}: {
  selectedSkip: Skip | null;
  darkMode: boolean;
}) => {
  if (!selectedSkip) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        darkMode
          ? "bg-gray-900 border-t border-gray-700 shadow-lg shadow-black/50"
          : "bg-white border-t border-gray-200 shadow-lg shadow-gray-200/50"
      } p-4 z-50 animate-slideUp`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between px-4">
        <div className="flex items-center gap-6 mb-4 sm:mb-0">
          <div>
            <h3
              className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              {selectedSkip.size} Yard Skip
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {selectedSkip.hire_period_days} day hire
            </p>
          </div>
          <div>
            {selectedSkip.price_before_vat !== null ? (
              <>
                <span className="text-2xl font-bold text-blue-600">
                  £{selectedSkip.price_before_vat.toFixed(2)}
                </span>
                <span
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} ml-2`}
                >
                  per week
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-blue-600">POA</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            className={`px-4 py-2 rounded-md ${
              darkMode
                ? "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
                : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
            } transition-colors text-sm font-medium`}
          >
            Back
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            Continue
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// --- Main App Component ---
const App = () => {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const {
    data: skipData = [],
    isLoading,
  }: { data: Skip[]; isLoading: boolean } = useSWR(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
    fetcher,
  );

  // State for selected skip (initialized with 12 Yard skip)
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const [filterAllowedOnRoads, setFilterAllowedOnRoads] = useState(true);
  const [filterHeavyWaste, setFilterHeavyWaste] = useState(true);

  const roadSkips = useMemo(() => {
    return skipData.filter((skip) => skip.allowed_on_road);
  }, [skipData]);

  const heavySkips = useMemo(() => {
    return skipData.filter((skip) => skip.allows_heavy_waste);
  }, [skipData]);

  const filteredSkips = useMemo(() => {
    if (filterAllowedOnRoads && filterHeavyWaste) return skipData;
    if (filterAllowedOnRoads) return roadSkips;
    if (filterHeavyWaste) return heavySkips;
    return [];
  }, [filterAllowedOnRoads, filterHeavyWaste, heavySkips, roadSkips, skipData]);

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <StepNav darkMode={darkMode} />

      <main className="max-w-7xl mx-auto px-4 pb-32">
        <div>
          <h2
            className={`text-3xl font-bold text-center mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            Choose Your Skip Size
          </h2>
          <p
            className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-center mb-8 max-w-2xl mx-auto`}
          >
            Select the skip size that best suits your needs for your waste
            disposal project
          </p>

          {/* Filter bar */}
          <div className="flex justify-center mb-8">
            <div
              className={`inline-flex gap-3 p-1 rounded-lg ${darkMode ? "bg-gray-900" : "bg-white shadow-md"}`}
            >
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterAllowedOnRoads
                    ? "bg-blue-600 text-white"
                    : darkMode
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => setFilterAllowedOnRoads((x) => !x)}
              >
                Road Placement
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterHeavyWaste
                    ? "bg-blue-600 text-white"
                    : darkMode
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => setFilterHeavyWaste((x) => !x)}
              >
                Heavy Waste
              </button>
            </div>
          </div>

          {isLoading && (
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-center mb-8 max-w-2xl mx-auto`}
            >
              Loading...
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                selectedSkip={selectedSkip}
                onSelect={handleSelectSkip}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
        <SelectionFooter selectedSkip={selectedSkip} darkMode={darkMode} />
      </main>
    </div>
  );
};

export default App;
