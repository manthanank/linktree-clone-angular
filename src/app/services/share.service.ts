import { Injectable } from '@angular/core';
import { SHARE_MESSAGES } from '../constants/app.constants';

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  shareUrl(data: ShareData): void {
    if (this.isWebShareSupported()) {
      navigator.share(data).catch((err) => {
        console.warn('Error sharing:', err);
        this.fallbackShare(data.url);
      });
    } else {
      this.fallbackShare(data.url);
    }
  }

  shareLink(url: string): void {
    const shareData: ShareData = {
      title: SHARE_MESSAGES.LINK_TITLE,
      text: SHARE_MESSAGES.LINK_TEXT,
      url: url,
    };
    this.shareUrl(shareData);
  }

  private isWebShareSupported(): boolean {
    return 'share' in navigator;
  }

  private fallbackShare(url: string): void {
    // Fallback: Copy to clipboard or open in new tab
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log('URL copied to clipboard');
        })
        .catch((err) => {
          console.warn('Failed to copy URL:', err);
        });
    }
  }
}
