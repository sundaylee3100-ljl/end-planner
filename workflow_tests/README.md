# Workflow 边界测试计划

## 测试目标
验证 Claude Code Workflow 工具在本机的 5 个复杂边界场景

## 测试用例

| # | 名称 | 测试边界 | 核心模式 |
|---|------|----------|----------|
| 1 | 多阶段流水线 | pipeline() 跨阶段数据传递 | pipeline + schema + phase |
| 2 | 并行屏障 | parallel() 全部完成后聚合 | parallel + barrier |
| 3 | 循环直到干涸 | while loop + 动态退出 | loop-until-dry + budget |
| 4 | 对抗验证 | 多视角独立评判 + 投票 | parallel + adversarial verify |
| 5 | 嵌套工作流 | workflow() 内部调用子工作流 | nested workflow + composition |

## 执行方式
每个测试用一个 Workflow() 调用，观察：
- 是否成功启动
- agent() 是否正常返回
- schema 验证是否生效
- phase 分组是否正确
- budget 追踪是否工作
