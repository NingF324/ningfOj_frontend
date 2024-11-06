/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeCase } from "./JudgeCase";
import type { JudgeConfig } from "./JudgeConfig";

export type QuestionAddRequest = {
  acceptedNum?: number;
  answer?: string;
  content?: string;
  judgeCase?: Array<JudgeCase>;
  judgeConfig?: JudgeConfig;
  submitNum?: number;
  tags?: Array<string>;
  title?: string;
};

