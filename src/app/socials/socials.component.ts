import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  socials: any[] = [];

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/socials/getSocials`).subscribe({
      next: (res) => {
        this.socials = res?.data || [];
      },
      error: (err) => console.error(err)
    });
  }

  isSvg(icon: string): boolean {
    return typeof icon === 'string' && icon.trim().startsWith('<svg');
  }

  isUrl(icon: string): boolean {
    return typeof icon === 'string' && /^https?:\/\//i.test(icon.trim());
  }

  trustSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
