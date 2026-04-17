import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skills-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (skills().length > 0) {
      <div class="skills-container" role="list" aria-label="Skills">
        @for (skill of skills(); track skill; let i = $index) {
          <span
            class="skill-chip"
            role="listitem"
            [style.animation-delay]="(i * 40) + 'ms'"
          >{{ skill }}</span>
        }
      </div>
    }
  `,
  styles: [`
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-top: 16px;
      margin-bottom: 4px;
      max-width: 420px;
      animation: fadeIn 0.5s ease both;
    }

    .skill-chip {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: var(--chip-bg);
      border: 1px solid var(--chip-border);
      color: var(--chip-text);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2px;
      white-space: nowrap;
      transition: all var(--transition-fast);
      animation: slideInUp 0.4s ease both;
      cursor: default;
      user-select: none;
    }

    .skill-chip:hover {
      transform: translateY(-2px) scale(1.04);
      background: var(--chip-border);
    }

    @media (max-width: 480px) {
      .skills-container {
        gap: 6px;
        max-width: 100%;
      }

      .skill-chip {
        font-size: 11px;
        padding: 3px 10px;
      }
    }
  `],
})
export class SkillsChips {
  skills = input.required<string[]>();
}
