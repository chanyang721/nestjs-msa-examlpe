import { Logger }            from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { BaseSchema }        from '@app/database/base/mongoose/schema/base.schema'



export abstract class AbstractMongoRepository<TSchema extends BaseSchema> {
    protected abstract readonly logger: Logger;


    protected constructor(
        protected readonly model: Model<TSchema>,
        private readonly connection: Connection
    ) {
    }
}
