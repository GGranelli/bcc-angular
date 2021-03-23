import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BranchInterface } from "../_interfaces/interfaces";

@Component({
  selector: "app-customer-search",
  templateUrl: "./customer-search.component.html",
  styleUrls: ["./customer-search.component.css"],
})
export class CustomerSearchComponent implements OnInit {
  @Input("branches-data") branches: BranchInterface;
  @Output() formData = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.formData.emit(form.value);
  }
}
