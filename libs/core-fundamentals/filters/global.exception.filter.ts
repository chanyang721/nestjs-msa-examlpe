import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, UnprocessableEntityException, ValidationError } from "@nestjs/common";
import type { Request, Response } from "express";
import { TypeORMError }           from "typeorm";
import { MongooseError }               from "mongoose";
import { GlobalResponseError }    from "./global.response.error";



@Catch()
export class GlobalExceptionFilter<T = HttpException | Error> implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);


  catch( exception: T, host: ArgumentsHost ): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    /**
     * Default Error Exception Filter
     * TODO: 아래 if 문에서 아무것도 걸리지 않는 경우에 exceptionCode, message 정보가 나타나지 않는 문제 있음
     */
    let exceptionCode: string = exception.constructor.name,
        // @ts-ignore
        message: string = exception.message || exception.response.message || exception.response.error || exception.response || exception,
        statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
        errors: any;
    console.log(exception)

    /**
     * Validation Error Exception Filter
     * */
    if ( exception instanceof UnprocessableEntityException ) {
      statusCode = ( exception as UnprocessableEntityException ).getStatus(); // 422
      exceptionCode = exception.constructor.name;
      message = ( exception as UnprocessableEntityException ).message;
      const error = exception.getResponse() as { message: ValidationError[] };

      const validationErrorsMessage = error.message;
      errors = this.setValidationErrorMessages(validationErrorsMessage);
    }

    /**
     * Axios Exception Filter
     * TODO: Axios Exception Filter 전용 Exception 생성
     */
    else if ( exception instanceof HttpException ) {
      statusCode = ( exception as HttpException ).getStatus();
      exceptionCode = ( exception as HttpException ).name;
      message = ( exception as HttpException ).message;
    }

    /**
     * Http Exception Filter
     * */
    else if ( exception instanceof HttpException ) {
      statusCode = ( exception as HttpException ).getStatus();
      exceptionCode = ( exception as HttpException ).name;
      message = ( exception as HttpException ).message;
    }

    /**
     * TypeORM Error Exception Filter
     */
    if ( ( exception instanceof TypeORMError ) ) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY // 422
      exceptionCode = ( exception as TypeORMError ).name
      message = ( exception as TypeORMError ).message
    }

    /**
     * Mongoose Error Exception Filter
     */
    if ( (exception instanceof MongooseError )) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY // 422
      exceptionCode = ( exception as MongooseError ).name
      message = ( exception as MongooseError ).message
    }

    this.logger.error(GlobalResponseError({ statusCode, exceptionCode, message, method: request.method, path  : request.url, errors }))
    response.status(statusCode)
            .json(GlobalResponseError({
                statusCode,
                exceptionCode,
                message,
                method: request.method,
                path  : request.url,
                errors
            }));
  }


  private setValidationErrorMessages( validationErrors: ValidationError[] ): any {
    /**
     * {
     *     error: {
     *          statusCode: 422,
     *          exceptionCode: 'UnprocessableEntityException',
     *          message: 'Validation failed',
     *          path: '/api/v1/users',
     *          method: 'POST',
     *          errors: []
     *     }
     * }
     * */
    return;
  }
}
