import { readdirSync } from "fs-extra";
import { prompt } from "inquirer";

import { paths } from "./paths";

export const getWeeklyMeta = ({
  title,
  author,
  weeklyNum
}: {
  title: string;
  author: string;
  weeklyNum: number;
}) => {
  return `---
title: ${title} 第 ${weeklyNum} 期
author: ${author}
tags: 
date: 
---`;
};

export const getLtsWeeklyNum = (): number => {
  const ltsWeeklyName = readdirSync(paths.weeklyDir).pop();

  if (ltsWeeklyName) {
    return parseInt(
      ltsWeeklyName.slice(
        ltsWeeklyName.indexOf("-") + 1,
        ltsWeeklyName.indexOf(".")
      )
    );
  }
  return 0;
};

export const getWeeklyChoices = () => {
  return readdirSync(paths.weeklyDir);
};

export const getWeeklyName = (weeklyNum: number) => {
  return `issue-${weeklyNum < 10 ? `0${weeklyNum}` : weeklyNum}.md`;
};

export const getSelectedDocs = async (weeklyChoices: string[]) => {
  return await prompt([
    {
      type: "checkbox",
      message: "请选择",
      name: "result",
      choices: weeklyChoices
    }
  ]);
};

export const updateWeekly = async () => {
  return await prompt([
    {
      type: "input",
      message: "标题",
      name: "title"
    },
    {
      type: "input",
      message: "概要",
      name: "excerpt"
    },
    {
      type: "input",
      message: "链接",
      name: "link"
    }
  ]);
};
