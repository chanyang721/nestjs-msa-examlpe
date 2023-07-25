import { NestInterceptor }     from "@nestjs/common/interfaces/features/nest-interceptor.interface";
import { LoggingInterceptor }  from "./logging.interceptor";
import { ResponseInterceptor } from "./response.interceptor";



export const globalInterceptors: NestInterceptor[] = [
  new LoggingInterceptor(),
  new ResponseInterceptor(),
];