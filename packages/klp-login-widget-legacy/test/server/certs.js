import selfsigned from 'selfsigned';

/**
 * A wildcard cert for *.post.ch. Playwright runs with ignoreHTTPSErrors, but the cert still has to
 * exist for the origin to be https:// — `SameSite=None; Secure` cookies are dropped otherwise.
 */
export const createCertificate = () => {
  const pems = selfsigned.generate([{ name: 'commonName', value: 'post.ch' }], {
    days: 365,
    keySize: 2048,
    algorithm: 'sha256',
    extensions: [
      {
        name: 'subjectAltName',
        altNames: [
          { type: 2, value: 'post.ch' },
          { type: 2, value: '*.post.ch' },
          { type: 2, value: 'localhost' },
          { type: 7, ip: '127.0.0.1' },
        ],
      },
    ],
  });

  return { key: pems.private, cert: pems.cert };
};
