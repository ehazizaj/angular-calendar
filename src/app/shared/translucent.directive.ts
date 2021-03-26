import { AfterViewInit, Directive, ElementRef, Input, NgModule, Renderer2 } from '@angular/core';
import { transparentize } from 'color2k';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translucent]'
})
export class TranslucentDirective implements AfterViewInit {

  // nice colors
  // red - #f52525
  // green - #39BF4D
  // blue - #2752FF
  @Input() color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.color) {
      this.renderer.setStyle(
        this.elementRef.nativeElement, 'background-color', transparentize(this.color, 0.95)
      );
      this.renderer.setStyle(
        this.elementRef.nativeElement, 'color', this.color);
      this.renderer.setStyle(
        this.elementRef.nativeElement, 'border', `1px solid ${ transparentize(this.color, 0.8) }`
      );
    }
  }


}

@NgModule({
  declarations: [ TranslucentDirective ],
  exports: [ TranslucentDirective ]
})
export class TranslucentModule {
}
