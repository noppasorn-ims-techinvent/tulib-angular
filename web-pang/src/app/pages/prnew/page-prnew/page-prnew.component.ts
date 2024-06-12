import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TablePrnewComponent } from './table-prnew/table-prnew.component';
import { HeadPrnewComponent } from './head-prnew/head-prnew.component';
import { SidebarFilterPrnewComponent } from './sidebar-filter-prnew/sidebar-filter-prnew.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Pagination } from '../../../interfaces/pagination';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-prnew',
  standalone: true,
  imports: [
    TablePrnewComponent,
    HeadPrnewComponent,
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    SidebarFilterPrnewComponent
  ],
  templateUrl: './page-prnew.component.html',
  styleUrl: './page-prnew.component.scss',
})
export class PagePrnewComponent {
  // pagination: Pagination = new Pagination();
  @ViewChild('sidebar') sidebar?: SidebarFilterPrnewComponent;
  // @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  actionOpenSidebarFilterEnd() {
    this.sidebar?.openSidebar();
  }

  // onPageChange(event: { pageIndex: number }) {
  //   this.pagination.currentPage = event.pageIndex + 1;
  //   this.pagination.itemsPerPage =
  //   this.paginator?.pageSize || this.pagination.itemsPerPage;
  // }
}
