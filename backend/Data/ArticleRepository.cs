using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ArticleRepository : IArticleRepository
    {

        private ApiContext Context { get; }

        public ArticleRepository(ApiContext Context)
        {
            this.Context = Context;
        }

        public void InsertArticle(InsertArticle insertData, string userId)
        {
            DateTime currentTime = DateTime.Now;
            Article article = new Article
            {
                Title = insertData.Title,
                Description = insertData.Description,
                Url = insertData.Url,
                ThumbnailImage = insertData.ThumbnailImage,
                Author = insertData.Author,
                CreatedDate = currentTime,
                ModifiedDate = currentTime,
                CreatedById = userId,
                ModifiedById = userId,
                Active = true
            };

            List<ArticleTag> articleTags = new List<ArticleTag>();
            foreach (int item in insertData.TagId)
            {
                ArticleTag articleTag = new ArticleTag
                {
                    Article = article,
                    TagId = item,
                    CreatedById = userId,
                    CreatedDate = currentTime
                };
                articleTags.Add(articleTag);
            }

            ArticleContent articleContent = new ArticleContent
            {
                Article = article,
                CreatedById = userId,
                CreatedDate = currentTime,
                Header = insertData.ArticleContent.Header,
                ContentImage = insertData.ArticleContent.ContentImage,
                Content = insertData.ArticleContent.Content
            };

            Context.Articles.Add(article);
            Context.ArticleTags.AddRange(articleTags);
            Context.ArticleContents.Add(articleContent);

            Context.SaveChanges();
        }

        public bool CheckUrlName(string url, int articleId)
        {
            return Context.Articles.Where(a => a.Url == url).Count() == 0 || Context.Articles.FirstOrDefault(a => a.Id == articleId)!.Url == url;
        }

        public bool CheckUrlInsertName(string url)
        {
            return Context.Articles.Where(a => a.Url == url).Count() == 0;
        }

        public PaginationList<PageArticle> GetArticle(string? Title, List<int> TagList, string? StartDate, string? EndDate, bool? active, int page, int size)
        {
            DateTime? startDate = StartDate == null ? null : DateTime.Parse(StartDate);
            DateTime? endDate = EndDate == null ? null : DateTime.Parse(EndDate);
            var query = Context.ArticleTags.Include(a => a.Article).Include(a => a.Tag)
                .Where(a => TagList.Count() == 0 || TagList == null ? true : TagList.Contains(a.TagId))
                .Where(a => a.Article.Title.Contains(Title ?? a.Article.Title))
                .Where(a => a.Article.ModifiedDate >= (startDate ?? a.Article.ModifiedDate))
                .Where(a => a.Article.ModifiedDate <= (endDate ?? a.Article.ModifiedDate))
                .Where(a => a.Article.Active.Equals(active ?? a.Article.Active)).GroupBy(a => a.ArticleId);

            PaginationList<PageArticle> paginationList = new PaginationList<PageArticle>();
            paginationList.Total = query.Count();
            paginationList.Content = query.Select(a => new PageArticle
            {
                Id = a.Key,
                Title = a.Select(a => a.Article.Title).FirstOrDefault()!,
                TagId = a.Select(a => a.Tag).Select(s => new ArticleSubTag
                {
                    Id = s.Id,
                    Color = s.Code,
                    Name = s.Name
                }).ToList(),
                ModifiedDate = a.Select(a => a.Article.ModifiedDate).FirstOrDefault(),
                Active = a.Select(a => a.Article.Active).FirstOrDefault()
            })
            .Skip((page - 1) * size)
            .Take(size)
            .ToList();
            return paginationList;
        }

        public PageArticleData GetArticleDataById(int articleId)
        {
            PageArticleData datarespone = new PageArticleData();
            var article = Context.Articles.FirstOrDefault(a => a.Id == articleId);
            var tagList = Context.ArticleTags.Include(a => a.Tag).Where(at => at.ArticleId == articleId).Select(s => new TagObjectColor
            {
                Key = s.Tag.Name,
                Value = new ArticleSubTag
                {
                    Id = s.TagId,
                    Color = s.Tag.Code,
                    Name = s.Tag.Name
                }
            }).ToList();


            var ArticleContent = Context.ArticleContents.Where(a => a.ArticleId == articleId).ToList();

            var articleContentDto = new ArticleContentDto
            {
                ContentImage = string.Join(", ", ArticleContent.Select(ac => ac.ContentImage)),
                Content = string.Join("\n", ArticleContent.Select(ac => ac.Content)),
                Header = string.Join(", ", ArticleContent.Select(ac => ac.Header)),
            };

            datarespone.Title = article!.Title;
            datarespone.Description = article.Description;
            datarespone.Url = article.Url;
            datarespone.ThumbnailImage = article.ThumbnailImage;
            datarespone.Author = article.Author;
            datarespone.TagObjList = tagList;
            datarespone.Active = article.Active;
            datarespone.ArticleContent = articleContentDto;
            return datarespone;
        }

        public void UpdateArticle(UpdateArticle updateData, int idActionUser)
        {
            throw new NotImplementedException();
        }
    }
}