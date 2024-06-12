import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../../../../interfaces/pagination';
import { ArticleService } from '../../../../services/article.service';
import { MatDialog } from '@angular/material/dialog';
import { QueryPagination } from '../../../../interfaces/query-pagination';
import { PagePRnew } from '../../../../interfaces/prnew/page-prnew';
import { Router } from '@angular/router';
import { TooltipComponent } from '../../../../components/tooltip-group/tooltip/tooltip.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-table-prnew',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    NgbTooltipModule,
    MatPaginatorModule,
    TooltipComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule,
  ],
  templateUrl: './table-prnew.component.html',
  styleUrl: './table-prnew.component.scss',
})
export class TablePrnewComponent implements OnInit {
  pagination: Pagination = new Pagination();
  articleService = inject(ArticleService);
  mockData: Map<string, any> = new Map<string, any>();

  router = inject(Router);

  hoverIndexDetail: any;
  hoverIndexTag: any;
  indexOpenOption?: any;
  hoverOptionEdit: boolean = false;
  articleList: PagePRnew[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @HostListener('document:click', ['$event'])
  click() {
    if (this.hoverOptionEdit == false) {
      this.indexOpenOption = null;
    }
  }

  setPosition(index: number) {
    var cal = -10;
    return cal + 'px';
  }

  onMouseHoverDetailTable(idIndex: number) {
    this.hoverIndexDetail = idIndex;
  }

  onMouseLeaveDetailTable() {
    this.hoverIndexDetail = null;
  }

  onMouseHoverTag(idIndex: number, idTag: number) {
    this.hoverIndexTag = idIndex;
  }

  onMouseLeaveTag() {
    this.hoverIndexTag = null;
  }

  openOption(index: number) {
    this.indexOpenOption = index;
  }

  onMouseHoverOptionSetting() {
    this.hoverOptionEdit = true;
  }

  onMouseLeaveOptionSetting() {
    this.hoverOptionEdit = false;
  }

  activeOptionSetting(index: number): boolean {
    return this.indexOpenOption == index;
  }

  openEditPRNew(id: number) {
    this.router.navigate(['/edit-prnew', { id: id }]);
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadArticle();
    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.pagination.currentPage = event.pageIndex + 1;
        this.pagination.itemsPerPage = event.pageSize;
        this.loadArticle();
      });
    }
  }

  loadArticle(): void {
    this.pagination.itemsPerPage =
      this.paginator?.pageSize || this.pagination.itemsPerPage;
    const myQueryTag: QueryPagination = {
      page: this.pagination.currentPage,
      size: this.pagination.itemsPerPage,
    };

    this.articleService.getArticle(myQueryTag).subscribe((data: any) => {
      this.mockData = new Map<string, any>(
        data.data.content.map((item: any) => [item.id, item])
      );
      this.pagination.totalItems = data.data.total;
    });
  }

  get paginatedData() {
    this.pagination.itemsPerPage = this.paginator?.pageSize || 10;
    return Array.from(this.mockData.values());
  }

  onPageChange(event: { pageIndex: number }) {
    this.pagination.currentPage = event.pageIndex + 1;
    this.pagination.itemsPerPage =
      this.paginator?.pageSize || this.pagination.itemsPerPage;
    this.loadArticle();
  }
}
