import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStockInfo} from '../../../types/api/stock';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit {
  @Input() stock: IStockInfo;
  @Input() hideRemoveButton;
  @Output() itemRemoved: EventEmitter<IStockInfo> = new EventEmitter<IStockInfo>();

  public lastUpdate: number;

  constructor() {
  }

  ngOnInit() {
    this.lastUpdate = this.calcLastUpdate(this.stock);
  }

  calcLastUpdate(stock: IStockInfo) {
    const diff = Date.now() - stock.date;
    return Math.ceil(diff / 1000);
  }

  onRemove() {
    this.itemRemoved.emit(this.stock);
  }
}
