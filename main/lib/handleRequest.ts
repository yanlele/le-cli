import * as request from 'request';

const {get} = request;

get({
  url: 'https://api.github.com/users/cli-template-build/repos',
  headers: {
    'User-Agent': 'request'
  },
}, (error, res, body) => {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
