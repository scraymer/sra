import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Use to apply a class to the element when scrolling. This should be used when
 * you want to hide a child element in a specific scroll direction.
 *
 * For example, we use this directive to hide the app-header when scrolling down.
 */
@Directive({
  selector: '[appScrollHide]'
})
export class ScrollHideDirective implements OnInit {

  private lastScrollTop = 0;
  private upScrollTop = 0;
  private downScrollTop = 0;

  constructor(private el: ElementRef<Element>, private renderer: Renderer2) { }

  /**
   * The class name to use when child elements should be hidden.
   *
   * Default: app-scroll-hide
   */
  @Input('appScrollHide')
  appScrollHideClass = 'app-scroll-hide';

  /**
   * The amount of pixels to deley removing the hide class upon scrolling down.
   *
   * Default: 0
   */
  @Input()
  appScrollHideDelayDown = 0;

  /**
   * The amount of pixels to delay adding the hide class upon scrolling up.
   *
   * Default: 0
   */
  @Input()
  appScrollHideDelayUp = 0;

  /**
   * The amount of pixels to ignore before applying hide logic.
   *
   * Default: 0px
   */
  @Input()
  appScrollHidePadding = 0;

  /**
   * Check the scroll class hide class on initialization.
   */
  ngOnInit(): void {
    this.checkHideClass();
  }

  /**
   * Listen to the scroll event and check the hide class.
   */
  @HostListener('scroll')
  onScroll() {
    this.checkHideClass();
  }

  /**
   * Check the element's scroll direction change apply hide class when scrolling down.
   */
  private checkHideClass(): void {

    const scrollTop = this.el.nativeElement.scrollTop;

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

    if (this.downScrollTop >= this.appScrollHideDelayDown && scrollTop > this.appScrollHidePadding) {
      this.renderer.addClass(this.el.nativeElement, this.appScrollHideClass);
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

    if (this.upScrollTop >= this.appScrollHideDelayUp || scrollTop <= this.appScrollHidePadding) {
      this.renderer.removeClass(this.el.nativeElement, this.appScrollHideClass);
    }
  }
}
