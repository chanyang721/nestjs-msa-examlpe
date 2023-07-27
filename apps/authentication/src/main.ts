import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { coreFundamentals } from '@app/core-fundamentals'

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);

  await coreFundamentals(app)

  await app.listen(3000);

  return app;
}
void bootstrap();
