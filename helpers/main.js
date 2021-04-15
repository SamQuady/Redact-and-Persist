let redacter = (wordsToRedact, originalDoc) => {

  let dbCopy = {};

  dbCopy.original = doc;
  dbCopy.redactedWords = [];

  for (let words of wordsToRedact) {
    if (originalDoc.indexOf(words) > -1) {
      dbCopy.redactedWords.push(words);
      while (originalDoc.indexOf(words) > -1) {
        originalDoc = originalDoc.replace(words, 'XXXX');
      }
    }
  }
  dbCopy.redactedCopy = originalDoc;
  return dbCopy.redactedCopy
}