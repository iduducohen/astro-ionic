import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-test-card',
  template: `
    <article class="psy-test" [class.on]="moreOn()">
      <p class="psy-badge">{{ badge() }}</p>
      <h2>{{ title() }}</h2>
      <p class="psy-blurb">{{ text() }}</p>
      <button type="button" class="psy-more" [attr.aria-expanded]="moreOn()" (click)="more.emit()">{{ moreLabel() }}</button>
      <button type="button" class="psy-cta" (click)="open.emit()">{{ cta() }}</button>
    </article>
  `,
  styles: [`:host { display: block; height: 100%; }`],
})
export class TestCardComponent {
  readonly badge = input('');
  readonly title = input('');
  readonly text = input('');
  readonly cta = input('');
  readonly moreLabel = input('');
  readonly moreOn = input(false);
  readonly open = output<void>();
  readonly more = output<void>();
}

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="psy-progress" role="progressbar" [attr.aria-valuenow]="value()" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="label()">
      <i [style.width.%]="value()"></i>
    </div>
  `,
})
export class ProgressBarComponent {
  readonly value = input(0);
  readonly label = input('');
}

@Component({
  selector: 'app-answer-scale',
  template: `
    <div class="psy-scale" role="radiogroup" [attr.aria-label]="legend()">
      @for (opt of options(); track opt.n) {
        <button type="button" class="psy-opt" role="radio" [attr.aria-checked]="opt.n === selected()" [class.on]="opt.n === selected()" (click)="pick.emit(opt.n)">
          <span class="psy-dot" aria-hidden="true"></span>
          <span class="psy-n" aria-hidden="true">{{ opt.n }}</span>
          <span>{{ opt.label }}</span>
        </button>
      }
    </div>
  `,
})
export class AnswerScaleComponent {
  readonly legend = input('');
  readonly selected = input<number | null>(null);
  readonly options = input<{ n: number; label: string }[]>([]);
  readonly pick = output<number>();
}

@Component({
  selector: 'app-score-bar',
  template: `
    <div class="psy-score">
      <div class="psy-score-top"><span>{{ label() }}</span><b>{{ value() }}%</b></div>
      <div class="psy-bar" aria-hidden="true"><i [style.width.%]="value()" [style.background]="color()"></i></div>
      @if (hint()) { <p>{{ hint() }}</p> }
    </div>
  `,
})
export class ScoreBarComponent {
  readonly label = input('');
  readonly value = input(0);
  readonly color = input('var(--psy-primary)');
  readonly hint = input('');
}

@Component({
  selector: 'app-disclaimer',
  template: `<p class="psy-note" role="note">{{ text() }}</p>`,
})
export class DisclaimerComponent {
  readonly text = input('');
}
