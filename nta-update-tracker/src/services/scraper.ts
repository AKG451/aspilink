import axios from 'axios';
import { JSDOM } from 'jsdom';

export class Scraper {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://www.nta.ac.in'; // Replace with the actual NTA updates URL
    }

    public async fetchUpdates(): Promise<string[]> {
        try {
            const response = await axios.get(this.baseUrl);
            const updates = this.parseUpdates(response.data);
            return updates;
        } catch (error) {
            console.error('Error fetching updates:', error);
            throw new Error('Failed to fetch updates');
        }
    }

    private parseUpdates(html: string): string[] {
        const updates: string[] = [];
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Example selector, replace with actual selectors based on NTA website structure
        const updateElements = document.querySelectorAll('.update-class'); 

        updateElements.forEach(element => {
            updates.push(element.textContent.trim());
        });

        return updates;
    }
}