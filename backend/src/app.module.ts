import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnswersModule } from './answers/answers.module';
import { Answer } from './answers/entities/answer/answer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // disponible en todo el proyecto
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT', '5432')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Answer],
        synchronize: true,
      }),
    }),
    AnswersModule,
  ],
})
export class AppModule {}
