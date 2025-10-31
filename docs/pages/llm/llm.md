---
autoGroup-1: LLM
title: Prompt、Agent、Function Calling、MCP
date: 2025-05-01
categories:
  - LLM
tags:
  - LLM MCP、Agent
---

# 什么是 Prompt?

Prompt 是用户向 AI 模型输入的**指令、问题或描述**，用于引导 AI 生成符合预期的输出内容

> Prompt 不仅是 “一句话指令”，更是 “引导 AI 精准工作的说明书”。好的 Prompt 能让 AI 的能力充分发挥，而模糊的 Prompt 则可能导致输出偏离预期 —— 这也是 “同样用 AI，有人能出优质结果，有人却不行” 的核心原因之一。

[:link: Prompt Engineering Guide](https://www.promptingguide.ai/zh)

> user prompt + system propmt

# 2. 什么是 Agent?

Agent（中文常译为 “智能体”）是指具备自主感知、决策、行动能力，能与环境（或人类、其他 Agent）交互以达成特定目标的 AI 系统

- 感知能力（Perception） 能获取外部环境的信息（如文本、数据、传感器信号），理解自身所处状态。
- 决策能力（Decision-Making） 基于感知到的信息和预设目标，自主规划行动步骤（无需人类逐步指令）。
- 行动能力（Action） 能执行具体操作，影响环境或输出结果（如调用工具、发送信息、控制硬件）。
- 目标导向（Goal-Oriented） 所有行为围绕 “达成预设目标” 展开，若遇到障碍（如信息不足），会主动调整策略（如补充查询数据）。

# 3. 什么是 Function Calling？

是指 AI 模型根据用户需求，主动调用外部工具（如 API 接口、数据库、代码函数、硬件控制模块等）获取信息或执行操作，再结合工具返回的结果生成最终回答的能力

> 统一大模型返回格式，规避反复重试导致的 token 消耗，同时给大模型提供调用外部工具的能力

```json
{
  "name": "",
  "desc": "",
  "arguments": {}
}
```

# 4. 什么是 MCP?

让 AI 模型能够方便、安全地连接到各种外部数据源和工具。它采用客户端 - 服务器架构，包括 MCP 主机、MCP 客户端和 MCP 服务器三个部分，为 AI 应用与外部系统建立双向连接，可实现通用访问接口、安全标准的连接以及推动可持续的生态。

[:link: MCP 官方文档](https://docs.mcp.ai/)

> 通俗理解：从技术角度来看，AI 模型本身并不能直接“连接”或“调用” MCP。因为大语言模型的本质是一个文本生成器，它只能根据上下文生成下一步的输出，不具备主动发起交互的能力。真正执行“交互”操作、协调数据流和调用函数的，是外层的 Agent 系统。也就是说，Agent 才是那个“插着 MCP 接口”的实体，而不是 LLM 本身。

# 5. 多模态文件解析多 Agent 系统架构设计

...
