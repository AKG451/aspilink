import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export class UpdateController {
  private updates: string[] = [];
  private summaries: string[] = [];
  private email: string = '';
  private message: string = '';

  constructor() {
    this.fetchUpdates();
  }

  private fetchUpdates() {
    axios.get(`${API_BASE}/updates`)
      .then(res => {
        this.updates = res.data.updates;
        this.summaries = res.data.summaries;
      })
      .catch(() => this.message = 'Failed to fetch updates.');
  }

  public async subscribe(email: string) {
    this.email = email;
    try {
      await axios.post(`${API_BASE}/subscribe`, { email });
      this.message = 'Subscription successful!';
      this.email = '';
    } catch {
      this.message = 'Subscription failed.';
    }
  }

  public getUpdates() {
    return this.updates;
  }

  public getSummaries() {
    return this.summaries;
  }

  public getMessage() {
    return this.message;
  }
}