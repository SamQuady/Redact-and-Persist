# Redact-and-Persist

This is a project built to demo how a document might be redacted based on inputs of both words to redact, and the document itself.


To run this app and see an output, first clone it to your local machine. Open the project and on the command line, run 'npm install dependencies'. After that, you should be able to run 'npm run build' to transpile the React page, and 'npm run start' to fire up the server. The server is configured to output the React page on Port 8080, so in order to visit the app, you'll have to open a new web browser tab to http://localhost:8080/ .


The app requires the user to  add words or phrases to redact in the Sensitive Words box and submit them. Additionally, the user will need to supply the document text to redact in the Original Document input field, and submit it, while clicking through the confirmation pop up. At this stage, you can modulate whether the redaction will be case-sensitive with the Case Swap Button. Otherwise, you click Redact! to produce a redacted version of the text.


The actual algorithms that power the content redaction live inside Client / Components / Helpers.js . I've included two functions there, as well as a note considering how to go about persisting the data.



Thanks for checking out this project!!