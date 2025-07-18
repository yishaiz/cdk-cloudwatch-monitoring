aws cloudwatch put-metric-data --namespace YyCustom --metric-name custom-error --value 1

aws cloudwatch describe-alarms --alarm-name TestAlarm