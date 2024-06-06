import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-manage-tags',
  standalone: true,
  imports: [MatIconModule,NgFor,MatPaginatorModule],
  templateUrl: './manage-tags.component.html',
  styleUrl: './manage-tags.component.scss'
})
export class ManageTagsComponent {
  pagination: Pagination = new Pagination();
  mockData = [
    { color: "#FFCCCB", name: "Example Name 1", status: "Active" },
    { color: "#c4403e", name: "Example Name 2", status: "Active" },
    { color: "#1dbe80", name: "Example Name 3", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
    { color: "#3835d6", name: "Example Name 4", status: "Active" },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor() {
    this.pagination.totalItems = this.mockData.length;
  }

  get paginatedData() {
    if (this.paginator?.pageSize) {
      this.pagination.itemsPerPage = this.paginator.pageSize;
    } else {
      this.pagination.itemsPerPage = 10;
    }

    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    return this.mockData.slice(startIndex, endIndex);
  }

  onPageChange(event: { pageIndex: number; }) {
    this.pagination.currentPage = event.pageIndex + 1;
  }

}
