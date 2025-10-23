import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { Alert, Button, Card, Form, Skeleton, Space, Steps, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

export default function DxFlowContainer(props: { container: FlowContainer }) {
  const [loading, setLoading] = useState<ActionButton | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [todoAssignments, setTodoAssignments] = useState<Assignment[]>([]);

  const screens = useBreakpoint();

  useEffect(() => {
    updateAssignments();
    props.container.updates.subscribe(() => {
      updateAssignments();
    });
  }, []);

  function openAssignment(assignment: Assignment) {
    props.container.openAssignment(assignment);
  }

  function updateAssignments(): void {
    setTodoAssignments(props.container.getTodoAssignments());
  }

  function handleActionError(e: Error) {
    console.error(e);
    setErrorMessage(e?.message || 'Error');
  }

  async function buttonClick(button: ActionButton) {
    setErrorMessage(null);
    setLoading(button)
    await props.container.buttonClick(button).catch(handleActionError);
    setLoading(null);
  }

  // Calculate current step index based on visited status
  const currentStepIndex = props.container.navigation?.steps.findIndex(
    (step) => step.visited_status === 'current'
  ) ?? 0;

  const messages = [...((props.container.config as any).httpMessages || []), ...(props.container.config.pageMessages || [])];

  return (
    <>
      {props.container.config.caseMessages?.map((message, idx) => (
        <Alert key={idx} message={message} type="info" showIcon style={{ marginBottom: 16 }} />
      ))}

      {!props.container.hasAssignment() && (
        <>
          {todoAssignments.map((assignment) => (
            <Card key={assignment.ID} style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>
                  {assignment.processName} {'>'} {assignment.name}
                </Text>
                <Text type="secondary">
                  Assigned to {assignment.assigneeInfo?.name}
                </Text>
                <Button type="primary" onClick={() => openAssignment(assignment)}>
                  Go
                </Button>
              </Space>
            </Card>
          ))}
          {todoAssignments.length === 0 && (
            <Alert
              message="Thank you for your request. We will contact you as soon as possible."
              type="success"
              showIcon
            />
          )}
        </>
      )}

      {props.container.hasAssignment() && (
        <div>
          {props.container.navigation?.steps && props.container.navigation.steps.length > 1 && (
            <Steps
              current={currentStepIndex}
              style={{ marginBottom: 32 }}
              items={props.container.navigation.steps.map((step) => ({
                title: step.name,
                status: (() => {
                  switch (step.visited_status) {
                    case 'current': return 'process';
                    case 'success': return 'finish';
                    default: return 'wait'
                  }
                })()
              }))}
            />
          )}

          <Form layout="vertical">
            <Card loading={!!loading}>
              <Title level={3}>
                {props.container.getActiveViewLabel() || props.container.getAssignmentName()}
              </Title>

              {messages && messages.map((message: { type: string, message: string }) => <Alert
                message="Error"
                description={message.message}
                type={message.type === 'error' ? 'error' : 'info'}
                showIcon
                closable
                onClose={() => setErrorMessage(null)}
                style={{ marginTop: 16, marginBottom: 16 }}
              />)}

              {loading ? (
                <Skeleton />
              ) : props.container.children.map((child) => (
                <GeneratePContainer key={child.id} container={child} />
              ))}
            </Card>

            {props.container.actionButtons && (
              <Space style={{ marginTop: 24, display: screens.sm ? 'flex' : 'grid' }}>
                {props.container.actionButtons.secondary.map((button, idx) => (
                  <Button
                    style={!screens.sm ? { width: '100%' } : {}}
                    loading={loading?.name === button.name}
                    disabled={!!loading && loading?.name !== button.name}
                    key={`secondary_${idx}`}
                    onClick={() => buttonClick(button)}>
                    {button.name}
                  </Button>
                ))}
                {props.container.actionButtons.main.map((button, idx) => (
                  <Button
                    style={!screens.sm ? { width: '100%' } : {}}
                    loading={loading?.name === button.name}
                    disabled={!!loading && loading?.name !== button.name}
                    key={`main_${idx}`}
                    type="primary"
                    onClick={() => buttonClick(button)}
                  >
                    {button.name}
                  </Button>
                ))}
              </Space>
            )}
          </Form>
        </div>
      )}
    </>
  );
}
