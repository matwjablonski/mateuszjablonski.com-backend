const createPostSlug = postTitle => {
  return postTitle
    .toLowerCase()
    .replace(/-/g, '')
    .replace(/\s/g, '-')
    .replace(/[!-,.-\/:-@\[-`{-~]/g, '')
    .replace(/[ą]/g, 'a')
    .replace(/[ć]/g, 'c')
    .replace(/[ę]/g, 'e')
    .replace(/[ł]/g, 'l')
    .replace(/[ń]/g, 'n')
    .replace(/[ó]/g, 'o')
    .replace(/[ś]/g, 's')
    .replace(/[źż]/g, 'z');
};

module.exports = createPostSlug;
