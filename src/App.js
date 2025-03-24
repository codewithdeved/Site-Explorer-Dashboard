import React, { useState, useEffect } from 'react';

//Component
import Home from './components/home/Home';

//Loader
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
          <SiteXPLoader />
      ) : (
          <Home />
      )}
    </div>

    // <div className="App">
    //   <Home />
    // </div>
  
);

}

export default App;