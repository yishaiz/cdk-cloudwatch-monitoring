import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Lambda } from 'aws-cdk-lib/aws-ses-actions';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Alarm, Metric } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';

export class CdkCloudwatchMonitoringTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // use docker
    const webHookLambda = new NodejsFunction(this, 'webHookLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: join(__dirname, '..', 'services', 'handler.ts'),
    });

    //     run local build

    // const webHookLambda = new NodejsFunction(this, 'webHookLambda', {
    //   runtime: Runtime.NODEJS_18_X,
    //   handler: 'handler',
    //   entry: join(__dirname, '..', 'services', 'handler.ts'),
    //   bundling: {
    //     externalModules: [], // or ['aws-sdk'] if you don't want it bundled
    //     forceDockerBundling: false, // <-- Tell it to bundle locally!
    //   },
    // });

    const alaramTopic = new Topic(this, 'TSAlarmTopic', {
      displayName: 'TS Alarm Topic',
      topicName: 'TS Alarm Topic',
    });

    // alaramTopic.addSubscription({
    //   bind: () => ({
    //     endpoint: webHookLambda.functionArn,
    //     protocol: cdk.aws_sns.SubscriptionProtocol.LAMBDA,
    //   }),
    // });

    alaramTopic.addSubscription(new LambdaSubscription(webHookLambda));

    const sampleApiAlaram = new Alarm(this, 'TSApiAlarm', {
      metric: new Metric({
        metricName: 'custom-error',
        namespace: 'Custom',
        period: cdk.Duration.minutes(1),
        statistic: 'Sum',
      }),
      evaluationPeriods: 1,
      threshold: 1,
    });

    const topicAction = new SnsAction(alaramTopic);
    sampleApiAlaram.addAlarmAction(topicAction);
    sampleApiAlaram.addOkAction(topicAction);



    // // Add the SNS topic as an alarm action
    // sampleApiAlaram.addAlarmAction(
    //   new cdk.aws_cloudwatch_actions.SnsAction(alaramTopic)
    // );

    // Grant the SNS topic permission to invoke the Lambda function
    // alaramTopic.grantPublish(webHookLambda);
  }
}
