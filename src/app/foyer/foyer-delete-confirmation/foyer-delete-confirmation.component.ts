import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-foyer-delete-confirmation",
  templateUrl: "./foyer-delete-confirmation.component.html",
  styleUrls: ["./foyer-delete-confirmation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FoyerDeleteConfirmationComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  confirm(): void {
    this;
    this.activeModal.close();
    this.confirmed.emit();
  }

  cancel(): void {
    this;
    this.activeModal.close();
    this.canceled.emit();
  }

  ngOnInit(): void {}
}
