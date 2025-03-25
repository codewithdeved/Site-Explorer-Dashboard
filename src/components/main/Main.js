import React from "react";

//CSS File
import "./main.css";

//Components
import BacklinkProfileDashboard from "../backlinkprofiledashboard/BacklinkProfileDashboard";
import GeneralBacklinkOrganicButtons from "../generalbacklinkorganicbuttons/GeneralBacklinkOrganicButtons";
import TrafficChart from "../trafficchart/TrafficChart";
import OrganicKeywords from "../organickeywords/OrganicKeywords";
import TopPages from "../toppages/TopPages";
import Backlinks from "../backlinks/Backlinks";
import ReferringDomains from "../referringdomains/ReferringDomains";
import Calendar from "../calendar/Calendar";
import SeoXpress from "../seoxpress/SeoXpress";
import ReferringIPs from "../referringips/ReferringIPs";
import Ads from "../ads/Ads";
import BestByLinks from "../bestbylinks/BestByLinks";
import ChatXP from "../chat/ChatXP";

const Main = ({
 
  isSidebarClose,
  handleSidebarClose,
  isOverviewButtonClick,
  isOrganicKeywordsButtonClick,
  isTopPagesButtonClick,
  isBacklinksButtonClick,
  isReferringDomainsButtonClick,
  isCalendarButtonClick,
  isSeoXpressButtonClick,
  isReferringIPsButtonClick,
  isAdsButtonClick,
  isBestByLinksButtonClick,
  isChatXPButtonClick

}) => {
  
    return (
    
    <div className={!isSidebarClose ? "main-container" : "main-container move"}>
      
      <div id="main">
        
        <div className="main-head-content">
          
          <div onClick={handleSidebarClose} className="sidebar-toggle-icon">
            <svg
              className="css-0"
              height="14px"
              width="14px"
              viewBox="0 0 14 14"
            >
              <path
                className="css-kqzqgg"
                d="M0 1H14V3H0V1ZM0 6H14V8H0V6ZM0 11H14V13H0V11Z"
                fillRule="evenodd"
              />
            </svg>
          </div>

          <h2>
            {isReferringIPsButtonClick && !isOverviewButtonClick ? (
              "Referring IPs"
            ) : isChatXPButtonClick && !isOverviewButtonClick ? (
              "ChatXP"
            ) : isSeoXpressButtonClick && !isOverviewButtonClick ? (
              "SEO XPress"
            ) : isCalendarButtonClick && !isOverviewButtonClick ? (
              "Calendar"
            ) : isBacklinksButtonClick && !isOverviewButtonClick ? (
              "Backlinks"
            ) : isReferringDomainsButtonClick && !isOverviewButtonClick ? (
              "Referring Domains"
            ) : isOrganicKeywordsButtonClick && !isOverviewButtonClick ? (
              "Organic keywords"
            ) : isTopPagesButtonClick && !isOverviewButtonClick ? (
              "Top pages"
            ) : isAdsButtonClick && !isOverviewButtonClick ? (
              "Ads"
            ) : isBestByLinksButtonClick && !isOverviewButtonClick ? (
              "Best by links"
            ) : (
              <>
                Overview: <span>ahrefs.com/</span>{" "}
                <small>
                  Ahrefs - SEO Tools & Resources To Grow Your Search Traffic
                </small>
              </>
            )}
          </h2>

          <div className="how-to-use">
            <svg height="14px" width="14px" viewBox="0 0 14 14">
              <path
                className="css-kqzqgg"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM7 11.6667C7.64433 11.6667 8.16667 11.1443 8.16667 10.5C8.16667 9.85567 7.64433 9.33333 7 9.33333C6.35567 9.33333 5.83333 9.85567 5.83333 10.5C5.83333 11.1443 6.35567 11.6667 7 11.6667ZM5.96165 4.9V4.66667C5.97028 4.36285 6.06986 4.10973 6.26193 3.93693C6.454 3.76413 6.70973 3.67773 7.02913 3.67773C7.70246 3.67773 8.03912 3.99864 8.03912 4.64046C8.03912 5.24349 7.60427 5.68769 7.21365 5.99341C6.82303 6.29913 6.46327 6.60959 6.31652 6.9248C6.2018 7.17122 6.13192 7.48058 6.10688 7.85167C6.10365 7.89954 6.10098 7.96465 6.09883 8.05C6.09883 8.11458 6.15118 8.16693 6.21576 8.16693L7.76321 8.16667C7.82399 8.16667 7.87458 8.12001 7.8795 8.05944L7.89669 7.84766C7.94417 7.47548 8.10602 7.15077 8.43406 6.87354C9.01737 6.33805 9.42957 5.87378 9.67064 5.48071C9.84335 5.19913 9.91667 4.88922 9.91667 4.56641C9.91667 3.85622 9.66417 3.30651 9.15918 2.91724C8.65418 2.52797 7.91504 2.33333 7 2.33333C6.0936 2.33333 5.40733 2.53841 4.88291 2.94857C4.36361 3.35472 4.09719 3.92994 4.08366 4.64546L4.08333 4.9C4.08333 4.96444 4.13557 5.01667 4.2 5.01667H5.84498C5.90942 5.01667 5.96165 4.96444 5.96165 4.9Z"
                fillRule="evenodd"
              />
            </svg>

            <span className="how-to-use-text">How to use</span>

            <div className="api">
              <span>{"{}"}</span> API
            </div>
          </div>

        </div>
      
      </div>

      {isReferringIPsButtonClick ? (
        <ReferringIPs />
      ) : isChatXPButtonClick ? (
        <ChatXP />
      ) : isSeoXpressButtonClick ? (
        <SeoXpress />
      ) : isCalendarButtonClick ? (
        <Calendar />
      ) : isBacklinksButtonClick ? (
        <Backlinks />
      ) : isReferringDomainsButtonClick ? (
        <ReferringDomains />
      ) : isOrganicKeywordsButtonClick ? (
        <OrganicKeywords />
      ) : isTopPagesButtonClick ? (
        <TopPages />
      ) : isAdsButtonClick ? (
        <Ads />
      ) : isBestByLinksButtonClick ? (
        <BestByLinks />
      ) : (
        <>
          <BacklinkProfileDashboard />
          <GeneralBacklinkOrganicButtons />
          <TrafficChart />
        </>
      )}
    
    </div>
  
);

};

export default Main;