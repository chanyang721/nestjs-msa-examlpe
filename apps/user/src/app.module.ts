import { Module }              from '@nestjs/common'
import { ConfigModule }        from '@nestjs/config'
import { ConfigurationModule } from '@app/configuration'



@Module({
    imports    : [
        ConfigurationModule,

        ConfigModule.forRoot({
            isGlobal   : true,
            envFilePath: `.env`,
        }),
    ],
    controllers: [],
    providers  : [],
})
export class AppModule {
}
