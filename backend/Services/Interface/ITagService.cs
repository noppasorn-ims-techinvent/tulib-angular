using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Services.Interface
{
    public interface ITagService
    {
        public Result<TagDto> GetTagById(int id);
        public Result<PaginationList<TagDto>> GetTags(int page, int size, TagDto? search);
        public Result<TagDto> CreateTag(TagDto tagDto, string userId);
        public Result<TagDto> UpdateTag(TagDto tagDto, string userId);
        public Result<string> DeleteTag(int id);
        public Result<List<TagDto>> GetTagAll();
        public Result<PaginationList<ArticleSubTag>> GetTagColor();
    }
}