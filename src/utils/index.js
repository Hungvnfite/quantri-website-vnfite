// id product live

// eslint-disable-next-line no-unused-vars
const ENV_Test = {
  baseURL: 'http://42.113.122.119:2993',
  // baseURL: 'http://192.168.1.89:2993',
  imageServer: 'http://42.113.122.119:70/'
};
// eslint-disable-next-line no-unused-vars
const ENV_Live = {
  baseURL: 'https://service-vnfite.com.vn/cms/v2',
  imageServer: 'http://42.113.122.118:70/'
};

class HelpersUtil {
  envMode = ENV_Test;
}

const WebUtils = new HelpersUtil();
export default WebUtils;
