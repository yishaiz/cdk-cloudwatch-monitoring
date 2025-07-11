import json
import urllib3
# from services.secret import url  # Import the URL from secret.py
from secret import url  # Import the URL from secret.py

http = urllib3.PoolManager()

# Extract the URL from the event
# url = event.get('url')


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    print("calling Slack !!!")

    # url = ""

    msg = {
        "channel": "#aws-events",
        "text": event['Records'][0]['Sns']['Message'],
    }

    encoded_msg = json.dumps(msg).encode('utf-8')
    response = http.request(
        'POST',
        url,
        body=encoded_msg,
        headers={'Content-Type': 'application/json'}
    )

    print({
        "message": event['Records'][0]['Sns']['Message'],
        "status_code": response.status,
        "response": response.data
    })
