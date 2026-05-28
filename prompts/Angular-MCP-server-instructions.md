
# Setting up the Angular MCP server

Instead of relying on detailed context instructions via Claude.md or other files, there is a better way to guide an AI on how to write clean, modern Angular code.
The Angular MCP Server is a bit like an AI-compatible "plugin" that lets AI coding assistants like Claude access directly 
current Angular documentation and best practices directly. 

This allows the AI to:

- know which Angular version your project uses
- and find the right APIs and patterns for that specific version
- get current Angular recommendations
- browse up-to-date examples from the Angular docs
- learn best practices for signals, standalone components, routing, forms, testing, etc.

The key benefit is that the AI is less likely to hallucinate outdated Angular code.

For example, instead of generating old-style Angular code with unnecessary NgModules or outdated patterns,
the AI can look up the relevant Angular docs and produce code that better matches your current project setup.

In summary:

Angular MCP Server = a bridge between your AI coding agent and the official Angular knowledge base, 
so the agent writes more accurate, up-to-date Angular code.

# Setting up the Angular MCP Server 

- Edit the file  $HOME/.claude.json, $HOME being the root folder for your user in your file system

- locate your project

- add the Angular MCP server

```json
"mcpServers": {
  "angular-cli": {
    "command": "npx",
    "args": [
      "-y",
      "@angular/cli",
      "mcp"
    ]
    }
  }
```

- you can activate experimental flags one by one:

```json
"mcpServers": {
  "angular-cli": {
    "command": "npx",
    "args": [
      "-y",
      "@angular/cli",
      "mcp",
      "--experimental-tool",
      "modernize"
    ]
    }
  }
```
