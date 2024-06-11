using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Services.Interface
{
    public interface IPromotionService
    {
        public Result<PromotionDto> GetPromotionById(int id);
        public Result<List<PromotionDto>> GetPromotions(DateOnly? date);
        public Result<PromotionDto> CreatePromotion(PromotionDto promotionDto, string userId);
        public Result<PromotionDto> UpdatePromotion(PromotionDto promotionDto, string userId);
        public Result<string> DeletePromotion(int id);
    }
}