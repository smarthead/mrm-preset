# Mrm Preset

SmartHead preset for [Mrm](https://mrm.js.org)

Mrm Preset supports 
* TypeScript applications
* Applications based on Create React App (TypeScript)

This preset includes the following Mrm tasks
 ```
package
gitignore
editorconfig
stylelint
eslint
typescript
prettier
lint-staged
browserslist
 ```

## Usage

You should initialize Git in your project before run mrm
```
git init
```

Running mrm with this mrm preset
```
npx -p mrm -p @smarthead/mrm-preset@latest mrm --preset @smarthead/mrm-preset default
```

