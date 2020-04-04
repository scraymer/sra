import { Directive, HostBinding } from '@angular/core';

/**
 * Apply to an element with content that is scrollable and the
 * app scroll bar will be used inplace of the browser default
 * when possible.
 */
@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective {

  @HostBinding('class.app-scrollbar')
  isScrollbar = true;
}
