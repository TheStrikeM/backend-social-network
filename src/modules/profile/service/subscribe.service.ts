import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import SubscribeRepository from '../../user/service/utils/subscribe.repository';

@Injectable()
export default class SubscribeService {
  constructor(private readonly subscribeRepository: SubscribeRepository) {}

  async subscribeTo(idSender: ObjectId, idRecipient: ObjectId) {
    return this.subscribeRepository.subscribeTo(idSender, idRecipient);
  }

  async unsubscribeTo(idSender: ObjectId, idRecipient: ObjectId) {
    return this.subscribeRepository.unsubscribeTo(idSender, idRecipient);
  }

  async removeAllSubscribers(id: ObjectId) {
    return this.subscribeRepository.removeAllSubscribers(id);
  }

  async removeAllSubscriptions(id: ObjectId) {
    return this.subscribeRepository.removeAllSubscriptions(id);
  }
}
