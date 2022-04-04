import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.scss']
})
export class ToastDemoComponent {

  constructor(private toastr: ToastrService) { }

  showError(){
    this.toastr.error(null, "Error w/o message");
  }
  showInfo(){
    this.toastr.info("Information w/o title");
  }
  showSuccess(){
    this.toastr.success("w/ message", "Success");
  }
  showWarning(){
    this.toastr.warning("w/ message", "Warning");
  }

}
