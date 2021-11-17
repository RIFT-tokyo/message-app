import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  public getAll = async () => {
    return Message.find();
  };

  public createMessage = async (
    sender: string,
    message: string,
  ) => {
    const newMessage: Message = new Message(sender, message);
    return await newMessage.save();
  }
}
