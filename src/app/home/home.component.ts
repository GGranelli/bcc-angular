import { HttpResponse } from "@angular/common/http";
import { EventEmitter, Output, SimpleChanges } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { BranchService } from "../_services/branch.service";
import { CustomerService } from "../_services/customer.service";
import { paginate } from "../common/paginate";
import _ from "lodash";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private branchService: BranchService,
    private customerService: CustomerService,
    private modalService: NgbModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  ping: string;
  userPing: string;
  adminPing: string;
  branches: {};
  customers: {};
  customersPerPage: {};
  totalCount: number;
  showTable: boolean = false;
  currentPage: number = 1;
  pageSize: number = 8;
  pages: number = 1;
  showNavigation: boolean = true;

  ngOnInit() {
    this.authService.ping().subscribe((response) => {
      this.ping = response.toString();
    });

    this.authService.userPing().subscribe((response) => {
      this.userPing = response.toString();
    });

    this.authService.adminPing().subscribe((response) => {
      this.adminPing = response.toString();
    });

    this.branchService.getBranches().subscribe((response) => {
      this.branches = response;
    });
  }

  //==========PAGINATION==========//

  handlePageChange = (page) => {
    this.currentPage = page;
    this.getPageData();
  };

  getPageData = () => {
    var keys = Object.keys(this.customers);
    this.totalCount = keys.length;
    this.pagination();
    const sorted = _.orderBy(this.customers, "nome", "asc");

    const filtered = paginate(sorted, this.currentPage, this.pageSize);
    this.customersPerPage = filtered;
  };

  pagination = () => {
    const pagesCount = Math.ceil(this.totalCount / this.pageSize);
    this.showNavigation = pagesCount === 1 ? false : true;
    this.pages = _.range(1, pagesCount + 1);
  };

  //====================================//

  getFormData(event) {
    let branch = event.branch.id;
    let nag = event.nag;
    let name = event.name;
    let birthDate = event.birthDate;

    this.customerService
      .getCustomers(branch, nag, name, birthDate)
      .subscribe((response) => {
        this.customers = response;
        this.getPageData();
        this.showTable = true;
      });
  }

  getCustomerDetails(event) {
    //console.log(event);

    //apro la modal
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.customer = event;
  }
}
