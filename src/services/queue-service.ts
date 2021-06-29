import * as amqp from 'amqplib/callback_api';
import { Message, Connection, Channel } from 'amqplib/callback_api';

const QUEUE_NAME = 'login';

const getQueueConnection = (): Promise<Connection> => {
  return new Promise((resolve) => {
    amqp.connect(process.env.QUEUE_URL as string, (err, connection) => {
      if (err) throw err;
      resolve(connection);
    });
  });
};

const getChannel = (connection: Connection): Promise<Channel> => {
  return new Promise((resolve) => {
    connection.createChannel((err, channel) => {
      if (err) throw err;
      resolve(channel);
    });
  });
};

export const pull = async (action: (message: Message) => Promise<void>) => {
  const connection = await getQueueConnection();
  const channel = await getChannel(connection);
  channel.assertQueue(QUEUE_NAME, { durable: false });
  channel.prefetch(1);
  channel.consume(QUEUE_NAME, async (message) => {
    if (message) {
      await action(message);
      channel.ack(message);
    }
  });
};
