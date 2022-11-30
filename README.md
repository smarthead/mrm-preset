# Mrm Preset

SmartHead preset for [Mrm](https://mrm.js.org)

This preset includes the following Mrm tasks

```
package
gitignore
editorconfig
gitattributes
browserslist
stylelint
typescript
lint-staged
```

## Usage

You should initialize Git in your project before run mrm

```
git init
```

Running mrm with this mrm preset

```
npx -p mrm -p @smarthead/mrm-preset@latest mrm --preset @smarthead/mrm-preset default -i
```
