import React, { useState, useRef, useEffect } from "react";

import "./backlinks.css";

const Backlinks = () => {
  
  const [activeTab, setActiveTab] = useState("all");
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [onePerDomainOption, setOnePerDomainOption] = useState(
    "One link per domain"
  );
  
  const [historyOption, setHistoryOption] = useState("Last 30 days");
  const [showDropdowns, setShowDropdowns] = useState({});

  const [showExportOptions, setShowExportOptions] = useState(false);

  const domainDropdownRef = useRef(null);
  const historyDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);

  const data = [
    {
      id: 1,
      referringPage: {
        title: "Word Count",
        url: "https://wordcount.com/",
      },
      dr: 48,
      ur: 20,
      domainTraffic: "247.9K",
      referringDomains: 454,
      linkedDomains: 1,
      ext: 1,
      pageTraffic: "244.1K",
      kw: "2,680",
      anchorInfo: {
        text: "Created by Ahrefs",
        url: "https://ahrefs.com/",
      },
      dates: {
        firstSeen: "2 Jul 2022",
        lastSeen: "8 h ago",
        lost: false,
      },
      links: 185,
    },
    {
      id: 2,
      referringPage: {
        title: "The 6 best free keyword research tools | Zapier",
        url: "https://zapier.com/blog/best-keyword-research-tool/",
      },
      dr: 91,
      ur: 19,
      domainTraffic: "5.3M",
      referringDomains: 310,
      linkedDomains: 11,
      ext: 31,
      pageTraffic: "91.7K",
      kw: "11,753",
      anchorInfo: {
        text: "includes difficulty score, backlink estimate, and basic SERP overview;",
        additionalText:
          "paid plans start at $99/month for 500 search credits per month, additional",
        url: "https://ahrefs.com/pricing",
      },
      dates: {
        firstSeen: "1 Jun 2023",
        lastSeen: "1 d ago",
        lost: false,
      },
      links: 37,
      tags: ["EN", "CONTENT", "NOFOLLOW"],
    },
    {
      id: 3,
      referringPage: {
        title: "The Top 11 Search Engines, Ranked by Popularity",
        url: "https://blog.hubspot.com/marketing/top-search-engines",
      },
      dr: 93,
      ur: 26,
      domainTraffic: "16.5M",
      referringDomains: "1,003",
      linkedDomains: 36,
      ext: 106,
      pageTraffic: "90.1K",
      kw: "7,026",
      anchorInfo: {
        text: "competitor vying for user business in the near future, as Ahrefs has announced they are working on a search engine of",
        url: "https://ahrefs.com/",
      },
      dates: {
        firstSeen: "10 Jun 2023",
        lastSeen: "7 h ago",
        lost: false,
      },
      links: 209,
      tags: ["EN", "CONTENT"],
      author: "By Caroline Forsey",
    },
    {
      id: 4,
      referringPage: {
        title: "Blog - Wikipedia",
        url: "https://en.wikipedia.org/wiki/Blog",
      },
      dr: 96,
      ur: 47,
      domainTraffic: "2.2B",
      referringDomains: "18,318",
      linkedDomains: 209,
      ext: 316,
      pageTraffic: "86.2K",
      kw: "7,408",
      anchorInfo: {
        text: 'Hardwick, Si Quan Ong, Rebecca Liew, Joshua (February 3, 2022). "71 Blogging Statistics for 2022" .SEO Blog by Ahrefs',
        url: "https://ahrefs.com/blog/blogging-statistics/",
      },
      dates: {
        firstSeen: "31 Dec 2022",
        lastSeen: "18 h ago",
        lost: false,
      },
      links: 5,
      tags: ["WIKIS", "NOFOLLOW"],
    },
  ];

  const domainOptions = [
    "One link per domain",
    "All links",
    "Dofollow links only",
    "Text links only",
  ];

  const historyOptions = [
    "Last 7 days",
    "Last 30 days",
    "Last 60 days",
    "Last 90 days",
    "Custom range",
  ];

  const exportOptions = ["CSV", "PDF", "Excel", "Google Sheets"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        domainDropdownRef.current &&
        !domainDropdownRef.current.contains(event.target)
      ) {
        setShowDomainDropdown(false);
      }
      if (
        historyDropdownRef.current &&
        !historyDropdownRef.current.contains(event.target)
      ) {
        setShowHistoryDropdown(false);
      }
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target)
      ) {
        setShowExportOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUrlDropdown = (id, type) => {
    const key = `${id}-${type}`;
    setShowDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLinksClick = (id) => {
    alert(`Showing details for ${id} links`);
  };

  return (

    <div className="backlinks-container">

        <div className="backlinks-header">
        
          <div className="links-count">86,227 groups of links</div>

          <div className="filter-controls">
            
            <div className="domain-dropdown" ref={domainDropdownRef}>
              
              <button
                className="domain-button"
                onClick={() => setShowDomainDropdown(!showDomainDropdown)}
              >
                {onePerDomainOption}
              </button>

              {showDomainDropdown && (
                <div className="dropdown-menu backlinks-dropdown-menu">
                  {domainOptions.map((option) => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => {
                        setOnePerDomainOption(option);
                        setShowDomainDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

            </div>

            <div className="tab-group">
              
              <button
                className={`tab-button ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>

              <button
                className={`tab-button ${activeTab === "new" ? "active" : ""}`}
                onClick={() => setActiveTab("new")}
              >
                New
              </button>
              
              <button
                className={`tab-button ${activeTab === "lost" ? "active" : ""}`}
                onClick={() => setActiveTab("lost")}
              >
                Lost
              </button>
            
            </div>

            <div className="history-filter" ref={historyDropdownRef}>
              
              <button
                className="history-button"
                onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}
              >
                <span className="calendar-icon">📅</span>
                Show history: {historyOption} <span style={{color: "#666"}} className="backlinks-dropdown-icon">▼</span>
              </button>

              {showHistoryDropdown && (
                <div className="dropdown-menu backlinks-dropdown-menu">
                  {historyOptions.map((option) => (
                    <div
                      key={option}
                      className="dropdown-item"
                      onClick={() => {
                        setHistoryOption(option);
                        setShowHistoryDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

          <div className="backlinks-action-buttons">
            
            <button className="backlinks-api-button">
              <span className="icon">{'{}'}</span>
              API
            </button>

            <div className="backlinks-export-container" ref={exportDropdownRef}>
              
              <button
                className="backlinks-export-button"
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
                <div className="dropdown-menu export-menu backlinks-dropdown-menu">
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
      
      <div className="backlinks-table-container">
        
        <table className="backlinks-data-table">
          
          <thead>
            
            <tr>
              
              <th>Referring page</th>
              <th>DR</th>
              <th>UR</th>
              <th>Domain<br/>traffic</th>
              <th>Referring<br/>domains</th>
              <th>Linked<br/>domains</th>
              <th>Ext.</th>
              <th>Page<br/>traffic</th>
              <th>Kw.</th>
              <th>Anchor and target URL</th>
              
              <th className="multi-line-header">
                First seen
                <br />
                Last seen
                <br />
                <span className="lost-text">Lost</span>
              </th>
              
              <th>Links</th>
              <th>Inspect</th>
            
            </tr>
          
          </thead>
          
          <tbody>
            
            {data.map((item) => (
              
              <tr key={item.id}>
                
                <td className="referring-page">
                  
                  <a href={item.referringPage.url} className="page-title">
                    {item.referringPage.title}
                  </a>
                  
                  <div className="page-url-container">
                    
                    <a
                      href={item.referringPage.url}
                      className="page-url"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleUrlDropdown(item.id, "page");
                      }}
                    >
                      {item.referringPage.url}
                      <span className="backlinks-dropdown-icon">▼</span>
                    </a>

                    {showDropdowns[`${item.id}-page`] && (
                      <div className="url-dropdown-menu">
                        <div className="dropdown-item">Open in new tab</div>
                        <div className="dropdown-item">Copy URL</div>
                        <div className="dropdown-item">
                          Show all links from this page
                        </div>
                      </div>
                    )}

                  </div>
                  
                  {item.tags && item.tags.includes("EN") && (
                    <div className="tag">EN</div>
                  )}
                  
                  {item.tags && item.tags.includes("WIKIS") && (
                    <div className="tag">WIKIS</div>
                  )}
                  
                  {item.author && <div className="author">{item.author}</div>}
                
                </td>
                
                <td className="numeric-val">{item.dr}</td>
                <td className="numeric-val">{item.ur}</td>
                <td className="numeric-val domain-traffic">{item.domainTraffic}</td>
                
                <td className="numeric-val blue-value">
                  {item.referringDomains}
                </td>
                
                <td className="numeric-val blue-value">{item.linkedDomains}</td>
                <td className="numeric-val blue-value">{item.ext}</td>
                <td className="numeric-val">{item.pageTraffic}</td>
                <td className="numeric-val">{item.kw}</td>
                
                <td>
                  
                  <div className="anchor-text">
                    {item.anchorInfo.text}
                    {item.anchorInfo.additionalText && (
                      <span>
                        {" "}
                        <a href={item.anchorInfo.url} className="paid-link">
                          paid plans
                        </a>{" "}
                        {item.anchorInfo.additionalText}
                      </span>
                    )}
                  </div>
                  
                  {item.tags && item.tags.includes("CONTENT") && (
                    <span className="tag">CONTENT</span>
                  )}
                  
                  {item.tags && item.tags.includes("NOFOLLOW") && (
                    <span className="tag">NOFOLLOW</span>
                  )}
                  
                  <div className="anchor-url-container">
                    
                    <a
                      href={item.anchorInfo.url}
                      className="anchor-url"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleUrlDropdown(item.id, "anchor");
                      }}
                    >
                      {item.anchorInfo.url}
                      <span className="backlinks-dropdown-icon">▼</span>
                    </a>

                    {showDropdowns[`${item.id}-anchor`] && (
                      <div className="url-dropdown-menu">
                        <div className="dropdown-item">Open in new tab</div>
                        <div className="dropdown-item">Copy URL</div>
                        <div className="dropdown-item">
                          Show all links to this target
                        </div>
                      </div>
                    )}

                  </div>
                
                </td>
               
                <td className="date-col">
                  <span className="first-seen">{item.dates.firstSeen}</span>
                  <span className="last-seen">{item.dates.lastSeen}</span>
                  {item.dates.lost && <span className="lost-label">Lost</span>}
                </td>
                
                <td>
                  <button
                    className="links-dropdown"
                    onClick={() => handleLinksClick(item.id)}
                  >
                    {item.links}
                  </button>
                </td>
                
                <td>
                  <button
                    className="search-button"
                    onClick={() =>
                      alert(`Inspecting ${item.referringPage.title}`)
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                        fill="#555"
                      />
                    </svg>
                  </button>
                
                </td>
              
              </tr>
            
            ))}
          
          </tbody>
        
        </table>
      
      </div>
    
    </div>
  
);

};

export default Backlinks;