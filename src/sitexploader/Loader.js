import React, { useEffect, useRef } from "react";

//CSS File
import "./loader.css";

const Loader = () => {

  const drDataPointsRef = useRef(null);
  const urDataPointsRef = useRef(null);
  const particlesRef = useRef(null);
  const percentCounterRef = useRef(null);
  const loadingTextRef = useRef(null);

  const createDataPoints = (container, count) => {
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 360;
      const distance = container.clientWidth * 0.4;
      const dataPoint = document.createElement("div");
      dataPoint.className = "loader-data-point";
      dataPoint.style.left = `50%`;
      dataPoint.style.top = `50%`;
      dataPoint.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${distance}px)`;
      container.appendChild(dataPoint);
    }
  };

  const createParticles = (container) => {
    if (!container) return;
    container.innerHTML = "";

    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "loader-particle";

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      container.appendChild(particle);
    }
  };

  const updatePercentage = () => {
    if (!percentCounterRef.current || !loadingTextRef.current) return;

    let count = 0;
    const duration = 2500;
    const fps = 60;
    const increment = 100 / ((duration / 1000) * fps);

    const interval = setInterval(() => {
      count += increment;
      const roundedCount = Math.min(Math.round(count), 100);

      if (percentCounterRef.current) {
        percentCounterRef.current.textContent = `${roundedCount}%`;
      }

      if (roundedCount >= 100) {
        clearInterval(interval);
        if (loadingTextRef.current) {
          loadingTextRef.current.textContent = "Dashboard ready!";
        }
      }
    }, 1000 / fps);
  };

  const handleResize = () => {
    createDataPoints(drDataPointsRef.current, 8);
    createDataPoints(urDataPointsRef.current, 8);
    createParticles(particlesRef.current);
  };

  useEffect(() => {
    createDataPoints(drDataPointsRef.current, 8);
    createDataPoints(urDataPointsRef.current, 8);
    createParticles(particlesRef.current);
    updatePercentage();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    
    <div className="loader-loader-container">
      
      <div className="loader-logo-container">
        <div className="loader-logo-glow"></div>
        <div className="loader-logo-text">
          <span className="loader-site">SITE</span>
          <span className="loader-xp">.XP</span>
        </div>
      </div>

      <div className="loader-metrics-container">
        <div className="loader-metric">
          <div className="loader-chart">
            <div className="loader-chart-bg"></div>
            <div className="loader-data-points" ref={drDataPointsRef}></div>
            <div className="loader-chart-spinner dr-spinner"></div>
            <div className="loader-chart-inner dr-inner">91</div>
          </div>
          <div className="loader-metric-label">Domain Rating</div>
        </div>

        <div className="loader-metric">
          <div className="loader-chart">
            <div className="loader-chart-bg"></div>
            <div className="loader-data-points" ref={urDataPointsRef}></div>
            <div className="loader-chart-spinner ur-spinner"></div>
            <div className="loader-chart-inner ur-inner">54</div>
          </div>
          <div className="loader-metric-label">URL Rating</div>
        </div>
      </div>

      <div className="loader-loading-bar-container">
        <div className="loader-loading-bar">
          <div className="loader-loading-progress"></div>
        </div>
        <div className="loader-loading-percentage">
          <span className="loader-percent-counter" ref={percentCounterRef}>
            0%
          </span>
        </div>
        <div className="loader-loading-text" ref={loadingTextRef}>
          Initializing dashboard data...
        </div>
      </div>

      <div className="loader-particles-container" ref={particlesRef}></div>
    
    </div>
  
);

};

export default Loader;