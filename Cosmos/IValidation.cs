using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cosmos
{
    public interface IValidation
    {

        public Tuple<bool, string> ValidateHEX(string hexStr);
    }
}
