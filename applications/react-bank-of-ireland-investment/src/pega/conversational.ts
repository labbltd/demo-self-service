import { DemoBootstrap } from "../bootstrap";

export const startConversation = async (agentID: string, contextID: string, accessToken: string) => {
    const interactionID = crypto.randomUUID();

    const response = await fetch(`${DemoBootstrap.getServerUrl()}/app/${DemoBootstrap.getAppId()}/api/application/v2/ai-agents/${agentID}/conversations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ contextID, interactionID }),
    });

    if (!response.ok) {
        throw new Error('Failed to start conversation');
    }

    return response.json();
};

export const sendMessage = async (agentID: string, accessToken: string, conversationID: string, message: string) => {
    const response = await fetch(`${DemoBootstrap.getServerUrl()}/app/${DemoBootstrap.getAppId()}/api/application/v2/ai-agents/${agentID}/conversations/${conversationID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ Request: message }),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
};

export const closeConversation = async (agentID: string, conversationID: string, accessToken: string) => {
    const response = await fetch(`${DemoBootstrap.getServerUrl()}/ai-agents/${agentID}/conversations/${conversationID}/close`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to close conversation');
    }

    return true;
};

export const speechToText = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
        const response = await fetch(`${DemoBootstrap.getGCServerUrl()}/api/v1/speech-to-text`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            return data.transcript;
        } else {
            throw new Error(data.error || 'Server error');
        }
    } catch (error) {
        throw new Error('Error sending audio:' + error);
    }
};