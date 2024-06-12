using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Data.Interface
{
    public interface IArticleRepository
    {
        void InsertArticle(InsertArticle insertData, string userId);
        bool CheckUrlName(string url, int articleId);
        bool CheckUrlInsertName(string url);
        PaginationList<PageArticle> GetArticle(string? Title, List<int> TagList, string? StartDate, string? EndDate, bool? active, int page, int size);
        // PaginationList<ShowAllPRnew> GetPRnew(int Tag, int page, int pageSize);
        PageArticleData GetArticleDataById(int articleId);
        void UpdateArticle(UpdateArticle updateData, int idActionUser);
    }
}