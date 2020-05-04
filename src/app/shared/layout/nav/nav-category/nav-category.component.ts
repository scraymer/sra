import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Component, Input } from '@angular/core';
import { matExpansionAnimations, MatExpansionPanelState } from '@angular/material/expansion';

@Component({
  selector: 'app-nav-category',
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.scss'],
  animations: [matExpansionAnimations.bodyExpansion]
})
export class NavCategoryComponent extends CdkAccordionItem {

  @Input()
  label: string;

  @Input()
  icon: string;

  getExpandedState(): MatExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }
}
