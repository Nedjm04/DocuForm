import { useState } from 'react';
import { documentService } from '../services/documentService';

export const useDocuments = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePresenceSheet = async (formationId: number, groupId: number) => {
        try {
            setLoading(true);
            setError(null);
            const result = await documentService.generatePresenceSheet(formationId, groupId);
            return result;
        } catch (err) {
            setError('Failed to generate presence sheet');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const generateCertificate = async (formationId: number, stagiaireId: number) => {
        try {
            setLoading(true);
            setError(null);
            const result = await documentService.generateCertificate(formationId, stagiaireId);
            return result;
        } catch (err) {
            setError('Failed to generate certificate');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const generateEvaluationForm = async (formationId: number, stagiaireId: number) => {
        try {
            setLoading(true);
            setError(null);
            const result = await documentService.generateEvaluationForm(formationId, stagiaireId);
            return result;
        } catch (err) {
            setError('Failed to generate evaluation form');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const downloadDocument = async (documentId: number, filename: string) => {
        try {
            setLoading(true);
            setError(null);
            const blob = await documentService.downloadDocument(documentId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Failed to download document');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const downloadCertificate = async (certificateId: number, filename: string) => {
        try {
            setLoading(true);
            setError(null);
            const blob = await documentService.downloadCertificate(certificateId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Failed to download certificate');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        generatePresenceSheet,
        generateCertificate,
        generateEvaluationForm,
        downloadDocument,
        downloadCertificate
    };
};