import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

export class CdkCloudwatchMonitoringTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // use docker
    // const webHookLambda = new NodejsFunction(this, 'webHookLambda', {
    //   runtime: Runtime.NODEJS_18_X,
    //   handler: 'handler',
    //   entry: join(__dirname, '..', 'services', 'handler.ts'),
    // });

    //     run local build

    const webHookLambda = new NodejsFunction(this, 'webHookLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: join(__dirname, '..', 'services', 'handler.ts'),
      bundling: {
        externalModules: [], // or ['aws-sdk'] if you don't want it bundled
        forceDockerBundling: false, // <-- Tell it to bundle locally!
      },
    });
  }
}
