using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Interface;
using backend.DTO;
using backend.DTO.MainModel;
using backend.Models;

namespace backend.Data
{
    public class TagRepository : ITagRepository
    {
        private ApiContext Context { get; }

        public TagRepository(ApiContext Context)
        {
            this.Context = Context;
        }

        public TagDto CreateTag(TagDto tagDto, int userIdWhoTakeAction)
        {
            DateTime currentTime = DateTime.Now;
            Tag data = new Tag
            {
                AircraftCode = aircraftDto.AircraftCode,
                AircraftName = aircraftDto.AircraftName,
                Description = aircraftDto.Description,
                Active = aircraftDto.Active,
                CreatedDate = currentTime,
                ModifiedDate = currentTime,
                CreatedById = userIdWhoTakeAction,
                ModifiedById = userIdWhoTakeAction
            };

            Context.Aircrafts.Add(data);
            Context.SaveChanges();

            return
        }

        public void DeleteTag(int id)
        {
            throw new NotImplementedException();
        }

        public PaginationList<TagDto> GetTags(int page, int size, TagDto? search)
        {
            throw new NotImplementedException();
        }

        public TagDto GetTagtById(int id)
        {
            throw new NotImplementedException();
        }

        public bool IsHaveTag(int id)
        {
            throw new NotImplementedException();
        }

        public TagDto UpdateTag(TagDto tagDto, int userIdWhoTakeAction)
        {
            throw new NotImplementedException();
        }
    }
}