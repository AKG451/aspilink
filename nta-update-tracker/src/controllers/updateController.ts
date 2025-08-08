import { Request, Response } from 'express';
import { Scraper } from '../services/scraper';
import { EmailService } from '../services/emailService';
import { AISummaryService } from '../services/aiSummaryService';
import { Subscription } from '../types';


export class UpdateController {
    private scraper: Scraper;
    private emailService: EmailService;
    private aiSummaryService: AISummaryService;

    constructor() {
        this.scraper = new Scraper();
        this.emailService = new EmailService();
        this.aiSummaryService = new AISummaryService(process.env.GEMINI_API_KEY as string);
    }

    public async fetchUpdates(req: Request, res: Response): Promise<void> {
        try {
            const updates = await this.scraper.fetchUpdates();
            const summaries = await Promise.all(updates.map(update => this.aiSummaryService.generateSummary(update)));
            
            // Here you would typically save the updates and summaries to a database or in-memory store
            
            res.status(200).json({ updates, summaries });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching updates', error });
        }
    }

    public async subscribeUser(req: Request, res: Response): Promise<void> {
        const { email }: Subscription = req.body;

        try {
            // Logic to save the user's email subscription would go here
            
            res.status(200).json({ message: 'Subscription successful' });
        } catch (error) {
            res.status(500).json({ message: 'Error subscribing user', error });
        }
    }

    public async sendUpdateEmails(updates: any[]): Promise<void> {
        const subscribers: { email: string }[] = []; // Replace with actual fetching logic

        for (const subscriber of subscribers) {
            for (const update of updates) {
                const subject = `Update on ${update.title}`;
                const body = await this.aiSummaryService.generateSummary(update.content);
                await this.emailService.sendEmail(subscriber.email, subject, body);
            }
        }
    }
}