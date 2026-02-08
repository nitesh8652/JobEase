import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const enhanceSummary = async (userContent, token) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/ai/enhance-pro-summary`,
            { userContent },
            { headers: { token: token } } // or Authorization: token
        );
        // Note: Matching the typo 'enhanceedContent' from your backend controller
        return response.data.enhanceedContent; 
    } catch (error) {
        throw error;
    }
};

export const enhanceExperience = async (userContent, token) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/ai/enhance-job-description`,
            { userContent },
            { headers: { token: token } }
        );
        return response.data.enhanceedContent;
    } catch (error) {
        throw error;
    }
};