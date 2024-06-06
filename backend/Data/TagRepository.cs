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
    public class TagRepository : ITagRepository
    {
        private ApiContext Context { get; }

        public TagRepository(ApiContext Context)
        {
            this.Context = Context;
        }

        public PaginationList<TagDto> GetTags(int page, int size, TagDto? search)
        {
            var data = new PaginationList<TagDto>();

            IQueryable<Tag> query = from tag in Context.Tags select tag;

            // if (!String.IsNullOrEmpty(search))
            // {
            //     query = query.Where(s => s.AircraftCode.Contains(search));
            // }

            List<TagDto> tagList = query
                .Select((tag) =>
                    new TagDto
                    {
                        Id = tag.Id,
                        Code = tag.Code,
                        Name = tag.Name,
                        Active = tag.Active,
                        CreatedBy = tag.CreatedBy.Firstname,
                        ModifiedBy = tag.ModifiedBy.Firstname
                    }
            ).Skip((page - 1) * size).Take(size).AsNoTracking().ToList();

            data.Total = query.Count();
            data.Content = tagList;
            data.Page = page;
            data.Size = size;

            return data;
        }

        public TagDto GetTagtById(int id)
        {
            var tag = Context.Tags.AsNoTracking().FirstOrDefault(tag => tag.Id == id);

            var tagDto = tag == null ? null : new TagDto
            {
                Id = tag.Id,
                Code = tag.Code,
                Name = tag.Name,
                Active = tag.Active,
                CreatedBy = tag.CreatedBy.Firstname,
                ModifiedBy = tag.ModifiedBy.Firstname

            };

            return tagDto!;
        }

        public TagDto CreateTag(TagDto tagDto, string userId)
        {
            DateTime currentTime = DateTime.Now;
            Tag data = new Tag
            {
                Code = tagDto.Code,
                Name = tagDto.Name,
                Active = tagDto.Active,
                CreatedDate = currentTime,
                ModifiedDate = currentTime,
                CreatedById = userId,
                ModifiedById = userId
            };

            Context.Tags.Add(data);
            Context.SaveChanges();

            return tagDto;
        }

        public TagDto UpdateTag(TagDto tagDto, string userId)
        {
            DateTime currentTime = DateTime.Now;
            var data = Context.Tags.FirstOrDefault(tag => tag.Id == tagDto.Id);

            if (data != null)
            {

                data.Code = tagDto.Code;
                data.Name = tagDto.Name;
                data.Active = tagDto.Active;
                data.CreatedDate = data.CreatedDate;
                data.ModifiedDate = currentTime;
                data.CreatedById = data.CreatedById;
                data.ModifiedById = userId;

                Context.Tags.Update(data);
                Context.SaveChanges();
            }

            return tagDto;
        }
        public void DeleteTag(int id)
        {
            var query = Context.Tags.FirstOrDefault(tag => tag.Id == id);
            Context.Tags.Remove(query!);
            Context.SaveChanges();
        }


        public bool IsHaveTag(int id)
        {
            return Context.Tags.Where(tag => tag.Id == id).Count() > 0;
        }


    }
}