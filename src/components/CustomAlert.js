import React from 'react';

function CustomAlert({item, action}) {
    return <div className="alert alert-success" style={{marginTop: "16px"}} role="alert">
            <span>
                <strong>{item} {action} successfully</strong>
            </span>
    </div>;
}

export default CustomAlert;
