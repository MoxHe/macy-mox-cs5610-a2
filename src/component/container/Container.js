import React from 'react';
import styles from './Container.module.css';
import Header from '../header/Header';
import { connect } from 'react-redux';
import Setting from '../setting/Setting';
import Play from '../play/Play';
import Rule from '../rule/Rule';
import { page } from '../constant/Constant';

class Container extends React.Component {
    render() {
        const { pageId } = this.props;
        const curtPage = this.routePage(pageId);

        return (
            <div className={styles.container}>
                <Header />
                <div className={styles.wrapper}> {curtPage} </div>
            </div>
        );
    }

    routePage(pageId) {
        switch (pageId) {
            case page.SETTING:
                return <Setting />;
            case page.PLAY:
                return <Play />;
            case page.RULE:
                return <Rule />;
            default:
                return <Setting />;
        }
    }
}

const mapStateToProps = state => {
    return {
        pageId: state.pageId,
    };
};

export default connect(mapStateToProps)(Container);
