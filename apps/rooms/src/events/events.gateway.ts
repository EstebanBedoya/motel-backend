import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateRoomStateDto } from './dto/update-room-state.dto';
import { RoomsService } from '../rooms.service';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    @Inject(RoomsService)
    private readonly roomsService: RoomsService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateRoomState')
  async findAll(@MessageBody() data: UpdateRoomStateDto) {
    await this.roomsService.update(+data.roomId, { state: data.state });
    const rooms = await this.roomsService.findAll();
    this.server.emit('updateRoomState', rooms);
  }
}
