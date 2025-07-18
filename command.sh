aws cloudwatch put-metric-data --namespace YyCustom --metric-name custom-error --value 1

aws cloudwatch describe-alarms --alarm-name TestAlarm


aws cloudwatch put-metric-data --namespace Custom --metric-name custom-error --value 1
aws cloudwatch put-metric-data --namespace Custom --metric-name custom-error --value 10
aws cloudwatch put-metric-data --namespace Custom --metric-name custom-error --value 100
