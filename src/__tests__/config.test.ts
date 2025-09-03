// Mock dotenv to prevent it from loading .env file
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('Config', () => {
  // Store original env vars
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    // Clear env vars for clean slate
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('with valid environment variables', () => {
    it('should load config from environment variables', () => {
      process.env.BAMBOO_API_TOKEN = 'test-token-123';
      process.env.BAMBOO_COMPANY_DOMAIN = 'test-company';
      process.env.DEBUG = 'true';

      const { bambooConfig } = require('../config');

      expect(bambooConfig.apiToken).toBe('test-token-123');
      expect(bambooConfig.companyDomain).toBe('test-company');
      expect(bambooConfig.debug).toBe(true);
    });

    it('should default debug to false', () => {
      process.env.BAMBOO_API_TOKEN = 'test-token-123';
      process.env.BAMBOO_COMPANY_DOMAIN = 'test-company';
      // Don't set DEBUG

      const { bambooConfig } = require('../config');

      expect(bambooConfig.debug).toBe(false);
    });

    it('should handle debug as string "false"', () => {
      process.env.BAMBOO_API_TOKEN = 'test-token-123';
      process.env.BAMBOO_COMPANY_DOMAIN = 'test-company';
      process.env.DEBUG = 'false';

      const { bambooConfig } = require('../config');

      expect(bambooConfig.debug).toBe(false);
    });
  });

  describe('with missing environment variables', () => {
    it('should throw error when API token is missing', () => {
      process.env.BAMBOO_COMPANY_DOMAIN = 'test-company';
      // Don't set BAMBOO_API_TOKEN

      expect(() => {
        require('../config');
      }).toThrow('BAMBOO_API_TOKEN environment variable is required');
    });

    it('should throw error when company domain is missing', () => {
      process.env.BAMBOO_API_TOKEN = 'test-token-123';
      // Don't set BAMBOO_COMPANY_DOMAIN

      expect(() => {
        require('../config');
      }).toThrow('BAMBOO_COMPANY_DOMAIN environment variable is required');
    });

    it('should throw error when both are missing', () => {
      // Don't set either

      expect(() => {
        require('../config');
      }).toThrow('BAMBOO_API_TOKEN environment variable is required');
    });
  });

  describe('config properties', () => {
    beforeEach(() => {
      process.env.BAMBOO_API_TOKEN = 'test-token-123';
      process.env.BAMBOO_COMPANY_DOMAIN = 'test-company';
    });

    it('should have correct apiToken', () => {
      const { bambooConfig } = require('../config');
      expect(bambooConfig.apiToken).toBe('test-token-123');
    });

    it('should have correct companyDomain', () => {
      const { bambooConfig } = require('../config');
      expect(bambooConfig.companyDomain).toBe('test-company');
    });

    it('should handle environment variables correctly', () => {
      process.env.BAMBOO_API_TOKEN = 'test-token-123';
      process.env.BAMBOO_COMPANY_DOMAIN = 'test-company';

      const { bambooConfig } = require('../config');

      expect(bambooConfig.apiToken).toBe('test-token-123');
      expect(bambooConfig.companyDomain).toBe('test-company');
      expect(bambooConfig.baseUrl).toBe('https://test-company.bamboohr.com/api/v1');
    });
  });
});