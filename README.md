# 教师备课工作流

简体中文 · [English](README.en.md)

面向**编程、数学和奥数教师**的 Codex 备课工作流。把教学大纲、旧课件或教学素材做成可离线投影的**交互式 HTML 课件**。先试三套版式，再选定正式课件的风格。需要时还可以生成**可编辑的 Word 配套练习和答案**。

## 从 Zara Zhang 的两个项目出发

| 上游项目 | Zara 原项目做什么 | 在这里怎么用 |
| --- | --- | --- |
| **Frontend Slides** | 用编程助手从零制作网页演示，或将 PowerPoint 转为 HTML。提供固定 16:9 舞台、单文件 HTML 和先看视觉预览再选风格的制作方式。[查看原项目](https://github.com/zarazhangrui/frontend-slides) | `$frontend-slides` 是备课主入口，负责确认结构、协调选版、制作与检查正式课件。 |
| **Beautiful HTML Templates** | 一套供编程助手复用的 HTML 演示模板。助手按索引里的风格、用途等信息匹配模板，再用实际内容改写已有页面。模板目录带 HTML、元数据和设计说明。[查看原项目与风格画廊](https://github.com/zarazhangrui/beautiful-html-templates#gallery) | `$beautiful-html-templates` 提供 34 套视觉模板，可单独调用，也可由主入口调用来选版。 |

## lianshu-codex 为课堂做的改动

1. **先定教学结构，再排版。** 编程课件先提交页面结构和教学逻辑给老师确认。一页通常聚焦一到两个目标，先让学生观察具体例子，再讲概念、代码和执行过程。正文 20 磅、代码适合投影，整页背景使用非图片设计。教学约束写在 [AGENTS.md](AGENTS.md)。
2. **固定三套三页的可操作预览。** A、B、C 每套一个 HTML，恰好三页，第 1 页是封面，第 2、3 页用相同的两张关键教学页。三套都使用真实课程内容。老师可以亲自翻页、点按钮，对比不同模板里的代码可读性、版式和交互，再选择适合这节课的一套。
3. **选定后清理本轮预览。** 只删本轮落选 HTML 和专用素材，保留选中的方案。主入口与模板库使用同一轮选版和清理流程。已有指定模板或只修改现有课件时，可直接沿用版式。
4. **针对投影和课堂操作补齐要求。** 预览与成品均支持离线使用、全屏按钮和 `F` 快捷键。课堂可先预测再单步观察变量、循环或函数执行，答案由老师按需揭示。编程课件用 1.2 秒平滑翻页，纠错先找具体错误行，再指出该行的错误点，之后安排分级上机实战。
5. **把配套练习接到备课流程。** 两个 HTML 入口制作教学课件时，若需求未说明，默认问一次是否需要 Word 练习。确认需要后，按课程重点另出题，与课件例题和课堂练习查重。练习模板可单独调用，使用圆角双栏母版和四种可编辑题型组件，支持选择、填空、判断和解答题，附独立答案页。

## 试一节课的三套预览

同一节 Python `while` 循环课，用三种版式呈现同一个封面、同一组代码结构讲解和同一页逐步执行演示。

![同一节 Python while 循环课的三套三页预览对照](examples/preview-comparison.jpg)

下载 HTML 后用浏览器打开。[A 彩色积木](examples/while-preview-a.html) · [B 蓝色讲义](examples/while-preview-b.html) · [C 复古窗口](examples/while-preview-c.html) · [四种题型 Word 样张](examples/worksheet-sample.docx)

## 在 Codex 中使用

下载或克隆仓库，用 Codex 打开仓库根目录，提供专题、学生程度、目标和已有教材。

| 入口 | 何时用 |
| --- | --- |
| `$frontend-slides` | 从教学结构到正式交互课件。模板库可用时调用它选版。 |
| `$beautiful-html-templates` | 单独浏览、比较或套用 HTML 模板。 |
| `$artifact-template-maths-worksheet-2` | 单独制作可编辑的 Word 练习与答案。 |

> 用 $frontend-slides 为 Python 初学者做一节「while 循环」课。让学生先预测，再单步查看变量变化。先给我教学结构，确认后给我三套风格预览。

PPTX 转换需要 Python 和 `python-pptx`。Word 版式建议用 Microsoft Word 检查。可把有权使用的透明 PNG 放进 `assets/stickers/`，供练习模板选取一张并放在学生页左下方。

## 作者与许可

教师备课工作流改编及 Word 配套练习模板由 [lianshu-codex](https://github.com/lianshu-codex) 整理。感谢 Zara Zhang 提供两项上游项目。上游文件分别保留原作者的 MIT 许可证：[Frontend Slides](.agents/skills/frontend-slides/LICENSE) · [Beautiful HTML Templates](.agents/skills/beautiful-html-templates/LICENSE)。本仓库新增内容采用 [MIT 许可证](LICENSE)。
