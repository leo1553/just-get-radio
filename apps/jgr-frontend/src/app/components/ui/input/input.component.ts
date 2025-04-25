import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input, [app-input]',
  templateUrl: 'input.component.html',
  styleUrl: 'input.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  public id?: string;

  @Input()
  public type: 'text' | 'password' = 'text';

  @Input()
  public placeholder?: string;

  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  @ViewChild('input', { static: true })
  private inputRef!: ElementRef<HTMLInputElement>;

  private get input(): HTMLInputElement {
    return this.inputRef.nativeElement;
  }

  public get value(): string {
    return this.input.value;
  }

  public set value(value: string) {
    this.input.value = value;
  }

  public get disabled(): boolean {
    return this.input.disabled;
  }

  public set disabled(disabled: boolean) {
    this.input.disabled = disabled;
  }

  public handleInput(): void {
    this.onChange?.(this.value);
  }

  public handleBlur(): void {
    this.onTouched?.();
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
