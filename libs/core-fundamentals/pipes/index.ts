import { PipeTransform, ValidationPipe } from "@nestjs/common";
import { validationPipeOptions }         from "./global.validation.pipe";



export const globalPipes: PipeTransform[] = [
  new ValidationPipe(validationPipeOptions)
];
