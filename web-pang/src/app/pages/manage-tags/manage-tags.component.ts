import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../interfaces/pagination';
import { ModalTagsComponent } from './modal-tags/modal-tags.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { TagService } from '../../services/tag.service';
import { QueryPagination } from '../../interfaces/query-pagination';

@Component({
  selector: 'app-manage-tags',
  standalone: true,
  imports: [
    MatIconModule,
    NgFor,
    MatPaginatorModule,
    ModalTagsComponent,
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './manage-tags.component.html',
  styleUrl: './manage-tags.component.scss',
})
export class ManageTagsComponent implements OnInit{
  pagination: Pagination = new Pagination();
  tagService = inject(TagService);
  mockData: Map<string, any> = new Map<string, any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTags();

    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.pagination.currentPage = event.pageIndex + 1;
        this.pagination.itemsPerPage = event.pageSize;
        this.loadTags();
      });
    }
  }

  openModal(action: 'add' | 'edit', data: any): void {
    const dialogRef = this.dialog.open(ModalTagsComponent, {
      width: '624px',
      scrollStrategy: new NoopScrollStrategy(),
      data: { action: action, tagData: data }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.pagination.itemsPerPage = this.paginator?.pageSize || this.pagination.itemsPerPage;
      this.loadTags();
    });
  }

  loadTags(): void {
    this.pagination.itemsPerPage = this.paginator?.pageSize || this.pagination.itemsPerPage;
    const myQueryTag: QueryPagination = {
      page: this.pagination.currentPage,
      size: this.pagination.itemsPerPage,
    };

    this.tagService.getTagColor(myQueryTag).subscribe((data: any) => {
      this.mockData = new Map<string, any>(data.data.content.map((item: any) => [item.id, item]));
      this.pagination.totalItems = data.data.total;
    });
  }

  get paginatedData() {
    this.pagination.itemsPerPage = this.paginator?.pageSize || 10;
    return Array.from(this.mockData.values());
  }

  onPageChange(event: { pageIndex: number }) {
    this.pagination.currentPage = event.pageIndex + 1;
    this.pagination.itemsPerPage = this.paginator?.pageSize || this.pagination.itemsPerPage;
    this.loadTags();
  }
}
