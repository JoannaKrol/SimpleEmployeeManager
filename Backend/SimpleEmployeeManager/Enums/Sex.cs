using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace SimpleEmployeeManager.Enums
{
    public enum Sex
    {
        Male = 1,
        Female = 2
    }
    public class SexConverter() : ValueConverter<Sex, string>(
        status => status.ToString(),
        status => Enum.Parse<Sex>(status)
    );
}
