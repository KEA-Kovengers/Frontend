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
  iconImg.setAttribute('height', 'auto');
  iconImg.style = 'margin: 0px;';
  iconElement.appendChild(iconImg);
  return iconElement;
};

export const videoIcon = createIconElement(VideoIcon, '26');
export const musicIcon = createIconElement(MusicIcon, '24');
export const mapIcon = createIconElement(MapIcon, '23');
export const grammarIcon = createIconElement(GrammarIcon, '25');
export const autoIcon = createIconElement(AutoIcon, '23');

function createLastButton() {
  const button = document.createElement('button');

  button.className = 'toastui-editor-toolbar-icons last';
  button.style.backgroundImage = 'none';
  button.style.margin = '0';
  // SVG 파일을 가져와서 요소로 변환하여 버튼에 추가
  fetch(VideoIcon)
    .then((response) => response.text())
    .then((svgText) => {
      // 가져온 SVG를 버튼 내에 추가
      button.innerHTML = svgText;
    })
    .catch((error) => console.error('Error fetching SVG:', error));
  button.addEventListener('click', () => {
    //  editor.exec('bold');
  });

  return button;
}

export { createLastButton };
