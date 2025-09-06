// Enhanced API wrapper for Gbc Contract
// Generated on: 2025-09-06T11:47:45.385Z
// Auto-generated from gbc.compact

import { type Logger } from 'pino';
import { ContractAnalyzer } from './contract-analyzer.js';
import { DynamicCLIGenerator } from './dynamic-cli-generator.js';
import * as originalApi from './api.js';

// Re-export all original API functions
export * from './api.js';

/**
 * Contract information interface
 */
export interface ContractInfo {
  contractName: string;
  functions: Array<{
    name: string;
    parameters: Array<{ name: string; type: string }>;
    returnType: string;
    readOnly: boolean;
    description: string;
  }>;
  ledgerState: Array<{ name: string; type: string }>;
  witnesses: Array<{
    name: string;
    ledgerType: string;
    privateType: string;
    returns: string[];
  }>;
}

/**
 * Enhanced API with dynamic contract analysis
 */
export class EnhancedContractAPI {
  private analyzer: ContractAnalyzer;
  private cliGenerator: DynamicCLIGenerator;
  private contractInfo: ContractInfo | null;

  constructor(logger: Logger) {
    this.analyzer = new ContractAnalyzer();
    this.cliGenerator = new DynamicCLIGenerator(logger);
    this.contractInfo = null;
  }

  async initialize(): Promise<ContractInfo> {
    try {
      const analysis = await this.analyzer.analyzeContract();
      await this.cliGenerator.initialize();
      
      // Convert ContractAnalysis to ContractInfo format
      this.contractInfo = {
        contractName: analysis.contractName,
        functions: analysis.functions.map(func => ({
          ...func,
          readOnly: this.analyzer.isReadOnlyFunction(func.name),
          description: func.description || `Execute ${func.name} function`
        })),
        ledgerState: Object.entries(analysis.ledgerState).map(([name, type]) => ({ name, type })),
        witnesses: analysis.witnesses.map(witness => ({
          name: witness.name,
          ledgerType: witness.ledgerType,
          privateType: witness.privateType,
          returns: witness.returns
        }))
      };
      
      return this.contractInfo;
    } catch (error) {
      throw new Error(`Failed to initialize enhanced API: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  getContractInfo(): ContractInfo | null {
    return this.contractInfo;
  }

  generateMenuItems(): any[] {
    return this.cliGenerator.generateMenuItems();
  }

  generateMenuQuestion(menuItems: any[]): string {
    return this.cliGenerator.generateMenuQuestion(menuItems);
  }

  // Dynamic function mapping based on contract analysis
  /**
   * Execute getTotalBalance function
   */
  async getTotalBalance(...args: any[]): Promise<any> {
    return await (originalApi as any).getTotalBalance(...args);
  }
  /**
   * Execute getBalance function
   */
  async getBalance(...args: any[]): Promise<any> {
    return await (originalApi as any).getBalance(...args);
  }
  /**
   * Execute nextHole function
   */
  async nextHole(...args: any[]): Promise<any> {
    return await (originalApi as any).nextHole(...args);
  }
  /**
   * Execute publicKey function
   */
  async publicKey(...args: any[]): Promise<any> {
    return await (originalApi as any).publicKey(...args);
  }
}

// Export contract metadata for reference
export const CONTRACT_METADATA = {
  name: 'Gbc Contract',
  fileName: 'gbc.compact',
  generatedAt: '2025-09-06T11:47:45.386Z',
  functions: [
  {
    "name": "getTotalBalance",
    "parameters": [],
    "returnType": "Bytes<32>",
    "readOnly": true
  },
  {
    "name": "getBalance",
    "parameters": [
      {
        "name": "pk",
        "type": "Bytes<32>"
      }
    ],
    "returnType": "Bytes<32>",
    "readOnly": true
  },
  {
    "name": "nextHole",
    "parameters": [],
    "returnType": "[]",
    "readOnly": false
  },
  {
    "name": "publicKey",
    "parameters": [
      {
        "name": "sk",
        "type": "Bytes<32>"
      }
    ],
    "returnType": "Bytes<32>",
    "readOnly": true
  }
],
  ledgerState: [
  {
    "name": "totalbalance",
    "type": "Bytes<32>"
  },
  {
    "name": "balances",
    "type": "Map<Bytes<32>, Bytes<32>>"
  }
],
  witnesses: []
} as const;
