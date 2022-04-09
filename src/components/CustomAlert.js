import React from 'react';

function CustomAlert({item}) { //make it into component
    return <div className="alert alert-success" role="alert">
            <span>
                <strong>{item} deleted successfully</strong>
            </span>
    </div>;
}

export default CustomAlert;
