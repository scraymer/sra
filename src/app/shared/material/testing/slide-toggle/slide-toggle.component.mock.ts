import { Component, Input } from '@angular/core';

// tslint:disable-next-line:component-selector
@Component({ selector: 'mat-slide-toggle', template: '' })
export class MockMatSlideToggleComponent {

    @Input()
    checked: boolean;
}
