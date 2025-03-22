/*import CryptoJS from 'crypto-js';

const secretKey = 'mySecretKey'; // Você pode usar uma chave secreta de sua escolha

// Função para criptografar os dados
const encryptData = (data: object) => {
  // Converte o objeto para JSON e criptografa com a chave secreta
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return ciphertext;
};

// Função para descriptografar os dados
const decryptData = (ciphertext: string): object | null => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) : null;
};

// Exemplo de armazenamento no localStorage (criptografado)
const storeEncryptedData = (key: string, data: object) => {
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
};

// Exemplo de recuperação do localStorage (descriptografado)
const getDecryptedData = (key: string): object | null => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};

// Exemplo de uso no React:

// Armazenando dados do usuário no localStorage (criptografados)
const userData = { name: 'John Doe', email: 'johndoe@example.com' };
storeEncryptedData('user', userData);

// Recuperando os dados do usuário (descriptografados)
const storedUser = getDecryptedData('user');
console.log(storedUser);*/