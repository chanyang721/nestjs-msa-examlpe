import { SetMetadata } from "@nestjs/common";


export const TYPEORM_REPOSITORY_INJECTION = "TYPEORM_REPOSITORY_INJECTION";

export const RepositoryInject = ( repository: Function ): ClassDecorator => {
  return SetMetadata(TYPEORM_REPOSITORY_INJECTION, repository);
};
