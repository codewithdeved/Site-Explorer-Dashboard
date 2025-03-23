import React, { useState, useRef } from "react";

import "./tableofpages.css";

const TableOfPages = () => {
    
  const [selectedDate1, setSelectedDate1] = useState("2023-08-29");
  const [selectedDate2, setSelectedDate2] = useState("2023-02-28");

  const [isCalendarOpen1, setIsCalendarOpen1] = useState(false);
  const [isCalendarOpen2, setIsCalendarOpen2] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  
  const exportOptions = ["CSV", "PDF", "Excel", "Google Sheets"];
  
  const dateInputRef1 = useRef(null);
  const dateInputRef2 = useRef(null);
  const exportDropdownRef = useRef(null);

  const openCalendar1 = () => {
    if (dateInputRef1.current) {
      if ("showPicker" in dateInputRef1.current) {
        if (isCalendarOpen1) {
          dateInputRef1.current.blur();
        } else {
          dateInputRef1.current.showPicker();
        }
        setIsCalendarOpen1(!isCalendarOpen1);
      } else {
        dateInputRef1.current.click();
      }
    }
  };

  const openCalendar2 = () => {
    if (dateInputRef2.current) {
      if ("showPicker" in dateInputRef2.current) {
        if (isCalendarOpen2) {
          dateInputRef2.current.blur();
        } else {
          dateInputRef2.current.showPicker();
        }
        setIsCalendarOpen2(!isCalendarOpen2);
      } else {
        dateInputRef2.current.click();
      }
    }
  };

  const handleDateChange1 = (e) => {
    setSelectedDate1(e.target.value);
  };

  const handleDateChange2 = (e) => {
    setSelectedDate2(e.target.value);
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const data = [
    {
      url: "https://ahrefs.com/backlink-checker",
      status: "",
      traffic: "218,235",
      trafficChange: "+40.7K",
      trafficChangePercent: "8.4%",
      value: "$151.0K",
      valueChange: "+$25.3K",
      keywords: "3,770",
      keywordsChange: "+1.6K",
      topKeyword: "ahrefs backlink checker",
      volume: "16.0K",
      position: "1",
      flag: "🇮🇳",
    },
    {
      url: "https://ahrefs.com/keyword-rank-checker",
      status: "",
      traffic: "217,733",
      trafficChange: "+66.3K",
      trafficChangePercent: "8.4%",
      value: "$273.0K",
      valueChange: "+$42.9K",
      keywords: "3,710",
      keywordsChange: "+1.3K",
      topKeyword: "rank checker",
      volume: "4.6K",
      position: "1",
      flag: "🇺🇸",
    },
    {
      url: "https://ahrefs.com/backlink-checker",
      status: "",
      traffic: "218,235",
      trafficChange: "+40.7K",
      trafficChangePercent: "8.4%",
      value: "$151.0K",
      valueChange: "+$25.3K",
      keywords: "3,770",
      keywordsChange: "+1.6K",
      topKeyword: "ahrefs backlink checker",
      volume: "16.0K",
      position: "1",
      flag: "🇮🇳",
    },
    {
      url: "https://ahrefs.com/keyword-rank-checker",
      status: "",
      traffic: "217,733",
      trafficChange: "+66.3K",
      trafficChangePercent: "8.4%",
      value: "$273.0K",
      valueChange: "+$42.9K",
      keywords: "3,710",
      keywordsChange: "+1.3K",
      topKeyword: "rank checker",
      volume: "4.6K",
      position: "1",
      flag: "🇺🇸",
    },
  ];

  return (
    
    <div className="tableofpages-container">
      
      <div className="table-header">
          
          <div className="header-left">
            
            <span className="pages-count">4,619 pages</span>
            <span className="total-traffic">Total traffic: 2.6M</span>

            <button
              type="button"
              className="header-button calender-btn calender-1"
              onClick={openCalendar1}
            >
              <div className="date-container">
                <span className="calendar-icon">📅</span>
                <span>{formatDate(selectedDate1)}</span>
                <span className="dropdown-icon">▼</span>
              </div>
              <input
                ref={dateInputRef1}
                type="date"
                className="date-picker"
                value={selectedDate1}
                onChange={handleDateChange1}
              />
            </button>

            <button
              type="button"
              className="header-button calender-btn calender-2"
              onClick={openCalendar2}
            >
              <div className="date-container">
                <span className="calendar-icon">Compare with:</span>
                <span>{formatDate(selectedDate2)}</span>
                <span className="dropdown-icon">▼</span>
              </div>
              <input
                ref={dateInputRef2}
                type="date"
                className="date-picker"
                value={selectedDate2}
                onChange={handleDateChange2}
              />
            </button>
          
          </div>

          <div className="header-right">
            
            <div className="changes-dropdown">
              Changes:
              <select className="changes-select" defaultValue="Absolute">
                <option value="Absolute">Absolute</option>
                <option value="Fixed">Fixed</option>
                <option value="Relative">Relative</option>
              </select>
            </div>

            <button className="table-of-pages-api-button">{"{}"} API</button>

            <div className="table-of-pages-export-container" ref={exportDropdownRef}>
              
              <button
                className="header-button"
                onClick={() => setShowExportOptions(!showExportOptions)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="#555" />
                </svg>
                Export
              </button>

              {showExportOptions && (
                <div className="dropdown-menu table-of-pages-dropdown-menu">
                  {exportOptions.map((option) => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => {
                        alert(`Exporting as ${option}`);
                        setShowExportOptions(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

            </div>
          
          </div>
        
      </div>

      <div className="tableofpages-wrapper">
        <table className="tableofpages-table">
          <thead>
            <tr>
              <th className="th-url">
                <span>-</span> URL
              </th>
              <th>Status</th>
              <th>Traffic</th>
              <th>Change</th>
              <th>Value</th>
              <th>Change</th>
              <th>Keywords</th>
              <th>Change</th>
              <th>Top keyword</th>
              <th>Volume</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="url-cell">
                  <input type="checkbox" checked />
                  <span
                    className="status-dot"
                    style={{ color: index === 0 ? "#FF9900" : "#4CAF50" }}
                  >
                    {row.status}
                  </span>
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.url}
                  </a>
                </td>
                <td>{row.status}</td>
                <td>
                  {row.traffic}{" "}
                  <span className="percent-change">
                    {row.trafficChangePercent}
                  </span>
                </td>
                <td className="change-cell">{row.trafficChange}</td>
                <td>{row.value}</td>
                <td className="change-cell">{row.valueChange}</td>
                <td>{row.keywords}</td>
                <td className="change-cell">{row.keywordsChange}</td>
                <td className="blue-text">
                  <span className="flag">{row.flag}</span> {row.topKeyword}
                </td>
                <td>{row.volume}</td>
                <td>{row.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TableOfPages;
