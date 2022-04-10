import React from 'react';

function CustomAlert({item, action, error = false}) {
    return <>
        {!error ? <div className="alert alert-success" style={{marginTop: "16px"}} role="alert"> <span>
                <strong>{item} {action} successfully</strong>
            </span></div> :

            <div className="alert alert-danger" style={{marginTop: "16px"}} role="alert">
            <span>
                <strong>Error</strong>
            </span>
            </div>
        }
    </>;
}

export default CustomAlert;
