# Данный проект основан на проекте Harvey Delaney
![alt-текст](https://www.harveydelaney.com/images/profile-picture.jpg "Harvey Delaney")

[Статья в блоге](https://blog.harveydelaney.com/creating-your-own-react-component-library/)

[Репозитарий](https://github.com/HarveyD/react-component-library)

# React Component Library

В процессе работы были обновлены зависимости и плагины на современные (по состоянию на декабрь 2020):

- [Rollup](https://github.com/rollup/rollup)
- [Sass](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)

В проекте также использован:

- [Storybook](https://storybook.js.org/) to help you create and show off your components
- [Emotion 11](https://emotion.sh/) для стилизации компонентов

[**Читайте статью Harvey как это сделано ▸**](https://blog.harveydelaney.com/creating-your-own-react-component-library/)

## Использование компонента

Если вставлять видео с youtube обычным iframe - то iframe грузит сам по себе порядка 500кб данных, при этом если нужно несколько видео - то 500кб умножается на количество вставленных видео  

Решение - грузить с youtube только обложки видео (при возможности в формате webp) а при нажатии на кнопку вставлять iframe

Самому компоненту нужно передать ID видео например для этого видео 
https://youtu.be/J71jocEBLq0 его ID=J71jocEBLq0

## Разработка

### Сборка модуля

```
npm run build
```

### Storybook

To run a live-reload Storybook server on your local machine:

```
npm run storybook
```

To export your Storybook as static files:

```
npm run storybook:export
```

You can then serve the files under `storybook-static` using S3, GitHub pages, Express etc. I've hosted this library at: https://www.harveydelaney.com/react-component-library

### Генерация нового компонента

Harvey также включил в проект небольшую NodeJS утилиту в директории `util` названную `create-component.js`. Вместо того чтобы копировать предыдущий компонент, Вы можете выполнить эту команду для генерации нового компонента. Для использования наберите:

```
npm run generate YourComponentName
```

Эта команда сгенерирует:

```
/src
  /YourComponentName
    YourComponentName.tsx
    YourComponentName.stories.tsx
    YourComponentName.test.tsx
    YourComponentName.types.ts
    YourComponentName.scss
```

Шаблоны по умолчанию Вы можете поменять в папке `util/templates`.

**Не забудьте** добавить новый компонент в файл `index.ts` лежащий в корневой директории - иначе Ваш компонент не будет экспортирован!

### Установка Component Library локально

Допустим что Вы хотите протестировать свою библиотеку вместе с другим проектом (`test-app`) на Вашей локальной машине, и Вы хотите установить Ваш новый без предварительной публикации в npm. В папке `test-app` , запустите:

```
npm i --save ../react-component-library
```

Эта команда установит локальный компонент в качестве зависимости для `test-app`. Компонент также появится в виде зависимости в `package.json` например:

```JSON
  ...
  "dependencies": {
    ...
    "react-component-library": "file:../react-component-library",
    ...
  },
  ...
```

Дальше Вы можете импортировать его как и с обычной библотекой.

## Публикация

### Hosting via NPM

Сперва убедитесь что у Вас есть аккаунт NPM [также Вы должны залогиниться в NPM используя команду `npm login`.](https://docs.npmjs.com/creating-a-new-npm-user-account)

Установите поле `name` в `package.json` в котором укажите имя Вашего пакета. Далее запустите публикацию:

```
npm publish
```

Скрипт `"prepublishOnly": "npm run build"` в `package.json` будет выполнен перед публикацией, обеспечивая компиляцию библотеки в директорию `build/`.

#### Emotion версии 11

В данный пакет уже включена поддержка Emotion версии 11

## Использование

Let's say you created a public NPM package called `harvey-component-library` with the `TestComponent` component created in this repository.

Usage of the component (after the library installed as a dependency into another project) will be:

```TSX
import React from "react";
import { TestComponent } from "harvey-component-library";

const App = () => (
  <div className="app-container">
    <h1>Hello I'm consuming the component library</h1>
    <TestComponent theme="primary" />
  </div>
);

export default App;
```

[Check out this Code Sandbox for a live example.](https://codesandbox.io/s/harvey-component-library-example-y2b60?file=/src/App.js)

### Using Component Library SASS Variables

I've found that it's helpful to export SASS variables to projects consuming the library. As such, I've added the `rollup-plugin-copy` NPM package and used it to copy the `typography.scss` and `variables.scss` into the `build` directory as part of the Rollup bundle process. This allows you to use these variables in your projects consuming the component library.

For example, let's say you installed `harvey-component-library` into your project. To use the exported variables/mixins, in a SASS file you would do the following:

```Sass
@import '~harvey-component-library/build/typography';

.example-container {
    @include heading;

    color: $harvey-white;
}
```

## Additional Help

### Component Code Splitting

Code splitting of your components is not supported by default.

[Read this section of my blog post](https://blog.harveydelaney.com/creating-your-own-react-component-library/#introducing-code-splitting-optional-) to find out how and why you would enable code splitting of your components. In summary, code splitting enables users to import components in isolation like:

```
import TestComponent from 'harvey-component-library/build/TestComponent';
```

This can reduce the bundle size for projects using older (CJS) module formats.

You can check out [this branch](https://github.com/HarveyD/react-component-library/tree/code-splitting) or [this commit](https://github.com/HarveyD/react-component-library/commit/94631be5a871f3b39dbc3e9bd3e75a8ae5b3b759) to see what changes are neccesary to implement it.

Please note, there's an issue with code splitting and using `rollup-plugin-postcss`. I recommend using `rollup-plugin-sass` instead alongside code splitting.

### Supporting Image Imports

Add the following library to your component library [@rollup/plugin-image](https://github.com/rollup/plugins/tree/master/packages/image):

```
npm i -D @rollup/plugin-image
```

Then add it to `rollup-config.js`:

```
...
plugins:[
  ...,
  image(),
  ...
]
...
```

You can then import and render images in your components like:

```tsx
import logo from "./rollup.png";

export const ImageComponent = () => (
  <div>
    <img src={logo} />
  </div>
);
```

### Supporting JSON Imports

Add the following library to your component library [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json):

```
npm i -D @rollup/plugin-json
```

Then add it to `rollup-config.js`:

```
...
plugins:[
  ...,
  json(),
  ...
]
...
```

You can then import and use JSON as ES6 Modules:

```tsx
import data from "./some-data.json";

export const JsonDataComponent = () => <div>{data.description}</div>;
```

Checkout the [official Rollup plugin list](https://github.com/rollup/plugins) for additional helpful plugins.
