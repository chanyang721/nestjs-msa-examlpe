import { NestFactory }      from '@nestjs/core';
import { AppModule }        from './app.module'
import { coreFundamentals } from '@app/core-fundamentals'
import { Transport }        from '@nestjs/microservices'



async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await coreFundamentals(app);

    app.connectMicroservice({
        transport: Transport.TCP,
    })

    await app.startAllMicroservices();
    await app.listen(4000);

    return app;
}

void bootstrap();
