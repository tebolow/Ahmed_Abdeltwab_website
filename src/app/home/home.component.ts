import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment  } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { SocialsComponent } from '../socials/socials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SocialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  data: any;
  private baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  dataService = inject(DataService);


  ngOnInit(): void {
    this.http.get(`${this.baseURL}/data/getData`).subscribe((res)=> {
      this.data = res;
      this.dataService.setData(res);
    }, (err)=>console.log(err))
  }
}
