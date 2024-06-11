using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Services.Interface;
using backend.Utilities;
using backend.Utilities.Interface;

namespace backend.Services
{
    public class PromotionService : IPromotionService
    {


        private readonly AppSettings appSettings;
        public ITrace Trace { get; }

        private readonly IPromotionRepository promotionRepository;
        public PromotionService(AppSettings appSettings, ITrace trace, IPromotionRepository promotionRepository)
        {
            this.promotionRepository = promotionRepository;
            this.Trace = trace;
            this.appSettings = appSettings;
        }
        public Result<PromotionDto> GetPromotionById(int id)
        {
            throw new NotImplementedException();
        }

        public Result<List<PromotionDto>> GetPromotions(DateOnly? date)
        {
            Result<List<PromotionDto>> result = new Result<List<PromotionDto>>(Trace);

            List<PromotionDto> promotions = promotionRepository.GetPromotions(date);
            if (promotions == null)
            {
                result.Success = false;
                result.Message = appSettings.ErrorMessage.InvalidData;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
                result.Data = promotions;
            }

            return result;
        }
        public Result<PromotionDto> CreatePromotion(PromotionDto promotionDto, string userId)
        {
            Result<PromotionDto> result = new Result<PromotionDto>(Trace);

            PromotionDto createdPromotion = promotionRepository.CreatePromotion(promotionDto, userId);
            if (createdPromotion == null)
            {
                result.Success = false;
                result.Message = "Failed to create Promotion";
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.CreateSuccess!;
                result.Data = createdPromotion;
            }

            return result;
        }

        public Result<PromotionDto> UpdatePromotion(PromotionDto promotionDto, string userId)
        {
             Result<PromotionDto> result = new Result<PromotionDto>(Trace);
            if (promotionDto.Id == null)
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else if (!promotionRepository.IsHavePromotion(promotionDto.Id.GetValueOrDefault()))
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.ModifySuccess!;
                result.Data = promotionRepository.UpdatePromotion(promotionDto, userId);
            }

            return result;
        }

        public Result<string> DeletePromotion(int id)
        {
            throw new NotImplementedException();
        }


    }
}