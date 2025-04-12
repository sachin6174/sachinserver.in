class DecryptionLog {
    static base32HexDecode(base32Hex) {
        try {
            const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
            let bits = 0;
            let value = 0;
            let output = [];

            // Clean the input string
            let cleanInput = base32Hex.trim().toUpperCase();
            
            // Remove padding and restore original padding characters
            cleanInput = cleanInput.replace(/Z/g, '====')
                                 .replace(/Y/g, '===')
                                 .replace(/X/g, '==')
                                 .replace(/W/g, '=');

            // Remove padding for processing
            cleanInput = cleanInput.replace(/=/g, '');

            for (let i = 0; i < cleanInput.length; i++) {
                const charAt = cleanInput.charAt(i);
                const char = alphabet.indexOf(charAt);
                if (char === -1) {
                    console.error(`Invalid character found: ${charAt}`);
                    return null;
                }

                value = (value << 5) | char;
                bits += 5;

                while (bits >= 8) {
                    output.push((value >>> (bits - 8)) & 255);
                    bits -= 8;
                }
            }

            return new Uint8Array(output);
        } catch (error) {
            console.error('Base32Hex decode error:', error);
            return null;
        }
    }

    static async pbkdf2WithHmacSHA1Password(password, salt, iterations, keyLength) {
        try {
            const encoder = new TextEncoder();
            const passwordData = encoder.encode(password);
            
            // Import key with correct parameters
            const importedKey = await crypto.subtle.importKey(
                'raw',
                passwordData,
                {
                    name: 'PBKDF2'
                },
                false,
                ['deriveBits']
            );
            
            const derivedBits = await crypto.subtle.deriveBits(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: iterations,
                    hash: 'SHA-1'
                },
                importedKey,
                keyLength * 8
            );
            
            return new Uint8Array(derivedBits);
        } catch (error) {
            console.error('PBKDF2 failed:', error);
            return null;
        }
    }

    static async decryptCiphertext(ciphertext, key, iv) {
        try {
            // Import key with correct parameters
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                key,
                {
                    name: 'AES-CBC',
                    length: 256
                },
                false,
                ['decrypt']
            );
            
            const decrypted = await crypto.subtle.decrypt(
                {
                    name: 'AES-CBC',
                    iv: iv
                },
                cryptoKey,
                ciphertext
            );
            
            const decoder = new TextDecoder('utf-8', { fatal: true });
            return decoder.decode(decrypted);
        } catch (error) {
            console.error('Decryption failed:', error);
            return null;
        }
    }

    static async finalDecryptionWithEncryptedString(encryptedString) {
        try {
            if (!encryptedString || encryptedString.trim() === '') {
                console.error('Empty input string');
                return '';
            }

            const encryptionKey = '';
            
            const saltData = new Uint8Array([0x28, 0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0x00, 0x33]);
            const ivData = new Uint8Array([55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40]);

            // Decode base32hex string
            const ciphertext = this.base32HexDecode(encryptedString);
            if (!ciphertext) {
                console.error('Base32Hex decoding failed');
                return '';
            }

            // Generate the same key using PBKDF2
            const derivedKey = await this.pbkdf2WithHmacSHA1Password(encryptionKey, saltData, 20, 32);
            if (!derivedKey) {
                console.error('Key derivation failed');
                return '';
            }

            // Decrypt the ciphertext
            const decrypted = await this.decryptCiphertext(ciphertext, derivedKey, ivData);
            if (!decrypted) {
                console.error('Decryption failed');
                return '';
            }

            return decrypted;
        } catch (error) {
            console.error('Final decryption error:', error);
            return '';
        }
    }
}