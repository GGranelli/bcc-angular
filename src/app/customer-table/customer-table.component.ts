import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import _ from "lodash";
import { CustomerInterface } from "../_interfaces/interfaces";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.css"],
})
export class CustomerTableComponent implements OnInit {
  @Input("customers-data") customers: CustomerInterface;
  @Output("customer-details") customerDetails = new EventEmitter();
  @Input("customer-to-refresh") customerToRefresh: number;
  @Input() refresh: boolean;

  constructor() {}

  columns = [
    { path: "cab", label: "Cab" },
    { path: "nag", label: "Nag" },
    { path: "nome", label: "Nome" },
    { path: "dataNascita", label: "Data di nascita" },
    { path: "telefono", label: "Telefono" },
    { path: "email", label: "Email" },
  ];

  ngOnInit() {}

  convertDigitIn(s) {
    return s.split("").reverse().join("");
  }

  renderCell = (item, column) => {
    if (column.path === "dataNascita") {
      let data = _.get(item, column.path);

      let charArray: string[] = data.split("-");

      let reverseArray: string[] = charArray.reverse();

      data = reverseArray.join("/");

      return data;
    }

    return _.get(item, column.path);
  };

  onDetailsClick(customer) {
    this.customerDetails.emit(customer);
  }

  getButtonImage(bool) {
    let image = "";
    image += bool ? "assets/img/customer.png" : "assets/img/confirm.jpg";
    return image;
  }
}
