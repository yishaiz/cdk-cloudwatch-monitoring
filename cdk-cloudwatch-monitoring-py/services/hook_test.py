from hook import lambda_handler

event = {
    "Records": [
        {
            "Sns": {
                "Message": "This is a test message from SNS to Slack!"
            }
        }
    ]
}

lambda_handler(event, {})
# lambda_handler(event, None)
