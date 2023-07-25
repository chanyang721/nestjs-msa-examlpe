import { DataSource, Repository } from "typeorm";
import { InjectDataSource }       from "@nestjs/typeorm";
import { RepositoryInject }       from '@app/utils/decoretors'
import { AuthEntity }             from "../entities/auth.entity";



@RepositoryInject(AuthRepository)
export class AuthRepository extends Repository<AuthEntity> {
  constructor(
    @InjectDataSource()
    private readonly mainDataSource: DataSource
  ) {
    super(AuthEntity, mainDataSource.createEntityManager());
  }



}
