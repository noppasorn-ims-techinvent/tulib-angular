using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Data.Interface
{
    public interface IStandardPriceRepository
    {
        public List<StandardPriceDto> GetStandardPrices(DateOnly? date);
        public StandardPriceDto GetStandardPricetById(int id);
        public StandardPriceDto CreateStandardPrice(StandardPriceDto standardPriceDto,string userId);
        public StandardPriceDto UpdateStandardPrice(StandardPriceDto standardPriceDto, string userId);
        public void DeleteStandardPrice(int id);
        public bool IsHaveStandardPrice(int id);
    }
}