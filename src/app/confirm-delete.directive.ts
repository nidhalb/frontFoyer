import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal/modal";
import { FoyerDeleteConfirmationComponent } from "./foyer/foyer-delete-confirmation/foyer-delete-confirmation.component";

@Directive({
  selector: "[appConfirmDelete]",
})
export class ConfirmDeleteDirective {
  constructor(private el: ElementRef, private modalService: NgbModal) {}
  @HostListener("click")
  confirmDeletion(): void {
    const modalRef = this.modalService.open(FoyerDeleteConfirmationComponent, {
      /* Additional modal configuration options */
    });

    modalRef.componentInstance.confirmed.subscribe(() => {
      // Execute delete action
      console.log("Foyer deletion confirmed");
    });

    modalRef.componentInstance.canceled.subscribe(() => {
      // Handle cancellation
      console.log("Foyer deletion canceled");
    });
  }
}
