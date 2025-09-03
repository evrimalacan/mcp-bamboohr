# BambooHR MCP Server

[![npm version](https://badge.fury.io/js/mcp-bamboohr.svg)](https://badge.fury.io/js/mcp-bamboohr)
[![Coverage: 100%](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)](https://github.com/evrimalacan/mcp-bamboohr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **Model Context Protocol (MCP)** server that seamlessly connects AI assistants to BambooHR's API. Access employee data, time off information, company files, and more through natural language queries in Claude and other AI assistants.

## 🚀 Quick Start

### Get Your BambooHR Credentials

1. Log into your BambooHR account
2. Click your name in the lower left-hand corner of any page
3. Select **API Keys** from the user context menu (if you have sufficient permissions)
4. Generate a new API key
5. Note your company subdomain (the part before `.bamboohr.com`)

### Configuration

Add the server to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "bamboohr": {
      "command": "npx",
      "args": ["mcp-bamboohr"],
      "type": "stdio",
      "env": {
        "BAMBOO_API_TOKEN": "your_actual_api_token",
        "BAMBOO_COMPANY_DOMAIN": "your_company_subdomain"
      }
    }
  }
}
```


## ✨ Features

- 🧑‍💼 **Employee Management** - Get employee data, photos, directory, and performance goals
- 🏖️ **Time Off Management** - Check balances, requests, and who's out
- 📁 **Company Resources** - Access files, documents, and metadata
- 🔒 **Token Authentication** - Uses BambooHR's API with token authentication
- 🎯 **Type Safety** - Full TypeScript support with type definitions
- ✅ **100% Test Coverage** - 71 tests covering all code
- 🛡️ **Error Handling** - Proper error handling and timeouts
- 📚 **Documentation** - Setup guides and examples

## 🛠️ Available Tools

The server provides **10 MCP tools** covering essential BambooHR operations:

### Employee Management
- `get-employee` - Retrieve detailed employee information with customizable fields
- `get-employee-photo` - Download employee photos in various sizes
- `get-employee-directory` - Access the complete company directory
- `get-employee-goals` - View performance goals and objectives

### Time Off Management
- `estimate-time-off-balance` - Calculate future time off balances
- `get-time-off-requests` - Retrieve and filter time off requests
- `get-whos-out` - View upcoming time off and holidays

### Company Resources
- `list-company-files` - Browse available company files and categories
- `get-company-file` - Download specific company documents
- `get-meta-fields` - Discover all available BambooHR data fields

## 💡 Example Queries

- *"Show me John Smith's employee information"*
- *"Who's out of office next week?"*
- *"What are the pending time off requests that need approval?"*
- *"Download the employee handbook from company files"*
- *"What are Sarah's current performance goals?"*
- *"How much vacation time will I have by year-end?"*

## 🏗️ Development

### From Source

```bash
# Clone and setup
git clone https://github.com/evrimalacan/mcp-bamboohr.git
cd mcp-bamboohr
npm install

# Build
npm run build

# Run tests (71 comprehensive tests with 100% coverage)
npm test

# Development mode
npm run dev
```

## 🐛 Troubleshooting

### Common Issues

**"Authentication failed"**
- Verify your API token is correct
- Ensure company domain is just the subdomain (not full URL)

**"Access forbidden"**
- Check your BambooHR user has API access enabled
- Verify permissions for the specific resource

**"Resource not found"**
- Confirm the employee ID or resource exists
- Check you have permission to access the resource

## 📚 Documentation

- **[Complete Usage Guide](CLAUDE.md)** - Detailed setup, configuration, and usage
- **[BambooHR API Documentation](https://documentation.bamboohr.com/reference)** - Official API reference

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/evrimalacan/mcp-bamboohr/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/evrimalacan/mcp-bamboohr/discussions)
- 📖 **Documentation**: See [CLAUDE.md](CLAUDE.md) for comprehensive guide

---

**Made with tons of ❤️**
