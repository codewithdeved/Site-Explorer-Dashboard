import React, { useState } from "react";
import "./referringips.css";

const ReferringIPs = () => {
  
  const [sortColumn, setSortColumn] = useState("domainTraffic");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [linkDropdownOpen, setLinkDropdownOpen] = useState(false);
  const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);
  const [tab, setTab] = useState("all");
  const [history, setHistory] = useState("last30days");
  const [searchTerm, setSearchTerm] = useState("");

  const referringIPs = [
    {
      uniqueId: "ip1-1",
      ip: "157.240.22.35",
      dr: 96,
      ur: 27,
      domainTraffic: "8.4M",
      referringDomains: 912,
      linkedDomains: 24,
      externalLinks: 86,
      pageTraffic: "318.9K",
      keywordsCount: 9350,
      anchorText: "Website authority checker",
      firstSeen: "19 Apr 2022",
      lastSeen: "1d ago",
      links: 285,
    },
    {
      uniqueId: "ip2-1",
      ip: "104.244.42.65",
      dr: 94,
      ur: 25,
      domainTraffic: "5.1M",
      referringDomains: 783,
      linkedDomains: 18,
      externalLinks: 62,
      pageTraffic: "244.6K",
      keywordsCount: 7920,
      anchorText: "Complete SEO analysis tools",
      firstSeen: "22 Jan 2023",
      lastSeen: "12h ago",
      links: 237,
    },
    {
      uniqueId: "ip3-1",
      ip: "54.239.28.85",
      dr: 78,
      ur: 15,
      domainTraffic: "950.2K",
      referringDomains: 210,
      linkedDomains: 5,
      externalLinks: 19,
      pageTraffic: "52.7K",
      keywordsCount: 1840,
      anchorText: "Keyword research platform",
      firstSeen: "15 Aug 2022",
      lastSeen: "4h ago",
      links: 98,
    },
    {
      uniqueId: "ip4-1",
      ip: "172.217.21.14",
      dr: 85,
      ur: 18,
      domainTraffic: "1.8M",
      referringDomains: 321,
      linkedDomains: 8,
      externalLinks: 27,
      pageTraffic: "86.2K",
      keywordsCount: 3420,
      anchorText: "Backlink analyzer tool",
      firstSeen: "3 Jul 2022",
      lastSeen: "2d ago",
      links: 132,
    },
    {
      uniqueId: "ip5-1",
      ip: "192.168.1.1",
      dr: 92,
      ur: 22,
      domainTraffic: "3.2M",
      referringDomains: 542,
      linkedDomains: 12,
      externalLinks: 43,
      pageTraffic: "123.4K",
      keywordsCount: 5680,
      anchorText: "SEO tools and resources",
      firstSeen: "10 Jun 2023",
      lastSeen: "8h ago",
      links: 185,
    },
    {
      uniqueId: "ip1-2",
      ip: "157.240.22.35",
      dr: 96,
      ur: 27,
      domainTraffic: "8.4M",
      referringDomains: 912,
      linkedDomains: 24,
      externalLinks: 86,
      pageTraffic: "318.9K",
      keywordsCount: 9350,
      anchorText: "Website authority checker",
      firstSeen: "19 Apr 2022",
      lastSeen: "1d ago",
      links: 285,
    },
    {
      uniqueId: "ip3-2",
      ip: "54.239.28.85",
      dr: 78,
      ur: 15,
      domainTraffic: "950.2K",
      referringDomains: 210,
      linkedDomains: 5,
      externalLinks: 19,
      pageTraffic: "52.7K",
      keywordsCount: 1840,
      anchorText: "Keyword research platform",
      firstSeen: "15 Aug 2022",
      lastSeen: "4h ago",
      links: 98,
    },
    {
      uniqueId: "ip5-2",
      ip: "192.168.1.1",
      dr: 92,
      ur: 22,
      domainTraffic: "3.2M",
      referringDomains: 542,
      linkedDomains: 12,
      externalLinks: 43,
      pageTraffic: "123.4K",
      keywordsCount: 5680,
      anchorText: "SEO tools and resources",
      firstSeen: "10 Jun 2023",
      lastSeen: "8h ago",
      links: 185,
    }
  ];

  const parseTrafficValue = (value) => {
    if (typeof value !== "string") return value;
    const number = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (value.includes("K")) return number * 1000;
    if (value.includes("M")) return number * 1000000;
    return number;
  };

  const filteredData = referringIPs.filter(ip => 
    ip.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ip.anchorText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];
    if (
      typeof aValue === "string" &&
      (aValue.includes("K") || aValue.includes("M"))
    ) {
      aValue = parseTrafficValue(aValue);
      bValue = parseTrafficValue(bValue);
    }
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const handleSelectRow = (uniqueId) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(uniqueId)) {
      const index = newSelectedRows.indexOf(uniqueId);
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(uniqueId);
    }
    setSelectedRows(newSelectedRows);
    setSelectedAll(newSelectedRows.length === referringIPs.length);
  };

  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(referringIPs.map((ip) => ip.uniqueId));
    }
    setSelectedAll(!selectedAll);
  };

  const handleLinkDropdownToggle = () => {
    setLinkDropdownOpen(!linkDropdownOpen);
    setHistoryDropdownOpen(false);
  };

  const handleHistoryDropdownToggle = () => {
    setHistoryDropdownOpen(!historyDropdownOpen);
    setLinkDropdownOpen(false);
  };

  const handleTabChange = (tab) => {
    setTab(tab);
    setLinkDropdownOpen(false);
  };

  const handleHistoryChange = (history) => {
    setHistory(history);
    setHistoryDropdownOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    
    <div className="ref-ips-container">
      
      <header className="ref-ips-header">
        
        <div className="ref-ips-count">
          <span>{filteredData.length} referring IPs</span>
        </div>
        
        <div className="ref-ips-controls">
          <input 
            type="text"
            placeholder="Search IPs or anchors..."
            value={searchTerm}
            onChange={handleSearch}
            className="ref-ips-search"
          />
          <div className="ref-ips-dropdown">
            <button className="ref-ips-dropdown-btn" onClick={handleLinkDropdownToggle}>
              One link per domain
              <span className="ref-ips-dropdown-arrow">▼</span>
            </button>
            {linkDropdownOpen && (
              <ul className="ref-ips-dropdown-menu">
                <li>
                  <a href="#" onClick={() => handleTabChange("oneLink")}>
                    One link per domain
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleTabChange("multipleLinks")}>
                    Multiple links per domain
                  </a>
                </li>
              </ul>
            )}
          </div>
          <div className="ref-ips-tabs">
            <button
              className={`ref-ips-tab ${tab === "all" ? "active" : ""}`}
              onClick={() => handleTabChange("all")}
            >
              All
            </button>
            <button
              className={`ref-ips-tab ${tab === "new" ? "active" : ""}`}
              onClick={() => handleTabChange("new")}
            >
              New
            </button>
            <button
              className={`ref-ips-tab ${tab === "lost" ? "active" : ""}`}
              onClick={() => handleTabChange("lost")}
            >
              Lost
            </button>
          </div>
          <div className="ref-ips-dropdown history-dropdown">
            <button className="ref-ips-dropdown-btn" onClick={handleHistoryDropdownToggle}>
              Show history: {history}
              <span className="ref-ips-dropdown-arrow">▼</span>
            </button>
            {historyDropdownOpen && (
              <ul className="ref-ips-dropdown-menu">
                <li>
                  <a href="#" onClick={() => handleHistoryChange("last30days")}>
                    Last 30 days
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleHistoryChange("last60days")}>
                    Last 60 days
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleHistoryChange("last90days")}>
                    Last 90 days
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      
      </header>
      
      <div className="ref-ips-table-wrapper">
        <table className="ref-ips-table">
          <thead>
            <tr>
              <th className="ref-ips-checkbox-column">
                <label className="ref-ips-checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedAll}
                    onChange={handleSelectAll}
                  />
                  <span className="ref-ips-checkmark"></span>
                </label>
              </th>
              <th
                className="ref-ips-ip-column ref-ips-sortable"
                onClick={() => handleSort("ip")}
              >
                <div className="ref-ips-th-content">
                  Referring IP
                  {sortColumn === "ip" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-dr-column ref-ips-sortable"
                onClick={() => handleSort("dr")}
              >
                <div className="ref-ips-th-content">
                  DR
                  {sortColumn === "dr" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-ur-column ref-ips-sortable"
                onClick={() => handleSort("ur")}
              >
                <div className="ref-ips-th-content">
                  UR
                  {sortColumn === "ur" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-domain-traffic-column ref-ips-sortable"
                onClick={() => handleSort("domainTraffic")}
              >
                <div className="ref-ips-th-content">
                  Domain traffic
                  {sortColumn === "domainTraffic" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-ref-domains-column ref-ips-sortable"
                onClick={() => handleSort("referringDomains")}
              >
                <div className="ref-ips-th-content">
                  Referring domains
                  {sortColumn === "referringDomains" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-linked-domains-column ref-ips-sortable"
                onClick={() => handleSort("linkedDomains")}
              >
                <div className="ref-ips-th-content">
                  Linked domains
                  {sortColumn === "linkedDomains" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-ext-links-column ref-ips-sortable"
                onClick={() => handleSort("externalLinks")}
              >
                <div className="ref-ips-th-content">
                  Ext. links
                  {sortColumn === "externalLinks" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-page-traffic-column ref-ips-sortable"
                onClick={() => handleSort("pageTraffic")}
              >
                <div className="ref-ips-th-content">
                  Page traffic
                  {sortColumn === "pageTraffic" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th
                className="ref-ips-keywords-column ref-ips-sortable"
                onClick={() => handleSort("keywordsCount")}
              >
                <div className="ref-ips-th-content">
                  Kw.
                  {sortColumn === "keywordsCount" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th className="ref-ips-anchor-column">
                <div className="ref-ips-th-content">Anchor and target URL</div>
              </th>
              <th className="ref-ips-date-column">
                <div className="ref-ips-th-content">
                  <div>First seen</div>
                  <div>Last seen</div>
                </div>
              </th>
              <th
                className="ref-ips-links-column ref-ips-sortable"
                onClick={() => handleSort("links")}
              >
                <div className="ref-ips-th-content">
                  Links
                  {sortColumn === "links" && (
                    <span className={`ref-ips-sort-arrow ${sortDirection}`}></span>
                  )}
                </div>
              </th>
              <th className="ref-ips-inspect-column">
                <div className="ref-ips-th-content">Inspect</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((ip) => (
              <tr
                key={ip.uniqueId}
                className={selectedRows.includes(ip.uniqueId) ? "selected" : ""}
              >
                <td className="ref-ips-checkbox-cell">
                  <label className="ref-ips-checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(ip.uniqueId)}
                      onChange={() => handleSelectRow(ip.uniqueId)}
                    />
                    <span className="ref-ips-checkmark"></span>
                  </label>
                </td>
                <td className="ref-ips-ip-cell">
                  <a href="#" className="ref-ips-ip-link">
                    {ip.ip}
                  </a>
                </td>
                <td>
                  <div className="ref-ips-dr-badge">{ip.dr}</div>
                </td>
                <td>
                  <div className="ref-ips-ur-badge">{ip.ur}</div>
                </td>
                <td className="ref-ips-traffic-value">{ip.domainTraffic}</td>
                <td className="ref-ips-numeric-value">{ip.referringDomains}</td>
                <td className="ref-ips-numeric-value">{ip.linkedDomains}</td>
                <td className="ref-ips-numeric-value">{ip.externalLinks}</td>
                <td className="ref-ips-traffic-value">{ip.pageTraffic}</td>
                <td className="ref-ips-numeric-value">{ip.keywordsCount}</td>
                <td className="ref-ips-anchor-text">
                  <a href="#" className="ref-ips-anchor-link">
                    {ip.anchorText}
                  </a>
                </td>
                <td className="ref-ips-dates-cell">
                  <div className="ref-ips-first-seen">{ip.firstSeen}</div>
                  <div className="ref-ips-last-seen">{ip.lastSeen}</div>
                </td>
                <td>
                  <a href="#" className="ref-ips-links-value">
                    {ip.links}
                  </a>
                </td>
                <td className="ref-ips-inspect-cell">
                  <button className="ref-ips-inspect-button" aria-label="Inspect">
                    <svg
                      className="ref-ips-search-icon"
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
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
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

export default ReferringIPs;