import { Form } from '@remix-run/react';
import { Input, Card, Button } from 'ui';

export default function WorkspacePage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background'>
      <Card className='w-full max-w-md p-6 shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-4'>Create Workspace</h1>
        <Form method='post' className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Workspace Name</label>
            <Input name='workspaceName' placeholder='Enter workspace name' />
          </div>
          <Button type='submit' className='w-full'>
            Continue
          </Button>
        </Form>
      </Card>
    </div>
  );
}
