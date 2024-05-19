import { createRoot } from 'react-dom/client';

import VideoIcon from '/assets/icons/video.svg';
import MusicIcon from '/assets/icons/music.svg';
import MapIcon from '/assets/icons/map.svg';
import GrammarIcon from '/assets/icons/grammar.svg';
import AutoIcon from '/assets/icons/auto.svg';

import MusicModal from '../modal/MusicModal';
import VideoModal from '../modal/VideoModal';
import MapModal from '../modal/MapModal';
import GrammarModal from '../modal/GrammarModal';
import AutoModal from '../modal/AutoModal';

export const createIconElement = (iconSrc, iconWidth, onClick) => {
  const iconElement = document.createElement('span');
  iconElement.style = 'cursor: pointer; vertical-align: top; ';
  const iconImg = document.createElement('img');
  iconImg.setAttribute('src', iconSrc);
  iconImg.setAttribute('width', iconWidth);
  iconElement.appendChild(iconImg);
  iconElement.addEventListener('click', onClick);
  return iconElement;
};

let modalDiv = null;

export const RenderModal = (ModalComponent) => {
  // 만약 모달이 이미 존재한다면, 제거합니다.
  if (modalDiv) {
    document.body.removeChild(modalDiv);
    modalDiv = null;
  }

  // 새로운 div 요소를 생성합니다.
  modalDiv = document.createElement('div');

  // 새로운 div 요소를 body에 추가합니다.
  document.body.appendChild(modalDiv);

  // ReactDOM을 사용하여 ModalComponent를 새로운 div 요소에 렌더링합니다.
  createRoot(modalDiv).render(<ModalComponent />);
};


export const videoIcon = createIconElement(VideoIcon, '26', () => RenderModal(VideoModal));
export const musicIcon = createIconElement(MusicIcon, '24', () => RenderModal(MusicModal));
export const mapIcon = createIconElement(MapIcon, '23', () => RenderModal(MapModal));
export const grammarIcon = createIconElement(GrammarIcon, '25', () => RenderModal(GrammarModal));
export const autoIcon = createIconElement(AutoIcon, '23', () => RenderModal(AutoModal));
