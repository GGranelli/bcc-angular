import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import _ from "lodash";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { CustomerInterface } from "../_interfaces/interfaces";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.css"],
})
export class CustomerTableComponent implements OnInit {
  @Input("customers-data") customers: CustomerInterface;
  @Output("customer-details") customerDetails = new EventEmitter();
  @Input() refresh: boolean;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refresh) this.customers = this.customers;
    console.log("ONCHANGES -> " + this.customers);
  }

  renderCell = (item, column) => {
    // if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  onDetailsClick(customer) {
    this.customerDetails.emit(customer);
  }
}
