import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import _ from "lodash";
import { CustomerInterface } from "../_interfaces/interfaces";

@Component({
  selector: "app-table-modal",
  templateUrl: "./table-modal.component.html",
  styleUrls: ["./table-modal.component.css"],
})
export class TableModalComponent implements OnChanges {
  @Input("customer-modal") customer: CustomerInterface;
  @Input() items: [];
  @Input("disable-checkboxes") disableCheckboxes: boolean;
  @Input("get-toggle-checkboxes") getToggleCheckbox: Function;
  @Input() modalSuccess: boolean;

  constructor() {}

  confermato: boolean = false;
  changes: boolean;

  ngOnChanges() {
    console.log("COnfermato: " + this.customer.confermato);
    this.confermato = this.customer.confermato;

    if (this.modalSuccess) this.confermato = true;

    // this.customer.controls["customer-modal"].valueChanges.subscribe((value) => {
    //   this.customer = value;
    // });
  }

  renderCell = (target, item) => {
    const value = _.get(target, item.path);
    if (typeof value == "boolean") return (value && "Si") || "No";
    if (value == null) return "Nessun dato";
    return value;
  };
}
