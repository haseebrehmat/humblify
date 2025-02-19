import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '@/app.module'
import { setupSwagger } from '@config/swagger.config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  app.enableCors()

  await app.listen(3000)
}
bootstrap()
