using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CosmosLib
{
    public interface IValidation
    {

        public Tuple<bool, string> ValidateHEX(string hexStr);
    }
}
