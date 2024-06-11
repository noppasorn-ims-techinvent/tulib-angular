using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Models;
using backend.Utilities;
using backend.Utilities.Interface;
using Microsoft.AspNetCore.Identity;

namespace backend.Services.Interface
{
    public class TagService : ITagService
    {


        private readonly AppSettings appSettings;
        public ITrace Trace { get; }

        private readonly ITagRepository tagRepository;
        public TagService(AppSettings appSettings, ITrace trace, ITagRepository tagRepository)
        {
            this.tagRepository = tagRepository;
            this.Trace = trace;
            this.appSettings = appSettings;
        }

        public Result<PaginationList<TagDto>> GetTags(int page, int size, TagDto? search)
        {
            Result<PaginationList<TagDto>> result = new Result<PaginationList<TagDto>>(Trace);

            PaginationList<TagDto> tags = tagRepository.GetTags(page, size, search);
            if (tags == null)
            {
                result.Success = false;
                result.Message = appSettings.ErrorMessage.InvalidData;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
                result.Data = tags;
            }

            return result;
        }

        public Result<TagDto> GetTagById(int id)
        {
            Result<TagDto> result = new Result<TagDto>(Trace);

            TagDto tagDto = tagRepository.GetTagtById(id);
            if (tagDto == null)
            {
                result.Success = false;
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.GetSuccess!;
                result.Data = tagDto;
            }

            return result;
        }

        public Result<TagDto> CreateTag(TagDto tagDto, string userId)
        {
            Result<TagDto> result = new Result<TagDto>(Trace);

            TagDto createdTag = tagRepository.CreateTag(tagDto, userId);
            if (createdTag == null)
            {
                result.Success = false;
                result.Message = "Failed to create Tag";
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.CreateSuccess!;
                result.Data = createdTag;
            }

            return result;
        }

        public Result<TagDto> UpdateTag(TagDto tagDto, string userId)
        {
            Result<TagDto> result = new Result<TagDto>(Trace);
            if (tagDto.Id == null)
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else if (!tagRepository.IsHaveTag(tagDto.Id.GetValueOrDefault()))
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else
            {
                result.Success = true;
                result.Message = appSettings.SuccessMessage.ModifySuccess!;
                result.Data = tagRepository.UpdateTag(tagDto, userId);
            }

            return result;
        }

        public Result<string> DeleteTag(int id)
        {
            Result<string> result = new Result<string>(Trace);
            if (!tagRepository.IsHaveTag(id))
            {
                result.Message = appSettings.ErrorMessage.InvalidId;
            }
            else
            {
                tagRepository.DeleteTag(id);
                result.Success = true;
                result.Message = appSettings.SuccessMessage.DeleteSuccess!;
            }
            return result;
        }
    }
}