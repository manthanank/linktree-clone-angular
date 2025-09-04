import { Component, computed, inject, input } from '@angular/core';
import { APP_CONSTANTS, SHARE_MESSAGES } from '../../constants/app.constants';
import { Profile } from '../../models/profile.interface';
import { Share } from '../../services/share';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  imports: [NgOptimizedImage],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {
  profile = input.required<Profile>();

  protected readonly imageSize = computed(() => APP_CONSTANTS.PROFILE_IMAGE_SIZE);
  private readonly shareService = inject(Share);

  onShareProfile(): void {
    this.shareService.shareUrl({
      title: SHARE_MESSAGES.PROFILE_TITLE(this.profile().name),
      text: SHARE_MESSAGES.PROFILE_TEXT(this.profile().name),
      url: window.location.href,
    });
  }
}
