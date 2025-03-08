import React, {useState} from "react";

//CSS File
import './backlinkprofiledashboard.css';

const BacklinkProfileDashboard = () => {

  return (
    
      <div id="backlinkprofile-dashboard">
      
        <div className="section backlink-section">

          <h3 className="section-title">Backlink profile</h3>

          <div className="metrics-row">
            
            <div className="metric-chart-container">
              <svg className="donut-chart purple-chart" viewBox="0 0 36 36">
                <circle
                  className="bg-circle"
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                ></circle>
                <circle
                  className="value-circle"
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                  strokeDasharray="91 9"
                  strokeDashoffset="25"
                ></circle>
              </svg>
              <div className="metric-text">
                <div className="metric-label">
                  DR<sup>i</sup>
                </div>
                <div className="metric-value">91</div>
              </div>
            </div>

            <div className="metric-chart-container">
              <svg className="donut-chart green-chart" viewBox="0 0 36 36">
                <circle
                  className="bg-circle"
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                ></circle>
                <circle
                  className="value-circle"
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                  strokeDasharray="54 46"
                  strokeDashoffset="25"
                ></circle>
              </svg>
              <div className="metric-text">
                <div className="metric-label">
                  UR<sup>i</sup>
                </div>
                <div className="metric-value">54</div>
              </div>
            </div>

            <div className="backlink-section-metric-text">

              <div className="metric-text-container backlink-section-metric-text-container">
                <div className="metric-label">
                  Backlinks<sup>i</sup>
                </div>
                <div className="metric-value blue-text">4.4M</div>
                <div className="metric-subtext">
                  All time <span className="blue-text">189M</span>
                </div>
              </div>

              <div className="metric-text-container backlink-section-metric-text-container">
                <div className="metric-label">
                  Ref. domains<sup>i</sup>
                </div>
                <div className="metric-value blue-text">83.6K</div>
                <div className="metric-subtext">
                  All time <span className="blue-text">222K</span>
                </div>
              </div>

            </div>

          </div>

          <div className="ar-container">
            AR <span className="blue-text">952</span>
          </div>
          
        </div>

        <div className="section organic-section">
          <h3 className="section-title">Organic search</h3>

          <div className="metrics-row">
            <div className="metric-text-container">
              <div className="metric-label">
                Keywords<sup>i</sup>
              </div>
              <div className="metric-value blue-text">230K</div>
              <div className="metric-subtext">
                Top 3 <span className="blue-text">14.7K</span>
              </div>
            </div>

            <div className="metric-text-container">
              <div className="metric-label">
                Traffic<sup>i</sup>
              </div>
              <div className="metric-value blue-text">2.6M</div>
              <div className="metric-subtext">
                Value <span className="blue-text">$2.3M</span>
              </div>
            </div>
          </div>

        </div>

        <div className="section paid-section">
          <h3 className="section-title">Paid search</h3>

          <div className="metrics-row">
            <div className="metric-text-container">
              <div className="metric-label">
                Keywords<sup>i</sup>
              </div>
              <div className="metric-value blue-text">24</div>
              <div className="metric-subtext">
                Ads <span className="blue-text">20</span>
              </div>
            </div>

            <div className="metric-text-container">
              <div className="metric-label">
                Traffic<sup>i</sup>
              </div>
              <div className="metric-value blue-text">104</div>
              <div className="metric-subtext">
                Cost <span className="blue-text">$128</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    
  );

};

export default BacklinkProfileDashboard;