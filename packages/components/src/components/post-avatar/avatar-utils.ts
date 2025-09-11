// https://docs.gravatar.com/api/avatars/images/

const GRAVATAR_DEFAULT = '404';
const GRAVATAR_RATING = 'g';
const GRAVATAR_SIZE = 80;

export function getGravatarUrl(email: string): string {
  const hash = cryptify(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${GRAVATAR_SIZE}&d=${GRAVATAR_DEFAULT}&r=${GRAVATAR_RATING}`;
}

export async function cryptify(key: string) {
  return await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key)).then(buffer => {
    return Array.from(new Uint8Array(buffer))
      .map(bytes => bytes.toString(16).padStart(2, '0'))
      .join('');
  });
}

export const GRAVATAR_BASE_URL = `https://www.gravatar.com/avatar/{email}?s=${GRAVATAR_SIZE}&d=${GRAVATAR_DEFAULT}&r=${GRAVATAR_RATING}`;
