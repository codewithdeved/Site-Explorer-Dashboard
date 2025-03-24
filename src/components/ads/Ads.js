import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Filter,
  Settings,
  Download,
  ChevronDown,
} from "lucide-react";
import "./ads.css";

const AdsPerformancePlatform = () => {
  
  const [activeView, setActiveView] = useState("keywords");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("thresholds");
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);
  const [isBidOptOpen, setIsBidOptOpen] = useState(true);
  
  const [settings, setSettings] = useState({
    thresholds: { ctr: 3.5, cpc: 0.75, spend: 2000 },
    display: { currency: "USD", decimals: 2, chartTheme: "default" },
    analytics: { forecastHorizon: 2, confidenceLevel: 0.8 },
  });
  
  const [advancedFilters, setAdvancedFilters] = useState({
    keywordType: "all",
    performanceMetric: "ctr",
    sortOrder: "desc",
  });
  
  const [performanceData] = useState({
    keywords: [
      {
        keyword: "enterprise seo platform",
        impressions: 45600,
        clicks: 2350,
        spend: 1575.3,
        ctr: 5.15,
        avgPosition: 1.3,
        conversionRate: 4.2,
        qualityScore: 9.1,
        keywordType: "branded",
        trendData: [
          { name: "Jan", ctr: 4.8, spend: 1200 },
          { name: "Feb", ctr: 5.2, spend: 1350 },
          { name: "Mar", ctr: 5.15, spend: 1575 },
        ],
      },
      {
        keyword: "competitor keyword research",
        impressions: 32100,
        clicks: 1750,
        spend: 1123.45,
        ctr: 5.45,
        avgPosition: 1.7,
        conversionRate: 3.8,
        qualityScore: 8.7,
        keywordType: "non-branded",
        trendData: [
          { name: "Jan", ctr: 5.2, spend: 980 },
          { name: "Feb", ctr: 5.4, spend: 1100 },
          { name: "Mar", ctr: 5.45, spend: 1123 },
        ],
      },
    ],
    competitiveInsights: {
      marketBenchmarks: [
        {
          competitor: "SEMrush",
          marketShare: 24.6,
          adSpend: 15320.75,
          avgCtr: 3.2,
          performanceTrend: [
            { name: "Jan", share: 22.4 },
            { name: "Feb", share: 23.8 },
            { name: "Mar", share: 24.6 },
          ],
        },
        {
          competitor: "Ahrefs",
          marketShare: 19.3,
          adSpend: 12450.6,
          avgCtr: 2.9,
          performanceTrend: [
            { name: "Jan", share: 18.1 },
            { name: "Feb", share: 18.7 },
            { name: "Mar", share: 19.3 },
          ],
        },
      ],
    },
    abTesting: [
      {
        variant: "A",
        keyword: "seo tools",
        ctr: 4.5,
        spend: 900,
        conversions: 45,
      },
      {
        variant: "B",
        keyword: "seo tools",
        ctr: 5.0,
        spend: 950,
        conversions: 52,
      },
    ],
  });
  
  const [showForecast, setShowForecast] = useState(false);

  const filteredKeywords = useMemo(() => {
    let filtered = [...performanceData.keywords];
    if (advancedFilters.keywordType !== "all") {
      filtered = filtered.filter(
        (k) => k.keywordType === advancedFilters.keywordType
      );
    }
    return filtered.sort((a, b) =>
      advancedFilters.sortOrder === "desc"
        ? b[advancedFilters.performanceMetric] -
          a[advancedFilters.performanceMetric]
        : a[advancedFilters.performanceMetric] -
          b[advancedFilters.performanceMetric]
    );
  }, [performanceData.keywords, advancedFilters]);

  const predictTrend = (trendData) => {
    const slopeCtr = (trendData[2].ctr - trendData[0].ctr) / 2;
    const slopeSpend = (trendData[2].spend - trendData[0].spend) / 2;
    const last = trendData[trendData.length - 1];
    const forecast = [];
    for (let i = 1; i <= settings.analytics.forecastHorizon; i++) {
      forecast.push({
        name: `M+${i}`,
        ctr: last.ctr + i * slopeCtr * settings.analytics.confidenceLevel,
        spend: last.spend + i * slopeSpend * settings.analytics.confidenceLevel,
      });
    }
    return [...trendData, ...forecast];
  };

  const getKeywordSuggestions = () => {
    const topKeyword = filteredKeywords[0];
    const competitorKeyword =
      performanceData.competitiveInsights.marketBenchmarks[0].competitor.toLowerCase();
    return [
      {
        keyword: `${topKeyword.keyword} pro`,
        potentialCtr: topKeyword.ctr * 1.1,
        potentialSpend: topKeyword.spend * 0.9,
        score:
          (topKeyword.ctr * 1.1 * topKeyword.qualityScore) /
          (topKeyword.spend * 0.9),
      },
      {
        keyword: `${competitorKeyword} alternative`,
        potentialCtr: topKeyword.ctr * 0.95,
        potentialSpend: topKeyword.spend * 1.05,
        score:
          (topKeyword.ctr * 0.95 * topKeyword.qualityScore) /
          (topKeyword.spend * 1.05),
      },
    ].sort((a, b) => b.score - a.score);
  };

  const getBidSuggestions = () => {
    return filteredKeywords
      .map((k) => {
        const cpc = k.spend / k.clicks;
        const suggestedBid =
          cpc > settings.thresholds.cpc ? cpc * 0.9 : cpc * 1.1;
        const efficiency = (k.ctr / cpc).toFixed(2);
        const impact =
          cpc > settings.thresholds.cpc
            ? -Math.round(k.impressions * 0.1)
            : Math.round(k.impressions * 0.15);
        return {
          keyword: k.keyword,
          currentCPC: cpc.toFixed(2),
          suggestedBid: suggestedBid.toFixed(2),
          efficiency,
          impact,
        };
      })
      .sort((a, b) => b.efficiency - a.efficiency);
  };

  const getPerformanceSummary = () => {
    const totalImpressions = filteredKeywords.reduce(
      (sum, k) => sum + k.impressions,
      0
    );
    const totalClicks = filteredKeywords.reduce((sum, k) => sum + k.clicks, 0);
    const totalSpend = filteredKeywords.reduce((sum, k) => sum + k.spend, 0);
    const avgCtr = (totalClicks / totalImpressions) * 100;
    return {
      totalImpressions,
      totalClicks,
      totalSpend,
      avgCtr,
      trendData: [
        { name: "Impressions", value: totalImpressions },
        { name: "Clicks", value: totalClicks },
        { name: "Spend", value: totalSpend },
      ],
    };
  };

  const handleDownload = () => {
    const dataToExport =
      activeView === "keywords"
        ? filteredKeywords
        : activeView === "competitiveinsights"
        ? performanceData.competitiveInsights.marketBenchmarks
        : performanceData.abTesting;
    const headers = Object.keys(dataToExport[0]).join(",");
    const rows = dataToExport
      .map((item) => Object.values(item).join(","))
      .join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${activeView}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSettingsModal = () => (
    <div className="ads-settings-modal">
      <div className="ads-settings-tabs">
        {["Thresholds", "Display Options", "Advanced Analytics"].map((tab) => (
          <button
            key={tab}
            className={
              settingsTab === tab.toLowerCase().replace(" ", "") ? "active" : ""
            }
            onClick={() => setSettingsTab(tab.toLowerCase().replace(" ", ""))}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="ads-settings-content">
        {settingsTab === "thresholds" && (
          <>
            <label title="Threshold for triggering bid adjustments">
              CTR Threshold (%):{" "}
              <input
                type="number"
                step="0.1"
                min="0"
                value={settings.thresholds.ctr}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    thresholds: {
                      ...p.thresholds,
                      ctr: Number(e.target.value),
                    },
                  }))
                }
              />
            </label>
            <label title="Maximum acceptable cost per click">
              CPC Threshold ({settings.display.currency}):{" "}
              <input
                type="number"
                step="0.01"
                min="0"
                value={settings.thresholds.cpc}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    thresholds: {
                      ...p.thresholds,
                      cpc: Number(e.target.value),
                    },
                  }))
                }
              />
            </label>
            <label title="Budget cap for total spend">
              Spend Threshold ({settings.display.currency}):{" "}
              <input
                type="number"
                min="0"
                value={settings.thresholds.spend}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    thresholds: {
                      ...p.thresholds,
                      spend: Number(e.target.value),
                    },
                  }))
                }
              />
            </label>
          </>
        )}
        {settingsTab === "displayoptions" && (
          <>
            <label title="Currency for monetary values">
              Currency:{" "}
              <select
                value={settings.display.currency}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    display: { ...p.display, currency: e.target.value },
                  }))
                }
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
            <label title="Number of decimal places for display">
              Decimals:{" "}
              <input
                type="number"
                min="0"
                max="4"
                value={settings.display.decimals}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    display: { ...p.display, decimals: Number(e.target.value) },
                  }))
                }
              />
            </label>
            <label title="Chart color scheme">
              Chart Theme:{" "}
              <select
                value={settings.display.chartTheme}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    display: { ...p.display, chartTheme: e.target.value },
                  }))
                }
              >
                <option value="default">Default</option>
                <option value="vibrant">Vibrant</option>
                <option value="muted">Muted</option>
              </select>
            </label>
          </>
        )}
        {settingsTab === "advancedanalytics" && (
          <>
            <label title="Number of months to forecast">
              Forecast Horizon (months):{" "}
              <input
                type="number"
                min="1"
                max="6"
                value={settings.analytics.forecastHorizon}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    analytics: {
                      ...p.analytics,
                      forecastHorizon: Number(e.target.value),
                    },
                  }))
                }
              />
            </label>
            <label title="Confidence level for predictions (0-1)">
              Confidence Level:{" "}
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={settings.analytics.confidenceLevel}
                onChange={(e) =>
                  setSettings((p) => ({
                    ...p,
                    analytics: {
                      ...p.analytics,
                      confidenceLevel: Number(e.target.value),
                    },
                  }))
                }
              />
            </label>
          </>
        )}
      </div>
      <button onClick={() => setIsSettingsOpen(false)}>Save & Close</button>
    </div>
  );

  const renderKeywordsView = () => {
    const summary = getPerformanceSummary();
    const currencySymbol =
      settings.display.currency === "USD"
        ? "$"
        : settings.display.currency === "EUR"
        ? "€"
        : "£";
    return (
      <div className="ads-keywords-intelligence">
        <div className="ads-keywords-filters">
          <div className="ads-filter-group">
            <Filter size={18} />
            <select
              value={advancedFilters.keywordType}
              onChange={(e) =>
                setAdvancedFilters((p) => ({
                  ...p,
                  keywordType: e.target.value,
                }))
              }
            >
              <option value="all">All</option>
              <option value="branded">Branded</option>
              <option value="non-branded">Non-Branded</option>
            </select>
          </div>
          <div className="ads-filter-group">
            <TrendingUp size={18} />
            <select
              value={advancedFilters.performanceMetric}
              onChange={(e) =>
                setAdvancedFilters((p) => ({
                  ...p,
                  performanceMetric: e.target.value,
                }))
              }
            >
              <option value="ctr">CTR</option>
              <option value="conversionRate">Conversion Rate</option>
              <option value="spend">Ad Spend</option>
            </select>
          </div>
          <label>
            <input
              type="checkbox"
              checked={showForecast}
              onChange={() => setShowForecast(!showForecast)}
            />{" "}
            Show Forecast
          </label>
        </div>
        <div className="ads-performance-summary">
          <h3 onClick={() => setIsSummaryOpen(!isSummaryOpen)}>
            Performance Summary{" "}
            <ChevronDown
              size={18}
              className={isSummaryOpen ? "ads-open" : ""}
            />
          </h3>
          {isSummaryOpen && (
            <>
              <p>
                Total Impressions: {summary.totalImpressions.toLocaleString()}
              </p>
              <p>Total Clicks: {summary.totalClicks.toLocaleString()}</p>
              <p>
                Total Spend: {currencySymbol}
                {summary.totalSpend.toFixed(settings.display.decimals)}
              </p>
              <p>
                Average CTR: {summary.avgCtr.toFixed(settings.display.decimals)}
                %
              </p>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={summary.trendData}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
        <div className="ads-keywords-table">
          {filteredKeywords.map((keyword, index) => (
            <div key={index} className="ads-keyword-card">
              <div className="ads-keyword-header">
                <h3>{keyword.keyword}</h3>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <ComposedChart
                  data={
                    showForecast
                      ? predictTrend(keyword.trendData)
                      : keyword.trendData
                  }
                >
                  <XAxis dataKey="name" />
                  <Tooltip
                    formatter={(value, name) => [
                      `${
                        name === "ctr"
                          ? value.toFixed(2) + "%"
                          : currencySymbol + value.toFixed(2)
                      }`,
                      name === "ctr" ? "CTR" : "Spend",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="spend"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    stroke="#82ca9d"
                    strokeDasharray={showForecast && "5 5"}
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="ads-keyword-stats">
                {Object.entries({
                  Impressions: keyword.impressions,
                  Clicks: keyword.clicks,
                  CTR: `${keyword.ctr.toFixed(settings.display.decimals)}%`,
                  "Avg. Position": keyword.avgPosition,
                  "Quality Score": `${keyword.qualityScore}/10`,
                }).map(([label, value]) => (
                  <div key={label} className="ads-stat-item">
                    <span className="ads-stat-label">{label}</span>
                    <span className="ads-stat-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="ads-keyword-suggestions">
          <h3 onClick={() => setIsSuggestionsOpen(!isSuggestionsOpen)}>
            Suggested Keywords{" "}
            <ChevronDown
              size={18}
              className={isSuggestionsOpen ? "ads-open" : ""}
            />
          </h3>
          {isSuggestionsOpen &&
            getKeywordSuggestions().map((s, i) => (
              <div key={i}>
                {s.keyword} (CTR:{" "}
                {s.potentialCtr.toFixed(settings.display.decimals)}%, Spend:{" "}
                {currencySymbol}
                {s.potentialSpend.toFixed(settings.display.decimals)}, Score:{" "}
                {s.score.toFixed(2)})
              </div>
            ))}
        </div>
        <div className="ads-bid-optimization">
          <h3 onClick={() => setIsBidOptOpen(!isBidOptOpen)}>
            Bid Optimization Suggestions{" "}
            <ChevronDown size={18} className={isBidOptOpen ? "ads-open" : ""} />
          </h3>
          {isBidOptOpen &&
            getBidSuggestions().map((b, i) => (
              <div key={i}>{`${b.keyword}: Current CPC ${currencySymbol}${
                b.currentCPC
              } → Suggested ${currencySymbol}${b.suggestedBid} (Efficiency: ${
                b.efficiency
              }, Impact: ${b.impact > 0 ? "+" : ""}${
                b.impact
              } impressions)`}</div>
            ))}
        </div>
      </div>
    );
  };

  const renderCompetitiveInsightsView = () => (
    <div className="ads-competitive-intelligence">
      <div className="ads-market-benchmarks">
        {performanceData.competitiveInsights.marketBenchmarks.map(
          (competitor, index) => (
            <div key={index} className="ads-competitor-card">
              <div className="ads-competitor-header">
                <h3>{competitor.competitor}</h3>
                <span className="ads-market-share">
                  Market Share: {competitor.marketShare}%
                </span>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={competitor.performanceTrend}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="share" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div className="ads-competitor-metrics">
                {Object.entries({
                  "Ad Spend": `${
                    settings.display.currency === "USD"
                      ? "$"
                      : settings.display.currency === "EUR"
                      ? "€"
                      : "£"
                  }${competitor.adSpend.toFixed(settings.display.decimals)}`,
                  "Avg. CTR": `${competitor.avgCtr.toFixed(
                    settings.display.decimals
                  )}%`,
                }).map(([label, value]) => (
                  <div key={label} className="ads-metric-item">
                    <span className="ads-metric-label">{label}</span>
                    <span className="ads-metric-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  const renderABTestingView = () => {
    const significance =
      Math.abs(
        performanceData.abTesting[0].ctr - performanceData.abTesting[1].ctr
      ) > 0.5
        ? "Significant"
        : "Not Significant";
    return (
      <div className="ads-ab-testing">
        <h3>A/B Testing Results (Significance: {significance})</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={performanceData.abTesting}>
            <XAxis dataKey="variant" />
            <YAxis yAxisId="left" hide />
            <YAxis yAxisId="right" hide orientation="right" />
            <Tooltip
              formatter={(value, name) => [
                name === "ctr"
                  ? `${value}%`
                  : `${
                      settings.display.currency === "USD"
                        ? "$"
                        : settings.display.currency === "EUR"
                        ? "€"
                        : "£"
                    }${value}`,
                name,
              ]}
            />
            <Bar yAxisId="left" dataKey="ctr" fill="#82ca9d" name="CTR (%)" />
            <Bar yAxisId="right" dataKey="spend" fill="#8884d8" name="Spend" />
          </BarChart>
        </ResponsiveContainer>
        <div className="ads-ab-table">
          {performanceData.abTesting.map((test, index) => (
            <div key={index} className="ads-ab-card">
              <h4>
                Variant {test.variant} - {test.keyword}
              </h4>
              <p>CTR: {test.ctr.toFixed(settings.display.decimals)}%</p>
              <p>
                Spend:{" "}
                {settings.display.currency === "USD"
                  ? "$"
                  : settings.display.currency === "EUR"
                  ? "€"
                  : "£"}
                {test.spend.toFixed(settings.display.decimals)}
              </p>
              <p>Conversions: {test.conversions}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const viewMap = {
    keywords: "keywords",
    "competitive insights": "competitiveinsights",
    "a/b testing": "abtesting",
  };

  return (

    <div className="ads-performance-platform">
      <div className="ads-platform-header">
        <h1>Ads Intelligence Platform</h1>
        <div className="ads-platform-controls">
          <div className="ads-view-navigation">
            {["Keywords", "Competitive Insights", "A/B Testing"].map((view) => (
              <button
                key={view}
                className={
                  activeView === viewMap[view.toLowerCase()] ? "active" : ""
                }
                onClick={() => setActiveView(viewMap[view.toLowerCase()])}
              >
                {view}
              </button>
            ))}
          </div>
          <div className="ads-platform-actions">
            <Settings size={24} onClick={() => setIsSettingsOpen(true)} />
            <Download size={24} onClick={handleDownload} />
          </div>
        </div>
      </div>
      <div className="ads-platform-content">
        {activeView === "keywords" && renderKeywordsView()}
        {activeView === "competitiveinsights" &&
          renderCompetitiveInsightsView()}
        {activeView === "abtesting" && renderABTestingView()}
      </div>
      {isSettingsOpen && renderSettingsModal()}
    </div>

);

};

export default AdsPerformancePlatform;