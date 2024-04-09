import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../../theme/variableColors';

// Styled Components
const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const RoundButton = styled.button`
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: 36px;
  padding: 9px 40px;
  border-radius: 60px;
  font-family: 'fontMedium';
  font-size: 16px;
  background-color: ${({ bgColor }) => bgColor || colors.primary};
`;

// Component
const ModalButtons = ({ buttons, mode }) => {
  if (!buttons || !mode) return null;

  const buttonWidth = buttons.length === 1 ? '100%' : '49%';

  return (
    <BottomWrapper>
      {mode === 'round' &&
        buttons.map((button, index) => (
          <RoundButton
            key={index}
            onClick={button.action}
            width={buttonWidth}
            bgColor={button.bgColor}
          >
            {/* <div style={{fontSize:'14px', color={button.color || colors.secondary}}}>
              {button.label}
            </div> */}
          </RoundButton>
        ))}
    </BottomWrapper>
  );
};

export default ModalButtons;

ModalButtons.propTypes = {
  buttons: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
};
