/**
 * Generates a random string of entered length
 *
 * @param length - Length of the random string
 * @returns Random string of entered length
 * @example
 * getRandomString(5) // 3j4k5
 * getRandomString(10) // 3j4k5l6m7n
 */
export const getRandomString = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

/**
 * Encodes a string to Base64
 *
 * @param randString - Random string to encode
 * @returns Base64 encoded string
 * @example
 * encodeToBase64('hello world') // aGVsbG8gd29ybGQ=
 */
export const encodeToBase64 = (randString: string): string =>
  Buffer.from(randString).toString('base64');

/**
 * Shortens a URL to a random string of entered length
 *
 * @param length - Length of the random string
 * @returns Random string of entered length
 * @example
 * shortenUrl(5) // 3j4k5
 * shortenUrl(10) // 3j4k5l6m7n
 */
export const shortenUrl = (length: number): string => {
  const randomString = getRandomString(length - 3);
  const base62String = encodeToBase64(randomString).replace(/=/g, '');
  return base62String;
};
