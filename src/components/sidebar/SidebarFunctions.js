import { useState, useEffect, useRef } from "react";

export const useSidebarFunctions = () => {
  const [isSidebarClose, setIsSidebarClose] = useState(false);
  const sidebarRef = useRef(null);
  
  const handleSidebarClose = () => {
    setIsSidebarClose((prevState) => !prevState);
  };
  
  const handleClickOutside = (event) => {
    if (
      window.innerWidth <= 768 &&
      sidebarRef.current && 
      !sidebarRef.current.contains(event.target)
    ) {
      setIsSidebarClose(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [expanded, setExpanded] = useState({
    "Backlink profile": true,
    "Organic search": true,
    "Paid search": false,
    Pages: false,
  });

  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    });
  };

  const [isSidebarMenuItemClick, setIsSidebarMenuItemClick] = useState(
    Array.from({ length: 21 }, (_, index) => index === 0)
  );

  const handleSidebarMenuItemClick = (index) => {
    setIsSidebarMenuItemClick((prevState) => {
      const newArray = prevState.map((item, i) => i === index);
      return newArray;
    });
  };

  const [isOverviewButtonClick, setIsOverviewButtonClick] = useState(false);

  const handleOverviewButtonClick = () => {
    setIsOverviewButtonClick(true);
    setIsCalendarButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsSeoXpressButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isOrganicKeywordsButtonClick, setIsOrganicKeywordsButtonClick] =
    useState(false);

  const handleOrganicKeywordsButtonClick = () => {
    setIsOrganicKeywordsButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsCalendarButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsSeoXpressButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isTopPagesButtonClick, setIsTopPagesButtonClick] = useState(false);

  const handleTopPagesButtonClick = () => {
    setIsTopPagesButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsCalendarButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsSeoXpressButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isBacklinksButtonClick, setIsBacklinksButtonClick] =
  useState(false);

  const handleBacklinksButtonClick = () => {
    setIsBacklinksButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsCalendarButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsSeoXpressButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isReferringDomainsButtonClick, setIsReferringDomainsButtonClick] =
  useState(false);

  const handleReferringDomainsButtonClick = () => {
    setIsReferringDomainsButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsCalendarButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsSeoXpressButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isCalendarButtonClick, setIsCalendarButtonClick] =
  useState(false);

  const handleCalendarButtonClick = () => {
    setIsCalendarButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsSeoXpressButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isSeoXpressButtonClick, setIsSeoXpressButtonClick] =
  useState(false);

  const handleSeoXpressButtonClick = () => {
    setIsSeoXpressButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsCalendarButtonClick(false);
    setIsReferringIPsButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  const [isReferringIPsButtonClick, setIsReferringIPsButtonClick] =
  useState(false);

  const handleReferringIPsButtonClick = () => {
    setIsReferringIPsButtonClick(true);
    setIsOverviewButtonClick(false);
    setIsBacklinksButtonClick(false);
    setIsReferringDomainsButtonClick(false);
    setIsOrganicKeywordsButtonClick(false);
    setIsTopPagesButtonClick(false);
    setIsCalendarButtonClick(false);
    setIsSeoXpressButtonClick(false);

    if (window.innerWidth <= 768) {
      setIsSidebarClose(false);
    }
  };

  return {
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
    handleReferringIPsButtonClick
  };
};

export default useSidebarFunctions;
