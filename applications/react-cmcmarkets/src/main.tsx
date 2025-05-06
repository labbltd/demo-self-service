import { LoggerService } from '@labb/dx-engine';
import { PegaEmbed } from '@labb/react-adapter';
import ReactDOM from 'react-dom/client';
import DesignSystem from './cmc-design/design-system';
import './pega/ContainerMapping';

const root = ReactDOM.createRoot(
  document.getElementById('react-root') as HTMLElement
);

async function render() {
  const serverUrl = 'http://localhost:3333/prweb';
  try {
    LoggerService.enabled = true;
    const token = {
      "access_token": "eyJraWQiOiJERUU3RjJGQzUxQjRGRkJGRDQwOEI5RTJFQTQ3NTQwMyIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkYW5pZWxAbGFiYi5sdGQiLCJhcHBfdmVyc2lvbiI6IjAxLjAxLjAxIiwiaXNzIjoidXJuOmxhYmJjb25zdWx0aW5nMDUucGVnYWxhYnMuaW8iLCJwc3luY19pZCI6IjQ1QzUxQzFGRjkyMDVDMjIyNTI4QUI0NkZENjE4NTg1Iiwib3BlcmF0b3JfYWNjZXNzIjoiV29ya2Zsb3c6QXV0aG9ycyIsImF1ZCI6InVybjo2NDU2MTU1ODEyMTczODA2MTEzMiIsImFwcF9uYW1lIjoiV29ya2Zsb3ciLCJuYmYiOjE3NDIyMDYyMTAsInNjb3BlIjpbImVtYWlsIl0sImV4cCI6MTc0MjIwOTgxMCwiaWF0IjoxNzQyMjA2MjEwLCJqdGkiOiI5RUM2MDc3RTg5MDgwRDVGNzlCNjMxRkIyQTlBRjM5NCJ9.AsjrW11JNc7_YTc4bzpE-mlEKMTX6irkOo46aqh72oSbliL_hM9v1zl3Z84xCHmHNwsjmiPCfyIi4kS2lePghK9IJE_R157Png90C4obTKkDoEccVXKRGNPwGPhBogZoO666EwtbP35GxAvOTwovcIE3uOIX98pmyb_ciW64rIM2_9_mIke6IJy2j29KpSudqyUuRTCN-jM6C1bBhON4L78Yk2HkOMuxPgFrHfPtHGb0JFqjDCjLrrB8FsyPzMCgy2hKrQxnuI-6wT9cRhIqwF6xejdmi9RIzWLRr2e72PXcy7VdKmSxkb7jslc0sVVFBA8r_f1CCo8l3B1XKtP0UJMtnyHyH9GGlVhH8l9HMxzUg54z_19FsDQwcgRx631BvU0aTmyLuoU28joZfNLNJ9bR43mxDlzS7fvMfCLEsnGP0E1mp62sWAQnmj6zWyKJmaKXe2oTX7HvupqS3UQFKfJVQaZV5vGfOIBkcTZQh48CPXwH2ZCtoyQM91YwFQECSMXAzPuWWC5Z2kiagWHxbjOHaJP5r4epBVMqQSj8QMDwP4zzwvJ_REZzjOjXRq_MMrp6AzHU_YUmUtcZ8YsTPwE4qqonFlD0QQxb-rddDEjCtcZZUPFwRwnvsXv_BFyUhSBhx3fvhgFh0RUZ5zv7voEsmDvoeTx4FETc4RW6ZzQ",
      "refresh_token": "e3YxfTEzMGEyZTJjOWE5OTk3MTMxOGNiN2NlZGI1ODYwZWYwMWRiYzljZDk1ZTY4OGY3MDI3YTdlNTI1YmY2NzNlZjQ=",
      "token_type": "bearer",
      "session_index": "3420ea2a-ffa5-468c-b492-ba550e106b1e",
      "expires_in": 3600
    };
    root.render(
      <>
        <DesignSystem/>
        <PegaEmbed
          serverUrl={serverUrl}
          deployUrl='http://localhost:3333/cs/8.24.51-236/react/prod/'
          token={token}
          caseTypeID="OWXZJQ-Workflow-Work-CMCOnboarding" />
      </>
    );
  } catch (error) {
    root.render(null);
  }
}

render();
