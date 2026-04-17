import { Injectable, signal } from '@angular/core';

export interface LinkClickData {
  [url: string]: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly STORAGE_KEY = 'link-click-counts';

  private readonly _clickCounts = signal<LinkClickData>(this.loadFromStorage());

  readonly clickCounts = this._clickCounts.asReadonly();

  recordClick(url: string): void {
    this._clickCounts.update((counts) => {
      const updated = { ...counts, [url]: (counts[url] ?? 0) + 1 };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  getClickCount(url: string): number {
    return this._clickCounts()[url] ?? 0;
  }

  private loadFromStorage(): LinkClickData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? (JSON.parse(stored) as LinkClickData) : {};
    } catch {
      return {};
    }
  }
}
