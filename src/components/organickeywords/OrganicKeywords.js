import React, { useState, useRef } from "react";

//CSS FILE
import "./organickeywords.css";

const OrganicKeywords = () => {

  const [selectedDate, setSelectedDate] = useState("2025-03-09");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const dateInputRef = useRef(null);
  const exportDropdownRef = useRef(null);

  const openCalendar = () => {
    if (dateInputRef.current) {
      if ("showPicker" in dateInputRef.current) {
        if (isCalendarOpen) {
          dateInputRef.current.blur();
        } else {
          dateInputRef.current.showPicker();
        }
        setIsCalendarOpen(!isCalendarOpen);
      } else {
        dateInputRef.current.click();
      }
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const [keywords, setKeywords] = useState([
    {
      checked: false,
      verified: true,
      keyword: "ahrefs",
      sf: 3,
      volume: "45.0K",
      kd: 44,
      cpc: 4.43,
      traffic: "42,525",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/",
      moreInfo: "4 more",
      updated: "8h ago",
    },
    {
      checked: false,
      new: true,
      keyword: "paragraph rewriter",
      sf: 1,
      volume: "33.0K",
      kd: 49,
      cpc: 0.42,
      traffic: "35,549",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/writing-tools/paragraph-rewriter",
      moreInfo: "",
      updated: "6h ago",
    },
    {
      checked: false,
      new: true,
      keyword: "sentence rewriter",
      sf: 1,
      volume: "36.0K",
      kd: 46,
      cpc: 0.2,
      traffic: "12,455",
      paid: 0,
      position: 2,
      url: "https://ahrefs.com/writing-tools/sentence-rewriter",
      moreInfo: "",
      updated: "1d ago",
    },
    {
      checked: false,
      new: true,
      keyword: "paragraph generator",
      sf: 1,
      volume: "24.0K",
      kd: 11,
      cpc: 0.5,
      traffic: "10,483",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/writing-tools/paragraph-generator",
      moreInfo: "",
      updated: "1d ago",
    },
    {
      checked: false,
      new: true,
      keyword: "rewrite paragraph",
      sf: 1,
      volume: "17.0K",
      kd: 63,
      cpc: 0.42,
      traffic: "7,566",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/writing-tools/paragraph-rewriter",
      moreInfo: "",
      updated: "1d ago",
    },
    {
      checked: false,
      verified: true,
      keyword: "check backlinks",
      sf: 1,
      volume: "6.8K",
      kd: 88,
      cpc: 1.65,
      traffic: "5,813",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/backlink-checker",
      moreInfo: "",
      updated: "10h ago",
    },
    {
      checked: false,
      new: true,
      keyword: "acronym generator",
      sf: 2,
      volume: "30.0K",
      kd: 46,
      cpc: 2.31,
      traffic: "5,425",
      paid: 0,
      position: 4,
      url: "https://ahrefs.com/writing-tools/acronym-generator",
      moreInfo: "",
      updated: "12h ago",
    },
    {
      checked: false,
      new: true,
      keyword: "paragraph writer",
      sf: 1,
      volume: "13.0K",
      kd: 8,
      cpc: 0.53,
      traffic: "4,976",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/writing-tools/paragraph-generator",
      moreInfo: "",
      updated: "10h ago",
    },
    {
      checked: false,
      new: true,
      keyword: "rewrite sentences",
      sf: 1,
      volume: "13.0K",
      kd: 61,
      cpc: 0.16,
      traffic: "4,819",
      paid: 0,
      position: 2,
      url: "https://ahrefs.com/writing-tools/sentence-rewriter",
      moreInfo: "",
      updated: "3h ago",
    },
    {
      checked: false,
      verified: true,
      keyword: "search engines",
      sf: 4,
      volume: "143.0K",
      kd: 80,
      cpc: 0.89,
      traffic: "4,750",
      paid: 0,
      position: 9,
      url: "https://ahrefs.com/blog/alternative-search-engines/",
      moreInfo: "",
      updated: "1d ago",
    },
    {
      checked: false,
      verified: true,
      keyword: "ahrefs backlink checker",
      sf: 1,
      volume: "4.0K",
      kd: 88,
      cpc: 2.13,
      traffic: "4,733",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/backlink-checker",
      moreInfo: "16 more",
      updated: "8h ago",
    },
    {
      checked: false,
      verified: true,
      keyword: "hrefs",
      sf: 3,
      volume: "4.3K",
      kd: 44,
      cpc: 0.95,
      traffic: "4,261",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/",
      moreInfo: "4 more",
      updated: "1d ago",
    },
    {
      checked: false,
      verified: true,
      keyword: "ahrefs keyword explorer",
      sf: 2,
      volume: "3.9K",
      kd: 88,
      cpc: 2.12,
      traffic: "4,180",
      paid: 0,
      position: 1,
      url: "https://ahrefs.com/keywords-explorer",
      moreInfo: "19 more",
      updated: "21h ago",
    },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index].checked = !updatedKeywords[index].checked;
    setKeywords(updatedKeywords);
  };

  const getKDClass = (kd) => {
    if (kd < 15) return "kd-badge kd-badge-green";
    if (kd < 50) return "kd-badge kd-badge-yellow";
    if (kd < 70) return "kd-badge kd-badge-orange";
    return "kd-badge kd-badge-red";
  };

  const exportOptions = ["CSV", "PDF", "Excel", "Google Sheets"];

  return (
    <div className="table-container">
      <div className="header-section">
        
      <span className="keyword-count">140,491 keywords</span>

        <div className="header-left">

          <button type="button" className="header-button calender-btn" onClick={openCalendar}>
            <div className="date-container">
              <span className="calendar-icon">📅</span>
              <span>{formatDate(selectedDate)}</span>
              <span className="dropdown-icon">▼</span>
            </div>

            <input
              ref={dateInputRef}
              type="date"
              className="date-picker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </button>

          <button className="header-button">
            <span>Don't compare</span>
            <span className="dropdown-icon">▼</span>
          </button>

          <button className="header-button header-filter-button">
            <span className="filter-icon">⚙</span>
            <span>Filters</span>
            <span className="dropdown-icon">▼</span>
          </button>
        </div>

        <div className="header-right">
          
          <button className="header-button">
            <span>Columns</span>
          </button>
          
          <button className="header-button">
            <span>{'{}'} API</span>
          </button>
          
            <div className="organic-keywords-export-container" ref={exportDropdownRef}>
              
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
                <div className="dropdown-menu organic-keywords-dropdown-menu">
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

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input type="checkbox" />
              </th>
              <th className="col-keyword" data-label="Keyword">
                Keyword
              </th>
              <th>SF</th>
              <th>Volume</th>
              <th>KD</th>
              <th>CPC</th>
              <th>Traffic</th>
              <th>Paid</th>
              <th>Position</th>
              <th>URL</th>
              <th className="updated-column">Updated</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>
                  <div className="keyword-cell">
                    {item.verified ? (
                      <span className="verified-icon">✓</span>
                    ) : (
                      <span className="new-icon">+</span>
                    )}
                    <span className="keyword-text">{item.keyword}</span>
                  </div>
                </td>
                <td>
                  <span>{item.sf}</span>
                </td>
                <td>{item.volume}</td>
                <td>
                  <div className={getKDClass(item.kd)}>{item.kd}</div>
                </td>
                <td>{item.cpc}</td>
                <td>{item.traffic}</td>
                <td>{item.paid}</td>
                <td>{item.position}</td>
                <td>
                  <div className="url-container">
                    <a href={item.url} className="url-link">
                      {item.url}
                    </a>
                    {item.moreInfo && (
                      <span className="more-info">{item.moreInfo}</span>
                    )}
                  </div>
                </td>
                <td className="updated-cell">{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganicKeywords;
