import "./Tab.scss";

import React, { useState } from "react";

export const Tab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="tab-container">
      {/* Tab Headers */}
      <div className="headers">
        {tabs.map((tab) => (
          <button
            className={`btn-tab ${activeTab === tab.label ? "active" : ""}`}
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="content">
        {tabs.find((tab) => tab.label === activeTab)?.content || "No tab found"}
      </div>
    </div>
  );
};
