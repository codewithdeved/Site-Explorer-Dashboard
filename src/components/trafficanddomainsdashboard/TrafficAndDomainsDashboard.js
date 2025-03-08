import React from "react";

//CSS File
import "./trafficanddomainsdashboard.css";

const TrafficAndDomainsDashboard = () => {
  
    const trafficData = [
    { location: "US", traffic: 764.7, share: 29.8, keywords: 140.5 },
    { location: "IN", traffic: 476.8, share: 18.6, keywords: 52.1 },
    { location: "GB", traffic: 237.1, share: 9.2, keywords: 30.2 },
    { location: "PK", traffic: 163.5, share: 6.4, keywords: 11.4 },
    { location: "RU", traffic: 87.4, share: 3.4, keywords: 34.8 },
  ];

  return (
    
    <div className="traffic-dashboard">
      
      <div className="traffic-section">
        <div className="traffic-section-header">
          <span className="traffic-by-location">Traffic by location</span>
          <div className="traffic-summary">
            <span className="organic-tag">Organic 186</span>
            <span className="paid-tag">Paid 3</span>
          </div>
        </div>
        <table className="traffic-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Traffic</th>
              <th>Share</th>
              <th>Keywords</th>
            </tr>
          </thead>
          <tbody>
            {trafficData.map((item, index) => (
              <tr key={index}>
                <td>{item.location}</td>
                <td>{item.traffic.toFixed(1)}K</td>
                <td>{item.share}%</td>
                <td>{item.keywords.toFixed(1)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <div className="navigation-buttons">
            <span>&lt;</span>
            <span>&gt;</span>
          </div>
          <div className="compare-option">Compare top 5 on chart</div>
        </div>
      </div>

      <div className="referring-domains-section">
        <table className="referring-domains-table">
          <thead>
            <tr>
              <th>Referring Domains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Followed</td>
              <td>67,217</td>
              <td><small>80.4%</small></td>
            </tr>
            <tr>
              <td>Not followed</td>
              <td>16,379</td>
              <td><small>19.6%</small></td>
            </tr>
          </tbody>
        </table>
      </div>
    
    </div>
  
);

};

export default TrafficAndDomainsDashboard;