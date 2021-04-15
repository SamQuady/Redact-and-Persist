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

//notes

/*
At the moment, this redacter is case-sensitive, and accent sensitive. In order to make it handle redactions with inconsistent capitalization or non-english accents, I would sub out the .indexOf() method with a .localeCompare() method, which would allow much more comprehenesive comparisions before redaction.

Before returning the now redacted copy I would persist the entire dbCopy object I constructed to a database. There are many DBs that can now handle JSON data, so there are certainly a lot to choose from, but for this I would use MongoDB. The main reason is that I know Mongo can handle searching for records in a collection based on one value being present in the document. Mongo would support being able to subsequently find documents based on searching for a redacted word in the array of redacted words I added.

In order to make it searchable if it were desirable to expose publicly, I would create a little input text box which would allow a user to search for a particular word that had been redacted. On the back end, the query route would ask Mongo to return any documents that had that given word in the redacted words array. I would then display any matching documents to the user, but in their redacted state.

On the back end, an engineer could do a similar thing and query the database directly from the shell, and turn up the same data.

*/