const getRandomString = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

const encodeToBase64 = (randString: string): string => Buffer.from(randString).toString('base64')

const shortenUrl = (): string => {
  const randomString = getRandomString(7);
  const base62String = encodeToBase64(randomString).replace(/=/g, '');
  return base62String;
};

export { shortenUrl, getRandomString, encodeToBase64 };
