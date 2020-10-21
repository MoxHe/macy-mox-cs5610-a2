import React from "react";
import styles from "./Header.module.css";
import { connect } from "react-redux";
import { changePage } from "../action/Actions";

class Header extends React.Component {
  state = {
    views: ["Setting", "Play", "Rule"],
  };

  render() {
    const { pageId, changePage } = this.props;
    const curtPageStyle = {
      color: "#fb4934",
    };

    return (
      <header className={styles.header}>
        <a href="." className={styles.title}>
          Online Game Of Life
        </a>
        <nav>
          {this.state.views.map((name, idx) => {
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
  }
}

const mapStateToProps = (state) => {
  return {
    pageId: state.pageId,
  }
};

export default connect(mapStateToProps, { changePage })(Header);
