export default ({ env }) => ({
  url: env('PUBLIC_URL'),
  proxy: true,
  host: '0.0.0.0',           
  port: env.int('PORT', 1337),  
  app: {
    keys: env.array('APP_KEYS'),
  },
});
