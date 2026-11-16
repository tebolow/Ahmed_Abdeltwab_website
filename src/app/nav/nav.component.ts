import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  private dataService = inject(DataService);
  theme = inject(ThemeService);

  staticURL = environment.staticURL;
  downloadCvUrl = `${environment.apiUrl}/data/downloadCv`;
  data: any = null;
  menuOpen = false;

  ngOnInit(): void {
    this.dataService.currentData.subscribe((res) => {
      this.data = res;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
