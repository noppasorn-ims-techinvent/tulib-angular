import { Component, ViewChild } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { InputSelectTagComponent } from '../../../../components/input-group/input-select-tag/input-select-tag.component';
import { InputDateComponent } from '../../../../components/input-group/input-date/input-date.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TagState } from '../../../../states/tagState';

@Component({
  selector: 'app-sidebar-filter-prnew',
  standalone: true,
  imports: [InputSelectTagComponent,InputDateComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './sidebar-filter-prnew.component.html',
  styleUrl: './sidebar-filter-prnew.component.scss'
})
export class SidebarFilterPrnewComponent {

  @ViewChild("sidebarfilter") sidebarfilter ?: any;
  data: Map<any, any> = new Map<string, any>();

  constructor(private offcanvasService: NgbOffcanvas, private tagState: TagState) {
    this.tagState.getTagListAll();
    this.tagState.TagListAllAsObservable().subscribe((res) => {
      res.forEach((element) => {
        this.data.set(element.name, {
          id: element.id,
          color: element.code,
          name: element.name,
        });
      });
    });
  }

  openSidebar() {
    this.offcanvasService.open(this.sidebarfilter, { position: 'end' });
  }

  clearFilter(){

  }

  actionSelectTag(dataSelect:any){

  }
}
