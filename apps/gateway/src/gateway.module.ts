import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env/.records.env',
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        RECORDS_HOST: Joi.string().required(),
        RECORDS_TCP_PORT: Joi.number().required(),
      }),
    }),
    RecordsModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
