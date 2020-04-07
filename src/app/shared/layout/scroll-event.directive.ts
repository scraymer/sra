import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Use to apply a class to the element when scrolling down. This should be used when
 * you want to modify an element's style in a specific scroll direction.
 *
 * For example, we use this directive to hide the app-header when scrolling down.
 */
@Directive({
  selector: '[appScrollEvent]'
})
export class ScrollEventDirective implements OnInit {

  private lastScrollTop = 0;
  private upScrollTop = 0;
  private downScrollTop = 0;

  constructor(private el: ElementRef<Element>, private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) { }

  /**
   * The class name to apply when the app is scrolling down.
   *
   * Default: app-scroll-event
   */
  @Input('appScrollEvent')
  appScrollEventClass = 'app-scroll-event';

  /**
   * The amount of pixels to deley adding the event class upon scrolling down.
   *
   * Default: 0
   */
  @Input()
  appScrollEventDelayDown = 0;

  /**
   * The amount of pixels to delay removing the event class upon scrolling up.
   *
   * Default: 0
   */
  @Input()
  appScrollEventDelayUp = 0;

  /**
   * The amount of pixels to ignore before applying event logic.
   *
   * Default: 0px
   */
  @Input()
  appScrollEventPadding = 0;

  /**
   * Check the scroll event class on initialization.
   */
  ngOnInit(): void {
    this.checkScrollEventClass();
  }

  /**
   * Listen to the window resize event and check the scroll event class.
   */
  @HostListener('window:resize')
  onResize() {
    this.checkScrollEventClass();
  }

  /**
   * Listen to the document scroll event and check the scroll event class.
   */
  @HostListener('document:scroll')
  onScroll() {
    this.checkScrollEventClass();
  }

  /**
   * Check the element's scroll direction change against the document and
   * apply scroll event class when scrolling down.
   */
  private checkScrollEventClass(): void {

    const scrollTop = this.document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      this.onScrollDown(scrollTop);
    } else {
      this.onScrollUp(scrollTop);
    }

    this.lastScrollTop = scrollTop;
  }

  /**
   * Event for when scrolling in the downwards direction.
   *
   * @param scrollTop current element's scrollTop value
   */
  private onScrollDown(scrollTop: number): void {

    this.downScrollTop += scrollTop - this.lastScrollTop;
    this.upScrollTop = 0;

    if (this.downScrollTop >= this.appScrollEventDelayDown && scrollTop > this.appScrollEventPadding) {
      this.renderer.addClass(this.el.nativeElement, this.appScrollEventClass);
    }
  }

  /**
   * Event for when scrolling in the upwards direction.
   *
   * @param scrollTop element's scrollTop value
   */
  private onScrollUp(scrollTop: number): void {

    this.upScrollTop += this.lastScrollTop - scrollTop;
    this.downScrollTop = 0;

    if (this.upScrollTop >= this.appScrollEventDelayUp || scrollTop <= this.appScrollEventPadding) {
      this.renderer.removeClass(this.el.nativeElement, this.appScrollEventClass);
    }
  }
}
