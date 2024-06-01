import { videoIcon, musicIcon, mapIcon, grammarIcon, autoIcon } from './md-icons';
import Iconify from 'src/components/iconify/iconify';
import moreIcon from 'src/assets/icons/more.svg';

export const toolbar = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote'],
  ['ul', 'ol', 'task', 'indent', 'outdent'],
  ['table', 'link'],
  ['code', 'codeblock'],
  [
    'image',
    {
      name: 'tools',
      tooltip: 'more tools',
      text: '@',
      // image: moreIcon,
      style: { backgroundImage: 'none' },
      // JavaScript를 사용하여 div 컨테이너와 여러 span 요소를 생성한 다음 body에 할당
      popup: {
        body: (function() {
          const container = document.createElement('div');
    
          const icon1 = document.createElement('span');
          container.appendChild(videoIcon);
    
          const icon2 = document.createElement('span');
          container.appendChild(musicIcon);
    
          const icon3 = document.createElement('span');
          container.appendChild(mapIcon);

          const icon4 = document.createElement('span');
          container.appendChild(grammarIcon);

          const icon5 = document.createElement('span');
          container.appendChild(autoIcon);
    
          return container;
        })(),
      }
    },
  ],
  // [
  //   {
  //     name: 'map',
  //     tooltip: 'Insert map',
  //     el: mapIcon,
  //   },
  //   {
  //     name: 'grammar',
  //     tooltip: 'Correct grammar',
  //     el: grammarIcon,
  //   },
  //   {
  //     name: 'auto',
  //     tooltip: 'Auto complete',
  //     el: autoIcon,
  //   },
  // ],
];

