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
        'tracking-types/tags',
        'tracking-types/emojis',
        'tracking-types/derived',
        'tracking-types/custom',
        'tracking-types/text',
        'tracking-types/time',
        'tracking-types/exercise',
        'tracking-types/exercise-notation',
        'tracking-types/pyramid',
        'tracking-types/run-move',
        'tracking-types/splits',
        'tracking-types/section',
        'tracking-types/phase',
        'tracking-types/contacts',
        'tracking-types/body-metrics',
        'tracking-types/nutrition-finance',
      ],
    },
    {
      type: 'category',
      label: 'Lajit',
      items: [
        'sports/index',
        'sports/juoksuharjoitus',
        'sports/voimaharjoitus',
        'sports/lepo-palautuminen',
        'sports/nopeusharjoitus',
        'sports/kestavyysharjoitus',
        'sports/venyttely-liikkuvuus',
        'sports/pyoraily',
        'sports/kuntosali',
        'sports/uintiharjoitus',
        'sports/hiihto',
        'sports/tekniikkaharjoitus',
        'sports/intervallit-vedot',
        'sports/loikka-hyppyharjoitus',
        'sports/heittoharjoitus',
        'sports/keskivartaloharjoitus',
        'sports/lajiharjoitus',
        'sports/aitaharjoitus',
        'sports/gym',
        'sports/endurance',
        'sports/bodyweight',
      ],
    },
  ],
};

export default sidebars;
