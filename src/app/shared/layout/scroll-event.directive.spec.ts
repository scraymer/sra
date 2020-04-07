import { ElementRef, Renderer2 } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ScrollEventDirective } from './scroll-event.directive';

describe('ScrollEventDirective', () => {

    let el: ElementRef;
    let renderer: Renderer2;
    let document: Document;

    beforeEach(async( () => {
            TestBed.configureTestingModule({
                    providers: [MockElementRef, Renderer2, Document]
            }).compileComponents();

            el = TestBed.inject(MockElementRef);
            renderer = TestBed.inject(Renderer2);
            document = TestBed.inject(Document);
    }));

    it('should create an instance', () => {
        const directive = new ScrollEventDirective(el, renderer, document);
        expect(directive).toBeTruthy();
    });
});

export class MockElementRef extends ElementRef<Element> {
    constructor() { super(null); }
}

class MockDocument {
    documentElement = {
        scrollTop: 0
    };
}
