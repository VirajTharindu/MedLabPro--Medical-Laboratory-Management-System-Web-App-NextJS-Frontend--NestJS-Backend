import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket, @MessageBody() payload?: unknown) {
    client.emit('pong', payload ?? { now: new Date().toISOString() });
  }

  @SubscribeMessage('patients:changed')
  handlePatientsChanged(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      reason: 'created' | 'updated' | 'deleted';
      patientId?: string;
    },
  ) {
    client.broadcast.emit('patients:changed', payload);
  }
}

