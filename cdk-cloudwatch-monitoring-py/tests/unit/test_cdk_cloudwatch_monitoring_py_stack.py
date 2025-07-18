import aws_cdk as core
import aws_cdk.assertions as assertions

from cdk_cloudwatch_monitoring_py.cdk_cloudwatch_monitoring_py_stack import CdkCloudwatchMonitoringPyStack

# example tests. To run these tests, uncomment this file along with the example
# resource in cdk_cloudwatch_monitoring_py/cdk_cloudwatch_monitoring_py_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = CdkCloudwatchMonitoringPyStack(app, "cdk-cloudwatch-monitoring-py")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
