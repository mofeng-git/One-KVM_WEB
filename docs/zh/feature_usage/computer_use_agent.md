# CUA AI 操作

CUA（Computer Use Agent）可以根据自然语言任务自动观察当前 KVM 画面，并执行鼠标、键盘等操作。适合用于简单的远程桌面任务，例如打开软件、点击按钮、输入内容或按步骤完成界面操作。

!!! note "初步版本"
    CUA 目前仍是初步版本，能力和稳定性会继续迭代。

!!! warning "使用前确认"
    CUA 会直接控制被控机的鼠标和键盘。执行涉及删除文件、格式化磁盘、修改系统配置或提交表单等高风险操作前，请确认任务描述足够明确，并在可观察的环境中使用。


## 配置项

打开 **AI → 设置** 后，可以配置 CUA 的默认参数：

| 项目 | 说明 | 默认值 |
| --- | --- | --- |
| 启用 AI 操作 | 开启后允许启动 CUA 任务 | 关闭 |
| 模型 | 调用的 OpenAI 模型名称 | `gpt-5.5` |
| 最大步数 | 单次任务最多允许执行的观察/操作轮数 | `30` |
| 超时秒数 | 单次任务最长运行时间 | `600` |
| API URL | 完整接口地址。包含 `/responses` 时使用 Responses API；包含 `/chat/completions` 时使用 Chat Completions 兼容接口 | `https://api.openai.com/v1/responses` |
| OpenAI API Key | 用于调用模型的 API Key | 未配置 |

![CUA 设置页](images/computer_use_agent-settings.png)

## 使用方法

1. 打开 KVM 控制台，点击顶部工具栏中的 **AI**。
2. 在 **设置** 页启用 AI 操作，填写模型、API URL 和 OpenAI API Key，点击 **保存配置**。
3. 切换到 **对话** 页，在输入框中描述希望完成的任务。
4. 点击 **发送**，CUA 会开始截取当前画面、分析下一步动作，并自动执行鼠标和键盘操作。
5. 任务运行过程中可随时点击 **停止** 中断。

![CUA 对话与执行记录](images/computer_use_agent-session.png)
