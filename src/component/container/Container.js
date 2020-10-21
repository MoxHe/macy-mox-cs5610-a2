import React from "react";
import styles from "./Container.module.css";
import Header from "../header/Header";
import { connect } from "react-redux";

class Container extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Header/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageId: state.pageId,
  };
};

export default connect(mapStateToProps)(Container);
