import React from 'react';

import classes from './buildControl';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.more}>More</button>
    </div>
);

export default buildControl;