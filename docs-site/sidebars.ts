import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'react-components',
    {
      type: 'category',
      label: 'Format Elements',
      items: [
        'tracking-types/workout-header',
        'tracking-types/tags',
        'tracking-types/emojis',
        'tracking-types/derived',
        'tracking-types/custom',
        'tracking-types/text',
        'tracking-types/time',
        'tracking-types/exercise',
        'tracking-types/exercise-notation',
        'tracking-types/recovery',
        'tracking-types/left-right-side-patterns',
        'tracking-types/pyramid',
        'tracking-types/circuit',
        'tracking-types/interval',
        'tracking-types/run-move',
        'tracking-types/splits',
        'tracking-types/section',
        'tracking-types/phase',
        'tracking-types/contacts',
        'tracking-types/records',
        'tracking-types/feeling-pain',
        'tracking-types/body-metrics',
        'tracking-types/nutrition-finance',
      ],
    },
    {
      type: 'category',
      label: 'Lajit',
      items: [
        'sports/index',
        'sports/heittoharjoitus',
        'sports/hieronta',
        'sports/hiihto',
        {
          type: 'category',
          label: 'Juoksu',
          items: [
            'sports/juoksuharjoitus',
            'sports/intervallit-vedot',
            'sports/nopeusharjoitus',
          ],
        },
        'sports/lajiharjoitus',
        'sports/lepo-palautuminen',
        'sports/lihaskunto',
        'sports/loikka-hyppyharjoitus',
        'sports/pyoraily',
        'sports/sairas-lepopaiva',
        'sports/tekniikkaharjoitus',
        'sports/uintiharjoitus',
        'sports/venyttely-liikkuvuus',
        'sports/voimaharjoitus',
      ],
    },
    'life/index',
  ],
};

export default sidebars;
