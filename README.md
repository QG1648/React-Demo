# VIP Program 页面实现

## 技术栈

- React 18
- TypeScript
- Vite
- TailwindCSS

## 项目启动

```bash
npm install
npm run dev
```

## 实现功能

- VIP 用户信息区域：展示用户名、当前 XP、当前等级、下一等级、进度条和等级视觉图。
- My Rewards 奖励区域：展示 Instant Rakeback、Weekly Rakeback、Level-up Bonus、Monthly Bonus。
- Reward 交互：`available` 状态可点击 Claim，点击后变为 `claimed`；`locked` 和 `claimed` 按钮禁用，点击奖励后进入倒计时。
- VIP Levels：横向等级卡片、选中态高亮、点击切换、左右按钮切换。
- 等级明细表格：根据当前选中等级过滤 mock 数据渲染。
- 状态处理：包含 loading skeleton、error retry、empty state。
- 响应式布局：桌面 Rewards 四列，平板两列，移动端单列；等级卡片小屏横向滚动。

## 组件结构

```text
assets/icons/index.ts
src/components/Button/Button.tsx
src/components/VipHero/VipHero.tsx
src/components/RewardCard/RewardCard.tsx
src/components/RewardsSection/RewardsSection.tsx
src/components/VipLevelCard/VipLevelCard.tsx
src/components/VipLevelsCarousel/VipLevelsCarousel.tsx
src/components/VipLevelTable/VipLevelTable.tsx
src/components/Loading/Loading.tsx
src/components/EmptyState/EmptyState.tsx
src/components/ErrorState/ErrorState.tsx
src/hooks/useVipData.ts
src/mocks/vipData.ts
src/pages/VipProgramPage.tsx
src/types/vip.ts
```

## 数据模拟方式

`src/mocks/vipData.ts` 提供 `vipUser`、`rewards`、`vipLevels`、`vipLevelDetails`。

`src/hooks/useVipData.ts` 使用 `Promise` 和 `setTimeout` 模拟接口请求，返回 `data`、`loading`、`error`、`refetch`。访问 `/?error=true` 可以模拟接口失败并展示 Retry。

## AI 工具使用说明

- 使用 Codex 辅助完成项目结构搭建、组件拆分、TypeScript 类型定义、Tailwind 样式和 README 初稿。
- 页面结构、交互状态、mock 数据关系和构建结果由人工按需求逐项检查。
- 对 AI 生成代码的检查方式包括：检查素材真实文件名、确认没有删除已有素材、确认组件没有集中堆在 `App.tsx`、运行 `npm run build`。
- AI 生成结果不符合预期时，对照需求拆分问题：先修正类型和数据流，再修正交互，调整视觉细节。

## 遇到的问题与解决方式

- 素材文件名包含空格：通过 `assets/icons/index.ts` 统一导入和导出，避免在组件中重复书写复杂路径。
- 当前目录没有现成前端工程：补充 Vite、React、TypeScript 和 TailwindCSS 配置。
- 需要展示 error 状态但 mock 默认成功：通过 URL 参数 `?error=true` 模拟失败场景。
- 进度条当前经验需要手动调整
- 奖励交互部分设置倒计时，可领取数量
- 等级页面设置环形轨迹选择，设置选择状态变化

## 和设计稿存在的差异

- 部分 SVG 素材使用本地素材替代。
- 部分阴影、间距、图标位置可能和 Figma 有细微差异。
- 当前使用 mock 数据，没有接入真实后端。

## 可改进的地方

- 接入真实接口并补充接口异常分类。
- 增加单元测试和交互测试。
- 根据真实 Figma 标注进一步校准字体、间距、光效和断点。
- 增加奖励领取后的 toast 或弹窗反馈。
