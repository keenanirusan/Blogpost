import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  url = 'https://localhost:5001/api/blog';
  list : Blog[];

  constructor(private http: HttpClient) { }

  getAllBlog(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.url + '/AllBlogs');
  }

  getBlogById(blogId: number): Observable<Blog> {
    return this.http.get<Blog>(this.url + '/GetBlogById/' + blogId);
  }

  createBlog(blog: Blog): Observable<Blog> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Blog>(this.url + '/InsertBlog/',
    blog, httpOptions);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Blog>(this.url + '/UpdateBlog/',
    blog, httpOptions);
  }

  deleteBlogById(blogId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<number>(this.url + '/DeleteBlog/' + blogId,
    httpOptions);
  }

}
