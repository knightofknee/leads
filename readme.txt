to start, npm install

To run the API, run 'node index.js' in the project directory.

To run the command line test, put any data you want in the pipe, comma, or space.txt files. The app does not care if you mix data types, as it judges one line at a time. But the data must be in files with those names. run 'node cltest.js' in the project directory to run it.

To run the mocha tests, run 'mocha test/leadsTest.js' in your command line in the project directory.

One assumption made is that dates will be submitted as strings in the format 'M/D/YYY'

The API returns leads in the form of a sorted array of arrays, where each lead is an array of 5 entries, one for each data field.

To post to the API route, include a parameter on the body called 'lead' with 5 values in a delimited string, using commas, pipes or spaces
