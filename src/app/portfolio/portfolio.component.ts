import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit{
  http = inject(HttpClient);
  projects: any;
  baseURL = environment.apiUrl;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.http.get(`${this.baseURL}/projects/getProjects`).subscribe((res) => {
      this.projects = res;
    }, (err) => {
      console.log(err);
    })
  }
  goToSingleProject(){
    this.router.navigate([`singleProject`])
  }

}
