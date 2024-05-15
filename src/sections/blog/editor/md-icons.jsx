import VideoIcon from '/assets/icons/video.svg';
import MusicIcon from '/assets/icons/music.svg';
import MapIcon from '/assets/icons/map.svg';
import GrammarIcon from '/assets/icons/grammar.svg';
import AutoIcon from '/assets/icons/auto.svg';

export const createIconElement = (iconSrc, iconWidth) => {
  const iconElement = document.createElement('span');
  iconElement.style = 'cursor: pointer; vertical-align: top; ';
  const iconImg = document.createElement('img');
  iconImg.setAttribute('src', iconSrc);
  iconImg.setAttribute('width', iconWidth);
  iconElement.appendChild(iconImg);
  return iconElement;
};

export const videoIcon = createIconElement(VideoIcon, '26');
export const musicIcon = createIconElement(MusicIcon, '24');
export const mapIcon = createIconElement(MapIcon, '23');
export const grammarIcon = createIconElement(GrammarIcon, '25');
export const autoIcon = createIconElement(AutoIcon, '23');