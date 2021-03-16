import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import _ from "lodash";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.css"],
})
export class CustomerTableComponent implements OnInit {
  model: NgbDateStruct;
  @Input("customers-data") customers;
  @Output("customer-details") customerDetails = new EventEmitter();

  constructor() {}

  columns = [
    { path: "cab", label: "Cab" },
    { path: "nag", label: "Nag" },
    { path: "nome", label: "Nome" },
    { path: "dataNascita", label: "Data di nascita" },
    { path: "telefono", label: "Telefono" },
    { path: "email", label: "Email" },
    // {
    //   key: "dettagli",
    //   content: (customer) => `<button>Details</button>`,
    // },
  ];

  ngOnInit() {}

  renderCell = (item, column) => {
    // if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  onDetailsClick(customer) {
    this.customerDetails.emit(customer);
  }
}
