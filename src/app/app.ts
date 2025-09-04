import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileData } from './models/profile.interface';
import { ProfileHeader } from './components/profile-header/profile-header';
import { LinkTile } from './components/link-tile/link-tile';
import { Profile } from './services/profile';
import { Seo } from './services/seo';

@Component({
  selector: 'app-root',
  imports: [ProfileHeader, LinkTile],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('linktree-clone-angular');
  // Signals for state management
  profileData = signal<ProfileData | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  // Computed signals
  currentProfile = computed(() => {
    const data = this.profileData();
    return data && data.length > 0 ? data[0] : null;
  });
  currentYear = computed(() => new Date().getFullYear());
  private readonly profileService = inject(Profile);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seoService = inject(Seo);

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
  }
  loadProfileData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.profileService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.profileData.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.error.set('Failed to load profile data. Please try again later.');
          this.isLoading.set(false);
          console.error('Error loading profile data:', error);
        },
      });
  }
}
