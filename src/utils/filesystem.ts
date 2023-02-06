import { readDir, readTextFile, writeFile } from "@tauri-apps/api/fs";
import { resolve } from "@tauri-apps/api/path";

export const openFolder = async (path: string) => {
  const folders = await readDir(path, { recursive: true });
  if (!folders) {
    return;
  }
  const contents = { id: {}, en: {}, path, values: {} };
  if (folders.length > 0) {
    folders.forEach(async (item) => {
      if (item && item.name && item.path) {
        if (item.name.indexOf("id") > -1 || item.name.indexOf("en") > -1) {
          const resolvedPath = await resolve(item.path);
          if (item.name.indexOf("id") > -1) {
            contents.id = JSON.parse(await readTextFile(resolvedPath));
          }
          if (item.name.indexOf("en") > -1) {
            contents.en = JSON.parse(await readTextFile(resolvedPath));
          }
        }
      }
    });
    if (
      Object.keys(contents.id).length > 0 ||
      Object.keys(contents.en).length > 0
    ) {
      Object.assign(contents.values, { ...contents.id }, { ...contents.en });
      return contents;
    }
  }

  await writeFile(`${path}/id-ID.json`, JSON.stringify({}, null, 2));
  await writeFile(`${path}/en-EN.json`, JSON.stringify({}, null, 2));

  return { id: {}, en: {}, values: {}, path };
};

export const saveFolder = async (
  data: Record<string, any> | undefined,
  path: string
) => {
  if (data && data.id && data.en) {
    writeFile(`${path}/id-ID.json`, JSON.stringify(data.id, null, 2));
    writeFile(`${path}/en-EN.json`, JSON.stringify(data.en, null, 2));
  }
};
