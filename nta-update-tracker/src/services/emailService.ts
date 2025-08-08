import nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // or any other email service
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS, // your email password
            },
        });
    }

    public async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Error sending email to ${to}:`, error);
        }
    }

    public async sendUpdateEmail(subscribers: string[], updateSummary: string): Promise<void> {
        const subject = 'New Update from NTA';
        const text = `Here is the latest update:\n\n${updateSummary}`;

        for (const subscriber of subscribers) {
            await this.sendEmail(subscriber, subject, text);
        }
    }
}