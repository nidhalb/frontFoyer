import { Directive, Input, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appAlert]",
})
export class AlertDirective {
  @Input() set appAlert(type: "success" | "info" | "warning" | "danger") {
    this.renderer.addClass(this.el.nativeElement, 'custom-alert');
    this.renderer.addClass(this.el.nativeElement, `alert-${type}`);  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
