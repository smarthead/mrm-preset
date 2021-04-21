# Mrm Preset

SmartHead preset for [Mrm](https://mrm.js.org)

Mrm Preset supports 
* TypeScript applications
* Applications based on [Create React App](https://create-react-app.dev) (TypeScript)

This preset includes the following Mrm tasks
 ```
package
gitignore
editorconfig
gitattributes
browserslist
stylelint
eslint
typescript
prettier
lint-staged
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

## Command line parameters

You can pass some options. For example, you can change a style config.
```
npx -p mrm -p @smarthead/mrm-preset@latest mrm --preset @smarthead/mrm-preset default --config:style jss
```

### All commands
