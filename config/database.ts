import { parse } from 'pg-connection-string';

export default ({ env }) => {
  const dbUrl = env('DATABASE_URL');

  if (dbUrl) {
    const config = parse(dbUrl);
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: Number(config.port || 5432),
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: { rejectUnauthorized: false },
        },
        debug: false,
      },
    };
  }

  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', true)
          ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false) }
          : false,
      },
      debug: false,
    },
  };
};
