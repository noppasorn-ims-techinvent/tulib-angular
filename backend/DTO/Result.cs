using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Utilities.Interface;

namespace backend.DTO
{
    public class Result<T>
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = string.Empty;
        public string TraceId { get; }
        public T? Data { get; set; } = default;   //Contains data that a client need.

        public Result(ITrace trace)
        {
            TraceId = trace.GetTraceId();
        }

        public string GetLog()
        {
            string message = string.Empty;

            message += $"Success: [{Success}]";
            message += $"Message: [{Message}]";
            message += $"TraceId: [{TraceId}]";
            message += $"Data: [{Data}]";

            return (message);
        }

        public string GetLogWithNoData()
        {
            string message = string.Empty;

            message += $"Success: [{Success}]";
            message += $"Message: [{Message}]";
            message += $"TraceId: [{TraceId}]";

            return (message);
        }
    }
}