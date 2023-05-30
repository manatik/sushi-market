import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import * as sharp from 'sharp';

export class FileManipulator {
  PATH = path.join('assets');
  REMOTE_PATH = path.join('uploads');

  async write(filename: string, buffer: Buffer, { signal }) {
    try {
      const pathToFile = `${this.PATH}/${filename}`;
      const remotePathToFile = `${this.REMOTE_PATH}/${filename}`;

      if (!fs.existsSync(pathToFile)) {
        const separatedPath = pathToFile.split(path.sep);
        separatedPath.pop();
        fs.mkdirSync(path.join(...separatedPath), { recursive: true });
      }

      await fsPromises.writeFile(pathToFile, buffer, { signal });

      return {
        message: 'Файл успешно записан',
        success: true,
        error: false,
        data: { path: pathToFile, remotePath: remotePathToFile },
      };
    } catch (e) {
      console.log(e);
      throw new Error('Ошибка записи файла');
    }
  }

  async compress(buffer: Buffer, options = { quality: 65 }) {
    try {
      const { quality } = options;
      const compressedBuffer = await sharp(buffer)
        .resize({ width: 1920, height: 1080, fit: 'outside' })
        .webp({ quality })
        .toBuffer();

      return {
        message: 'Файл успешно записан',
        success: true,
        error: false,
        data: { buffer: compressedBuffer, ext: '.webp' },
      };
    } catch (e) {
      throw new Error('Ошибка компрессии');
    }
  }

  async removeFiles(paths: string[]) {
    try {
      for await (const pathToFile of paths) {
        await fsPromises.rm(pathToFile);
      }
    } catch (e) {
      throw new Error('Ошибка удаления файлов');
    }
  }

  async writeWithCompress(filename: string, buffer: Buffer, options) {
    try {
      const { data } = await this.compress(buffer, options);

      const fileExtension = path.extname(filename);
      const filenameWithChangedExt = filename.replace(fileExtension, data.ext);

      const result = await this.write(filenameWithChangedExt, data.buffer, { signal: options.signal });

      return {
        message: 'Файл успешно сжат и записан',
        success: true,
        error: false,
        data: {
          path: result.data.path,
          remotePath: result.data.remotePath,
          filename: filenameWithChangedExt,
        },
      };
    } catch (e) {
      throw e;
    }
  }
}

export const FileManipulatorSingleton = new FileManipulator();
