using System.Diagnostics;

namespace backend.Utilities.Interface
{
    public class Trace : ITrace
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public Trace(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetTraceId()
        {
            string errorNumber = Activity.Current?.Id ?? httpContextAccessor?.HttpContext?.TraceIdentifier!;

            return (errorNumber);
        }
    }
}