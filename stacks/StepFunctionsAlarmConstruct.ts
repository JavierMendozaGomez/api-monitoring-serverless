import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import {
  ComparisonOperator,
  TreatMissingData,
} from 'aws-cdk-lib/aws-cloudwatch';
import { StateMachine } from 'aws-cdk-lib/aws-stepfunctions';

interface AlarmsConstructorProps {
  workflowName: string;
}
export default class StepFunctionsAlarmConstruct extends Construct {
  constructor(scope: Construct, id: string, props: AlarmsConstructorProps) {
    super(scope, id);

    const STEP_FUNCTION_NAME = `${props.workflowName}`;
    const STEP_FUNCTION_ARN = `arn:aws:states:${Stack.of(this).region}:${
      Stack.of(this).account
    }:${STEP_FUNCTION_NAME}`;

    const stepFunction = StateMachine.fromStateMachineArn(
      this,
      STEP_FUNCTION_NAME,
      STEP_FUNCTION_ARN
    );

    stepFunction
      .metricAborted()
      .createAlarm(this, `${STEP_FUNCTION_NAME}-ExecutionsAborted`, {
        actionsEnabled: true,
        alarmName: `${STEP_FUNCTION_NAME}-ExecutionsAborted`,
        alarmDescription: `Alert for Step Function tasks aborted for the ${STEP_FUNCTION_NAME} state machine`,
        evaluationPeriods: 1,
        threshold: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metricTimedOut()
      .createAlarm(this, `${STEP_FUNCTION_NAME}-ExecutionsTimedout`, {
        actionsEnabled: true,
        alarmName: `${STEP_FUNCTION_NAME}-ExecutionsTimedout`,
        alarmDescription: `Alert for Step Function tasks failed for the ${STEP_FUNCTION_NAME} state machine`,
        evaluationPeriods: 1,
        threshold: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metricFailed()
      .createAlarm(this, `${STEP_FUNCTION_NAME}-ExecutionsFailed`, {
        actionsEnabled: true,
        alarmName: `${STEP_FUNCTION_NAME}-ExecutionsFailed`,
        alarmDescription: `Alert for Step Function tasks timedout for the ${STEP_FUNCTION_NAME} state machine`,
        evaluationPeriods: 1,
        threshold: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metricThrottled()
      .createAlarm(this, `${STEP_FUNCTION_NAME}-ExecutionsThrottled`, {
        actionsEnabled: true,
        alarmName: `${STEP_FUNCTION_NAME}-ExecutionsThrottled`,
        alarmDescription: `Alert for Step Function tasks throttled for the ${STEP_FUNCTION_NAME} state machine`,
        evaluationPeriods: 1,
        threshold: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metric('LambdaFunctionsTimedOut')
      .createAlarm(this, `${STEP_FUNCTION_NAME}-LambdaFunctionsTimedOut`, {
        alarmName: `${STEP_FUNCTION_NAME}-FunctionsTimedout`,
        alarmDescription: `Alert for Lambda Functions timedout for the ${STEP_FUNCTION_NAME} state machine`,
        datapointsToAlarm: 1,
        evaluationPeriods: 1,
        threshold: 1,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metric('LambdaFunctionsFailed')
      .createAlarm(this, `${STEP_FUNCTION_NAME}-LambdaFunctionsFailed`, {
        alarmName: `${STEP_FUNCTION_NAME}-LambdaFunctionsFailed`,
        alarmDescription: `Alert for Lambda Functions failed for the ${STEP_FUNCTION_NAME} state machine`,
        datapointsToAlarm: 1,
        evaluationPeriods: 1,
        threshold: 1,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metric('ServiceIntegrationsFailed')
      .createAlarm(this, `${STEP_FUNCTION_NAME}-ServiceIntegrationsFailed`, {
        alarmName: `${STEP_FUNCTION_NAME}-ServiceIntegrationsFailed`,
        alarmDescription: `Alert for Service Integration failed for the ${STEP_FUNCTION_NAME} state machine`,
        datapointsToAlarm: 1,
        evaluationPeriods: 1,
        threshold: 1,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });

    stepFunction
      .metric('ServiceIntegrationsTimedOut')
      .createAlarm(this, `${STEP_FUNCTION_NAME}-ServiceIntegrationsTimedOut`, {
        alarmName: `${STEP_FUNCTION_NAME}-ServiceIntegrationsTimedOut`,
        alarmDescription: `Alert for Service Integration timedout for the ${STEP_FUNCTION_NAME} state machine`,
        datapointsToAlarm: 1,
        evaluationPeriods: 1,
        threshold: 1,
        treatMissingData: TreatMissingData.NOT_BREACHING,
      });
  }
}
