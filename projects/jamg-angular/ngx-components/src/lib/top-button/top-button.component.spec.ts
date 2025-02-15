import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewportScroller } from '@angular/common';
import { TopButtonComponent } from './top-button.component';

describe('TopButtonComponent', () => {
  let component: TopButtonComponent;
  let fixture: ComponentFixture<TopButtonComponent>;
  let compiled: HTMLElement;
  let viewportScroller: ViewportScroller;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopButtonComponent],
      providers: [{ provide: ViewportScroller, useValue: { getScrollPosition: () => [0, 0], scrollToPosition: jasmine.createSpy() } }]
    }).compileComponents();

    fixture = TestBed.createComponent(TopButtonComponent);
    component = fixture.componentInstance;
    viewportScroller = TestBed.inject(ViewportScroller);
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button when scroll height exceeds threshold', () => {
    spyOn(viewportScroller, 'getScrollPosition').and.returnValue([0, 201]);
    component.onWindowScroll();
    expect(component.isDisplayingButton()).toBeTrue();
  });

  it('should hide button when scroll height is below threshold', () => {
    spyOn(viewportScroller, 'getScrollPosition').and.returnValue([0, 200]);
    component.onWindowScroll();
    expect(component.isDisplayingButton()).toBeFalse();
  });

  it('should scroll to top when button is clicked', () => {
    component.scrollToTop();
    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });

  it('should apply correct variant class', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('button-primary');
  });
});