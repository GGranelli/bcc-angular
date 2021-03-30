import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { InternalFormsSharedModule } from "@angular/forms/src/directives";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerInterface } from "../_interfaces/interfaces";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  @Input() public customer: CustomerInterface;
  @Input() public handleConfirmed: Function;
  @Input() public modalSuccess: boolean;

  constructor(public activeModal: NgbActiveModal) {}

  confirmed: boolean = false;
  success: boolean = false;
  disableCheckboxes: boolean = false;

  items = [
    { path: "telefono", label: "Numero di telefono", flagged: false },
    { path: "email", label: "Email", flagged: false },
    { path: "p1", label: "Privacy 1", flagged: false },
    { path: "p2", label: "Privacy 2", flagged: false },
    { path: "p3", label: "Privacy 3", flagged: false },
    { path: "p4", label: "Privacy 4", flagged: false },
    { path: "p5", label: "Privacy 5", flagged: false },
    { path: "p6", label: "Privacy 6", flagged: false },
    { path: "firma", label: "Firma grafometrica", flagged: false },
  ];

  _items: any;

  ngOnInit() {
    this._items = this.items;
  }

  // ngOnChanges() {
  //   console.log("PRE: " + this.customer);
  //   this.customer.controls[].valueChanges.subscribe((value) => {
  //     this.customer = value;
  //   });
  //   console.log("POST: " + this.customer);
  // }

  handleCheckbox = (item) => {
    this._items.find((m) => m.path === item.path).flagged =
      item.flagged === true ? false : true;
  };

  cleanItems = () => {
    //this.items.forEach((m) => (m.flagged = false));
    this.changeConfirmedStatus(false);
    this.disableCheckboxes = false;
    this.modalSuccess = false;
  };

  changeConfirmedStatus = (bool: boolean) => {
    this.confirmed = bool;
  };

  showConfirmationButton = () => {
    this.changeConfirmedStatus(true);
    //disable checkboxes
    this.disableCheckboxes = true;
  };

  confirmation = () => {
    this.handleConfirmed(this._items, this.customer);
    this.cleanItems();
    this.modalSuccess = true;
  };
}
