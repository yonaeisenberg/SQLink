﻿using System;
using System.Security.Cryptography;
using System.Text;

namespace server
{
    public static class PasswordHasher
    {
        const int keySize = 64;
        const int iterations = 350000;
        private static HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        public static string HashPassword(string password)
        {
            //Hash the password using Pbkdf2
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                new byte[0],
                iterations,
                hashAlgorithm,
                keySize);
            return Convert.ToHexString(hash);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            //Hash the new password using the same parameters and check equality
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, new Byte[0], iterations, hashAlgorithm, keySize);
            return hashToCompare.SequenceEqual(Convert.FromHexString(hash));
        } 
    }
}

