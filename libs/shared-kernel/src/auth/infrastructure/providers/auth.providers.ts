import type { Provider } from '@nestjs/common';
import { DITokenAuthRepository } from '../../domain/repository/auth-user-repository.ditoken';
import { AuthUserRedisRepository } from '../auth-user-redis.repository';

/** Repositories */
const Repositories: Provider<any>[] = [
  { provide: DITokenAuthRepository, useClass: AuthUserRedisRepository },
];

/** Query handlers */
const QueryHandlers: Provider<any>[] = [];

/** Command handlers */
const CommandHandlers: Provider<any>[] = [];

/** Event handlers */
const EventHandlers: Provider<any>[] = [];

/** Use cases */
const UseCases: Provider<any>[] = [];

/** Application service */
const ApplicationServices: Provider<any>[] = [];

/** Domain service */
const DomainServices: Provider<any>[] = [];

/** Graphql resolvers*/
const Resolvers: Provider<any>[] = [];

/** Providers export */
export const BC_SHARED_AUTH_Providers = [
  ...Repositories,
  ...CommandHandlers,
  ...QueryHandlers,
  ...EventHandlers,
  ...UseCases,
  ...ApplicationServices,
  ...DomainServices,
  ...Resolvers,
];
