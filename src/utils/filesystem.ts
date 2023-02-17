import { en, id } from "@renderer/locale";
import {
  createDir,
  readDir,
  readTextFile,
  writeFile,
} from "@tauri-apps/api/fs";
import { resolve } from "@tauri-apps/api/path";
import { unflattenObject } from "./object";

export const openFolder = async (path: string) => {
  const folders = await readDir(path, { recursive: true });
  if (!folders) {
    return;
  }
  if (folders.length > 0) {
    const contents = { id: {}, en: {}, path, values: {} };
    await Promise.all(
      folders.map(async (item) => {
        if (item && item.name && item.path) {
          if (item.name.indexOf("id") > -1 || item.name.indexOf("en") > -1) {
            const resolvedPath = await resolve(item.path);
            const file = await readTextFile(resolvedPath);
            if (item.name.indexOf("id") > -1) {
              contents.id = unflattenObject(JSON.parse(file));
            }
            if (item.name.indexOf("en") > -1) {
              contents.en = unflattenObject(JSON.parse(file));
            }
          }
        }
      })
    );
    if (
      Object.keys(contents.id).length > 0 ||
      Object.keys(contents.en).length > 0
    ) {
      Object.assign(contents.values, { ...contents.id }, { ...contents.en });
    }
    return contents;
  }

  await writeFile(`${path}/id.json`, JSON.stringify({}, null, 2));
  await writeFile(`${path}/en.json`, JSON.stringify({}, null, 2));

  return { id: {}, en: {}, values: {}, path };
};

export const saveFolder = async (
  data: Record<string, any> | undefined,
  path: string
) => {
  await readDir(`${path}`).catch(async () => {
    await createDir(`${path}`);
  });
  if (data && data.id && data.en) {
    writeFile(`${path}/id.json`, data.id);
    writeFile(`${path}/en.json`, data.en);
  }
};

export const createProject = async (
  path: string | null,
  isDefault?: boolean,
  resourceFolder?: boolean
) => {
  if (!path) {
    return Promise.reject("No Folder Selected");
  }
  const contents = { id: {}, en: {} };
  if (isDefault) {
    contents.id = id;
    contents.en = en;
  }
  let createPath = path;

  if (resourceFolder) {
    await readDir(`${path}/resources`).catch(async () => {
      await createDir(`${path}/resources`);
    });
    createPath = `${path}/resources`;
  }
  writeFile(`${createPath}/id.json`, JSON.stringify(contents.id, null, 2));
  writeFile(`${createPath}/en.json`, JSON.stringify(contents.en, null, 2));

  return Promise.resolve(createPath);
};
