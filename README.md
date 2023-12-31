# code_for_another_session

Command to allow code commands to be executed in ssh'd sessions outside of
vscode.

## Requirements

- deno

## Install

```sh
deno install https://raw.githubusercontent.com/impactaky/code_for_another_session/main/code --allow-run --allow-read --allow-env --allow-sys
```

Alternatively, you can use zinit to install.

```
zinit ice as"program"
zinit light "impactaky/code_for_another_session"
```
