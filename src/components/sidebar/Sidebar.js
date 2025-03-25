import React from "react";

//CSS FIle
import "./sidebar.css";

//Components
import Main from "../main/Main";

//Functions
import { useSidebarFunctions } from "./SidebarFunctions";

const Sidebar = () => {
  
    const {
    isSidebarClose,
    handleSidebarClose,
    sidebarRef,
    expanded,
    toggleSection,
    isSidebarMenuItemClick,
    handleSidebarMenuItemClick,
    isOverviewButtonClick,
    handleOverviewButtonClick,
    isOrganicKeywordsButtonClick,
    handleOrganicKeywordsButtonClick,
    isTopPagesButtonClick,
    handleTopPagesButtonClick,
    isBacklinksButtonClick,
    handleBacklinksButtonClick,
    isReferringDomainsButtonClick,
    handleReferringDomainsButtonClick,
    isCalendarButtonClick,
    handleCalendarButtonClick,
    isSeoXpressButtonClick,
    handleSeoXpressButtonClick,
    isReferringIPsButtonClick,
    handleReferringIPsButtonClick,
    isAdsButtonClick,
    handleAdsButtonClick,
    isBestByLinksButtonClick,
    handleBestByLinksButtonClick,
    isChatXPButtonClick,
    handleChatXPButtonClick
  } = useSidebarFunctions();

  return (
    <>
      
      <div
        ref={sidebarRef}
        className={
          !isSidebarClose ? "sidebar-container" : "sidebar-container close"
        }
      >
        
        <nav className="sidebar">
          
          <ul className="sidebar-nav">
            
            <li
              className={`nav-item overview ${
                isSidebarMenuItemClick[0] ? "overview-active" : ""
              }`}
              onClick={() => {
                handleOverviewButtonClick();
                handleSidebarMenuItemClick(0);
              }}
            >
              <span>Overview</span>
              <svg
                onClick={handleSidebarClose}
                className="css-0"
                height="14px"
                width="14px"
                viewBox="0 0 14 14"
              >
                <path
                  className="css-kqzqgg"
                  d="M8.41726 7L13 2.41726L11.5828 1L7 5.58275L2.41725 1L1 2.41726L5.58274 7L1 11.5827L2.41725 13L7 8.41725L11.5828 13L13 11.5827L8.41726 7Z"
                  fillRule="evenodd"
                />
              </svg>
            </li>

            <li
              style={{ textDecoration: "underline" }}
              className={`nav-item ${
                isSidebarMenuItemClick[1] ? "item-active" : ""
              }`}
              onClick={() => {
                handleChatXPButtonClick();
                handleSidebarMenuItemClick(1);
              }}
            >
              ChatXP
            <span className="badge">New</span>
            </li>

            <li
              style={{ textDecoration: "underline" }}
              className={`nav-item ${
                isSidebarMenuItemClick[2] ? "item-active" : ""
              }`}
              onClick={() => {
                handleSeoXpressButtonClick();
                handleSidebarMenuItemClick(2);
              }}
            >
              SEO XPress
            <span className="badge">New</span>
            </li>

            <li
              style={{ textDecoration: "underline" }}
              className={`nav-item ${
                isSidebarMenuItemClick[3] ? "item-active" : ""
              }`}
              onClick={() => {
                handleCalendarButtonClick();
                handleSidebarMenuItemClick(3);
              }}
            >
              Calendar
              <span className="badge">New</span>
            </li>

            <li className="nav-section">
              <div
                className="section-header"
                onClick={() => toggleSection("Backlink profile")}
              >
                <span>Backlink profile</span>
                <span className="toggle-icon">
                  {expanded["Backlink profile"] ? "▼" : "▲"}
                </span>
              </div>

              <ul
                className={`sub-menu ${
                  expanded["Backlink profile"] ? "expanded" : ""
                }`}
              >
                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[5] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleBacklinksButtonClick();
                    handleSidebarMenuItemClick(5);
                  }}
                >
                  Backlinks
                </li>

                <li className="sub-item">Broken backlinks</li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[7] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleReferringDomainsButtonClick();
                    handleSidebarMenuItemClick(7);
                  }}
                >
                  Referring Domains
                </li>

                <li className="sub-item">Anchors</li>
                <li className="sub-item">Internal backlinks</li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[10] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleReferringIPsButtonClick();
                    handleSidebarMenuItemClick(10);
                  }}
                >
                  Referring IPs
                </li>

                <li className="sub-item">Link intersect</li>
              </ul>
            </li>

            <li className="nav-section">
              <div
                className="section-header"
                onClick={() => toggleSection("Organic search")}
              >
                <span>Organic search</span>
                <span className="toggle-icon">
                  {expanded["Organic search"] ? "▼" : "▲"}
                </span>
              </div>
              <ul
                className={`sub-menu ${
                  expanded["Organic search"] ? "expanded" : ""
                }`}
              >
                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[12] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleOrganicKeywordsButtonClick();
                    handleSidebarMenuItemClick(12);
                  }}
                >
                  Organic keywords
                </li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[13] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleTopPagesButtonClick();
                    handleSidebarMenuItemClick(13);
                  }}
                >
                  Top Pages
                </li>

                <li className="sub-item">Top subfolders</li>
                <li className="sub-item">Top subdomains</li>
                <li className="sub-item">Organic competitors</li>
                <li className="sub-item">Content gap</li>
              </ul>
            </li>

            <li className="nav-section">
              <div
                className="section-header"
                onClick={() => toggleSection("Paid search")}
              >
                <span>Paid search</span>
                <span className="toggle-icon">
                  {expanded["Paid search"] ? "▼" : "▲"}
                </span>
              </div>
              <ul
                className={`sub-menu ${
                  expanded["Paid search"] ? "expanded" : ""
                }`}
              >
                
                <li className="sub-item">Paid keywords</li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[19] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleAdsButtonClick();
                    handleSidebarMenuItemClick(19);
                  }}
                >
                  Ads
                </li>
                
                <li className="sub-item">Paid pages</li>
              
              </ul>
            
            </li>

            <li className="nav-section">
              <div
                className="section-header"
                onClick={() => toggleSection("Pages")}
              >
                <span>Pages</span>
                <span className="toggle-icon">
                  {expanded["Pages"] ? "▼" : "▲"}
                </span>
              </div>
              
              <ul className={`sub-menu ${expanded["Pages"] ? "expanded" : ""}`}>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sub-item ${
                    isSidebarMenuItemClick[21] ? "item-active" : ""
                  }`}
                  onClick={() => {
                    handleBestByLinksButtonClick();
                    handleSidebarMenuItemClick(21);
                  }}
                >
                  Best by links
                </li>
              
              </ul>
            
            </li>
          
          </ul>
        
        </nav>
      
      </div>

      <Main
        isSidebarClose={isSidebarClose}
        handleSidebarClose={handleSidebarClose}
        isOverviewButtonClick={isOverviewButtonClick}
        isBacklinksButtonClick={isBacklinksButtonClick}
        isOrganicKeywordsButtonClick={isOrganicKeywordsButtonClick}
        isTopPagesButtonClick={isTopPagesButtonClick}
        isReferringDomainsButtonClick={isReferringDomainsButtonClick}
        isCalendarButtonClick={isCalendarButtonClick}
        isSeoXpressButtonClick={isSeoXpressButtonClick}
        isReferringIPsButtonClick={isReferringIPsButtonClick}
        isAdsButtonClick={isAdsButtonClick}
        isBestByLinksButtonClick={isBestByLinksButtonClick}
        isChatXPButtonClick={isChatXPButtonClick}
      />
    
    </>
  
);

};

export default Sidebar;