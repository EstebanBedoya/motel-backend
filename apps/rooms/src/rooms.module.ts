import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  RoomSchema,
  Room,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoomsRepository } from './rooms.repository';
import { EventsModule } from './events/events.module';
import { PricesModule } from './prices/prices.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: '.env/.rooms.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
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
    EventsModule,
    PricesModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
  exports: [RoomsService],
})
export class RoomsModule {}
