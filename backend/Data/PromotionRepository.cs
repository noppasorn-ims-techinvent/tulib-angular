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
    public class PromotionRepository : IPromotionRepository
    {
        private ApiContext Context { get; }

        public PromotionRepository(ApiContext Context)
        {
            this.Context = Context;
        }

        public List<PromotionDto> GetPromotions(DateOnly? date)
        {
            IQueryable<Promotion> query = Context.Promotions.AsQueryable();

            if (date.HasValue)
            {
                var targetDate = date.Value.ToDateTime(new TimeOnly(0, 0));
                query = query.Where(promotion => promotion.StartDate <= targetDate && promotion.EndDate >= targetDate);
            }

            List<PromotionDto> promotionList = query
                .Select(promotion => new PromotionDto
                {
                    Id = promotion.Id,
                    Title = promotion.Title,
                    Description = promotion.Description,
                    Type = promotion.Type,
                    Price = promotion.Price,
                    Status = promotion.Status,
                    Max = promotion.Max,
                    Min = promotion.Min,
                    SaleStartDate = promotion.SaleStartDate,
                    SaleEndDate = promotion.SaleEndDate,
                    StartDate = promotion.StartDate,
                    EndDate = promotion.EndDate,
                    CreatedBy = promotion.CreatedById,
                    ModifiedBy = promotion.ModifiedById
                })
                .ToList();

            return promotionList;
        }


        public PromotionDto GetPromotiontById(int id)
        {
            var promotion = Context.Promotions.AsNoTracking().FirstOrDefault(promotion => promotion.Id == id);

            throw new NotImplementedException();
        }

        public PromotionDto CreatePromotion(PromotionDto promotionDto, string userId)
        {
            DateTime currentTime = DateTime.Now;

            // Map properties from PromotionDto to Promotion entity
            var newPromotion = new Promotion
            {
                Title = promotionDto.Title,
                Description = promotionDto.Description,
                Type = promotionDto.Type,
                Price = promotionDto.Price,
                Status = promotionDto.Status,
                Max = promotionDto.Max,
                Min = promotionDto.Min,
                SaleStartDate = promotionDto.SaleStartDate,
                SaleEndDate = promotionDto.SaleEndDate,
                StartDate = promotionDto.StartDate,
                EndDate = promotionDto.EndDate,
                CreatedDate = currentTime,
                ModifiedDate = currentTime,
                CreatedById = userId,
                ModifiedById = userId
            };

            Context.Promotions.Add(newPromotion);
            Context.SaveChanges();


            return promotionDto;
        }
        public PromotionDto UpdatePromotion(PromotionDto promotionDto, string userId)
        {
            DateTime currentTime = DateTime.Now;
            var data = Context.Promotions.FirstOrDefault(promotion => promotion.Id == promotionDto.Id);

            if (data != null)
            {

                data.Title = promotionDto.Title;
                data.Description = promotionDto.Description;
                data.Type = promotionDto.Type;
                data.Price = promotionDto.Price;
                data.Status = promotionDto.Status;
                data.Max = promotionDto.Max;
                data.Min = promotionDto.Min;
                data.SaleStartDate = promotionDto.SaleStartDate;
                data.SaleEndDate = promotionDto.SaleEndDate;
                data.StartDate = promotionDto.StartDate;
                data.EndDate = promotionDto.EndDate;

                data.ModifiedDate = currentTime;
                data.ModifiedById = userId;

                Context.Promotions.Update(data);
                Context.SaveChanges();
            }

            return promotionDto;
        }
        public void DeletePromotion(int id)
        {
            var query = Context.Promotions.FirstOrDefault(promotion => promotion.Id == id);
            Context.Promotions.Remove(query!);
            Context.SaveChanges();
        }


        public bool IsHavePromotion(int id)
        {
            return Context.Promotions.Where(promotion => promotion.Id == id).Count() > 0;
        }


    }
}