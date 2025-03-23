import React, { useState, useEffect } from 'react';
import Home from './components/home/Home';
import SiteXPLoader from './sitexploader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="App">
      {isLoading ? (
        <div className="loader-container">
          <SiteXPLoader />
        </div>
      ) : (
        <div className="home-container">
          <Home />
        </div>
      )}
    </div>
  );
}

export default App;