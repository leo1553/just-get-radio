import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-icon, [app-icon]',
  template: '',
  styleUrl: 'icon.component.scss',
})
export class IconComponent {
  @Input()
  @HostBinding('attr.icon')
  public icon!: 'search' | 'send' | 'play' | 'add';
}
