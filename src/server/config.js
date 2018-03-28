const env = process.env.NODE_ENV;
const mongo = `mongodb://127.0.0.1:27017/${env}_gxc`;

export default {
  http: {
    port: process.env.GXC_PORT || '2000',
    hostname: process.env.GXC_HOSTNAME || 'localhost',
  },
  databases: {
    mongo,
  },
};
