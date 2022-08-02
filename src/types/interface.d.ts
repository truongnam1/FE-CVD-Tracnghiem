declare interface IFilterListQuestion {
  status?: number;
  category?: number;
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
  countTest?: number;
  image?: string;
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
  countQuestion: number;
  countExam: number;
  subjects: {
    id: number;
    name: string;
  }[];
  image: string;
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

declare interface SignUpParamsInterface {
  email: string;
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

declare interface ChangePasswordParamsInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

declare interface ForgotPasswordParamsInterface {
  email: string;
}
