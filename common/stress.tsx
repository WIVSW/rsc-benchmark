import React from 'react';

const Stress: React.FC<{count: number}> = (props) => {
    const out = Array(props.count);

    for (let i = 0; i < props.count; i++) {
        out[i] = <li key={i}>{i}</li>
    }

    return <ul>{out}</ul>;
}

export default Stress;