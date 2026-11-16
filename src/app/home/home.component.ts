import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { SocialsComponent } from '../socials/socials.component';
import { MediaUrlPipe } from '../shared/pipes/media-url.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SocialsComponent, RouterLink, MediaUrlPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private dataService = inject(DataService);

  data: any = null;
  staticURL = environment.staticURL;

  ngOnInit(): void {
    this.dataService.currentData.subscribe((res) => {
      this.data = res;
    });
  }
}
