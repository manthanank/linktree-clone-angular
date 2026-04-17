import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { APP_CONSTANTS, SHARE_MESSAGES } from '../../constants/app.constants';
import { Profile } from '../../models/profile.interface';
import { Share } from '../../services/share';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { SkillsChips } from '../skills-chips/skills-chips';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, ThemeToggle, SkillsChips],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {
  profile = input.required<Profile>();

  protected readonly imageSize = computed(() => APP_CONSTANTS.PROFILE_IMAGE_SIZE);
  protected readonly skills = computed(() => this.profile().skills ?? []);
  protected readonly copyTooltip = signal<'idle' | 'copied'>('idle');

  private readonly shareService = inject(Share);

  onShareProfile(): void {
    this.shareService.shareUrl({
      title: SHARE_MESSAGES.PROFILE_TITLE(this.profile().name),
      text: SHARE_MESSAGES.PROFILE_TEXT(this.profile().name),
      url: window.location.href,
    });
  }

  onCopyUrl(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.copyTooltip.set('copied');
      setTimeout(() => this.copyTooltip.set('idle'), 2000);
    });
  }
}
