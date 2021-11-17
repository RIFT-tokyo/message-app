import { Inject } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@WebSocketGateway(4000, { namespace: 'message', cors: true })
export class MessageGateway {
  @Inject()
  messageService: MessageService;

  @WebSocketServer()
  wss: Server;

  @SubscribeMessage('new-message-to-server')
  async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() data: {sender: string; message: string}) {
    const message: Message = await this.messageService.createMessage(data.sender, data.message);
    this.wss.emit('new-message-to-client', { message })
  }
}
