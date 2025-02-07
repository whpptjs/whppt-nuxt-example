// import Research from '../components/page/whpptResearch/plugin';
// import GenericPage from '../../nuxt/components/lib/systemPlugins/GenericPagePlugin';
// import OtherGenericPage from '../../nuxt/components/lib/systemPlugins/OtherGenericPagePlugin';

import Sitemap from '~/components/sitemap/plugin';

export default ({ app }) => {
  // const genericPage = GenericPage({
  //   templates: [
  //     {
  //       key: 'example',
  //       label: 'Example',
  //       init: { header: { title: '' }, link: { type: 'page', href: '', text: '' }, contents: [] },
  //     },
  //   ],
  // });

  const genericPage = app.$whppt.availablePlugins.GenericPage({
    templates: [
      {
        key: 'example',
        label: 'Example',
        init: { header: { title: '' }, link: { type: 'page', href: '', text: '' }, contents: [] },
      },
    ],
  });
  // const otherGenericPage = OtherGenericPage({
  //   templates: [
  //     {
  //       key: 'otherExample',
  //       label: 'Other Example',
  //       init: {
  //         header: { title: '', subtitle: '' },
  //         image: { imageId: '' },
  //         link: { type: 'page', href: '', text: '' },
  //         contents: [],
  //       },
  //     },
  //   ],
  // });
  app.$whppt.addPlugins({
    GenericPage: genericPage,
    Sitemap,
    // OtherGenericPage: otherGenericPage,
    //   Research,
  });
};
