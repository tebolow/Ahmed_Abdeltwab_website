import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { environment } from '../../environments/environment';
import { TechIconComponent } from '../shared/tech-icon/tech-icon.component';
import { MediaUrlPipe } from '../shared/pipes/media-url.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TechIconComponent, MediaUrlPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  data: any = null;
  dataService = inject(DataService);
  staticURL = environment.staticURL;

  readonly defaultToolkit = [
    'Angular',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Node.js',
    'Express.js',
    'MongoDB',
    'REST APIs',
    'Git'
  ];

  ngOnInit(): void {
    this.dataService.currentData.subscribe((data) => {
      this.data = data;
    });
  }

  get aboutParagraphs(): string[] {
    const raw = (this.data?.data?.about || '').trim();
    if (!raw) {
      return [
        'I am a Full-Stack Web Developer passionate about building end-to-end digital products—from responsive, accessible frontend interfaces in Angular and TypeScript to secure REST APIs and database architectures in Node.js, Express, and MongoDB.',
        'I care deeply about clean code, maintainable architecture, performance, and seamless user experiences across every screen size.'
      ];
    }
    return raw
      .split(/\n\s*\n/)
      .map((p: string) => p.trim())
      .filter(Boolean);
  }

  get toolkit(): string[] {
    const list = this.data?.data?.toolkit;
    return Array.isArray(list) && list.length > 0 ? list : this.defaultToolkit;
  }
}
