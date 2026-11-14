# 教师备课工作流

用 Codex 把教学大纲、旧课件或一道例题做成能在课堂上操作的 **HTML 课件**，需要时再生成一份**可编辑的 Word 配套练习**。适合希望学生先预测、再动手验证的编程和数学课堂。

## 课件可以怎样上课

- **让学生参与。** 先猜输出，再逐步看变量、循环或函数怎样执行。练习可点击作答，反馈和答案由教师按需揭示。
- **让教师试过再选版。** 新课件需要选风格时，提供 A、B、C **三套可翻页的 HTML 预览，每套恰好三页**。
- **方便投影。** 固定 16:9，课件可离线打开，有全屏按钮和 `F` 快捷键。
- **练习跟着课程走。** 制作教学课件时默认询问一次是否需要配套练习。确认需要后，生成可编辑 Word，按需要组合选择、填空、判断和解答题，避免重复课件例题，并附独立答案页。

## 三套预览怎么选

每套都用相同的真实课程内容。**第 1 页是封面，第 2、3 页是同样两张关键教学页。** 例如一张讲代码结构，一张让学生逐步执行。可以比较标题、代码和交互在不同模板里是否适合投影，再决定正式课件用哪一套。

选定后清理本轮落选预览及其专用素材，保留选中的预览。已有指定模板或仅修改现有课件时，可以直接用指定版式。编程课件先确认教学结构，再进入视觉设计。

![三套 while 课件预览对照](examples/preview-comparison.jpg)

下载后用浏览器打开，逐页点开比较：[A 彩色积木](examples/while-preview-a.html) · [B 蓝色讲义](examples/while-preview-b.html) · [C 复古窗口](examples/while-preview-c.html) · [四种题型 Word 样张](examples/worksheet-sample.docx)

## 在 Codex 中使用

1. 下载或克隆仓库，用 Codex 打开仓库根目录。
2. 在请求里调用下表的 Skill，并提供专题、学生程度、目标和已有材料。教学约束在根目录的 [AGENTS.md](AGENTS.md)。
3. 确认编程课件的页面结构，比较实际 HTML 预览并选定风格。课件和配套练习会按已确认的安排交付。

| 调用 | 用途 |
| --- | --- |
| `$frontend-slides` | 从备课结构、选版到完整交互课件 |
| `$beautiful-html-templates` | 单独浏览、比较和套用 HTML 模板 |
| `$artifact-template-maths-worksheet-2` | 单独制作圆角双栏 Word 练习和答案 |

> 用 $frontend-slides 为 Python 初学者做一节「while 循环」课。让学生先预测，再单步查看变量变化。先列页面结构，再给我看三套风格预览。

HTML 示例直接在浏览器中打开。PPTX 转换需要 Python 和 `python-pptx`。Word 版式建议用 Microsoft Word 检查。可自行把有权使用的透明 PNG 放进 `assets/stickers/`，供练习模板从中选一张放在学生页左下方。

## 来源与许可

本项目由 [lianshu-codex](https://github.com/lianshu-codex) 整理，加入教师备课约束、三页预览流程和配套练习模板。HTML Skill 和模板库改自 Zara Zhang 的 [Frontend Slides](https://github.com/zarazhangrui/frontend-slides) 和 [Beautiful HTML Templates](https://github.com/zarazhangrui/beautiful-html-templates)，各自保留原始 MIT 许可证。项目自有内容采用 [MIT 许可证](LICENSE)。