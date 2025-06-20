import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Profile } from '../models/profile.interface';
import { ShareService } from '../services/share.service';
import { APP_CONSTANTS, SHARE_MESSAGES } from '../constants/app.constants';

@Component({
  selector: 'app-profile-header',
  imports: [NgOptimizedImage],
  template: `
    <div class="profile-header">
      <div class="header-container">
        <button
          type="button"
          class="share-button"
          (click)="onShareProfile()"
          aria-label="Share profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" class="share-icon">
            <path
              fill="currentColor"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92Z"
            />
          </svg>
        </button>
      </div>

      <div class="profile-content">
        <div class="image-container">
          <img
            [ngSrc]="profile().iconurl"
            [width]="imageSize().WIDTH"
            priority
            [height]="imageSize().HEIGHT"
            [alt]="profile().name + ' profile image'"
          />
        </div>

        <div class="text-container">
          <div class="name">
            <h1>{{ profile().name }}</h1>
          </div>
          <div class="desc">
            <p>{{ profile().desc }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-header {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 680px;
        margin: 0 auto;
        padding: 24px;
        padding-top: 48px;
      }
      .header-container {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 10;
      }
      .share-button {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(15px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .share-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px) scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        border-color: rgba(255, 255, 255, 0.3);
      }
      .share-icon {
        color: rgba(255, 255, 255, 0.9);
        width: 18px;
        height: 18px;
      }

      .profile-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .image-container {
        height: 108px;
        width: 108px;
        border-radius: 54px;
        overflow: hidden;
        margin-bottom: 24px;
        border: 3px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
      }

      .image-container:hover {
        transform: scale(1.05);
      }

      .image-container img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      .text-container {
        text-align: center;
        width: 100%;
        max-width: 400px;
      }

      .name h1 {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 12px 0;
        color: rgb(255, 255, 255);
        letter-spacing: -0.5px;
        line-height: 1.2;
      }

      .desc p {
        margin: 0 0 24px 0;
        font-size: 16px;
        font-weight: 400;
        color: rgba(240, 240, 240, 0.85);
        line-height: 1.5;
        max-width: 350px;
        margin-left: auto;
        margin-right: auto;
      }
      @media (max-width: 768px) {
        .profile-header {
          padding: 20px;
          padding-top: 44px;
          max-width: 100%;
        }
        .header-container {
          top: 12px;
          right: 12px;
        }

        .share-button {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }

        .share-icon {
          width: 16px;
          height: 16px;
        }

        .image-container {
          height: 96px;
          width: 96px;
          border-radius: 48px;
        }

        .name h1 {
          font-size: 24px;
        }

        .desc p {
          font-size: 15px;
          max-width: 300px;
        }
      }
    `,
  ],
})
export class ProfileHeaderComponent {
  profile = input.required<Profile>();

  protected readonly imageSize = computed(
    () => APP_CONSTANTS.PROFILE_IMAGE_SIZE
  );
  private readonly shareService = inject(ShareService);

  onShareProfile(): void {
    this.shareService.shareUrl({
      title: SHARE_MESSAGES.PROFILE_TITLE(this.profile().name),
      text: SHARE_MESSAGES.PROFILE_TEXT(this.profile().name),
      url: window.location.href,
    });
  }
}
