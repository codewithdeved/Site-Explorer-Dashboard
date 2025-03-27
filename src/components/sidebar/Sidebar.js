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
    handleChatXPButtonClick,
    isSpinXPButtonClick,
    handleSpinXPButtonClick
  } = useSidebarFunctions();

  return (
    <>
      
      <div
        ref={sidebarRef}
        className={
          !isSidebarClose ? "sitexp-sidebar-container" : "sitexp-sidebar-container sitexp-sidebar-container-close"
        }
      >
        
        <nav className="sitexp-sidebar">
          
          <ul className="sitexp-sidebar-nav">
            
            <li
              className={`sitexp-sidebar-item sitexp-sidebar-overview-item ${
                isSidebarMenuItemClick[0] ? "sitexp-sidebar-overview-item-active" : ""
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
              className={`sitexp-sidebar-item ${
                isSidebarMenuItemClick[1] ? "sitexp-sidebar-item-active" : ""
              }`}
              onClick={() => {
                handleChatXPButtonClick();
                handleSidebarMenuItemClick(1);
              }}
            >
              Chat XP
            <span className="sitexp-sidebar-item-badge">New</span>
            </li>

            <li
              style={{ textDecoration: "underline" }}
              className={`sitexp-sidebar-item ${
                isSidebarMenuItemClick[2] ? "sitexp-sidebar-item-active" : ""
              }`}
              onClick={() => {
                handleSeoXpressButtonClick();
                handleSidebarMenuItemClick(2);
              }}
            >
              SEO XPress
            <span className="sitexp-sidebar-item-badge">New</span>
            </li>

            <li
              style={{ textDecoration: "underline" }}
              className={`sitexp-sidebar-item ${
                isSidebarMenuItemClick[3] ? "sitexp-sidebar-item-active" : ""
              }`}
              onClick={() => {
                handleCalendarButtonClick();
                handleSidebarMenuItemClick(3);
              }}
            >
              Calendar
              <span className="sitexp-sidebar-item-badge">New</span>
            </li>

            <li
              style={{ textDecoration: "underline" }}
              className={`sitexp-sidebar-item ${
                isSidebarMenuItemClick[4] ? "sitexp-sidebar-item-active" : ""
              }`}
              onClick={() => {
                handleSpinXPButtonClick();
                handleSidebarMenuItemClick(4);
              }}
            >
              Spin XP
              <span className="sitexp-sidebar-item-badge">New</span>
            </li>

            <li className="sitexp-sidebar-nav-section">
              <div
                className="sitexp-sidebar-nav-section-header"
                onClick={() => toggleSection("Backlink profile")}
              >
                <span>Backlink profile</span>
                <span className="sitexp-sidebar-nav-section-header-toggle-icon">
                  {expanded["Backlink profile"] ? "▼" : "▲"}
                </span>
              </div>

              <ul
                className={`sitexp-sidebar-nav-section-header-sub-menu ${
                  expanded["Backlink profile"] ? "expanded" : ""
                }`}
              >
                <li
                  style={{ textDecoration: "underline" }}
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[5] ? "sitexp-sidebar-item-active" : ""
                  }`}
                  onClick={() => {
                    handleBacklinksButtonClick();
                    handleSidebarMenuItemClick(5);
                  }}
                >
                  Backlinks
                </li>

                <li className="sitexp-sidebar-sub-item">Broken backlinks</li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[7] ? "sitexp-sidebar-item-active" : ""
                  }`}
                  onClick={() => {
                    handleReferringDomainsButtonClick();
                    handleSidebarMenuItemClick(7);
                  }}
                >
                  Referring Domains
                </li>

                <li className="sitexp-sidebar-sub-item">Anchors</li>
                <li className="sitexp-sidebar-sub-item">Internal backlinks</li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[10] ? "sitexp-sidebar-item-active" : ""
                  }`}
                  onClick={() => {
                    handleReferringIPsButtonClick();
                    handleSidebarMenuItemClick(10);
                  }}
                >
                  Referring IPs
                </li>

                <li className="sitexp-sidebar-sub-item">Link intersect</li>
              </ul>
            </li>

            <li className="sitexp-sidebar-nav-section">
              <div
                className="sitexp-sidebar-nav-section-header"
                onClick={() => toggleSection("Organic search")}
              >
                <span>Organic search</span>
                <span className="sitexp-sidebar-nav-section-header-toggle-icon">
                  {expanded["Organic search"] ? "▼" : "▲"}
                </span>
              </div>
              <ul
                className={`sitexp-sidebar-nav-section-header-sub-menu ${
                  expanded["Organic search"] ? "expanded" : ""
                }`}
              >
                <li
                  style={{ textDecoration: "underline" }}
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[12] ? "sitexp-sidebar-item-active" : ""
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
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[13] ? "sitexp-sidebar-item-active" : ""
                  }`}
                  onClick={() => {
                    handleTopPagesButtonClick();
                    handleSidebarMenuItemClick(13);
                  }}
                >
                  Top Pages
                </li>

                <li className="sitexp-sidebar-sub-item">Top subfolders</li>
                <li className="sitexp-sidebar-sub-item">Top subdomains</li>
                <li className="sitexp-sidebar-sub-item">Organic competitors</li>
                <li className="sitexp-sidebar-sub-item">Content gap</li>
              </ul>
            </li>

            <li className="sitexp-sidebar-nav-section">
              <div
                className="sitexp-sidebar-nav-section-header"
                onClick={() => toggleSection("Paid search")}
              >
                <span>Paid search</span>
                <span className="sitexp-sidebar-nav-section-header-toggle-icon">
                  {expanded["Paid search"] ? "▼" : "▲"}
                </span>
              </div>
              <ul
                className={`sitexp-sidebar-nav-section-header-sub-menu ${
                  expanded["Paid search"] ? "expanded" : ""
                }`}
              >
                
                <li className="sitexp-sidebar-sub-item">Paid keywords</li>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[19] ? "sitexp-sidebar-item-active" : ""
                  }`}
                  onClick={() => {
                    handleAdsButtonClick();
                    handleSidebarMenuItemClick(19);
                  }}
                >
                  Ads
                </li>
                
                <li className="sitexp-sidebar-sub-item">Paid pages</li>
              
              </ul>
            
            </li>

            <li className="sitexp-sidebar-nav-section">
              <div
                className="sitexp-sidebar-nav-section-header"
                onClick={() => toggleSection("Pages")}
              >
                <span>Pages</span>
                <span className="sitexp-sidebar-nav-section-header-toggle-icon">
                  {expanded["Pages"] ? "▼" : "▲"}
                </span>
              </div>
              
              <ul className={`sitexp-sidebar-nav-section-header-sub-menu ${expanded["Pages"] ? "expanded" : ""}`}>

                <li
                  style={{ textDecoration: "underline" }}
                  className={`sitexp-sidebar-sub-item ${
                    isSidebarMenuItemClick[21] ? "sitexp-sidebar-item-active" : ""
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
        isSpinXPButtonClick={isSpinXPButtonClick}
      />
    
    </>
  
);

};

export default Sidebar;