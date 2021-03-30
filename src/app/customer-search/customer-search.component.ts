import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Injectable,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { BranchInterface } from "../_interfaces/interfaces";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = "/";

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : "";
  }
}

@Component({
  selector: "app-customer-search",
  templateUrl: "./customer-search.component.html",
  styleUrls: ["./customer-search.component.css"],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
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
