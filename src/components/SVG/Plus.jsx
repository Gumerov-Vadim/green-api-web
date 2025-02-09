import React from 'react';

const Plus = ({height, width, ...props}) => {
    return (
        <svg viewBox="0 0 24 24" width={width} height={height} preserveAspectRatio="xMidYMid meet" {...props}><title>plus</title><path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path></svg>  );
};

export default Plus;
