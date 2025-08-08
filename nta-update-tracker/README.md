# NTA Update Tracker

This project is designed to track updates from the National Testing Agency (NTA) website for JEE and NEET examinations. It automatically fetches updates, summarizes them using AI, and sends email notifications to subscribed users.

## Features

- **Real-time Update Tracking**: Monitors the NTA website for any new updates related to JEE and NEET.
- **AI-Powered Summaries**: Utilizes the Gemini API to generate concise summaries of the updates.
- **Email Notifications**: Sends email alerts to users who subscribe for updates.

## Project Structure

```
nta-update-tracker
├── src
│   ├── app.ts                # Entry point of the application
│   ├── services
│   │   ├── scraper.ts        # Fetches updates from the NTA website
│   │   ├── emailService.ts    # Handles email notifications
│   │   └── aiSummaryService.ts # Generates AI summaries of updates
│   ├── routes
│   │   └── index.ts          # Defines API routes
│   ├── controllers
│   │   └── updateController.ts # Manages update-related requests
│   └── types
│       └── index.ts          # Type definitions for the application
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nta-update-tracker
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Subscribe for updates by sending a POST request to `/subscribe` with the user's email.

3. The application will periodically check for updates and notify subscribers via email.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.