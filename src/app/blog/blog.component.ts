import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  dataSaved = false;
  blogForm: any;
  allBlog: Observable<Blog[]>;
  BlogIdUpdate = null;
  message = null;

  constructor(private formbuilder: FormBuilder, public blogService:BlogService) { }

  ngOnInit(): void {
    this.blogForm = this.formbuilder.group({
      Title: ['', [Validators.required]],
      Content: ['', [Validators.required]]
    });
  }

  loadAllBlog() {
    this.allBlog = this.blogService.getAllBlog();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const blog = this.blogForm.value;
    this.CreateBlog(blog);
    this.blogForm.reset();
  }

  loadBlogToEdit(blogId: number)
  {
    this.blogService.getBlogById(blogId).subscribe(blog => {
      this.message = null;
      this.dataSaved = false;
      this.BlogIdUpdate = blog.Id;
      this.blogForm.controls['Title'].setValue(blog.Title);
      this.blogForm.controls['Content'].setValue(blog.Content);
    });
  }

  CreateBlog(blog: Blog)
  {
    if (this.BlogIdUpdate == null)
    {
      this.dataSaved = true;
      this.message = 'Blog successfully created.';
      this.loadAllBlog();
      this.BlogIdUpdate = null;
      this.blogForm.reset();
    }
    else
    {
      blog.Id = this.BlogIdUpdate;
      this.blogService.updateBlog(blog).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Blog updated.';
        this.loadAllBlog();
        this.BlogIdUpdate = null;
        this.blogForm.reset();
      });
    }
  }

  deleteBlog(blogId: number)
  {
    if (confirm("Are you sure you want to delete this ?")) {
      this.blogService.deleteBlogById(blogId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Blog Deleted Succefully';
        this.loadAllBlog();
        this.BlogIdUpdate = null;
        this.blogForm.reset();
      });
    }
  }

  resetForm() {
    this.blogForm.reset();
    this.message = null;
    this.dataSaved = false;
  }

}
