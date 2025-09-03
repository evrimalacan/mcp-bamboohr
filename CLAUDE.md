# BambooHR MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with access to BambooHR's API. This server exposes 10 essential BambooHR operations as MCP tools, enabling seamless integration of HR data into AI workflows.

## Features

The server provides access to these BambooHR capabilities:

### Employee Management
- **Get Employee Data**: Retrieve detailed employee information with customizable field selection
- **Get Employee Photo**: Download employee photos in various sizes
- **Get Employee Directory**: Access the company-wide employee directory
- **Get Employee Goals**: Retrieve performance goals and objectives

### Time Off Management  
- **Estimate Time Off Balance**: Calculate future time off balances for employees
- **Get Time Off Requests**: Retrieve and filter time off requests
- **Get Who's Out**: View upcoming time off and holidays

### Company Resources
- **List Company Files**: Browse available company files and categories
- **Get Company File**: Download specific company documents
- **Get Meta Fields**: Discover available data fields

## Installation

### NPM Installation (Recommended)

```bash
npm install -g mcp-bamboohr
```

### From Source

1. Clone the repository
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Run: `npm start`

## Setup

### 1. Get BambooHR API Credentials

1. Log into your BambooHR account as an administrator
2. Go to Settings → API Keys
3. Generate a new API key
4. Note your company subdomain (the part before `.bamboohr.com` in your BambooHR URL)

### 2. Configure Claude Desktop

Add the server to your Claude Desktop configuration with your credentials:

```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "npx",
      "args": ["mcp-bamboohr@latest"],
      "type": "stdio",
      "env": {
        "BAMBOO_API_TOKEN": "your_actual_api_token",
        "BAMBOO_COMPANY_DOMAIN": "your_company_subdomain"
      }
    }
  }
}
```

## Usage

### MCP Client Configuration

Add this server to your MCP client configuration:

**For Claude Desktop (recommended):**
```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "npx",
      "args": ["mcp-bamboohr"],
      "env": {
        "BAMBOO_API_TOKEN": "your_api_key",
        "BAMBOO_COMPANY_DOMAIN": "your_company"
      }
    }
  }
}
```

**For local development:**
```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "node",
      "args": ["build/index.js"],
      "cwd": "/path/to/mcp-bamboohr",
      "env": {
        "BAMBOO_API_TOKEN": "your_api_key",
        "BAMBOO_COMPANY_DOMAIN": "your_company"
      }
    }
  }
}
```

### Available Tools

#### Employee Tools

**`get-employee`**
```
Get employee data by ID with customizable field selection
Parameters:
- id: Employee ID (use "0" for current user)
- fields: Comma-separated field names (e.g., "firstName,lastName,email,jobTitle")
- onlyCurrent: Boolean, return only current values (default: true)
```

**`get-employee-photo`**
```
Download employee photos
Parameters:
- employeeId: The employee ID
- size: Photo size (original, large, medium, small, xs, tiny)
```

**`get-employee-directory`**
```
Get the company employee directory
Parameters: None
```

**`get-employee-goals`**
```
Retrieve employee performance goals
Parameters:
- employeeId: The employee ID
- filter: Goal status filter (open, closed, all)
```

#### Time Off Tools

**`estimate-time-off-balance`**
```
Calculate future time off balances
Parameters:
- employeeId: The employee ID
- date: Future date in YYYY-MM-DD format (optional)
```

**`get-time-off-requests`**
```
Retrieve time off requests with filtering options
Parameters (all optional):
- id: Specific request ID
- action: Access level (view, approve)
- employeeId: Filter by employee
- start/end: Date range (YYYY-MM-DD)
- status: Request status
- type: Time off type ID
```

**`get-whos-out`**
```
View who's out for a date range
Parameters:
- start: Start date (YYYY-MM-DD, defaults to today)
- end: End date (YYYY-MM-DD, defaults to 14 days from start)
```

#### Company/Meta Tools

**`list-company-files`**
```
List all company files and categories
Parameters: None
```

**`get-company-file`**
```
Download a specific company file
Parameters:
- fileId: The file ID to retrieve
```

**`get-meta-fields`**
```
Get all available fields in your BambooHR account
Parameters: None
```


## Example Usage

```javascript
// Get employee information
await callTool("get-employee", {
  id: "123",
  fields: "firstName,lastName,email,jobTitle,department,hireDate"
});

// Check who's out this week
await callTool("get-whos-out", {
  start: "2024-01-15",
  end: "2024-01-21"
});

// Get time off requests for approval
await callTool("get-time-off-requests", {
  action: "approve",
  status: "requested"
});
```

## Security Considerations

- **API Token Security**: Store your API token securely and never commit it to version control
- **Environment Variables**: Use the `.env` file for configuration, which is excluded from git
- **Access Permissions**: The server respects BambooHR's permission system - users can only access data they have rights to see
- **Rate Limiting**: The server includes built-in request timeout and error handling

## Error Handling

The server provides detailed error messages for common issues:

- **401 Unauthorized**: Invalid API token
- **403 Forbidden**: Insufficient permissions 
- **404 Not Found**: Resource doesn't exist
- **429 Rate Limited**: Too many requests
- **Network Errors**: Connection timeouts or failures

## Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Development

### Project Structure

```
src/
├── index.ts          # MCP server setup and tool registration
├── config.ts         # Environment configuration
├── bambooClient.ts   # BambooHR API client with authentication
├── types.ts          # TypeScript type definitions
├── tools/            # Individual tool implementations
│   ├── employees.ts  # Employee-related tools
│   ├── timeOff.ts    # Time off management tools
│   └── meta.ts       # Meta/company tools
└── __tests__/        # Test files
```

### Adding New Tools

1. Define the endpoint in the appropriate tool file
2. Create Zod schema for input validation
3. Implement the tool function with error handling
4. Register the tool in `index.ts`
5. Add comprehensive tests

## Troubleshooting

### Common Issues

**"Authentication failed"**
- Verify your API token is correct
- Ensure your company domain is the subdomain only (not the full URL)

**"Access forbidden"** 
- Check that your BambooHR user has API access enabled
- Verify permissions for the specific resource you're accessing

**"Resource not found"**
- Confirm the employee ID, file ID, or other resource exists
- Check that you have permission to access the resource

**Network timeouts**
- The server includes a 30-second timeout for API calls
- Check your internet connection and BambooHR service status

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your `.env` file. This will log all API requests and responses.

## API Reference

This server uses BambooHR's v1 REST API. For detailed API documentation, refer to:
https://documentation.bamboohr.com/reference

## Support

- Review the test files for usage examples
- Ensure your BambooHR plan includes API access

## License

MIT License - see LICENSE file for details.