import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { Link } from '../../models/profile.interface';
import { NgOptimizedImage } from '@angular/common';
import { AnalyticsService } from '../../services/analytics';

@Component({
  selector: 'app-link-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './link-tile.html',
  styleUrl: './link-tile.css',
})
export class LinkTile {
  link = input.required<Link>();
  /** Zero-based index for staggered entrance animation */
  index = input<number>(0);

  protected readonly iconSize = computed(() => APP_CONSTANTS.LINK_ICON_SIZE);
  protected readonly clickCount = computed(() =>
    this.analyticsService.getClickCount(this.link().url)
  );
  protected readonly animationDelay = computed(() => `${this.index() * 60}ms`);

  private readonly analyticsService = inject(AnalyticsService);

  onLinkClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.analyticsService.recordClick(this.link().url);
    window.open(this.link().url, '_blank', 'noopener,noreferrer');
  }
}
