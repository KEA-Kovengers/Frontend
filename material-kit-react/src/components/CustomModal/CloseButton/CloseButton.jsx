import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '../../../../public/assets/icons/buttons/closeButton.svg';

// import SvgColor from '../../svg-color';

const TopWrapper = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: ${({ title }) => (title ? 'space-between' : 'flex-end')};
  padding: 20px;
`;

// import { colors } from '../../../theme/variableColors';

// const closeIcon = (
//   <SvgColor src={`/assets/icons/buttons/closeButton.svg`} sx={{ width: 1, height: 1 }} />
// );

export const CloseButton = ({ onClose, title }) => (
  <TopWrapper title={title}>
    {title}
    <button type="button" onClick={onClose}>
      {/* <img src={require('/assets/icons/buttons/closeButton.png')} alt="Close" /> */}
      <CloseIcon />
    </button>
  </TopWrapper>
);

export default CloseButton;

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
