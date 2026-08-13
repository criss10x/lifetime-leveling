import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(target);
    return entry.isFile() && extname(entry.name) === '.html' ? [target] : [];
  }));
  return nested.flat();
}

function extractLocalReferences(html) {
  const values = [];
  const matcher = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  for (let match = matcher.exec(html); match; match = matcher.exec(html)) {
    const value = match[1].trim();
    if (!value || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:')) continue;
    if (value.startsWith('data:') || value.startsWith('//') || /^https?:/i.test(value)) continue;
    values.push(value);
  }
  return values;
}

function resolveReference({ root, htmlFile, rawValue }) {
  const pathname = rawValue.split(/[?#]/, 1)[0] || '/';
  const candidate = pathname.startsWith('/')
    ? resolve(root, `.${pathname}`)
    : resolve(dirname(htmlFile), pathname);
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    throw new Error(`Reference escapes static root: ${rawValue}`);
  }
  return candidate;
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function targetExists(candidate) {
  return (await exists(candidate))
    || (await exists(`${candidate}.html`))
    || (await exists(join(candidate, 'index.html')));
}

export async function verifyStaticLinks({ root }) {
  const absoluteRoot = resolve(root);
  const errors = [];
  for (const htmlFile of await findHtmlFiles(absoluteRoot)) {
    const source = await readFile(htmlFile, 'utf8');
    for (const rawValue of extractLocalReferences(source)) {
      const target = resolveReference({ root: absoluteRoot, htmlFile, rawValue });
      if (!(await targetExists(target))) errors.push(`${relative(absoluteRoot, htmlFile)} -> ${rawValue}`);
    }
  }
  if (errors.length > 0) throw new Error(`Broken static links:\n${errors.join('\n')}`);
  return [];
}
