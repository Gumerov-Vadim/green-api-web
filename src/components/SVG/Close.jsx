import React from 'react';

const Close = ({height, width, ...props}) => {
    return (
        <svg viewBox="0 0 24 24" height={height} width={width} preserveAspectRatio="xMidYMid meet" {...props}><title>x</title><path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z"></path></svg> );

};

export default Close;
