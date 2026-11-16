import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  loadData() {
    return this.http.get<any>(`${environment.apiUrl}/data/getData`).pipe(
      tap((res) => {
        if (res?.data) {
          this.dataSource.next(res);
        }
      })
    );
  }

  setData(data: any): void {
    this.dataSource.next(data);
  }
}
