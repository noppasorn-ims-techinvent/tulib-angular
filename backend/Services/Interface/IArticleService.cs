using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Services.Interface
{
    public interface IArticleService
    {
        Result<InsertArticle> InsertArticle(InsertArticle insertData, string userId);
        public Result<PaginationList<PageArticle>> GetArticle(
            string? Title,
            List<int> TagList,
            string? StartDate,
            string? EndDate,
            bool? active,
            int page,
            int size
        );
        // public Result<PaginationList<ShowAllPRnew>> GetPRnew(
        //     int Tag,
        //     int page,
        //     int pageSize
        // );
        public Result<PageArticleData> GetArticleDataById(
            int articleId
        );
        Result<UpdateArticle> UpdateArticle(UpdateArticle updateData, string usernameWhoTakeAction);
    }
}