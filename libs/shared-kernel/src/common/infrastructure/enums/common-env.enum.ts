/**
 * Environment variables
 */
export enum CommonEnv {
  /** Application PORT */
  PORT = 'PORT',
  /**Application URL */
  SELF_DOMAIN = 'SELF_DOMAIN',
  /** Node ENV ('dev' or 'production') */
  NODE_ENV = 'NODE_ENV',
  /** Database URI */
  DATABASE_URI = 'DATABASE_URI',
  /** Redis URI */
  REDIS_URI = 'REDIS_URI',
  /** RabbitMQ URI */
  RABBITMQ_URI = 'RABBITMQ_URI',
  /** RabbitMQ connection timeout */
  RABBITMQ_CONN_TIMEOUT = 'RABBITMQ_CONN_TIMEOUT',
  /** RabbitMQ retry TTL */
  RABBITMQ_RETRY_TTL = 'RABBITMQ_RETRY_TTL',
  /** RabbitMQ number of retries */
  RABBITMQ_RETRIES = 'RABBITMQ_RETRIES',
  /** JWT secret key */
  USER_JWT_SECRET = 'USER_JWT_SECRET',
}
