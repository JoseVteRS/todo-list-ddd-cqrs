// import uuid, { test as uuidTest } from 'uuid-random';
import * as uuid from 'uuid-random';
import { PrimitiveValueObject } from '../classes/value-objects/primitive-value-object.class';


/**
 * Uuid value object
 */
export class VOUuid extends PrimitiveValueObject<string> {
  static id: string = uuid();

  /**
   * Creates a new UUID value object
   * @param value Uuid
   */
  protected validate(value: string) {
    return uuid.test(value);
  }

  public static create(): VOUuid {
    return new VOUuid(this.id);
  }

}
