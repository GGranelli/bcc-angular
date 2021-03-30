import { Component, Input, OnChanges } from "@angular/core";
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

  birthDate: string = "";

  ngOnInit() {
    let data = this.customer.dataNascita.toString();
    let charArray: string[] = data.split("-");
    let reverseArray: string[] = charArray.reverse();
    this.birthDate = reverseArray.join("/");
  }

  ngOnChanges() {
    this.confermato = this.customer.confermato;

    if (this.modalSuccess) this.confermato = true;
  }

  renderCell = (target, item) => {
    const value = _.get(target, item.path);
    if (typeof value == "boolean") return (value && "Si") || "No";
    if (value == null) return "Nessun dato";
    return value;
  };
}
