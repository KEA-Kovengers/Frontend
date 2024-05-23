import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AutoModal({ editorHtml1, editorHtml2 }) {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '50%',
                    backgroundColor: '#fff',
                    borderRadius: '3px',
                    padding: '20px'
                }}>
                    <h2>Auto Modal</h2>
                    <p>This is a Auto modal content.</p>
                    
                    <button onClick={closeModal}>Close</button>
                </div>
            )}
        </>
    );
};

AutoModal.propTypes = {
    editorHtml1: PropTypes.array.isRequired,
    editorHtml2: PropTypes.array.isRequired,
};