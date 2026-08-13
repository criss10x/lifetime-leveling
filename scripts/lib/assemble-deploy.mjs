import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

async function copyContents(source, destination) {
  const entries = await readdir(source, { withFileTypes: true });
  await Promise.all(entries.map((entry) =>
    cp(join(source, entry.name), join(destination, entry.name), {
      recursive: entry.isDirectory(),
      force: true,
    }),
  ));
}

export async function assembleDeploy({ studioDir, muslimDir, deployDir }) {
  await rm(deployDir, { recursive: true, force: true });
  await mkdir(deployDir, { recursive: true });
  await copyContents(studioDir, deployDir);
  const muslimDeployDir = join(deployDir, 'muslim');
  await mkdir(muslimDeployDir, { recursive: true });
  await copyContents(muslimDir, muslimDeployDir);
}
