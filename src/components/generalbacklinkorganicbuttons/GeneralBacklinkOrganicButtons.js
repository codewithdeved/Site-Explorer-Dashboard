import React, {useState} from "react";

//CSS File
import './generalbacklinkorganicbuttons.css';

const GeneralBacklinkOrganicButtons = () => {

    const [isGeneralBacklinkOrganicButton, setIsGeneralBacklinkOrganicButton] = useState([true, false, false]);

    const handleGeneralBacklinkOrganicButtonClick = (index) => {
      setIsGeneralBacklinkOrganicButton((prevState) => {
        const newArray = prevState.map((item, i) => i === index);
        return newArray;
      });
    };

  return (
    
    <div id="generalbacklinkorganic-buttons">
      
      <button
        onClick={() => handleGeneralBacklinkOrganicButtonClick(0)}
        type="button"
        className={`general ${
          isGeneralBacklinkOrganicButton[0] ? "active" : ""
        }`}
      >
        General
      </button>

      <button
        onClick={() => handleGeneralBacklinkOrganicButtonClick(1)}
        type="button"
        className={`backlink ${
          isGeneralBacklinkOrganicButton[1] ? "active" : ""
        }`}
      >
        Backlink profile
      </button>

      <button
        onClick={() => handleGeneralBacklinkOrganicButtonClick(2)}
        type="button"
        className={`organic ${
          isGeneralBacklinkOrganicButton[2] ? "active" : ""
        }`}
      >
        Organic search
      </button>

    </div>

  );
};

export default GeneralBacklinkOrganicButtons;
