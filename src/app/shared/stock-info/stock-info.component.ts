import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IStockInfo} from '../../../types/api/stock';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit {
  @Input() stock: IStockInfo;
  @Input() stockName: string;
  @Input() stockDate: string;

  @Output() itemRemoved: EventEmitter<IStockInfo> = new EventEmitter<IStockInfo>();
  public lastUpdate: string;

  constructor() {
  }

  ngOnInit() {
    const x = this.stock;
    this.lastUpdate = this.calcLastUpdate();
  }

  calcLastUpdate() {
    return '';
  }

  onRemove() {
    debugger
    this.itemRemoved.emit(this.stock);
  }
}
