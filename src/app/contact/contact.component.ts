import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  http = inject(HttpClient);
  constructor (private router: Router){};

  addContact(e: any){
    e.preventDefault();
    const formData = new FormData(e.target);
    this.http.post(`${environment.apiUrl}/contacts/addContact`, formData).subscribe((res)=>console.log(res), (err)=>console.log(err))
    this.router.navigate(["/"])
  }
}
