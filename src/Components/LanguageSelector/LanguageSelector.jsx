import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.languageSelector}>
      <div className={styles.language} onClick={handleDropdownToggle}>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_United_States.svg.png"
          alt="US flag"
          className={styles.flag}
        />
        <span className={styles.languageName}>EN</span>
        <span className={styles.dropdownArrow}>
          <FaChevronDown />
        </span>
      </div>

      <div
        className={`${styles.languageDropdown} ${isOpen ? styles.open : ""}`}
      >
        <p className={styles.navText}>Language Settings</p>
        <p className={styles.navText}>
          Select the language you prefer for browsing, shopping, and
          communications.
        </p>
        <ul>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_United_States.svg.png"
              alt="US flag"
              className={styles.flag}
            />
            English
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Spain.svg/1024px-Flag_of_Spain.svg.png"
              alt="Spanish flag"
              className={styles.flag}
            />
            Español
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Saudi_Arabia.svg/1024px-Flag_of_Saudi_Arabia.svg.png"
              alt="Arabic flag"
              className={styles.flag}
            />
            العربية
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png"
              alt="German flag"
              className={styles.flag}
            />
            Deutsch
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Flag_of_Israel.svg/1024px-Flag_of_Israel.svg.png"
              alt="Hebrew flag"
              className={styles.flag}
            />
            עברית
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_South_Korea.svg/1024px-Flag_of_South_Korea.svg.png"
              alt="Korean flag"
              className={styles.flag}
            />
            한국어
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Flag_of_Portugal.svg/1024px-Flag_of_Portugal.svg.png"
              alt="Portuguese flag"
              className={styles.flag}
            />
            português
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_China.svg/1024px-Flag_of_China.svg.png"
              alt="Chinese flag"
              className={styles.flag}
            />
            中文 (简体)
          </li>
          <li>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Taiwan.svg/1024px-Flag_of_Taiwan.svg.png"
              alt="Taiwan flag"
              className={styles.flag}
            />
            中文 (繁體)
          </li>
        </ul>
        <hr />
        <p className={styles.changeCurrency}>Currency Settings</p>
        <p className={styles.changeCurrency}>
          Select the currency you want to shop with.
        </p>
        <p className={styles.currencyInfo}>
          $ - USD - US Dollar
          <a href="#" className={styles.icpFlyoutLearnMore}>
            Learn More
          </a>
        </p>
        <p className={styles.currencyInfo}>
          <a href="#" className={styles.icpFlyoutChange}>
            Change
          </a>
        </p>
        <p className={styles.shoppingInfo}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_United_States.svg.png"
            alt="US flag"
            className={styles.flag}
          />
          You are shopping on Amazon.com
        </p>
        <p className={styles.shoppingInfo}>
          <a href="#" className={styles.icpMktChangeLnk}>
            Change country/region.
          </a>
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
