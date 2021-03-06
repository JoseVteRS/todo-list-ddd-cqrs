import type { IRepository } from '@shared-kernel/common/domain/interfaces/repository.interface';
import type { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import type { AuthUserModel } from '../models/auth-user.model';

/** Auth user's repository interface */
export interface IAuthUserRepository extends IRepository<AuthUserModel> {
  /**
   * Creates a new user
   * @param user User
   */
  save(user: AuthUserModel): Promise<void>;
  /**
   * Finds a user by id
   * @param userId User's id
   */
  findOne(userId: VOUuid): Promise<AuthUserModel | null>;
  /**
   * Updates a user
   * @param user User
   */
  update(user: AuthUserModel): Promise<void>;
  /**
   * Deletes a user
   * @param userId User's id
   */
  delete(userId: VOUuid): Promise<void>;
}
