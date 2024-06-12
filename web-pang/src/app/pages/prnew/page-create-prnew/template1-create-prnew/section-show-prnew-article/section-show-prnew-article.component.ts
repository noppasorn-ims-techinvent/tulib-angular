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

@Component({
  selector: 'app-section-show-prnew-article',
  standalone: true,
  imports: [
    InputComponent,
    InputSelectTagComponent,
    CommonModule,
    NgbCollapseModule,
    InputAreaComponent,
    MatExpansionModule,
  ],
  templateUrl: './section-show-prnew-article.component.html',
  styleUrl: './section-show-prnew-article.component.scss',
})
export class SectionShowPrnewArticleComponent implements OnInit {
  public isCollapsed = false;
  statusShowImg = false;
  previewImage: any;
  data: Map<any, any> = new Map<string, any>();
  tagService = inject(TagService);
  @Input() formCreate!: FormGroup;

  constructor(private tagState: TagState) {
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

  ngOnInit(): void {}

  getFormCreateControlByKey(key: string) {
    return this.formCreate.get(key) as FormControl;
  }

  actionSelectTag(dataSelect: any) {
    this.getFormCreateControlByKey('tag').setValue(dataSelect);
  }

  uploadImg(event: any): void {
    if (event) {
      console.log('test');

      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.statusShowImg = true;
          this.previewImage = e.target.result;
          this.getFormCreateControlByKey('thumbnailImage').setValue(
            e.target.result
          );
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
