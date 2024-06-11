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
    public class StandardPriceRepository : IStandardPriceRepository
    {
        private ApiContext Context { get; }

        public StandardPriceRepository(ApiContext Context)
        {
            this.Context = Context;
        }

        public List<StandardPriceDto> GetStandardPrices(DateOnly? date)
        {
            IQueryable<StandardPrice> query = Context.StandardPrices.AsQueryable();

            if (date.HasValue)
            {
                var targetDate = date.Value.ToDateTime(new TimeOnly(0, 0));
                query = query.Where(standardPrice => standardPrice.StartDate <= targetDate );
            }

            List<StandardPriceDto> standardPriceList = query
                .Select(standardPrice => new StandardPriceDto
                {
                    Id = standardPrice.Id,
                    Description = standardPrice.Description,
                    Type = standardPrice.Type,
                    Price = standardPrice.Price,
                    Status = standardPrice.Status,
                    StartDate = standardPrice.StartDate,
                    CreatedBy = standardPrice.CreatedById,
                    ModifiedBy = standardPrice.ModifiedById
                })
                .ToList();

            return standardPriceList;
        }


        public StandardPriceDto GetStandardPricetById(int id)
        {
            var standardPrice = Context.StandardPrices.AsNoTracking().FirstOrDefault(standardPrice => standardPrice.Id == id);

            throw new NotImplementedException();
        }

        public StandardPriceDto CreateStandardPrice(StandardPriceDto standardPriceDto, string userId)
        {
            DateTime currentTime = DateTime.Now;

            // Map properties from StandardPriceDto to StandardPrice entity
            var newStandardPrice = new StandardPrice
            {
                Description = standardPriceDto.Description,
                Type = standardPriceDto.Type,
                Price = standardPriceDto.Price,
                Status = standardPriceDto.Status,
                StartDate = standardPriceDto.StartDate,
                CreatedDate = currentTime,
                ModifiedDate = currentTime,
                CreatedById = userId,
                ModifiedById = userId
            };

            Context.StandardPrices.Add(newStandardPrice);
            Context.SaveChanges();


            return standardPriceDto;
        }
        public StandardPriceDto UpdateStandardPrice(StandardPriceDto standardPriceDto, string userId)
        {
            DateTime currentTime = DateTime.Now;
            var data = Context.StandardPrices.FirstOrDefault(standardPrice => standardPrice.Id == standardPriceDto.Id);

            if (data != null)
            {

                
                data.Description = standardPriceDto.Description;
                data.Type = standardPriceDto.Type;
                data.Price = standardPriceDto.Price;
                data.Status = standardPriceDto.Status;
                data.StartDate = standardPriceDto.StartDate;
                data.ModifiedDate = currentTime;
                data.ModifiedById = userId;

                Context.StandardPrices.Update(data);
                Context.SaveChanges();
            }

            return standardPriceDto;
        }
        public void DeleteStandardPrice(int id)
        {
            var query = Context.StandardPrices.FirstOrDefault(standardPrice => standardPrice.Id == id);
            Context.StandardPrices.Remove(query!);
            Context.SaveChanges();
        }


        public bool IsHaveStandardPrice(int id)
        {
            return Context.StandardPrices.Where(standardPrice => standardPrice.Id == id).Count() > 0;
        }


    }
}