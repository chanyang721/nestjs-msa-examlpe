import { DataSource, Repository } from "typeorm";
import { InjectDataSource }       from "@nestjs/typeorm";
import { RepositoryInject }       from '@app/utils/decoretors'
import { UserEntity }             from "../entities/user.entity";



@RepositoryInject(UserRepository)
export class UserRepository extends Repository<UserEntity> {
    constructor( @InjectDataSource() private readonly mainDataSource: DataSource ) {
        super(UserEntity, mainDataSource.createEntityManager());
    }


    public async updateUser( updateUserCommand: any ) {
        return await this.save(updateUserCommand)
    }
}
