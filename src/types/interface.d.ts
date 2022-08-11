declare interface IFilterListQuestion {
  status?: number;
  typeQuestion?: number;
  category?: number;
  grade?: number;
  group?: number;
  level?: number;
  subject?: number;
  keyWord?: string;
  page: number;
  per_page: number;
}

declare interface IDataColumnTableQuestion {
  id: number;
  code: string;
  content: string;
  group: string;
  createdAt: string;
  updatedAt: string;
  status: JSX.Element;
  handle: JSX.Element;
}

declare interface QuestionInterface {
  id: number;
  code: string;
  content: string;
  group: string;
  createdAt: string;
  updatedAt: string;
  status: number;
}

declare interface CategoryInterface {
  id: number;
  name: string;
  totalExam?: number;
  image?: string;
  avatar?: string;
}

declare interface TypeQuestionInterface {
  id: number;
  name: string;
}

declare interface TypeFillTextBoxInterface {
  id: number;
  name: string;
}

declare interface GradeInterface {
  id: number;
  name: string;
}

declare interface GroupQuestionInterface {
  id: number;
  name: string;
}

declare interface ExamInterface {
  id: number;
  name: string;
  totalQuestion: number;
  totalNumberTest: number;
  subject?: {
    id: number;
    name: string;
  };
  image?: {url?: string};
  time?: number | null;
}

declare interface IColumnTable {
  title?: JSX.Element;
  dataIndex: string;
  key: string;
  className: string;
  render?: any;
}

declare interface InitialValueQuestionFormInterface {
  type?: number;
  category?: number;
  grade?: number;
  group?: number;
  status?: number;
  content?: string;
  checkOptions: any[];
  options: any[];
}

declare interface LoginParamsInterface {
  username: string;
  password: string;
}

declare interface SignUpParamsInterface {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

declare interface ChangePasswordParamsInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  id: number;
}

declare interface ForgotPasswordParamsInterface {
  email: string;
}

declare interface FindExamInterface {
  id: number;
  image: string;
  name: string;
  totalQuestion: number;
}

declare interface OptionQuestionDetailInterface {
  id: number;
  content: string;
  type?: number; // true/fasle
}

declare interface QuestionDetailInterface {
  id: number;
  uuid?: string;
  type: number;
  content: string;
  options: OptionQuestionDetailInterface[];
}
