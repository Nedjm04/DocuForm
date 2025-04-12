import api from './api';

export const documentService = {
    generatePresenceSheet: async (formationId: number, groupId: number) => {
        const response = await api.post(`/documents/presence/${formationId}/${groupId}`);
        return response.data;
    },

    generateCertificate: async (formationId: number, stagiaireId: number) => {
        const response = await api.post(`/documents/certificate/${formationId}/${stagiaireId}`);
        return response.data;
    },

    generateEvaluationForm: async (formationId: number, stagiaireId: number) => {
        const response = await api.post(`/documents/evaluation/${formationId}/${stagiaireId}`);
        return response.data;
    },

    downloadDocument: async (documentId: number) => {
        const response = await api.get(`/documents/download/${documentId}`, {
            responseType: 'blob'
        });
        return response.data;
    },

    downloadCertificate: async (certificateId: number) => {
        const response = await api.get(`/documents/certificate/download/${certificateId}`, {
            responseType: 'blob'
        });
        return response.data;
    }
};