import React, { useState } from 'react';

export default function VideoModal(){
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
                    <h2>Video Modal</h2>
                    <p>This is a music modal content.</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            )}
        </>
    );
};