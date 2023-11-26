import { Module } from '@nestjs/common';
import { RecordsService } from './records-service.service';
import { RecordsController } from './records-service.controller';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Record, RecordSchema } from './models/record.schema';
import { RecordsRepository } from './records-service.repository';

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
        TCP_PORT: Joi.number().required(),
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
    ]),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository],
})
export class RecordsModule {}
