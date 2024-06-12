using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Data.Interface
{
    public interface ITagRepository
    {
        public PaginationList<TagDto> GetTags(int page, int size, TagDto? search);
        public List<TagDto> GetTagAll();
        public PaginationList<ArticleSubTag> GetTagColor();
        public TagDto GetTagtById(int id);
        public TagDto CreateTag(TagDto tagDto,string userId);
        public TagDto UpdateTag(TagDto tagDto, string userId);
        public void DeleteTag(int id);
        public bool IsHaveTag(int id);
    }
}