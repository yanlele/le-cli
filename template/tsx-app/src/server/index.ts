import * as utils from 'utils';

const {axios} = utils;

const getSceneInfo = (id: number) => {
  return axios({
    url: '/api/paper',
    params: {
      sceneId: id,
    },
  }).then((res: object) => res).catch((err: object) => err);
};

const proxyGithubApi = () => {
  return axios({
    url: '/api/users',
    method: 'post',
  }).then((res: object) => res).catch((err: object) => err);
};

export default {getSceneInfo, proxyGithubApi};
