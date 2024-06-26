import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  ROOMS_SERVICE,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Record, RecordSchema } from './models/record.schema';
import { RecordsRepository } from './records.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env/.records.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        ROOMS_HOST: Joi.string().required(),
        ROOMS_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ROOMS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('ROOMS_HOST'),
            port: configService.get('ROOMS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository],
})
export class RecordsModule {}
