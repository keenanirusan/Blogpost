import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {
  private headers: HttpHeaders;
  private url: string = 'https://localhost:5001/api/blog/AllBlogs';

  constructor(private http: HttpClient)
  {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public get() {
    return this.http.get(this.url, { headers: this.headers });
  }
}
