export const stripHTMLTags = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, '');
};

export const getLinkFromString = (text: string) => {
  const matches = text.match(/<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/g);
  if (!matches) {
    return undefined;
  }

  return Array.from(matches)[0];
};

export const getHrefFromString = (text: string) => {
  const matches = text.match(/href="([^"]*)/);
  if (!matches) {
    return undefined;
  }

  return Array.from(matches)[1];
};

export const getParagraphsFromText = (text: string) => {
  return text.split('<p>').filter((paragraph) => Boolean(paragraph));
};

export const getParagraphWithoutLink = (text: string) => {
  return `${stripHTMLTags(
    text.substring(0, text.indexOf('<a'))
  )}${stripHTMLTags(text.substring(text.indexOf('a>') + 2, text.length))}`;
};
