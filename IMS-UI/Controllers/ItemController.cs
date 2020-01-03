﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS_UI.IMS.Providers;
using IMS_UI.IMS.Providers.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IMS_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private IItemListProvider _ItemListProvider;

        public ItemController(IItemListProvider provider)
        {
            _ItemListProvider = provider;
        }


        // GET: api/Item
        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            try
            {
                var response = await _ItemListProvider.ApiGetCaller("/api/Item");
                if (response.Error == null)
                    return Ok(response);
                else
                    return StatusCode(500);
            }
            catch (Exception e)
            {
                return StatusCode(500);
            }

        }

        // GET: api/Item/5
        [HttpGet("{id}", Name = "GetItem")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Item
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Item/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}