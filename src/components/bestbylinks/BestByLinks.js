import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Chart from "chart.js/auto";
import { QRCodeCanvas } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import "./bestbylinks.css";

const BestByLinks = React.memo(() => {
  
  const [sortBy, setSortBy] = useState("backlinks");
  const [sortOrder, setSortOrder] = useState("desc");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategories, setFilterCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pinnedUrls, setPinnedUrls] = useState([]);
  
  const [exportColumns, setExportColumns] = useState({
    url: true,
    category: true,
    backlinks: true,
    refDomains: true,
    traffic: true,
    growthRate: true,
    trend: false,
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const [data, setData] = useState([
    {
      url: "ahrefs.com/blog/seo-tips",
      category: "Blog",
      backlinks: 15000,
      refDomains: 3200,
      traffic: 450000,
      trend: [12000, 13000, 14000, 15000],
    },
    {
      url: "ahrefs.com/tools/keyword-explorer",
      category: "Tools",
      backlinks: 12000,
      refDomains: 2800,
      traffic: 380000,
      trend: [10000, 11000, 11500, 12000],
    },
    {
      url: "ahrefs.com/blog/content-marketing",
      category: "Blog",
      backlinks: 9000,
      refDomains: 2100,
      traffic: 300000,
      trend: [8000, 8500, 8700, 9000],
    },
    {
      url: "ahrefs.com/tools/site-audit",
      category: "Tools",
      backlinks: 7000,
      refDomains: 1500,
      traffic: 250000,
      trend: [6000, 6500, 6800, 7000],
    },
    {
      url: "ahrefs.com/pricing",
      category: "Pricing",
      backlinks: 5000,
      refDomains: 1200,
      traffic: 200000,
      trend: [4000, 4500, 4800, 5000],
    },
    {
      url: "ahrefs.com/features",
      category: "Features",
      backlinks: 4000,
      refDomains: 1000,
      traffic: 180000,
      trend: [3000, 3500, 3800, 4000],
    },
    {
      url: "ahrefs.com/support",
      category: "Support",
      backlinks: 3000,
      refDomains: 800,
      traffic: 150000,
      trend: [2000, 2500, 2800, 3000],
    },
    {
      url: "ahrefs.com/blog/link-building",
      category: "Blog",
      backlinks: 2500,
      refDomains: 600,
      traffic: 120000,
      trend: [2000, 2200, 2300, 2500],
    },
    {
      url: "ahrefs.com/tools/backlink-checker",
      category: "Tools",
      backlinks: 2000,
      refDomains: 500,
      traffic: 100000,
      trend: [1500, 1700, 1900, 2000],
    },
    {
      url: "ahrefs.com/blog/technical-seo",
      category: "Blog",
      backlinks: 1800,
      refDomains: 400,
      traffic: 90000,
      trend: [1400, 1500, 1700, 1800],
    },
    {
      url: "ahrefs.com/tools/rank-tracker",
      category: "Tools",
      backlinks: 1600,
      refDomains: 350,
      traffic: 85000,
      trend: [1300, 1400, 1500, 1600],
    },
    {
      url: "ahrefs.com/about",
      category: "About",
      backlinks: 1400,
      refDomains: 300,
      traffic: 80000,
      trend: [1100, 1200, 1300, 1400],
    },
  ]);

  const chartRef = useRef(null);
  const itemsPerPage = 5;

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData((prev) =>
        prev.map((item) => {
          const newBacklinks = item.backlinks + Math.floor(Math.random() * 100);
          return {
            ...item,
            backlinks: newBacklinks,
            traffic: item.traffic + Math.floor(Math.random() * 1000),
            trend: [...item.trend.slice(1), newBacklinks],
          };
        })
      );
      toast.success("Data refreshed successfully!");
      setIsLoading(false);
    }, 1000);
  }, []);

  const categories = useMemo(
    () => [...new Set(data.map((item) => item.category))],
    [data]
  );

  const debouncedFilter = debounce((newFilters) => {
    setFilterCategories(newFilters);
    toast.success("Filters applied!");
  }, 300);

  const handleCategoryFilter = useCallback((category) => {
    setFilterCategories((prev) => {
      const newFilters = prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];
      debouncedFilter(newFilters);
      setCurrentPage(1);
      return newFilters;
    });
  }, []);

  const { filteredData, sortedData } = useMemo(() => {
    const filtered =
      filterCategories.length === 0
        ? data
        : data.filter((item) => filterCategories.includes(item.category));

    const sorted = [...filtered].sort((a, b) => {
      if (pinnedUrls.includes(a.url) && !pinnedUrls.includes(b.url)) return -1;
      if (!pinnedUrls.includes(a.url) && pinnedUrls.includes(b.url)) return 1;
      if (sortBy === "category") {
        const valueA = a[sortBy].toLowerCase();
        const valueB = b[sortBy].toLowerCase();
        return sortOrder === "desc"
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }
      if (sortBy === "growthRate") {
        const valueA = calculateGrowthRate(a.trend);
        const valueB = calculateGrowthRate(b.trend);
        return sortOrder === "desc" ? valueB - valueA : valueA - valueB;
      }
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      return sortOrder === "desc" ? valueB - valueA : valueA - valueB;
    });

    return { filteredData: filtered, sortedData: sorted };
  }, [data, filterCategories, pinnedUrls, sortBy, sortOrder]);

  const { paginatedData, totalPages } = useMemo(() => {
    const paginated = sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const total = Math.ceil(sortedData.length / itemsPerPage);
    return { paginatedData: paginated, totalPages: total };
  }, [sortedData, currentPage, itemsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const chartElement = document.getElementById("backlink-trend-chart");
    if (chartElement) observer.observe(chartElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isChartVisible) return;

    const ctx = document
      .getElementById("backlink-trend-chart")
      ?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const topItem = sortedData[0];
    if (!topItem) return;

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["-3", "-2", "-1", "Now"],
        datasets: [
          {
            label: "Backlinks Trend",
            data: topItem.trend,
            backgroundColor: darkMode
              ? "rgba(79, 70, 229, 0.7)"
              : "rgba(79, 70, 229, 0.5)",
            borderColor: "#4F46E5",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: darkMode ? "#F9FAFB" : "#1F2937",
              font: { size: 12 },
            },
          },
          x: {
            ticks: {
              color: darkMode ? "#F9FAFB" : "#1F2937",
              font: { size: 12 },
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: darkMode ? "#F9FAFB" : "#1F2937",
              font: { size: 12 },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: darkMode ? "#374151" : "#F9FAFB",
            titleColor: darkMode ? "#F9FAFB" : "#1F2937",
            bodyColor: darkMode ? "#F9FAFB" : "#1F2937",
            borderColor: darkMode ? "#4B5563" : "#D1D5DB",
            borderWidth: 1,
            callbacks: {
              label: (context) => `Backlinks: ${context.raw}`,
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const value = topItem.trend[index];
            toast.info(`Backlinks at period ${index - 3}: ${value}`);
          }
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [darkMode, isChartVisible, sortedData]);

  const handleSort = useCallback(
    (key) => {
      if (sortBy === key) {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
      } else {
        setSortBy(key);
        setSortOrder("desc");
      }
      setCurrentPage(1);
      setShowSort(false);
      toast.success(`Sorted by ${key}`);
    },
    [sortBy, sortOrder]
  );

  const exportToCSV = useCallback(() => {
    const selectedColumns = Object.keys(exportColumns).filter(
      (key) => exportColumns[key]
    );
    if (selectedColumns.length === 0) {
      toast.error("Please select at least one column to export.");
      return;
    }

    const headers = selectedColumns
      .map((key) => {
        if (key === "growthRate") return "Backlink Growth Rate (%)";
        return key.charAt(0).toUpperCase() + key.slice(1);
      })
      .join(",");
    const rows = sortedData
      .map((item) => {
        const growthRate = calculateGrowthRate(item.trend);
        const rowData = {
          url: item.url,
          category: item.category,
          backlinks: item.backlinks,
          refDomains: item.refDomains,
          traffic: item.traffic,
          growthRate: growthRate.toFixed(2),
          trend: `"${item.trend.join(",")}"`,
        };
        return selectedColumns.map((key) => rowData[key]).join(",");
      })
      .join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "best-by-links.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Exported to CSV successfully!");
  }, [exportColumns, sortedData]);

  const calculateGrowthRate = useCallback((trend) => {
    const first = trend[0];
    const last = trend[trend.length - 1];
    return first > 0 ? ((last - first) / first) * 100 : 0;
  }, []);

  const shareView = useCallback(() => {
    const shareData = {
      sortBy,
      sortOrder,
      filterCategories,
      currentPage,
      pinnedUrls,
    };
    return `${window.location.origin}/best-by-links?view=${btoa(
      JSON.stringify(shareData)
    )}`;
  }, [sortBy, sortOrder, filterCategories, currentPage, pinnedUrls]);

  const handleShareEmail = useCallback((link) => {
    const subject = "Check out my Best by Links view";
    const body = `I wanted to share this view from the Best by Links tool:\n\n${link}\n\nIt includes my current filters, sorting, and pinned URLs.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, []);

  const handleShareSocial = useCallback((platform, link) => {
    const encodedLink = encodeURIComponent(link);
    const socialUrls = {
      twitter: `https://twitter.com/intent/tweet?text=Check%20out%20my%20Best%20by%20Links%20view&url=${encodedLink}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
      whatsapp: `https://api.whatsapp.com/send?text=Check%20out%20my%20Best%20by%20Links%20view%20${encodedLink}`,
      slack: `https://slack.com/share?url=${encodedLink}`,
    };
    window.open(socialUrls[platform], "_blank");
  }, []);

  const handlePin = useCallback((url) => {
    setPinnedUrls((prev) => {
      const isPinned = prev.includes(url);
      const newPinnedUrls = isPinned
        ? prev.filter((u) => u !== url)
        : [...prev, url];
      toast.info(`URL ${isPinned ? "unpinned" : "pinned"}!`);
      return newPinnedUrls;
    });
  }, []);

  const handleSwipe = useCallback(
    (e) => {
      const direction = e.deltaX > 0 ? "right" : "left";
      if (direction === "right" && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else if (direction === "left" && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [currentPage, totalPages]
  );

  const toggleCard = useCallback(
    (index, item) => {
      if (expandedCard === index) {
        setExpandedCard(null);
        setSelectedItem(null);
      } else {
        setExpandedCard(index);
        setSelectedItem(item);
      }
    },
    [expandedCard]
  );

  return (

    <section
      className={`bestlinks-best-by-links-container ${
        darkMode ? "bestlinks-dark-mode" : ""
      }`}
      aria-labelledby="best-by-links-title"
    >
      
      <ToastContainer position="top-right" autoClose={2000} />
      
      <header className="bestlinks-best-by-links-header">
        <h2 id="best-by-links-title">Best by Links</h2>
        <div className="bestlinks-header-actions">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bestlinks-toggle-section"
            aria-expanded={showFilters}
            aria-controls="filter-section"
          >
            <span className="bestlinks-icon">🗂️</span>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            onClick={() => setShowSort(!showSort)}
            className="bestlinks-toggle-section"
            aria-expanded={showSort}
            aria-controls="sort-section"
          >
            <span className="bestlinks-icon">📊</span>
            {showSort ? "Hide Sort" : "Show Sort"}
          </button>
          <button
            onClick={handleRefresh}
            className="bestlinks-refresh-button"
            disabled={isLoading}
            aria-label="Refresh data"
          >
            <span className="bestlinks-icon">↻</span>
            {isLoading ? "Refreshing..." : "Refresh Data"}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bestlinks-dark-mode-toggle"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <span className="bestlinks-toggle-icon">
              {darkMode ? "☀️" : "🌙"}
            </span>
          </button>
          <button
            onClick={exportToCSV}
            className="bestlinks-export-button"
            aria-label="Export to CSV"
          >
            <span className="bestlinks-icon">↓</span>Export CSV
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="bestlinks-share-button"
            aria-label="Share view"
          >
            <span className="bestlinks-icon">↗</span>Share View
          </button>
        </div>
      </header>
      
      <div
        id="filter-section"
        className={`bestlinks-filter-section ${
          showFilters ? "bestlinks-visible" : ""
        }`}
      >
        <div className="bestlinks-filter-controls">
          <label>Filter by Category:</label>
          <div className="bestlinks-category-checkboxes">
            {categories.map((cat) => (
              <label key={cat} className="bestlinks-category-checkbox">
                <input
                  type="checkbox"
                  checked={filterCategories.includes(cat)}
                  onChange={() => handleCategoryFilter(cat)}
                  aria-label={`Filter by ${cat}`}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div
        id="sort-section"
        className={`bestlinks-sort-section ${
          showSort ? "bestlinks-visible" : ""
        }`}
      >
        <div className="bestlinks-sort-controls">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            aria-label="Sort by metric"
          >
            <option value="category">Category</option>
            <option value="backlinks">Backlinks</option>
            <option value="refDomains">Referring Domains</option>
            <option value="traffic">Organic Traffic</option>
            <option value="growthRate">Growth Rate</option>
          </select>
          <button
            onClick={() => handleSort(sortBy)}
            aria-label={`Sort ${
              sortOrder === "desc" ? "ascending" : "descending"
            }`}
          >
            {sortOrder === "desc" ? "↓" : "↑"}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="bestlinks-share-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bestlinks-share-modal-content"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h3>Share Your View</h3>
              <p>Share this view with your team or clients:</p>
              <div className="bestlinks-share-preview">
                <p>
                  <strong>Sort By:</strong> {sortBy}
                </p>
                <p>
                  <strong>Order:</strong> {sortOrder}
                </p>
                <p>
                  <strong>Categories:</strong>{" "}
                  {filterCategories.length > 0
                    ? filterCategories.join(", ")
                    : "All"}
                </p>
                <p>
                  <strong>Page:</strong> {currentPage}
                </p>
                <p>
                  <strong>Pinned URLs:</strong>{" "}
                  {pinnedUrls.length > 0 ? pinnedUrls.join(", ") : "None"}
                </p>
              </div>
              <div className="bestlinks-share-link">
                <input type="text" value={shareView()} readOnly />
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(shareView())
                      .then(() => toast.success("Link copied to clipboard!"))
                  }
                >
                  Copy Link
                </button>
              </div>
              <div className="bestlinks-share-options">
                <button onClick={() => handleShareEmail(shareView())}>
                  Email
                </button>
                <button
                  onClick={() => handleShareSocial("twitter", shareView())}
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleShareSocial("linkedin", shareView())}
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShareSocial("whatsapp", shareView())}
                >
                  WhatsApp
                </button>
                <button onClick={() => handleShareSocial("slack", shareView())}>
                  Slack
                </button>
              </div>
              <div className="bestlinks-share-qr">
                <QRCodeCanvas value={shareView()} size={96} />
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="bestlinks-close-modal"
                aria-label="Close share modal"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="bestlinks-export-columns">
        <h4>Select Columns to Export:</h4>
        <div className="bestlinks-export-columns-list">
          {Object.keys(exportColumns).map((key) => (
            <label key={key} className="bestlinks-export-column-checkbox">
              <input
                type="checkbox"
                checked={exportColumns[key]}
                onChange={() =>
                  setExportColumns((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                aria-label={`Export ${key} column`}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>
      
      <div className="bestlinks-best-by-links-insights">
        <div className="bestlinks-ai-insight">
          <p>
            <strong>AI Insight:</strong>{" "}
            {sortedData[0] ? (
              <>
                Focus on "{sortedData[0].url}" for link building—it has a growth
                rate of {calculateGrowthRate(sortedData[0].trend).toFixed(2)}%
                and high traffic ({sortedData[0].traffic.toLocaleString()}).
                Consider creating similar content in the{" "}
                {sortedData[0].category} category.
              </>
            ) : (
              "No data available."
            )}
          </p>
        </div>
        <div className="bestlinks-trend-chart">
          {isLoading ? (
            <div className="bestlinks-loading-spinner"></div>
          ) : (
            <canvas id="backlink-trend-chart" width="300" height="150"></canvas>
          )}
        </div>
      </div>
      
      <div className="bestlinks-best-by-links-table-wrapper">
        <div className="bestlinks-card-view">
          {paginatedData.map((item, index) => (
            <motion.div
              key={index}
              className="bestlinks-data-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className="bestlinks-card-header"
                onClick={() => toggleCard(index, item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(index, item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={expandedCard === index}
                aria-label={`Toggle details for ${item.url}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePin(item.url);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePin(item.url);
                    }
                  }}
                  className={`bestlinks-pin-button ${
                    pinnedUrls.includes(item.url) ? "bestlinks-pinned" : ""
                  }`}
                  aria-label={
                    pinnedUrls.includes(item.url)
                      ? `Unpin ${item.url}`
                      : `Pin ${item.url}`
                  }
                >
                  📌
                </button>
                <a
                  href={`https://${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                >
                  {item.url}
                </a>
                <span>{expandedCard === index ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    className="bestlinks-card-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>
                    <p>
                      <strong>Backlinks:</strong>{" "}
                      {item.backlinks.toLocaleString()}
                    </p>
                    <p>
                      <strong>Referring Domains:</strong>{" "}
                      {item.refDomains.toLocaleString()}
                    </p>
                    <p>
                      <strong>Organic Traffic:</strong>{" "}
                      {item.traffic.toLocaleString()}
                    </p>
                    <p>
                      <strong>Growth Rate:</strong>{" "}
                      {calculateGrowthRate(item.trend).toFixed(2)}%
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bestlinks-pagination" onTouchMove={handleSwipe}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }
          }}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span aria-live="polite">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }
          }}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
      
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="bestlinks-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bestlinks-detail-modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h3>{selectedItem.url}</h3>
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>Backlinks:</strong>{" "}
                {selectedItem.backlinks.toLocaleString()}
              </p>
              <p>
                <strong>Referring Domains:</strong>{" "}
                {selectedItem.refDomains.toLocaleString()}
              </p>
              <p>
                <strong>Organic Traffic:</strong>{" "}
                {selectedItem.traffic.toLocaleString()}
              </p>
              <p>
                <strong>Growth Rate:</strong>{" "}
                {calculateGrowthRate(selectedItem.trend).toFixed(2)}%
              </p>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setExpandedCard(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedItem(null);
                    setExpandedCard(null);
                  }
                }}
                aria-label="Close details modal"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
    </section>
  
);

});

export default BestByLinks;
