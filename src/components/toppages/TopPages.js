import React, { useState, useEffect, useRef } from "react";

//CSS File
import "./toppages.css";

//Components
import TableOfPages from "./tableofpages/TableOfPages";

const TopPages = () => {
  
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Compare pages");
  const [activePeriod, setActivePeriod] = useState("6M");
  const [showExportOptions, setShowExportOptions] = useState(false);

  const exportDropdownRef = useRef(null);

  const exportOptions = ["CSV", "PDF", "Excel", "Google Sheets"];

  const urlData = [
    {
      url: "https://ahrefs.com/backlink-checker",
      visits: 218643,
      color: "#FF9900",
    },
    {
      url: "https://ahrefs.com/keyword-rank-checker",
      visits: 205715,
      color: "#4CAF50",
    },
    {
      url: "https://ahrefs.com/keyword-generator",
      visits: 131825,
      color: "#F44336",
    },
    {
      url: "https://ahrefs.com/website-authority-checker",
      visits: 96738,
      color: "#9C27B0",
    },
    {
      url: "https://ahrefs.com/writing-tools/paragraph-rewriter",
      visits: 0,
      color: "#FFEB3B",
    },
  ];

  const chartData = [
    {
      backlink: 118000,
      keyword: 95000,
      generator: 70000,
      authority: 55000,
      paragraph: 22000,
    },
    {
      backlink: 123000,
      keyword: 100000,
      generator: 75000,
      authority: 60000,
      paragraph: 22000,
    },
    {
      backlink: 130000,
      keyword: 105000,
      generator: 80000,
      authority: 65000,
      paragraph: 22000,
    },
    {
      backlink: 140000,
      keyword: 115000,
      generator: 90000,
      authority: 70000,
      paragraph: 22000,
    },
    {
      backlink: 150000,
      keyword: 130000,
      generator: 100000,
      authority: 80000,
      paragraph: 22000,
    },
    {
      backlink: 218643,
      keyword: 205715,
      generator: 131825,
      authority: 96738,
      paragraph: 22000,
    },
    {
      backlink: 220000,
      keyword: 210000,
      generator: 140000,
      authority: 95000,
      paragraph: 25000,
    },
    {
      backlink: 225000,
      keyword: 215000,
      generator: 145000,
      authority: 100000,
      paragraph: 45000,
    },
    {
      backlink: 228000,
      keyword: 220000,
      generator: 150000,
      authority: 102000,
      paragraph: 80000,
    },
    {
      backlink: 230000,
      keyword: 225000,
      generator: 160000,
      authority: 105000,
      paragraph: 110000,
    },
  ];

  const yAxisLabels = ["0", "80K", "120K", "180K", "240K"];

  useEffect(() => {
    if (canvasRef.current) {
      drawChart();
    }

    window.addEventListener("resize", drawChart);
    return () => window.removeEventListener("resize", drawChart);
  }, []);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    canvas.width = containerWidth;
    canvas.height = 350;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height - 40;
    const padding = { top: 20, right: 50, bottom: 30, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height + padding.bottom);

    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;

    const yStep = chartHeight / (yAxisLabels.length - 1);

    yAxisLabels.forEach((label, i) => {
      const y = padding.top + chartHeight - i * yStep;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = "#aaa";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(label, width + 0, y + 4);
    });

    const highlightIndex = 5;
    const xStep = chartWidth / (chartData.length - 1);
    const highlightX = padding.left + highlightIndex * xStep;

    ctx.strokeStyle = "#f0f0f0";
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(highlightX, padding.top);
    ctx.lineTo(highlightX, padding.top + chartHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    const getYCoordinate = (value) => {
      const maxValue = 240000;
      return padding.top + chartHeight - (value / maxValue) * chartHeight;
    };

    const properties = [
      "backlink",
      "keyword",
      "generator",
      "authority",
      "paragraph",
    ];
    const colors = ["#FF9900", "#4CAF50", "#F44336", "#9C27B0", "#FFEB4B"];

    properties.forEach((prop, propIndex) => {
      ctx.beginPath();
      ctx.strokeStyle = colors[propIndex];
      ctx.lineWidth = 2;

      chartData.forEach((point, index) => {
        const x = padding.left + index * xStep;
        const y = getYCoordinate(point[prop]);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      const lastDataPoint = chartData[chartData.length - 5];
      const index = chartData.length - 5;
      const x = padding.left + index * xStep;
      const y = getYCoordinate(lastDataPoint[prop]);

      ctx.beginPath();
      ctx.fillStyle = colors[propIndex];
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  return (
    
    <div className="toppages-container">

      <div className="dashboard-container">
        
        <div className="dashboard-header">
          
          <div className="tabs-container">
            <button
              className={`tab ${activeTab === "Performance" ? "active" : ""}`}
              onClick={() => setActiveTab("Performance")}
            >
              Performance
            </button>
            <button
              className={`tab compare-pages ${
                activeTab === "Compare pages" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Compare pages")}
            >
              Compare pages
            </button>
            <button
              className={`tab active organic-traffic ${
                activeTab === "Avg. organic traffic" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Avg. organic traffic")}
            >
              Avg. organic traffic
            </button>
            <button
              className={`tab ${
                activeTab === "Organic keywords" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Organic keywords")}
            >
              Organic keywords
            </button>
          </div>

          <div className="controls-container">
            
            <div className="period-selector">
              <button
                className={`period-btn ${activePeriod === "1M" ? "active" : ""}`}
                onClick={() => setActivePeriod("1M")}
              >
                1M
              </button>
              <button
                className={`period-btn ${activePeriod === "6M" ? "active" : ""}`}
                onClick={() => setActivePeriod("6M")}
              >
                6M
              </button>
              <button
                className={`period-btn ${activePeriod === "1Y" ? "active" : ""}`}
                onClick={() => setActivePeriod("1Y")}
              >
                1Y
              </button>
              <button
                className={`period-btn ${activePeriod === "2Y" ? "active" : ""}`}
                onClick={() => setActivePeriod("2Y")}
              >
                2Y
              </button>
              <button
                className={`period-btn ${activePeriod === "All" ? "active" : ""}`}
                onClick={() => setActivePeriod("All")}
              >
                All
              </button>
            </div>

            <div className="action-control-buttons">
              <button className="weekly-dropdown">
                Weekly <span className="dropdown-icon">▼</span>
              </button>

              <button className="search-button">
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

              <div className="export-container" ref={exportDropdownRef}>
              
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

              <button className="expand-button">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
                    fill="#555"
                  />
                </svg>
              </button>
            
            </div>
            
          </div>
        
        </div>

        <div className="dashboard-content">
          <div className="chart-container">
            <canvas ref={canvasRef}></canvas>
            <div className="x-axis-labels">
              <span className="x-label">
                13-19 <span>Mar</span>
              </span>
              <span className="x-label">
                3-9 <span>Apr</span>
              </span>
              <span className="x-label">
                24-30 <span>Apr</span>
              </span>
              <span className="x-label">
                15-21 <span>May</span>
              </span>
              <span className="x-label">
                5-11 <span>Jun</span>
              </span>
              <span className="x-label">
                26 Jun - <span>2 Jul</span>
              </span>
              <span className="x-label">
                17-23 <span>Jul</span>
              </span>
              <span className="x-label">
                7-13 <span>Aug</span>
              </span>
              <span className="x-label">
                28-30 <span>Aug</span>
              </span>
            </div>
          </div>

          <div className="data-sidebar">
            <div className="sidebar-content">
              <div className="date-highlight">19–25 Jun 2023</div>

              <div className="url-list">
                {urlData.map((item, index) => (
                  <div className="url-item" key={index}>
                    <span
                      className="url-dot"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="url-address">{item.url}</span>
                    <span className="url-visits">
                      {item.visits.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      
      </div>

      <TableOfPages />

    </div>
  
);

};

export default TopPages;
