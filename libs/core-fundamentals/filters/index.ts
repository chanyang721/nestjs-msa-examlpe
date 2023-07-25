import { ExceptionFilter }       from "@nestjs/common";
import { GlobalExceptionFilter } from "./global.exception.filter";



export const globalExceptionFilters: ExceptionFilter[] = [
  new GlobalExceptionFilter()
];