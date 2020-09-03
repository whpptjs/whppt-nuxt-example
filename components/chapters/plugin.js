import StoriesPageMenu from './StoryPageMenu';

const formatSlug = ({ page, slug }) => {
  if (!page || !page.story) return slug;
  return `chapters/${page.story.slug}/${slug}`;
};

const stripSlug = ({ page, slug }) => {
  if (!page || !page.story) return slug;
  return slug.replace(`chapters/${page.story.slug}`, '');
};

const checkSlug = ({ $api }, { slug, _id }) => $api.$get(`/page/checkSlug?slug=${slug}&_id=${_id}`);

const deletePage = ({ $api }, { _id }) => $api.$post(`/page/delete`, { _id });

const loadPage = ({ $api }, { slug }) => {
  return $api.$get(`/page/load?slug=${slug}`).then(page => {
    const storyId = page && page.story && page.story._id;
    if (!storyId) return { page };

    return $api.$get(`/obj/story/${storyId}`).then(story => {
      return { ...page, _story: story };
    });
  });
};

const savePage = ({ $api }, { page }) => {
  return $api.$post(`/page/save`, { page });
};

const createPage = ({ $api }, { page, form }) => {
  const _page = {
    ...page,
    story: { _id: form.story._id },
    template: 'example',
    contents: [],
    inContainer: true,
    marginTop: 0,
    heading: '',
    subheading: '',
    downloadLink: {
      type: 'external',
      label: '',
      href: '',
    },
    image: { imageId: '', crop: {} },
  };
  return $api.$post(`/page/save`, { page: _page });
};

export default {
  pageType: {
    name: 'chapters',
    label: 'Chapters',
    component: StoriesPageMenu,
    formatSlug,
    stripSlug,
    createPage,
    deletePage,
    loadPage,
    savePage,
    checkSlug,
  },
};
