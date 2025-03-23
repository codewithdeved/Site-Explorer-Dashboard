import React, { useState, useRef, useEffect } from "react";
import "./referringdomains.css";

const ReferringDomains = () => {

  const [expandedDomains, setExpandedDomains] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOption, setSortOption] = useState("First seen");
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const exportDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  const firstSeenOptions = [
    "First seen",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last year",
    "Custom range",
  ];

  const domains = [
    {
      domain: "twitter.com",
      dr: 99,
      dofollowRef: 25221264,
      dofollowLinked: 1996,
      linkedPages: 1200,
      linksFromTarget: 8200,
      dofollowCount: 6619,
      firstSeen: "29 Nov 2015",
    },
    {
      domain: "youtube.com",
      dr: 99,
      dofollowRef: 19771475,
      dofollowLinked: 2382,
      linkedPages: 1100,
      linksFromTarget: 5500,
      dofollowCount: 4907,
      firstSeen: "30 Nov 2015",
    },
    {
      domain: "developers.google.com",
      dr: 95,
      dofollowRef: 1051403,
      dofollowLinked: 7741,
      linkedPages: 707,
      linksFromTarget: 2700,
      dofollowCount: 2560,
      firstSeen: "18 Dec 2017",
    },
    {
      domain: "facebook.com",
      dr: 100,
      dofollowRef: 38293186,
      dofollowLinked: 7,
      linkedPages: 85,
      linksFromTarget: 2300,
      dofollowCount: 1293,
      firstSeen: "29 Nov 2015",
    },
    {
      domain: "support.google.com",
      dr: 96,
      dofollowRef: 2466223,
      dofollowLinked: 6361,
      linkedPages: 412,
      linksFromTarget: 1200,
      dofollowCount: 1195,
      firstSeen: "2 Feb 2017",
    },
    {
      domain: "linkedin.com",
      dr: 98,
      dofollowRef: 12207613,
      dofollowLinked: 64,
      linkedPages: 153,
      linksFromTarget: 2800,
      dofollowCount: 1129,
      firstSeen: "1 Dec 2015",
    },
    {
      domain: "google.com",
      dr: 98,
      dofollowRef: 29284664,
      dofollowLinked: 290860,
      linkedPages: 179,
      linksFromTarget: 954,
      dofollowCount: 945,
      firstSeen: "5 Mar 2018",
    },
    {
      domain: "instagram.com",
      dr: 99,
      dofollowRef: 22174819,
      dofollowLinked: 506,
      linkedPages: 101,
      linksFromTarget: 933,
      dofollowCount: 933,
      firstSeen: "5 Feb 2021",
    },
    {
      domain: "medium.com",
      dr: 94,
      dofollowRef: 1699550,
      dofollowLinked: 101711,
      linkedPages: 47,
      linksFromTarget: 924,
      dofollowCount: 924,
      firstSeen: "5 Nov 2016",
    },
    {
      domain: "wordcount.com",
      dr: 48,
      dofollowRef: 153,
      dofollowLinked: 0,
      linkedPages: 1,
      linksFromTarget: 760,
      dofollowCount: 760,
      firstSeen: "27 Mar 2020",
    },
    {
      domain: "chrome.google.com",
      dr: 93,
      dofollowRef: 369039,
      dofollowLinked: 147,
      linkedPages: 130,
      linksFromTarget: 640,
      dofollowCount: 636,
      firstSeen: "28 May 2017",
    },
    {
      domain: "t.co",
      dr: 94,
      dofollowRef: 1241006,
      dofollowLinked: 0,
      linkedPages: 189,
      linksFromTarget: 603,
      dofollowCount: 603,
      firstSeen: "17 Feb 2017",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDomain = (domain) => {
    setExpandedDomains({
      ...expandedDomains,
      [domain]: !expandedDomains[domain],
    });
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionSelect = (option) => {
    setSortOption(option);
    setOpenDropdown(null);
  };

  const handleLinkedPagesClick = (domain) => {
    console.log(`View linked pages for ${domain}`);
    toggleDropdown(null);
  };

  const handleLinksFromTargetClick = (domain) => {
    console.log(`View links from target for ${domain}`);
    toggleDropdown(null);
  };

  const handleDofollowClick = () => {
    console.log("Sort by dofollow");
    toggleDropdown(null);
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const exportOptions = ["CSV", "PDF", "Excel", "Google Sheets"];

  return (
    
    <div className="referring-domains-container" ref={dropdownRef}>
      
      <div className="domains-header">
        
        <div className="domains-count">2,252 domains</div>

        <div className="domains-actions">
          
          <div className="filter-dropdown domains-filter-dropdown">
            <button
              className={`dropdown-btn ${
                openDropdown === "firstSeen" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("firstSeen")}
            >
              <span className="calendar-icon">📅</span> {sortOption}{" "}
              <span
                className={`dropdown-arrow ${
                  openDropdown === "firstSeen" ? "rotated" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openDropdown === "firstSeen" && (
              <div className="dropdown-menu firstseen-dropdown-menu">
                {firstSeenOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`dropdown-item ${
                      sortOption === option ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="domains-buttons">
            
            <button className="referring-domains-api-btn">
              <span className="api-icon"></span> API
            </button>
            
            <div className="referring-domains-export-container" ref={exportDropdownRef}>
              
              <button
                className="referring-domains-export-button"
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
                <div className="dropdown-menu referring-domains-dropdown-menu">
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
      
      </div>

      <div className="domains-table-container">
        
        <table className="domains-table">
          
          <thead>
            
            <tr>
              
              <th className="domain-col">Linked domain</th>
              <th>DR</th>
              <th>Dofollow ref.<br/>domains</th>
              <th>Dofollow linked<br/>domains</th>
              <th>Linked pages</th>
              <th>Links from target</th>
              
              <th className="dofollow-header">
                <div
                  className="table-dropdown-header"
                  onClick={() => toggleDropdown("dofollow")}
                >
                  Dofollow{" "}
                  <span
                    className={`dropdown-arrow ${
                      openDropdown === "dofollow" ? "rotated" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {openDropdown === "dofollow" && (
                    <div className="header-dropdown-menu">
                      <div
                        className="dropdown-item"
                        onClick={handleDofollowClick}
                      >
                        Sort ascending
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={handleDofollowClick}
                      >
                        Sort descending
                      </div>
                    </div>
                  )}
                </div>
              </th>
              
              <th className="first-seen-col">First seen</th>
            
            </tr>
          
          </thead>
          
          <tbody>
            
            {domains.map((item, index) => (
              
              <React.Fragment key={index}>
               
                <tr>
                  
                  <td className="domain-col">
                    <button
                      className={`domain-toggle ${
                        expandedDomains[item.domain] ? "expanded" : ""
                      }`}
                      onClick={() => toggleDomain(item.domain)}
                    >
                      {item.domain}{" "}
                      <span
                        className={`toggle-arrow ${
                          expandedDomains[item.domain] ? "rotated" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                  </td>
                  
                  <td className="dr-col">{item.dr}</td>
                  
                  <td className="number-col">
                    {formatNumber(item.dofollowRef)}
                  </td>
                  
                  <td className="number-col">
                    {formatNumber(item.dofollowLinked)}
                  </td>
                  
                  <td>
                    <div
                      className="dropdown-value"
                      onClick={() => toggleDropdown(`linkedPages-${index}`)}
                    >
                      {formatNumber(item.linkedPages)}{" "}
                      <span
                        className={`dropdown-arrow ${
                          openDropdown === `linkedPages-${index}`
                            ? "rotated"
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                      {openDropdown === `linkedPages-${index}` && (
                        <div className="cell-dropdown-menu">
                          <div
                            className="dropdown-item"
                            onClick={() => handleLinkedPagesClick(item.domain)}
                          >
                            View linked pages
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td>
                    <div
                      className="dropdown-value"
                      onClick={() => toggleDropdown(`linksFromTarget-${index}`)}
                    >
                      {formatNumber(item.linksFromTarget)}{" "}
                      <span
                        className={`dropdown-arrow ${
                          openDropdown === `linksFromTarget-${index}`
                            ? "rotated"
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                      {openDropdown === `linksFromTarget-${index}` && (
                        <div className="cell-dropdown-menu">
                          <div
                            className="dropdown-item"
                            onClick={() =>
                              handleLinksFromTargetClick(item.domain)
                            }
                          >
                            View links from target
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td>
                    <div className="dofollow-cell">
                      <div className="dofollow-count">
                        {formatNumber(item.dofollowCount)}
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{
                            width: `${(item.dofollowCount / 8000) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="first-seen-col">{item.firstSeen}</td>
                
                </tr>
                
                {expandedDomains[item.domain] && (
                  
                  <tr className="expanded-row">
                    
                    <td colSpan="8">
                      
                      <div className="expanded-content">
                        
                        <div className="expanded-title">
                          Top pages for {item.domain}
                        </div>
                        
                        <div className="expanded-info">
                          
                          <div className="info-item">
                            <div className="info-label">Total backlinks:</div>
                            <div className="info-value">
                              {formatNumber(item.linksFromTarget)}
                            </div>
                          </div>
                          
                          <div className="info-item">
                            <div className="info-label">Dofollow links:</div>
                            <div className="info-value">
                              {formatNumber(item.dofollowCount)}
                            </div>
                          </div>
                          
                          <div className="info-item">
                            <div className="info-label">First seen:</div>
                            <div className="info-value">{item.firstSeen}</div>
                          </div>
                        
                        </div>
                     
                      </div>
                    
                    </td>
                  
                  </tr>
                
                )}
              
              </React.Fragment>
            
            ))}
          
          </tbody>
        
        </table>
      
      </div>
    
    </div>
  );
};

export default ReferringDomains;
