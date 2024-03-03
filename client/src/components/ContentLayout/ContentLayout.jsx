import React from 'react';
import './ContentLayout.css';

const ContentLayout = ({children}) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default ContentLayout