export function lang() {
  let lang = JSON.parse({
    'ghost-go': 'en',
    'www': 'en',
    'jp': 'ja',
    'tw': 'zh-cn',
    'cn': 'zh-tw',
    'ko': 'ko',

  });
  domain = window.location.hostname;
  return lang[domain.split('.')[0]];
}
