using System.Security.Cryptography;

namespace Domain.Core;

public class PasswordHasher : IPasswordHasher
{
    private const int SaltSize = 16; // 128 bits
    private const int KeySize = 32; // 256 bits
    private const int Iterations = 100000; // OWASP recommendation

    public string HashPassword(string password)
    {
        // Generate a random salt
        var salt = RandomNumberGenerator.GetBytes(SaltSize);

        // Derive the key using PBKDF2
        var key = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            Iterations,
            HashAlgorithmName.SHA256,
            KeySize);

        // Return iterations.salt.key format
        return $"{Iterations}.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(key)}";
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        var parts = hashedPassword.Split('.', 3);

        if (parts.Length != 3)
        {
            return false;
        }

        var iterations = Convert.ToInt32(parts[0]);
        var salt = Convert.FromBase64String(parts[1]);
        var key = Convert.FromBase64String(parts[2]);

        // Derive the key from the password using the stored salt
        var keyToCheck = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            iterations,
            HashAlgorithmName.SHA256,
            KeySize);

        // Use constant-time comparison to prevent timing attacks
        return CryptographicOperations.FixedTimeEquals(keyToCheck, key);
    }
}