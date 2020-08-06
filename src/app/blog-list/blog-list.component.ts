import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../blog-list.service'

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogList: Array<any>;

  constructor(private blogListService: BlogListService)
  {
    blogListService.get().subscribe((data: any) => this.blogList = data);
    console.log(this.blogList);
  }

  ngOnInit(): void {
  }

}
