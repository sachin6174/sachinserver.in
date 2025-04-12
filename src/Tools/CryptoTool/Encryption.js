class EncryptionLog {
    static async pbkdf2WithHmacSHA1Password(password, salt, iterations, keyLength) {
        try {
            const encoder = new TextEncoder();
            const passwordData = encoder.encode(password);
            const importedKey = await crypto.subtle.importKey(
                'raw',
                passwordData,
                'PBKDF2',
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

    static async encryptPlaintext(plaintext, key, iv) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(plaintext);
            
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                key,
                'AES-CBC',
                false,
                ['encrypt']
            );
            
            const encrypted = await crypto.subtle.encrypt(
                {
                    name: 'AES-CBC',
                    iv: iv
                },
                cryptoKey,
                data
            );
            
            return new Uint8Array(encrypted);
        } catch (error) {
            console.error('Encryption failed:', error);
            return null;
        }
    }

    static base32HexEncode(data) {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUV';
        let bits = 0;
        let value = 0;
        let output = '';

        for (let i = 0; i < data.length; i++) {
            value = (value << 8) | data[i];
            bits += 8;

            while (bits >= 5) {
                output += alphabet[(value >>> (bits - 5)) & 31];
                bits -= 5;
            }
        }

        if (bits > 0) {
            output += alphabet[(value << (5 - bits)) & 31];
        }

        while (output.length % 8 !== 0) {
            output += '=';
        }

        return output;
    }

    static async finalEncryptionWithStringToEncrypt(stringToEncrypt) {
        const encryptionKey = ''; // Replace with your actual key
        
        const saltData = new Uint8Array([0x28, 0xAB, 0xBC, 0xCD, 0xDE, 0xEF, 0x00, 0x33]);
        const ivData = new Uint8Array([55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40]);

        const derivedKey = await this.pbkdf2WithHmacSHA1Password(encryptionKey, saltData, 20, 32);
        if (!derivedKey) {
            return '';
        }

        const ciphertext = await this.encryptPlaintext(stringToEncrypt, derivedKey, ivData);
        if (!ciphertext) {
            console.error('Encryption failed');
            return '';
        }

        let basehex = this.base32HexEncode(ciphertext);
        basehex = basehex.replace(/====/g, 'Z')
                        .replace(/===/g, 'Y')
                        .replace(/==/g, 'X')
                        .replace(/=/g, 'W');

        return basehex;
    }
}