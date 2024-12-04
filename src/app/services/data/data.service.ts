import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  setData(data: any) {
    this.dataSource.next(data);
  }
}
