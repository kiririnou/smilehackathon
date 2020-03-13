import React from 'react';

function ErrorPage(props){
    return (
        <div id={'error-page'} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '90vh'
        }}>
            <span style={{
                fontSize: '10rem',
                margin: 0
            }}>Error occurred</span>
        </div>
    );
}

export default ErrorPage;