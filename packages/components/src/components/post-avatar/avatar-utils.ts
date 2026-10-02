// https://docs.gravatar.com/api/avatars/images/

export async function getGravatarUrl(email: string): Promise<string> {
  const hash = await cryptify(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=80&d=400&r=g`;
}

async function cryptify(key: string) {
  return await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key)).then(buffer => {
    return Array.from(new Uint8Array(buffer))
      .map(bytes => bytes.toString(16).padStart(2, '0'))
      .join('');
  });
}
