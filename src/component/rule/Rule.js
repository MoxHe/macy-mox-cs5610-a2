import React from 'react';
import styles from './Rule.module.css';

const Rule = () => {
    return (
        <div>
            <h2 className={styles.title}> Rules: </h2>
            <div className={styles.content}>
                <h3>
                    1. A living cell with less than two living neighbours dies.
                </h3>
                <h3>
                    2. A living cell with two or three live neighbours lives.
                </h3>
                <h3>
                    3. A living cell with more than three live neighbours dies.
                </h3>
                <h3>
                    4. A dead cell with exactly three live neighbours becomes
                    live cell.
                </h3>
            </div>
            <a
                className={styles['source-code']}
                target="blank"
                href="https://github.com/MoxHe/macy-mox-cs5610-a2">
                Source code
            </a>
        </div>
    );
};

export default Rule;
