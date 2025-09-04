import { Component, computed, input } from '@angular/core';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { Link } from '../../models/profile.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-link-tile',
  imports: [NgOptimizedImage],
  templateUrl: './link-tile.html',
  styleUrl: './link-tile.css',
})
export class LinkTile {
  link = input.required<Link>();

  protected readonly iconSize = computed(() => APP_CONSTANTS.LINK_ICON_SIZE);
  protected readonly shareIconSize = computed(() => APP_CONSTANTS.SHARE_ICON_SIZE);

  onLinkClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.link().url, '_blank', 'noopener,noreferrer');
  }
}
