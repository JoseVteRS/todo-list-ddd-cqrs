import { CommonFormatException } from '@shared-kernel/common/exceptions/common-format.exception';

/** Exception: Value object format */
export class VOFormatException extends CommonFormatException {
  /**
   * Creates a new exception
   * @param value Value object value
   * @param propName Value object property name
   */
  constructor(value: any, propName?: string) {
    super(
      `${propName ? `${propName}: ` : ''}${JSON.stringify(
        value
      )} no cumple con el formato establecido.`
    );
  }
}
