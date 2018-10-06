import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef, EventEmitter, Input, Output,
} from '@angular/core';

@Component({
  selector: 'md-text-field',
  styleUrls: [
    './md-text-field.component.scss'
  ],
  templateUrl: './md-text-field.component.pug'
})
export class MdTextFieldComponent implements AfterContentInit {

  hovered: boolean;
  focused: boolean;
  filled: boolean;

  @Input() label: string;
  @Input() dense: boolean;

  @Input() icon: string;

  @Output() iconClicked = new EventEmitter();

  @ContentChild('input') input: ElementRef;

  constructor() {}

  ngAfterContentInit(): void {
    if (!this.input) { return; }

    // Update 'hovered' and 'focused' states based on mouse and focus events
    this.bindBoolToEvents('hovered', 'mouseover', 'mouseout');
    this.bindBoolToEvents('focused', 'focus', 'blur');

    // Update 'filled' state based on value of input
    this.input.nativeElement.addEventListener('input', () => this.updateFilled());
    this.input.nativeElement.addEventListener('change', () => this.updateFilled());
    setTimeout(() => this.updateFilled(), 5); // Wait for bound data to load
  }

  bindBoolToEvents(prop: keyof MdTextFieldComponent, enableEvent: string, disableEvent: string) {
    this.input.nativeElement.addEventListener(enableEvent, () => {
      this[prop] = true;
    });

    this.input.nativeElement.addEventListener(disableEvent, () => {
      this[prop] = false;
    });
  }

  updateFilled(): void {
    this.filled = this.input.nativeElement.value;
  }

  onIconClicked() {
    this.iconClicked.emit();
  }

}