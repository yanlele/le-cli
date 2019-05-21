import * as request from 'request';

const {get} = request;

const handleRequest = ()=> {
  return new Promise((resolve, reject) =>  {
    get({
      url: 'https://api.github.com/users/cli-template-build/repos',
      headers: {
        'User-Agent': 'request'
      },
    }, (error, res, body) => {
      if (error) reject(error);
      if (body) resolve(body);
    })
  })
};

const handleResponseSource = (res: any[]) => {
  return res.map(item => ({
    name: item.name,
    url: item.html_url,
    description: item.description,
  }))
};

export default handleRequest


