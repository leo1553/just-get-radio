import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../../ui/icon';
import { InputComponent } from '../../ui/input';

@Component({
  selector: 'app-search, [app-search]',
  templateUrl: 'search.component.html',
  styleUrl: 'search.component.scss',
  imports: [FormsModule, ReactiveFormsModule, IconComponent, InputComponent],
})
export class SearchComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);

  public readonly formGroup = this.formBuilder.group({
    search: this.formBuilder.control<string>('', Validators.required),
  });

  @Input()
  public set value(value: string) {
    this.formGroup.controls.search.setValue(value);
  }

  @Output()
  public readonly appSubmit = new EventEmitter<string>();

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  constructor() {
    this.formGroup.controls.search.valueChanges
      .subscribe(value => this.handleValueChange(value));
  }

  private handleValueChange(value: string): void {
    this.valueChange.emit(value);
  }

  public handleSubmit(): void {
    const searchValue = this.formGroup.controls.search.value;
    this.appSubmit.emit(searchValue);
  }
}
