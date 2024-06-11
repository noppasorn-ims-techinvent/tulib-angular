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
    public class StandardPriceService : IStandardPriceService
    {


        private readonly AppSettings appSettings;
        public ITrace Trace { get; }

        private readonly IStandardPriceRepository standardPriceRepository;
        public StandardPriceService(AppSettings appSettings, ITrace trace, IStandardPriceRepository standardPriceRepository)
        {
            this.standardPriceRepository = standardPriceRepository;
            this.Trace = trace;
            this.appSettings = appSettings;
        }
        public Result<StandardPriceDto> GetStandardPriceById(int id)
        {
            throw new NotImplementedException();
        }

        public Result<List<StandardPriceDto>> GetStandardPrices(DateOnly? date)
        {
            Result<List<StandardPriceDto>> result = new Result<List<StandardPriceDto>>(Trace);

            List<StandardPriceDto> standardPrices = standardPriceRepository.GetStandardPrices(date);
            if (standardPrices == null)
            {
                result.Success = false;
                result.Message = appSettings.ErrorMessage.InvalidData;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
                result.Data = standardPrices;
            }

            return result;
        }
        public Result<StandardPriceDto> CreateStandardPrice(StandardPriceDto standardPriceDto, string userId)
        {
            Result<StandardPriceDto> result = new Result<StandardPriceDto>(Trace);

            StandardPriceDto createdStandardPrice = standardPriceRepository.CreateStandardPrice(standardPriceDto, userId);
            if (createdStandardPrice == null)
            {
                result.Success = false;
                result.Message = "Failed to create Tag";
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.CreateSuccess!;
                result.Data = createdStandardPrice;
            }

            return result;
        }

        public Result<StandardPriceDto> UpdateStandardPrice(StandardPriceDto standardPriceDto, string userId)
        {
            Result<StandardPriceDto> result = new Result<StandardPriceDto>(Trace);
            if (standardPriceDto.Id == null)
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else if (!standardPriceRepository.IsHaveStandardPrice(standardPriceDto.Id.GetValueOrDefault()))
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.ModifySuccess!;
                result.Data = standardPriceRepository.UpdateStandardPrice(standardPriceDto, userId);
            }

            return result;
        }

        public Result<string> DeleteStandardPrice(int id)
        {
            throw new NotImplementedException();
        }


    }
}