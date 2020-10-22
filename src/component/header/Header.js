import React from "react";
import styles from "./Header.module.css";
import { connect } from "react-redux";
import { changePage } from "../../action/Actions";

const Header = (props) => {
  const views = ["Setting", "Play", "Rule"];

  const { pageId, changePage } = props;
  const curtPageStyle = {
    color: "#fb4934",
  };

  return (
    <header className={styles.header}>
      <a href="." className={styles.title}>
        Online Game Of Life
      </a>
      <nav>
        {views.map((name, idx) => {
          return (
            <span
              key={idx}
              className={styles["header-text"]}
              onClick={changePage.bind(this, idx)}
              style={pageId === idx ? curtPageStyle : null}
            >
              {name}
            </span>
          );
        })}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    pageId: state.pageId,
  };
};

export default connect(mapStateToProps, { changePage })(Header);
