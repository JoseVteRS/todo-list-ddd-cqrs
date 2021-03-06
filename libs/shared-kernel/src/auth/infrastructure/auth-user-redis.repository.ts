import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { AuthUserModel } from '../domain/models/auth-user.model';
import type { IAuthUserRepository } from '../domain/repository/auth-user-repository.interface';
import type { AuthUserRedis } from './types/auth-user-redis.type';

/**
 * Auth user repository Redis implementation
 */
@Injectable()
export class AuthUserRedisRepository implements IAuthUserRepository {
  /**
   * Dependency injection
   * @param redisClient Redis client
   */
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  /**
   * Creates a domain entity from database entity
   * @param persistentUser Database user
   */
  toDomain(persistentUser: AuthUserRedis): AuthUserModel {
    const { id } = persistentUser;
    return new AuthUserModel(new VOUuid(id));
  }

  /**
   * Creates a database entity from domain entity
   * @param domainUser Domain user
   */
  toPersistence(domainUser: AuthUserModel): AuthUserRedis {
    return {
      id: domainUser.userId.value,
    };
  }

  /**
   * Creates a new user
   * @param user User
   */
  async save(user: AuthUserModel): Promise<void> {
    const redisUser = this.toPersistence(user);

    await this.redisClient.set(redisUser.id, 'true');
  }

  /**
   * Finds a user by id
   * @param userId User's id
   */
  async findOne(userId: VOUuid): Promise<AuthUserModel | null> {
    const user = await this.redisClient.get(userId.value);

    if (!user) return null;
    const persistentUser = { id: userId.value };

    return this.toDomain(persistentUser);
  }

  /**
   * Updates a user
   * @param user User
   */
  async update(user: AuthUserModel): Promise<void> {
    await this.save(user);
  }

  /**
   * Deletes a user
   * @param userId User's id
   */
  async delete(userId: VOUuid): Promise<void> {
    await this.redisClient.del(userId.value);
  }
}
