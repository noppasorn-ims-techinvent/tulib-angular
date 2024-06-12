import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from '../../../../../components/input-group/input/input.component';
import { InputSelectTagComponent } from '../../../../../components/input-group/input-select-tag/input-select-tag.component';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { InputAreaComponent } from '../../../../../components/input-group/input-area/input-area.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TagService } from '../../../../../services/tag.service';
import { TagState } from '../../../../../states/tagState';
import { TagDto } from '../../../../../interfaces/Tag/tag-dto';
import { ArticleState } from '../../../../../states/articleState';

@Component({
  selector: 'app-section-show-template1-edit-prnew',
  standalone: true,
  imports: [    InputComponent,
    InputSelectTagComponent,
    CommonModule,
    NgbCollapseModule,
    InputAreaComponent,
    MatExpansionModule,],
  templateUrl: './section-show-template1-edit-prnew.component.html',
  styleUrl: './section-show-template1-edit-prnew.component.scss'
})
export class SectionShowTemplate1EditPrnewComponent {
  public isCollapsed = false;
  statusShowImg = false;
  previewImage: any; // This will hold the URL for previewing the uploaded image
  data: Map<string, any> = new Map<string, any>();
  resultApi: TagDto[] = [];

  selectedData: any[] = [];
  @Input() formEdit!: FormGroup;

  constructor(private tagState: TagState,private articleState: ArticleState) {
    this.tagState.getTagListAll();
    this.tagState.TagListAllAsObservable().subscribe((res) => {
      this.resultApi = [...res];
      if (this.resultApi.length > 0) {
        this.resultApi.forEach((element) => {
          this.data.set(element.name, {
            id: element.id,
            color: element.code,
            name: element.name,
          });
        });
        console.log(this.data);

      }

    });
  }

  ngOnInit(): void {
    this.renderImg();
  }

  getFormEditControlByKey(key: string) {
    return this.formEdit.get(key) as FormControl;
  }

  actionSelectTag(dataSelect: any) {
    this.getFormEditControlByKey('tag').setValue(dataSelect);
  }

  uploadImg(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.statusShowImg = true;
        this.previewImage = e.target.result;
        this.getFormEditControlByKey('thumbnailImage').setValue(
          e.target.result
        );
      };
      reader.readAsDataURL(file);
    }
  }

  renderImg() {
    this.statusShowImg = true;
    this.articleState.articleById.subscribe((article) => {
      if (article) {
        this.previewImage = article.thumbnailImage;
      }
    });
  }

}
