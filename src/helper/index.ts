import configs from 'config';
import { message } from 'antd';
import { QUESTION_TYPE } from 'contants/constants';
import i18next from 'i18next';

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

export const trimSpaceInput = (value: string) => value.replace(/\s+/g, ' ').trim();
