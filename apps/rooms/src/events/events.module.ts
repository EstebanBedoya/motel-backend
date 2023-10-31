import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomsModule } from '../rooms.module';

@Module({
  imports: [forwardRef(() => RoomsModule)],
  providers: [EventsGateway],
})
export class EventsModule {}
