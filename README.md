### 问题

团队开发中，统一代码规范，检测不符合规范的代码并给出提示。

+ ESLint：代码格式的校验，代码质量的校验（代码质量问题指的是：未使用变量、三等号、全局变量声明等问题。）
+ Prettier：只是代码格式的校验（并格式化代码），不会对代码质量进行校验

### ESLint --fix参数

以ESLint 提供的配置格式化代码

### ESLint+Prettier配合使用

在配置 ESLint 的校验规则时候把和 Prettier 冲突的规则 disable 掉，然后再使用 Prettier 的规则作为校验规则。那么使用 Prettier 格式化后，使用 ESLint 校验就不会出现对前者的 warning。

+ 安装 eslint 和 prettier 包

```
// npm install
npm install eslint prettier --save-dev
// or pnpm install
pnpm add eslint prettier -D
```

+ 配合 TypeScript

@typescript-eslint/parser： TypeScript 转换为ESTree，能被eslint识别。由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法。

@typescript-eslint/eslint-plugin： 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。

```
// npm install
npm install typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
// or pnpm install
pnpm add typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

+ 安装plugin

eslint-config-prettier： 禁用所有和 Prettier 产生冲突的规则。

eslint-plugin-prettier：在使用 eslint --fix 时候，实际使用 prettier 来替代 eslint 的格式化功能。

```
// npm install
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
// or pnpm install
pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

### 强制校验和格式化

配合git hooks 和 lint-staged 在 git commit 前强制代码格式化和代码校验

+ lint-staged: 在 git 暂存文件上运行 lint 校验的工具
+ yorkie: 在项目根目录下面的.git/hooks文件夹下面创建pre-commit、pre-push等hooks。可以检查对应的hooks，运行想要在某个hook阶段执行的命令。

```
// npm install
npm install lint-staged yorkie --save-dev
// or pnpm install
pnpm add install lint-staged yorkie -D
```

在 package.json 中添加如下配置：

```
"gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.ts?(x)": [
      "prettier --parse=typescript --write",
      "eslint --fix"
    ],
    "src/**/*.{js,jsx,css,scss,md,json}": [
      "prettier --write",
      "eslint --fix"
    ]
  },
```

### 指定目录下执行eslint代码检测(全局安装eslint的前提下)，在 package.json 中添加如下配置：

```
    "scripts":{
        "lint:fix": "eslint --fix --ext .ts,.tsx src"
    }
```

执行

```
    npm run lint:fix
    // or pnpm 
    pnpm run lint:fix
```

### 参考：

+ [ESLint+Prettier代码规范实践](https://zhuanlan.zhihu.com/p/68026905)
+ [使用ESLint+Prettier规范React+Typescript项目](https://zhuanlan.zhihu.com/p/62401626)
