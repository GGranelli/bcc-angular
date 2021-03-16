import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  @Input() public customer;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.customer);
  }
}
