import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AutoModal({ contents, setContents}) {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    // ai 텍스트 생성 버튼 클릭 시 실행되는 함수
    const handleAiTextClick = () => {
        const text = contents.join(' ');
        console.log('text', text);
        PostGenerateText(text)
        .then((res) => {
            console.log('res', res.data);
            setContents([...contents, res.data]);
        })
        .catch((err) => {
            console.log('err', err);
        });
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
    contents : PropTypes.string,
    handleAiTextClick: PropTypes.func,
};