import React from "react";
import "./LanguageSettingsPage.css";

const LanguageSettingsPage = () => {
  return (
    <div className="settingsPageContainer">
      <h1>Language Settings</h1>
      <p>
        Select the language you prefer for browsing, shopping, and
        communications.
      </p>
      <ul className="languageList">
        <li>
          <i className="a-icon a-icon-radio"></i> English - EN
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> español - ES - Traducción
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> العربية - AR - الترجمة
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> Deutsch - DE - Übersetzung
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> עברית - HE - תרגום
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> 한국어 - KO - 번역
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> português - PT - Tradução
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> 中文 (简体) - ZH - 翻译
        </li>
        <li>
          <i className="a-icon a-icon-radio"></i> 中文 (繁體) - ZH - 翻譯
        </li>
      </ul>

      <hr />

      <h2>Currency Settings</h2>
      <p>Select the currency you want to shop with.</p>
      <div className="currencySettings">
        <button className="dropdownButton">
          $ - USD - US Dollar (Default)
        </button>
      </div>

      <hr />

      <div className="actionButtons">
        <button className="cancelButton">Cancel</button>
        <button className="saveChangesButton">Save Changes</button>
      </div>

      <hr />

      <div className="recommendations">
        <p>See personalized recommendations</p>
        <button className="signInButton">Sign In</button>
        <p>
          New customer? <a href="#">Start here.</a>
        </p>
      </div>
    </div>
  );
};

export default LanguageSettingsPage;
