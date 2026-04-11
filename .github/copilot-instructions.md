# Copilot Instructions for MCP-first Diary Access

Use the local MCP server tools as the primary interface for diary data access and mutations.

## MCP-first rule

When user intent is about diary data, always prefer MCP tools over direct file access.

Examples of intents:
- list workouts or plans
- add/update diary entries
- create/list diaries
- create/update/list exercises
- request summaries

Use these MCP tools first:
- `mcp_realtrainer-l_rt_init`
- `mcp_realtrainer-l_rt_list_diaries`
- `mcp_realtrainer-l_rt_create_diary`
- `mcp_realtrainer-l_rt_list_entries`
- `mcp_realtrainer-l_rt_add_entry`
- `mcp_realtrainer-l_rt_update_entry`
- `mcp_realtrainer-l_rt_list_exercises`
- `mcp_realtrainer-l_rt_create_exercise`
- `mcp_realtrainer-l_rt_update_exercise`
- `mcp_realtrainer-l_rt_summary`

## Do not bypass MCP by default

Do not read or write `~/.realtrainer/db.json` directly for normal user requests if equivalent MCP tools exist.

Only inspect files directly when:
- user explicitly asks for raw file inspection, or
- MCP tooling fails and user asks for fallback/debugging.

## User-facing behavior

If user asks naturally (without tool names), infer and call MCP tools anyway.
Do not require user to remember tool names.

If MCP returns empty data, explain that clearly and suggest the next MCP action (for example, `rt_init`, creating diaries, or adding first entry).
