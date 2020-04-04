import { ElementRef, Renderer2 } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ScrollHideDirective } from './scroll-hide.directive';

describe('ScrollHideDirective', () => {

  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(async( () => {
      TestBed.configureTestingModule({
          providers: [MockElementRef, Renderer2]
      }).compileComponents();

      el = TestBed.inject(MockElementRef);
      renderer = TestBed.inject(Renderer2);
  }));

  it('should create an instance', () => {
    const directive = new ScrollHideDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});

export class MockElementRef extends ElementRef<Element> {
  constructor() { super(null); }
}
