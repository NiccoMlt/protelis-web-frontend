import {
  isFolder,
  isSourceFile,
  ProtelisFile,
  ProtelisFolder,
  ProtelisSourceFile,
} from '../model/File';

/**
 * Validate full path string and split in subsequent folder names.
 *
 * In result array, top folder is first element and the file is last.
 *
 * @param filePath - the path to validate and split
 *
 * @returns the folders, if valid
 *
 * @throws Error if invalid file path is specified
 */
function resolveFoldersFromPath(filePath: string): string[] | never {
  const folders = filePath.split('/')
    .filter((s) => s.trim() !== '');
  if (folders.length < 1 /* || folders[0].trim.length === 0 */) {
    throw new Error('Invalid file path specified');
  }
  return folders;
}

/**
 * The function removes a file/folder at a path (if present) from a Set of files and folders.
 *
 * @param fileSet - the set of files and folders that acts as a root
 * @param filePath - the full path of the file to remove
 *
 * @returns the new root Set without the file to be removed
 *
 * @throws Error if invalid file path is specified
 */
export function removeFileAtPath(fileSet: ProtelisFile[], filePath: string): ProtelisFile[] {
  const folders: string[] = resolveFoldersFromPath(filePath);

  if (folders.length === 1) {
    return fileSet.filter((file) => file.name !== folders[0]);
  }

  const [folder, ...rest] = folders;
  return fileSet.map((file) => {
    if (file.name === folder) {
      if (typeof file.content === 'string') {
        throw new Error('Not a folder');
      } else {
        return {
          name: file.name,
          content: removeFileAtPath(file.content, rest.join('/')),
        };
      }
    } else {
      return file;
    }
  });
}

/**
 * The function renames a file/folder at a path (if present) from a Set of files and folders.
 *
 * @param fileSet - the set of files and folders that acts as a root
 * @param filePath - the full path of the file to rename
 * @param newName - the new name
 *
 * @returns the new root Set with the desired file renamed
 *
 * @throws Error if invalid file path is specified
 */
export function renameFileAtPath(
  fileSet: ProtelisFile[],
  filePath: string,
  newName: string,
): ProtelisFile[] {
  const folders: string[] = resolveFoldersFromPath(filePath);

  if (folders.length === 1) {
    return fileSet.map((file: ProtelisFile) => {
      if (file.name === folders[0]) {
        file.name = newName;
      }
      return file;
    });
  }

  const [folder, ...rest] = folders;
  return fileSet.map((file) => {
    if (file.name === folder) {
      if (typeof file.content === 'string') {
        throw new Error('Not a folder');
      } else {
        return {
          name: file.name,
          content: renameFileAtPath(file.content, rest.join('/'), newName),
        };
      }
    } else {
      return file;
    }
  });
}

/**
 * The function changes a source file content at a path (if present).
 *
 * @param fileSet - the set of files and folders that acts as a root
 * @param filePath - the full path of the file to rename
 * @param newContent - the updated content
 *
 * @returns the root Set of files
 */
export function editFileAtPath(
  fileSet: ProtelisFile[],
  filePath: string,
  newContent: string,
): ProtelisFile[] {
  const folders: string[] = resolveFoldersFromPath(filePath);

  if (folders.length === 1) {
    return fileSet.map((file: ProtelisFile) => {
      if (file.name === folders[0]) {
        file.content = newContent;
      }
      return file;
    });
  }

  const [folder, ...rest] = folders;
  return fileSet.map((file) => {
    if (file.name === folder) {
      if (typeof file.content === 'string') {
        throw new Error('Not a folder');
      } else {
        return {
          name: file.name,
          content: editFileAtPath(file.content, rest.join('/'), newContent),
        };
      }
    } else {
      return file;
    }
  });
}

/**
 * Search a file in the set at a given path.
 *
 * @param fileSet - the set of files and folders that acts as a root
 * @param filePath - the full path of the file to search
 *
 * @returns the file, if any
 */
export function getFileAtPath(
  fileSet: ProtelisFile[],
  filePath: string,
): ProtelisFile | undefined | never {
  const folders: string[] = filePath.split('/')
    .filter((s) => s.trim() !== '');
  if (folders.length < 1 /* || folders[0].trim.length === 0 */) {
    throw new Error('Invalid file path specified');
  } else {
    const [folder, ...rest] = folders;
    const file: ProtelisFile | undefined = fileSet.find((f) => f.name === folder);
    if (file) {
      if (folders.length > 1 && !(typeof file.content === 'string')) {
        return getFileAtPath((file as ProtelisFolder).content, rest.join('/'));
      }
      if (folders.length === 1) {
        return file;
      }
    }
    return undefined;
  }
}

/**
 * Search a source file in the set at a given path.
 *
 * @param fileSet - the set of files and folders that acts as a root
 * @param filePath - the full path of the file to search
 *
 * @returns the source file, if exists and is not a folder
 */
export function getSourceFileAtPath(
  fileSet: ProtelisFile[],
  filePath: string,
): ProtelisSourceFile | never {
  const file = getFileAtPath(fileSet, filePath);
  if (file && isSourceFile(file)) {
    return file;
  }
  throw new Error('Not a source file');
}

/**
 * Search a folder in the set at a given path.
 *
 * @param fileSet - the set of files and folders that acts as a root
 * @param filePath - the full path of the folder to search
 *
 * @returns the folder, if exists and is not a source file
 */
export function getFolderAtPath(
  fileSet: ProtelisFile[],
  filePath: string,
): ProtelisFolder {
  const file = getFileAtPath(fileSet, filePath);
  if (file && isFolder(file)) {
    return file;
  }
  throw new Error('Not a folder');
}
