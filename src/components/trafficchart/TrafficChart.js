import React, { useState, useRef, useEffect } from "react";

//CSS File
import "./trafficchart.css";

//Components
import TrafficAndDomainsDashboard from "../trafficanddomainsdashboard/TrafficAndDomainsDashboard";

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span className="tabs-dropdown" ref={dropdownRef}>
      <span className="tabs-dropdown-selected-option" onClick={toggleDropdown}>
        {selectedOption}
      </span>

      <small className="tabs-dropdown-symbol" onClick={toggleDropdown}>
        ▼
      </small>

      {isOpen && (
        <ul className="tabs-dropdown-menu open">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionSelect(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

const TrafficChart = () => {
  const [selectedMonthlyOption, setSelectedMonthlyOption] = useState("Monthly");

  const [selectedCompetitorsOption, setSelectedCompetitorsOption] =
    useState("Competitors");

  const [selectedLocationsOption, setSelectedLocationsOption] =
    useState("Locations");

  const [selectedTimeDurationOption, setSelectedTimeDurationOption] =
    useState("2Y");

  const [selectedMarketViewOption, setSelectedMarketViewOption] =
    useState("Market View");

  const [selectedTimelineViewOption, setSelectedTimelineViewOption] =
    useState("Timeline View");

  const handleMonthlyOptionSelect = (option) => {
    setSelectedMonthlyOption(option);
  };

  const handleCompetitorsOptionSelect = (option) => {
    setSelectedCompetitorsOption(option);
  };

  const handleLocationsOptionSelect = (option) => {
    setSelectedLocationsOption(option);
  };

  const handleTimeDurationOptionSelect = (option) => {
    setSelectedTimeDurationOption(option);
  };

  const handleMarketViewOptionSelect = (option) => {
    setSelectedMarketViewOption(option);
  };

  const handleTimelineViewOptionSelect = (option) => {
    setSelectedTimelineViewOption(option);
  };

  const chartData = [
    { date: "Nov 2021", value: 1.3 },
    { date: "Feb 2022", value: 1.35 },
    { date: "May 2022", value: 1.45 },
    { date: "Aug 2022", value: 1.7 },
    { date: "Nov 2022", value: 1.95 },
    { date: "Feb 2023", value: 2.0 },
    { date: "May 2023", value: 2.3 },
    { date: "Aug 2023", value: 2.6 },
  ];

  const generatePathData = () => {
    return chartData
      .map((point, index) => `${index * 100},${400 - point.value * 150}`)
      .join(" L ");
  };

  return (
    <div id="dashboard-container">
      <div id="trafficchart-container">
        <div className="chart-header">
          <div className="left-tabs">
            <span className="active">Metrics</span>

            <Dropdown
              options={["Google", "Microsoft", "Amazon"]}
              selectedOption={selectedCompetitorsOption}
              onSelect={handleCompetitorsOptionSelect}
              dropdownName="competitors"
            />

            <Dropdown
              options={["America", "Canada", "Germany"]}
              selectedOption={selectedLocationsOption}
              onSelect={handleLocationsOptionSelect}
              dropdownName="locations"
            />

            <Dropdown
              options={[
                "Google",
                "Microsoft",
                "Amazon",
                "America",
                "Canada",
                "Germany",
              ]}
              selectedOption={selectedMarketViewOption}
              onSelect={handleMarketViewOptionSelect}
              dropdownName="Market View"
            />

            <span>Years</span>
          </div>

          <div className="right-tabs">
            <span>1M</span>
            <span>6M</span>
            <span>1Y</span>
            <span className="active">2Y</span>
            <span>All</span>

            <Dropdown
              options={["1M", "6M", "1Y", "All"]}
              selectedOption={selectedTimeDurationOption}
              onSelect={handleTimeDurationOptionSelect}
              dropdownName="2Y"
            />

            <Dropdown
              options={["Yearly", "Quarterly", "Weekly"]}
              selectedOption={selectedMonthlyOption}
              onSelect={handleMonthlyOptionSelect}
              dropdownName="monthly"
            />

            <Dropdown
              options={[
                "1M",
                "6M",
                "1Y",
                "All",
                "Yearly",
                "Quarterly",
                "Weekly",
              ]}
              selectedOption={selectedTimelineViewOption}
              onSelect={handleTimelineViewOptionSelect}
              dropdownName="Timeline View"
            />

            <button type="button">⋮</button>
          </div>
        </div>

        <div className="performance-title">Performance</div>

        <div className="chart-options">
          <label>
            <input type="checkbox" /> Referring domains
          </label>
          <label>
            <input type="checkbox" /> Avg. Domain Rating
          </label>
          <label>
            <input type="checkbox" /> Avg. URL Rating
          </label>
          <label>
            <input type="checkbox" checked readOnly /> Avg. organic traffic
          </label>
          <label>
            <input type="checkbox" /> Avg. organic traffic value
          </label>
          <label>
            <input type="checkbox" /> Organic pages
          </label>
          <label>
            <input type="checkbox" /> Avg. paid traffic
          </label>
          <label>
            <input type="checkbox" /> Avg. paid traffic cost
          </label>
          <label>
            <input type="checkbox" /> Crawled pages
          </label>
        </div>

        <div className="chart-graph">
          <div className="chart-label">Avg. organic traffic</div>

          <div className="y-axis-labels">
            <span>2.6M</span>
            <span>2M</span>
            <span>1.3M</span>
            <span>650K</span>
            <span>0</span>
          </div>

          {/* <div className="graph"> */}
          <svg viewBox="0 0 800 400" className="line-chart">
            <path
              d={`M ${generatePathData()}`}
              fill="none"
              stroke="#FF8C00"
              strokeWidth="2"
            />
            <path
              d={`M ${generatePathData()} L 700,400 L 0,400`}
              fill="rgba(255, 140, 0, 0.2)"
            />
          </svg>

          <div className="x-axis">
            {[
              "Nov 2021",
              "Feb 2022",
              "May 2022",
              "Aug 2022",
              "Nov 2022",
              "Feb 2023",
              "May 2023",
              "Aug 2023",
            ].map((date, index) => (
              <span key={date}>{date}</span>
            ))}
            {/* </div> */}
          </div>
        </div>
      </div>

      <TrafficAndDomainsDashboard />
    </div>
  );
};

export default TrafficChart;
