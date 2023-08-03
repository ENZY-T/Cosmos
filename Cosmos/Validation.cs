using System;
using System.Globalization;

namespace Cosmos
{
    public static class Validation
    {
        public static bool ValidateHEX(string hexStr)
        {
            bool IsSuccess = true;
            long hex;
            foreach (char chr in hexStr.ToCharArray())
            {
                if (!long.TryParse(chr.ToString(), NumberStyles.HexNumber, null, out hex)) IsSuccess = false;
            }

            return IsSuccess;
        }
    }
}