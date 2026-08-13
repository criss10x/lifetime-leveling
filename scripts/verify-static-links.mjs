import { join } from 'node:path';
import { verifyStaticLinks } from './lib/verify-static-links.mjs';

try {
  await Promise.all([
    verifyStaticLinks({ root: join(process.cwd(), 'dist', 'studio') }),
    verifyStaticLinks({ root: join(process.cwd(), 'dist', 'muslim') }),
  ]);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
