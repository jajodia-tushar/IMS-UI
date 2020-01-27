﻿using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;

namespace IMS_UI.IMS.Models
{
    public class EmployeeBulkOrderDetails
    {
        public DateTime CreatedOn { get; set; }
        public DateTime RequirementDate { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public BulkOrderRequestStatus BulkOrderRequestStatus { get; set; }
        public string ReasonForRequirement { get; set; }
        public List<BulkOrderItemQuantityMapping> ItemsQuantityList { get; set; }
    }
}