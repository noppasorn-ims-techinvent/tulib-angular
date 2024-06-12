import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TagDto } from "../interfaces/Tag/tag-dto";
import { QueryPagination } from "../interfaces/query-pagination";
import { TagService } from "../services/tag.service";

@Injectable({providedIn: "root"})
export class TagState {
  tagList: BehaviorSubject<TagDto[]> = new BehaviorSubject<TagDto[]>([]);
  pageNumberTag: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  totalTag: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  searchTag?: QueryPagination;

  tagColorList: BehaviorSubject<TagDto[]> = new BehaviorSubject<TagDto[]>(
    []
  );

  tagListAll:BehaviorSubject<TagDto[]> = new BehaviorSubject<TagDto[]>([]);

  constructor(private tagService: TagService) {}

  getTagListAll(){
    this.tagService.getAllTag().subscribe((res) => {
      this.tagListAll.next(res.data);
    });
  }

  getTagList() {
    const myQueryTag: QueryPagination = {
      page: this.pageNumberTag.value,
      size: 10,
    };
    this.tagService.getTagColor(myQueryTag).subscribe((res) => {
      this.tagList.next(res.data.content);
      this.totalTag.next(res.data.total);
    });
  }

  getTagColorList() {
    this.tagService.getTagColorList().subscribe((res) => {
      this.tagColorList.next(res.data.content);
      this.totalTag.next(res.data.total);
    });
  }

  TagListAllAsObservable(){
    return this.tagListAll.asObservable();
  }

  TagListAsObservable() {
    return this.tagList.asObservable();
  }

  TagColorListAsObservable(){
    return this.tagColorList.asObservable();
  }
}
