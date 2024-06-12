using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Models;
using backend.Services.Interface;
using backend.Utilities;
using backend.Utilities.Interface;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public class ArticleService : IArticleService
    {
        private readonly AppSettings appSettings;
        public ITrace Trace { get; }
        private IArticleRepository articleRepository;
        public ArticleService(AppSettings appSettings, ITrace trace, IArticleRepository articleRepository)
        {
            this.articleRepository = articleRepository;
            this.Trace = trace;
            this.appSettings = appSettings;
        }

        public Result<InsertArticle> InsertArticle(InsertArticle insertData, string userId)
    
        {
            Result<InsertArticle> result = new Result<InsertArticle>(Trace);
            if (articleRepository.CheckUrlInsertName(insertData.Url))
            {
                articleRepository.InsertArticle(insertData, userId);
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
            }
            else
            {
                result.Success = false;
                result.Message = "url ซ้ำ";
            }

            return result;
        }

        public Result<PaginationList<PageArticle>> GetArticle(string? Title, List<int> TagList, string? StartDate, string? EndDate, bool? active, int page, int size)
        {
            Result<PaginationList<PageArticle>> result = new Result<PaginationList<PageArticle>>(Trace);
            result.Data = articleRepository.GetArticle(Title, TagList, StartDate, EndDate, active, page, size);
            result.Success = true;
            result.Message = appSettings.SuccessMessage.GetSuccess!;
            return result;
        }

        public Result<PageArticleData> GetArticleDataById(int articleId)
        {
            Result<PageArticleData> result = new Result<PageArticleData>(Trace);
            result.Data = articleRepository.GetArticleDataById(articleId);
            result.Success = true;
            result.Message = appSettings.SuccessMessage.GetSuccess!;
            return result;
        }

        public Result<UpdateArticle> UpdateArticle(UpdateArticle updateData, string usernameWhoTakeAction)
        {
            throw new NotImplementedException();
        }
    }
}