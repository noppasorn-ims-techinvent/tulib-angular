using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Data.Interface
{
    public interface IPromotionRepository
    {
        public List<PromotionDto> GetPromotions(DateOnly? date);
        public PromotionDto GetPromotiontById(int id);
        public PromotionDto CreatePromotion(PromotionDto promotionDto,string userId);
        public PromotionDto UpdatePromotion(PromotionDto promotionDto, string userId);
        public void DeletePromotion(int id);
        public bool IsHavePromotion(int id);
    }
}