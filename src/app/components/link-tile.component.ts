import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Link } from '../models/profile.interface';
import { APP_CONSTANTS } from '../constants/app.constants';

@Component({
  selector: 'app-link-tile',
  imports: [NgOptimizedImage],
  template: `
    <div class="tile-container">
      <a class="tile" [href]="link().url" target="_blank">
        <div class="icon">
          <img
            [ngSrc]="link().icon"
            [alt]="link().name + ' logo'"
            [height]="iconSize().HEIGHT"
            [width]="iconSize().WIDTH"
          />
        </div>
        <p>{{ link().name }}</p>
        <button
          type="button"
          class="tile-link-button"
          (click)="onLinkClick($event)"
          [attr.aria-label]="'Open ' + link().name + ' link'"
        >
          <svg
            [attr.width]="shareIconSize().WIDTH"
            [attr.height]="shareIconSize().HEIGHT"
            viewBox="0 0 24 24"
            class="link-icon"
          >
            <path
              fill="currentColor"
              d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
            />
          </svg>
        </button>
      </a>
    </div>
  `,
  styles: [
    `
      .tile-container {
        width: 100%;
        margin: 8px 0;
      }
      .tile {
        width: 100%;
        background: linear-gradient(
          135deg,
          rgba(37, 37, 37, 0.9),
          rgba(45, 45, 45, 0.9)
        );
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: rgb(240, 240, 240);
        padding: 16px;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
      }

      .tile::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.05)
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      .tile:hover {
        transform: translateY(-2px) scale(1.01);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .tile:focus {
        outline: 2px solid rgba(255, 255, 255, 0.4);
        outline-offset: 2px;
      }
      .tile:hover::before {
        opacity: 1;
      }
      .icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        flex-shrink: 0;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        padding: 0;
        overflow: hidden;
      }

      .icon img {
        border-radius: 8px;
        object-fit: cover;
        width: 32px;
        height: 32px;
        display: block;
        margin: auto;
      }
      .tile-link-button {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background-color: rgba(52, 52, 52, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(240, 240, 240);
        transition: all 0.2s ease;
        flex-shrink: 0;
        margin-left: 12px;
        backdrop-filter: blur(10px);
        z-index: 2;
        position: relative;
      }

      .tile-link-button:hover {
        background-color: rgba(72, 72, 72, 0.9);
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .tile-link-button:focus {
        outline: 2px solid rgba(255, 255, 255, 0.4);
        outline-offset: 1px;
      }

      .tile-link-button:active {
        transform: scale(0.95);
      }

      .link-icon {
        color: inherit;
      }

      p {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
        flex: 1;
        text-align: left;
        letter-spacing: -0.3px;
        line-height: 1.3;
      }
      @media (max-width: 480px) {
        .tile {
          padding: 12px;
        }
        .icon {
          width: 40px;
          height: 40px;
          margin-right: 12px;
          padding: 0;
        }

        .icon img {
          width: 28px;
          height: 28px;
          margin: auto;
        }

        p {
          font-size: 16px;
          letter-spacing: -0.2px;
        }
        .tile-link-button {
          width: 38px;
          height: 38px;
          margin-left: 8px;
        }

        .tile:hover {
          transform: translateY(-1px) scale(1.005);
        }
      }
    `,
  ],
})
export class LinkTileComponent {
  link = input.required<Link>();

  protected readonly iconSize = computed(() => APP_CONSTANTS.LINK_ICON_SIZE);
  protected readonly shareIconSize = computed(
    () => APP_CONSTANTS.SHARE_ICON_SIZE
  );

  onLinkClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.link().url, '_blank', 'noopener,noreferrer');
  }
}
