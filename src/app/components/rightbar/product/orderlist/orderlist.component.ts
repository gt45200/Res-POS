import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { SharedService } from "app/services/shared.service";

@Component({
  selector: "app-orderlist",
  templateUrl: "./orderlist.component.html",
  styleUrls: ["./orderlist.component.css"],
})
export class OrderlistComponent {
  constructor(private sharedService: SharedService) {}
  @Input() orderList: any[] = [];
  @Output() orderListChange = new EventEmitter<any[]>();
  @Output() removeOrder = new EventEmitter<number>();

  // order number
  ordernumber: number = 1;

  decrementorder(product: any) {
    const index = this.orderList.indexOf(product);
    if (product.ordernumber > 1) {
      product.ordernumber--;
    } else {
      this.orderList.splice(index, 1);
      this.removeOrder.emit(product);
    }
    this.emitUpdatedOrderList();
  }

  incrementorder(product: any) {
    product.ordernumber++;
    this.emitUpdatedOrderList();
  }

  emitUpdatedOrderList() {
    this.orderListChange.emit(this.orderList);
  }
}
