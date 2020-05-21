export default function({ $axios, store }) {
  const apiPrefix = 'testprefix';
  const baseAPIUrl = store.state['whppt-nuxt/editor'].baseAPIUrl;

  $axios.onRequest(config => {
    config.timeout = 6000;
    config.baseURL = `${baseAPIUrl}/${apiPrefix}`;
  });
}
