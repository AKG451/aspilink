import fetch from 'node-fetch';

export class AISummaryService {
    private apiKey: string;
    private apiUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://api.gemini.com/v1/summarize'; // Example API endpoint
    }

    public async generateSummary(updateContent: string): Promise<string> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({ text: updateContent })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch summary from Gemini API');
            }

            const data = await response.json() as { summary: string }; // Type assertion here
            return data.summary;
        } catch (error) {
            console.error('Error generating summary:', error);
            throw new Error('Could not generate summary');
        }
    }
}