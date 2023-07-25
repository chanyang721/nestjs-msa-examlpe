import { HttpStatus, UnprocessableEntityException } from "@nestjs/common";
import { ValidationPipeOptions }                    from "@nestjs/common/pipes/validation.pipe";



export const validationPipeOptions: ValidationPipeOptions = {
  whitelist          : true,
  forbidUnknownValues: true,
  // forbidNonWhitelisted: true,
  transform           : true,
  disableErrorMessages: false,
  // stopAtFirstError    : true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  validationError    : { target: false },
  /**
   * Exception Factory to catch Validation Error in Exception Filter
   * */
  exceptionFactory: ( errors ) => new UnprocessableEntityException(errors)
};
