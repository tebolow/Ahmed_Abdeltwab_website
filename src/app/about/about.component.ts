import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  data: any
  dataService = inject(DataService);
  staticURL = environment.staticURL;

  ngOnInit(): void {
    this.dataService.currentData.subscribe((data) => {
      this.data = data
    })
  }
}
