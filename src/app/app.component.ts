import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  DestroyRef,
  effect,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProfileService } from './services/profile.service';
import { SeoService } from './services/seo.service';
import { ProfileData, Profile } from './models/profile.interface';
import { ProfileHeaderComponent } from './components/profile-header.component';
import { LinkTileComponent } from './components/link-tile.component';

@Component({
  selector: 'app-root',
  imports: [ProfileHeaderComponent, LinkTileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // Signals for state management
  profileData = signal<ProfileData | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  // Computed signals
  currentProfile = computed(() => {
    const data = this.profileData();
    return data && data.length > 0 ? data[0] : null;
  });
  currentYear = computed(() => new Date().getFullYear());  private readonly profileService = inject(ProfileService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seoService = inject(SeoService);

  constructor() {
    // Effect to track profile data changes and update SEO meta tags
    effect(() => {
      const profile = this.currentProfile();
      if (profile) {
        this.seoService.updateProfileSEO(profile);
      }
    });
  }
  ngOnInit(): void {
    this.loadProfileData();
  }  loadProfileData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.profileService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.profileData.set(data);          this.isLoading.set(false);
        },
        error: (error) => {
          this.error.set(
            'Failed to load profile data. Please try again later.'
          );
          this.isLoading.set(false);
          console.error('Error loading profile data:', error);
        },
      });
  }
}
