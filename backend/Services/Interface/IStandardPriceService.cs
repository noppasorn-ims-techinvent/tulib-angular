using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.DTO.MainModel;

namespace backend.Services.Interface
{
    public interface IStandardPriceService
    {
        public Result<StandardPriceDto> GetStandardPriceById(int id);
        public Result<List<StandardPriceDto>> GetStandardPrices(DateOnly? date);
        public Result<StandardPriceDto> CreateStandardPrice(StandardPriceDto standardPriceDto, string userId);
        public Result<StandardPriceDto> UpdateStandardPrice(StandardPriceDto standardPriceDto, string userId);
        public Result<string> DeleteStandardPrice(int id);
    }
}