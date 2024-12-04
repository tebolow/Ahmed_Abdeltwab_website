import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { SocialsComponent } from '../socials/socials.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  dataService = inject(DataService);
  data: any;
  
  ngOnInit(): void {
    this.dataService.currentData.subscribe((data) => {
      this.data = data;
    })
  }
}
