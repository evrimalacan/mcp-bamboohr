import { config } from 'dotenv';

config();

export interface BambooConfig {
  apiToken: string;
  companyDomain: string;
  baseUrl: string;
  debug: boolean;
}

function validateConfig(): BambooConfig {
  const apiToken = process.env.BAMBOO_API_TOKEN;
  const companyDomain = process.env.BAMBOO_COMPANY_DOMAIN;
  const debug = process.env.DEBUG === 'true';

  if (!apiToken) {
    throw new Error('BAMBOO_API_TOKEN environment variable is required');
  }

  if (!companyDomain) {
    throw new Error('BAMBOO_COMPANY_DOMAIN environment variable is required');
  }

  const baseUrl = `https://${companyDomain}.bamboohr.com/api/v1`;

  return {
    apiToken,
    companyDomain,
    baseUrl,
    debug,
  };
}

export const bambooConfig = validateConfig();