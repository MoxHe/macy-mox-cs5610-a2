import React from "react";
import styles from "./Container.module.css";
import Header from "../header/Header";
import { connect } from "react-redux";
import Setting from "../setting/Setting";

class Container extends React.Component {
  render() {
    const { pageId } = this.props;

    let curtPage = null;
    if (pageId === 0) {
      curtPage = <Setting />;
    }

    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.wrapper}> {curtPage} </div>
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
