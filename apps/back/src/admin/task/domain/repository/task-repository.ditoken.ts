import { Inject } from '@nestjs/common';

/** Task's repository dependency injection token */
export const DITokenTaskRepository = Symbol('ITaskRepository');

/** Task's repository dependency injection decorator */
export const InjectTaskRepository = ()=> Inject(DITokenTaskRepository);