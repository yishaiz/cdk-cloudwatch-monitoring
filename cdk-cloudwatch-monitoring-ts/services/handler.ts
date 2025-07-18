// this is a clone of hook.ts

import { SNSEvent } from 'aws-lambda';

import { url as webhookUrl } from './secret';

async function handler(event: SNSEvent) {
  for (const record of event.Records) {
    const message = record.Sns.Message;

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `Huston, we have a problem: ${message}`,
      }),
    });
  }
}

export { handler };
