import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';
import { TechIconComponent } from '../shared/tech-icon/tech-icon.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TechIconComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private dataService = inject(DataService);

  readonly defaultFilters = ['All', 'Web', 'Mobile', 'Desktop', 'AI'];
  projects: any[] = [];
  filters: string[] = [...this.defaultFilters];
  selectedFilter = 'All';
  baseURL = environment.apiUrl;
  staticURL = environment.staticURL;
  isLoading = true;

  ngOnInit(): void {
    this.dataService.currentData.subscribe((res) => {
      const configured = res?.data?.portfolioFilters;
      if (Array.isArray(configured) && configured.length > 0) {
        this.filters = configured;
        if (!this.filters.includes(this.selectedFilter)) {
          this.selectedFilter = this.filters[0];
        }
      }
    });

    this.http.get<any>(`${this.baseURL}/projects/getProjects`).subscribe({
      next: (res) => {
        this.projects = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  get filteredProjects(): any[] {
    if (this.selectedFilter.toLowerCase() === 'all') {
      return this.projects;
    }
    return this.projects.filter(
      (p) => (p?.category || '').trim().toLowerCase() === this.selectedFilter.trim().toLowerCase()
    );
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  goToSingleProject(id: string): void {
    this.router.navigate(['/singleProject', id]);
  }
}
