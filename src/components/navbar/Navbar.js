import React, { useState, useEffect, useRef } from "react";

import "./navbar.css";

const Navbar = () => {
  
    const [openDropdown, setOpenDropdown] = useState(null);

  const moreDropdownRef = useRef(null);
  const creditsDropdownRef = useRef(null);
  const enterpriseDropdownRef = useRef(null);
  const subDomainsDropdownRef = useRef(null);
  const httpsDropdownRef = useRef(null);
  const dashboardDropdownRef = useRef(null);
  const inputDropdownRef = useRef(null);
  const exportedFilesDropdownRef = useRef(null);

  const userDropdownRef = useRef(null);

  const toggleDropdown = (menu) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (openDropdown === "more" &&
          moreDropdownRef.current &&
          !moreDropdownRef.current.contains(event.target)) ||
        (openDropdown === "credits" &&
          creditsDropdownRef.current &&
          !creditsDropdownRef.current.contains(event.target)) ||
        (openDropdown === "enterprise" &&
          enterpriseDropdownRef.current &&
          !enterpriseDropdownRef.current.contains(event.target)) ||
        (openDropdown === "subdomains" &&
          subDomainsDropdownRef.current &&
          !subDomainsDropdownRef.current.contains(event.target)) ||
        (openDropdown === "https" &&
          httpsDropdownRef.current &&
          !httpsDropdownRef.current.contains(event.target)) ||
        (openDropdown === "dashboard" &&
          dashboardDropdownRef.current &&
          !dashboardDropdownRef.current.contains(event.target)) ||
        (openDropdown === "input" &&
          inputDropdownRef.current &&
          !inputDropdownRef.current.contains(event.target)) ||
        (openDropdown === "exportedFiles" &&
          exportedFilesDropdownRef.current &&
          !exportedFilesDropdownRef.current.contains(event.target)) ||
        (openDropdown === "user" &&
          userDropdownRef.current &&
          !userDropdownRef.current.contains(event.target))
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && openDropdown) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [openDropdown]);

  return (
    
    <div className="nav-container">
      
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo">
            <div className="text-container">
              <div className="site front-face">SITE</div>
              <div className="dot front-face">.</div>
              <div className="xp front-face">XP</div>
            </div>
          </div>
        </div>

        <ul className="navbar-menu">
          <div
            className={`dashboard-dropdown dropdown ${
              openDropdown === "dashboard" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("dashboard")}
            ref={dashboardDropdownRef}
          >
            <span>Dashboard</span>

            <svg
              viewBox="0 0 16 16"
              className={`dropdown-icon ${
                openDropdown === "dashboard" ? "open" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                className="css-kqzqgg"
                d="M8.2755 9L11.7747 5.5L13.2256 6.83098L9.1349 11H6.86011L2.77429 6.83052L4.2261 5.50046L7.72029 9H8.2755Z"
              ></path>
            </svg>

            {openDropdown === "dashboard" && (
              <ul className="dropdown-menu open">
                <li style={{ backgroundColor: "#ffdbb3" }}>Dashboard</li>
                <li>AI Content Explorer</li>
                <li>Site Explorer</li>
                <li>Keywords Explorer</li>
                <li>Site Audit</li>
                <li>Rank Tracker</li>
                <li>Content Explorer</li>
                <li>Web Explorer</li>
                <li>Competitive Analysis</li>
                <li className="dashboard-academy">
                  Academy
                  <svg
                    className="dashboard-academy-icon"
                    height="12px"
                    width="12px"
                    viewBox="0 0 12 12"
                  >
                    <path
                      className="css-kqzqgg"
                      d="M5.35355 7.38909L10 2.74264V6H11V1H6V2H9.32843L4.64645 6.68198L5.35355 7.38909ZM1 11H10V8H9V10H2V3H4V2H1V11Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </li>
                <li
                  className="dashboard-community"
                  style={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}
                >
                  Community
                  <svg
                    className="dashboard-community-icon"
                    height="12px"
                    width="12px"
                    viewBox="0 0 12 12"
                  >
                    <path
                      className="css-kqzqgg"
                      d="M5.35355 7.38909L10 2.74264V6H11V1H6V2H9.32843L4.64645 6.68198L5.35355 7.38909ZM1 11H10V8H9V10H2V3H4V2H1V11Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </li>
                <li>
                  AI Content Grader{" "}
                  <small className="badge-experimental">Experimental</small>
                </li>
                <li>Alerts</li>
                <li>Ahrefs Rank</li>
                <li>Batch Analysis</li>
              </ul>
            )}
          </div>

          <li className="menu-item l1">AI Content Helper</li>
          <li className="menu-item l2">Site Explorer</li>
          <li className="menu-item l3">Keywords Explorer</li>
          <li className="menu-item l4">Site Audit</li>
          <li className="menu-item l5">Rank Tracker</li>
          <li className="menu-item l6">Content Explorer</li>
          <li className="menu-item l7">Web Explorer</li>
          <li className="menu-item l8">Competitive Analysis</li>

          <div
            className={`more-dropdown dropdown ${
              openDropdown === "more" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("more")}
            ref={moreDropdownRef}
          >
            <span>More</span>

            <svg
              viewBox="0 0 16 16"
              className={`dropdown-icon ${
                openDropdown === "more" ? "open" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                className="css-kqzqgg"
                d="M8.2755 9L11.7747 5.5L13.2256 6.83098L9.1349 11H6.86011L2.77429 6.83052L4.2261 5.50046L7.72029 9H8.2755Z"
              ></path>
            </svg>

            {openDropdown === "more" && (
              <ul className="dropdown-menu open">
                <li style={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}>
                  Community
                  <svg
                    className="community-icon"
                    height="12px"
                    width="12px"
                    viewBox="0 0 12 12"
                  >
                    <path
                      className="css-kqzqgg"
                      d="M5.35355 7.38909L10 2.74264V6H11V1H6V2H9.32843L4.64645 6.68198L5.35355 7.38909ZM1 11H10V8H9V10H2V3H4V2H1V11Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </li>
                <li>
                  AI Content Grader{" "}
                  <small className="badge-experimental">Experimental</small>
                </li>
                <li>Alerts</li>
                <li>Ahrefs Rank</li>
                <li>Batch Analysis</li>
                <li>
                  Batch Analysis 2.0 <small className="badge-beta">Beta</small>
                </li>
                <li>SEO Toolbar</li>
                <li>WordPress Plugin</li>
                <li>Ahrefs API</li>
                <li>Apps</li>
              </ul>
            )}
          </div>

          <li className="menu-item academy l9">
            Academy
            <svg
              className="css-0"
              height="12px"
              width="12px"
              viewBox="0 0 12 12"
            >
              <path
                className="css-kqzqgg"
                d="M5.35355 7.38909L10 2.74264V6H11V1H6V2H9.32843L4.64645 6.68198L5.35355 7.38909ZM1 11H10V8H9V10H2V3H4V2H1V11Z"
                fillRule="evenodd"
              />
            </svg>
          </li>

          <div
            className={`exported-files-dropdown dropdown ${
              openDropdown === "exportedFiles" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("exportedFiles")}
            ref={exportedFilesDropdownRef}
          >
            {/* <span>Dashboard</span> */}

            <svg
              className="css-0"
              height="16px"
              width="16px"
              viewBox="0 0 16 16"
            >
              <path
                className="css-1r7gd7x"
                d="M14.3333 0H1.65833C0.733333 0 0.00833333 0.75 0.00833333 1.66667L0 14.3333C0 15.25 0.733333 16 1.65833 16H14.3333C15.25 16 16 15.25 16 14.3333V1.66667C16 0.75 15.25 0 14.3333 0ZM14 2V11H10C10 12.1046 9.10457 13 8 13C6.89543 13 6 12.1046 6 11H2V2H14Z"
                fillRule="evenodd"
              />
            </svg>

            {openDropdown === "exportedFiles" && (
              <ul className="dropdown-menu open">
                <li
                  style={{
                    borderBottom: "1px solid hsl(0, 0%, 80%)",
                    padding: "0.75rem 1rem",
                    fontWeight: "bold",
                  }}
                >
                  Exported Files <br />{" "}
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Stored for 7 days from creation
                  </small>
                </li>
                <li style={{ textAlign: "center" }}>
                  You have no exported files
                </li>
              </ul>
            )}
          </div>

          <li className="menu-item upgrade l10" style={{ color: "#ff8800" }}>
            <svg
              className="css-0"
              height="14px"
              width="14px"
              viewBox="0 0 14 14"
            >
              <path
                className="css-1ua0e0a"
                d="M0 3.47396V2.86002L0.332613 2.83008C1.63283 2.71029 2.50972 1.76693 2.64579 0.314453L2.67602 0H3.35637L3.38661 0.314453C3.52268 1.76693 4.39957 2.71029 5.7149 2.83008L6.03242 2.86002V3.47396L5.7149 3.48893C4.44492 3.54883 3.53779 4.52213 3.38661 6.01953L3.35637 6.33401H2.67602L2.64579 6.01953C2.4946 4.52213 1.60259 3.54883 0.332613 3.48893L0 3.47396ZM4.2635 7.93619V7.20248L6.7732 6.63349C7.77105 6.40885 7.95247 6.13935 8.11877 5.1211L8.64797 1.87175H9.61555L10.1447 5.1211C10.311 6.13935 10.4924 6.40885 11.4752 6.63349L14 7.20248V7.93619L11.4752 8.52017C10.4924 8.74481 10.3413 9.01431 10.1447 10.0326L9.61555 13.4167H8.64797L8.11877 10.0326C7.95247 9.01431 7.77105 8.74481 6.7732 8.52017L4.2635 7.93619ZM0.453564 10.4668V10.2122C1.31533 9.88283 1.82937 9.35871 2.20735 8.38542H2.40389C2.79698 9.35871 3.32613 9.89777 4.17279 10.2122V10.4668C3.32613 10.7962 2.78186 11.2454 2.40389 12.3236H2.20735C1.82937 11.2454 1.31533 10.7962 0.453564 10.4668Z"
                fillRule="evenodd"
              />
            </svg>
            Upgrade
          </li>

          <div
            className={`user-dropdown dropdown ${
              openDropdown === "user" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("user")}
            ref={userDropdownRef}
          >
            <span className="username">Tayyab Al's workspace</span>

            <svg
              viewBox="0 0 16 16"
              className={`dropdown-icon ${
                openDropdown === "user" ? "open" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                className="css-kqzqgg"
                d="M8.2755 9L11.7747 5.5L13.2256 6.83098L9.1349 11H6.86011L2.77429 6.83052L4.2261 5.50046L7.72029 9H8.2755Z"
              ></path>
            </svg>

            <svg
              className="user-icon"
              height="16px"
              width="16px"
              viewBox="0 0 16 16"
            >
              <path
                className="css-kqzqgg"
                d="M7.99987 9C8.62853 9 9.5111 8.80195 10.15 8.26707 10.7888 7.73235 11.6644 6.92256 11.9755 4.2 12.2652 1.6644 10.4688 0 7.99987 0 5.531 0 3.73511 1.66432 4.02455 4.2 4.33531 6.92256 5.21124 7.73235 5.84998 8.26707 6.48871 8.80179 7.37122 9 7.99987 9ZM0 14.7C0 12.04 5.33 11 8 11 10.67 11 16 12.04 16 14.7V16H0V14.7Z"
                fillRule="evenodd"
              />
            </svg>

            {openDropdown === "user" && (
              <ul className="dropdown-menu open user-dropdown-menu">
                <li className="user" style={{ borderBottom: "0" }}>
                  <svg
                    style={{ marginLeft: "-1.25rem", marginRight: "0.25rem" }}
                    className="css-0"
                    height="14px"
                    width="14px"
                    viewBox="0 0 14 14"
                  >
                    <path
                      className="css-kqzqgg"
                      d="M0 8.41726L4.5 12.9173L14 3.41726L12.5828 2L4.5 10.0827L1.41725 7L0 8.41726Z"
                      fillRule="evenodd"
                    />
                  </svg>
                  Tayyab Ali's workspace <br />{" "}
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Free plan, 1 member
                  </small>{" "}
                  <br />
                </li>
                <li>
                  <button type="button" className="badge-invite-members">
                    Invite members
                  </button>
                </li>
                <li style={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}>
                  Account settings
                </li>
                <li style={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}>
                  Appearance <small>System</small>
                </li>
                <li>Sign out</li>
              </ul>
            )}
          </div>
        </ul>
      </nav>
      
      <div className="navbar-search-area">
        <div className="search-bar">
          <div
            className={`https-dropdown dropdown ${
              openDropdown === "https" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("https")}
            ref={httpsDropdownRef}
          >
            <span>http + https</span>
            <svg
              viewBox="0 0 16 16"
              className={`dropdown-icon ${
                openDropdown === "https" ? "open" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                className="css-kqzqgg"
                d="M8.2755 9L11.7747 5.5L13.2256 6.83098L9.1349 11H6.86011L2.77429 6.83052L4.2261 5.50046L7.72029 9H8.2755Z"
              ></path>
            </svg>
            {openDropdown === "https" && (
              <ul className="dropdown-menu open">
                <li style={{ backgroundColor: "#ffdbb3" }}>
                  {" "}
                  http + https (recommended){" "}
                </li>
                <li>http</li>
                <li>https</li>
                <li
                  style={{
                    borderTop: "1px solid hsl(0, 0%, 80%)",
                    color: "hsl(0, 0%, 40%)",
                  }}
                >
                  <small>
                    We recommend using the "http + https" <br /> protocol to get
                    the most complete backlink <br /> profile and accurate
                    tracking data.
                  </small>
                </li>
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="Domain or URL"
            className="search-input"
          />

          <div
            className={`subdomains-dropdown dropdown ${
              openDropdown === "subdomains" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("subdomains")}
            ref={subDomainsDropdownRef}
          >
            <span>Subdomains</span>
            <svg
              viewBox="0 0 16 16"
              className={`dropdown-icon ${
                openDropdown === "subdomains" ? "open" : ""
              }`}
            >
              <path
                fillRule="evenodd"
                className="css-kqzqgg"
                d="M8.2755 9L11.7747 5.5L13.2256 6.83098L9.1349 11H6.86011L2.77429 6.83052L4.2261 5.50046L7.72029 9H8.2755Z"
              ></path>
            </svg>
            {openDropdown === "subdomains" && (
              <ul className="dropdown-menu open">
                <li>
                  Exact URL
                  <br />
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Only specified URL
                    <br />
                    example.com/path/
                  </small>
                </li>
                <li style={{ borderTop: "1px solid hsl(0, 0%, 80%)" }}>
                  Path
                  <br />
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Path including subfolders
                    <br />
                    example.com/path/*
                  </small>
                </li>
                <li style={{ borderTop: "1px solid hsl(0, 0%, 80%)" }}>
                  Domain
                  <br />
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Only specified domain
                    <br />
                    example.com/*
                  </small>
                </li>
                <li style={{ backgroundColor: "#ffdbb3" }}>
                  Subdomains
                  <br />
                  <small>
                    Domain including subdomains
                    <br />
                    *.example.com/*
                  </small>
                </li>
              </ul>
            )}
          </div>

          <div
            className={`input-dropdown dropdown ${
              openDropdown === "input" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("input")}
            ref={inputDropdownRef}
          >
            <svg
              className="input-dropdown-icon"
              height="14px"
              width="14px"
              viewBox="0 0 14 14"
            >
              <path
                className="css-kqzqgg"
                d="M11.83 3C11.42 1.83 10.31 1 9 1C7.69 1 6.58 1.83 6.17 3H0V5H6.17C6.58 6.17 7.69 7 9 7C10.31 7 11.42 6.17 11.83 5H14V3H11.83ZM9 5C8.45 5 8 4.55 8 4C8 3.45 8.45 3 9 3C9.55 3 10 3.45 10 4C10 4.55 9.55 5 9 5ZM5 7C3.69 7 2.58 7.83 2.17 9H0V11H2.17C2.58 12.17 3.69 13 5 13C6.31 13 7.42 12.17 7.83 11H14V9H7.83C7.42 7.83 6.31 7 5 7ZM5 11C4.45 11 4 10.55 4 10C4 9.45 4.45 9 5 9C5.55 9 6 9.45 6 10C6 10.55 5.55 11 5 11Z"
                fillRule="evenodd"
              />
            </svg>

            {openDropdown === "input" && (
              <ul className="dropdown-menu open input-dropdown-menu">
                <li>http + https (recommended)</li>
                <li>http</li>
                <li style={{ borderBottom: "1px solid hsl(0, 0%, 80%)" }}>
                  https
                </li>
                <li>
                  Exact URL <br />{" "}
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Only specified URL (example.com/path/)
                  </small>
                </li>
                <li>
                  Path <br />{" "}
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Path including subfolders (example.com/path/*)
                  </small>
                </li>
                <li>
                  Domain <br />{" "}
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Only specified domain (example.com/*)
                  </small>
                </li>
                <li>
                  Subdomains (checked) <br />{" "}
                  <small style={{ color: "hsl(0, 0%, 40%)" }}>
                    Domain including subdomains (.example.com/)
                  </small>
                </li>
              </ul>
            )}
          </div>

          <span className="search-icon">
            <svg
              className="search"
              height="14px"
              width="14px"
              viewBox="0 0 14 14"
            >
              <path
                className="css-kqzqgg"
                d="M6 11C7.01929 11 7.96734 10.695 8.75787 10.1713L12.06 13.47L13.47 12.06L10.1713 8.75783C10.695 7.96731 11 7.01927 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM9.2 6C9.2 7.76731 7.76731 9.2 6 9.2C4.23269 9.2 2.8 7.76731 2.8 6C2.8 4.23269 4.23269 2.8 6 2.8C7.76731 2.8 9.2 4.23269 9.2 6Z"
                fillRule="evenodd"
              />
            </svg>
          </span>

          <span className="questionmark-icon">
            <svg height="14px" width="14px" viewBox="0 0 14 14">
              <path
                className="css-kqzqgg"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7 11.6667C7.64433 11.6667 8.16667 11.1443 8.16667 10.5C8.16667 9.85567 7.64433 9.33333 7 9.33333C6.35567 9.33333 5.83333 9.85567 5.83333 10.5C5.83333 11.1443 6.35567 11.6667 7 11.6667ZM5.96165 4.9V4.66667C5.97028 4.36285 6.06986 4.10973 6.26193 3.93693C6.454 3.76413 6.70973 3.67773 7.02913 3.67773C7.70246 3.67773 8.03912 3.99864 8.03912 4.64046C8.03912 5.24349 7.60427 5.68769 7.21365 5.99341C6.82303 6.29913 6.46327 6.60959 6.31652 6.9248C6.2018 7.17122 6.13192 7.48058 6.10688 7.85167C6.10365 7.89954 6.10098 7.96465 6.09883 8.05C6.09883 8.11458 6.15118 8.16693 6.21576 8.16693L7.76321 8.16667C7.82399 8.16667 7.87458 8.12001 7.8795 8.05944L7.89669 7.84766C7.94417 7.47548 8.10602 7.15077 8.43406 6.87354C9.01737 6.33805 9.42957 5.87378 9.67064 5.48071C9.84335 5.19913 9.91667 4.88922 9.91667 4.56641C9.91667 3.85622 9.66417 3.30651 9.15918 2.91724C8.65418 2.52797 7.91504 2.33333 7 2.33333C6.0936 2.33333 5.40733 2.53841 4.88291 2.94857C4.36361 3.35472 4.09719 3.92994 4.08366 4.64546L4.08333 4.9C4.08333 4.96444 4.13557 5.01667 4.2 5.01667H5.84498C5.90942 5.01667 5.96165 4.96444 5.96165 4.9Z"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <div className="how-to-use">
          <svg height="14px" width="14px" viewBox="0 0 14 14">
            <path
              className="css-kqzqgg"
              d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7 11.6667C7.64433 11.6667 8.16667 11.1443 8.16667 10.5C8.16667 9.85567 7.64433 9.33333 7 9.33333C6.35567 9.33333 5.83333 9.85567 5.83333 10.5C5.83333 11.1443 6.35567 11.6667 7 11.6667ZM5.96165 4.9V4.66667C5.97028 4.36285 6.06986 4.10973 6.26193 3.93693C6.454 3.76413 6.70973 3.67773 7.02913 3.67773C7.70246 3.67773 8.03912 3.99864 8.03912 4.64046C8.03912 5.24349 7.60427 5.68769 7.21365 5.99341C6.82303 6.29913 6.46327 6.60959 6.31652 6.9248C6.2018 7.17122 6.13192 7.48058 6.10688 7.85167C6.10365 7.89954 6.10098 7.96465 6.09883 8.05C6.09883 8.11458 6.15118 8.16693 6.21576 8.16693L7.76321 8.16667C7.82399 8.16667 7.87458 8.12001 7.8795 8.05944L7.89669 7.84766C7.94417 7.47548 8.10602 7.15077 8.43406 6.87354C9.01737 6.33805 9.42957 5.87378 9.67064 5.48071C9.84335 5.19913 9.91667 4.88922 9.91667 4.56641C9.91667 3.85622 9.66417 3.30651 9.15918 2.91724C8.65418 2.52797 7.91504 2.33333 7 2.33333C6.0936 2.33333 5.40733 2.53841 4.88291 2.94857C4.36361 3.35472 4.09719 3.92994 4.08366 4.64546L4.08333 4.9C4.08333 4.96444 4.13557 5.01667 4.2 5.01667H5.84498C5.90942 5.01667 5.96165 4.96444 5.96165 4.9Z"
              fillRule="evenodd"
            />
          </svg>
          <span>How to use</span>
        </div>
      </div>
    
    </div>
  
);

};

export default Navbar;