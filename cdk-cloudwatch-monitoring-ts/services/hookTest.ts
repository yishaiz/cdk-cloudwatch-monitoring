// import { handler } from './hook';
import { handler } from './handler';

handler({
  Records: [
    {
      Sns: {
        Message: 'Test message',
      },
    },
  ],
} as any);
