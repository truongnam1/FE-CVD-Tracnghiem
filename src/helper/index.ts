import configs from 'config';
import { message } from 'antd';
import { QUESTION_TYPE } from 'contants/constants';
import i18next from 'i18next';
import { UploadChangeParam } from 'antd/lib/upload';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression';

export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== 'prod') {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.errorMessage || 'Something went wrong!';
};

export const getQuestionTypeText = (type: number) => {
  if (type === QUESTION_TYPE.PICK_ONE) return i18next.t('commonQuestionBox.typePickOne');
  if (type === QUESTION_TYPE.MULTI_PICK) return i18next.t('commonQuestionBox.typeMultiPick');
  return '';
};

export const validateTypeImg = (type: string, arrayType: string[]) => {
  return arrayType.indexOf(type) !== -1;
};

export const validateSizeImg = (size: number, maxSize: number = 20) => {
  return size / 1024 / 1024 <= maxSize;
};

export const compressionHeicImageFile = async (
  info: UploadChangeParam<any>,
  setUrl: (value: React.SetStateAction<string>) => void,
  setFile: (value: React.SetStateAction<string | Blob | undefined>) => void,
  setLoading?: (value: React.SetStateAction<boolean>) => void,
  maxSizeMB?: number
) => {
  if (info.file.name.toLowerCase().includes('.heic')) {
    // tslint:disable-next-line: no-floating-promises
    heic2any({ blob: info.file, toType: 'image/jpg', quality: 1 }).then(async (newImage: any) => {
      const options = {
        maxSizeMB: maxSizeMB ? maxSizeMB : 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(newImage, options);
      const url = URL.createObjectURL(compressedFile);
      setUrl(url);
      setFile(compressedFile);
      if (setLoading) {
        setLoading(false);
      }
      return compressedFile;
    });
  } else {
    setUrl(URL.createObjectURL(info.file));
    URL.revokeObjectURL(info.file);
    setFile(info.file);
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const trimSpaceInput = (value: string) => value.replace(/\s+/g, ' ').trim();
