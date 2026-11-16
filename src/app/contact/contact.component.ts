import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);
  private dataService = inject(DataService);

  siteData: any = null;
  isSubmitting = false;
  statusMessage = '';
  isError = false;

  ngOnInit(): void {
    this.dataService.currentData.subscribe((res) => {
      this.siteData = res?.data || null;
    });
  }

  addContact(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.isSubmitting = true;
    this.statusMessage = '';
    this.isError = false;

    this.http.post(`${environment.apiUrl}/contacts/addContact`, formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.statusMessage = 'Thank you! Your message has been sent.';
        form.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.isError = true;
        this.statusMessage = err?.error?.error || 'Failed to send message. Please try again.';
      }
    });
  }
}
