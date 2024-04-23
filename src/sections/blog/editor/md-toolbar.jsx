import { videoIcon, musicIcon, mapIcon, grammarIcon, autoIcon } from './md-icons';

export const toolbar = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote'],
  ['ul', 'ol', 'task', 'indent', 'outdent'],
  ['table', 'link'],
  ['code', 'codeblock'],
  ['image',
    {
      name: 'video',
      tooltip: 'Insert video',
      el: videoIcon,
    },
    {
      name: 'music',
      tooltip: 'Insert music',
      el: musicIcon,
   }],
   [
    {
      name: 'map',
      tooltip: 'Insert map',
      el: mapIcon,
    },
    {
      name: 'grammar',
      tooltip: 'Correct grammar',
      el: grammarIcon,
   },
   {
    name: 'auto',
    tooltip: 'Auto complete',
    el: autoIcon,
    }
   ]
];