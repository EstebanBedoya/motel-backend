import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, LoggerModule, RECORDS_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
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
        name: RECORDS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('RECORDS_HOST'),
            port: configService.get('RECORDS_TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [RecordsController],
})
export class RecordsModule {}
