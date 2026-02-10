namespace Application.Common.Exceptions;

public class DuplicateException : Exception
{
    public DuplicateException(string name, object key)
        : base($"Entity \"{name}\" with key ({key}) already exists.")
    {
    }

    public DuplicateException(string message)
        : base(message)
    {
    }
}
