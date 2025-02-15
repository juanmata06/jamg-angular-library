import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'jamg-top-button',
  standalone: true,
  templateUrl: './top-button.component.html',
  styleUrl: './top-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'buttonStyles()',
    '[style.display]': 'isDisplayingButton() ? "block" : "none"',
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class TopButtonComponent {
  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * General vars
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  private readonly SCROLL_HEIGHT_TO_DISPLAY = 200;
  private readonly TOP_POSITION: [number, number] = [0, 0];

  @Input() variant: 'primary' | 'secondary' | 'default' = 'default';
  @Input() text: string = '';

  public buttonText = computed(() => this.text.trim() !== '' ? this.text : '⌃');
  public isDisplayingButton = signal(false);

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(private readonly _viewportScroller: ViewportScroller) { }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PRIVATE VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  private buttonStyles(): string {
    const baseClasses = 'fixed bottom-5 right-7 z-50 font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300 ease-in-out';
    const variants = {
      primary: 'button-primary',
      secondary: 'button-secondary',
      default: 'button-default'
    };
    return `${baseClasses} ${variants[this.variant]}`;
  }

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------------------------------------------------------------
   * PUBLIC VALIDATION AND INTERNAL PROCESS METHODS
   * ------------------------------------------------------------------------------------------------------------------------------
   */
  public onWindowScroll(): void {
    const [, scrollY] = this._viewportScroller.getScrollPosition();
    this.isDisplayingButton.set(scrollY > this.SCROLL_HEIGHT_TO_DISPLAY);
  }

  public scrollToTop(): void {
    this._viewportScroller.scrollToPosition(this.TOP_POSITION);
  }
}