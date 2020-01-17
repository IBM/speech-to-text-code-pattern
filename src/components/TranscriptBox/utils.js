export const createWordRegex = keywordInfo => {
  let allKeywords = [];
  keywordInfo.forEach(sectionKeywords => {
    allKeywords = [...allKeywords, ...Object.keys(sectionKeywords)];
  });
  const regexArray = allKeywords.map((word, index) => {
    if (index !== allKeywords.length - 1) {
      return `${word}|`;
    }
    return word;
  });
  const regexWordSearch = regexArray.reduce((arr, str) => arr + str, '');
  const regex = new RegExp(`(${regexWordSearch})(?!')`, 'gi');
  return regex;
};
