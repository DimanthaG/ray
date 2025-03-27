import { createClient } from '@vercel/edge-config';

export type Client = {
  id: number;
  name: string;
  email: string;
  project: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export type Portfolio = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export type EdgeConfigData = {
  clients: Client[];
  portfolio: Portfolio[];
}

// Create the Edge Config client
export const edgeConfig = createClient(process.env.EDGE_CONFIG!);

// Helper functions with proper typing
export async function getClients(): Promise<Client[]> {
  try {
    const clients = await edgeConfig.get<Client[]>('clients');
    return clients || [];
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

export async function getPortfolio(): Promise<Portfolio[]> {
  try {
    const portfolio = await edgeConfig.get<Portfolio[]>('portfolio');
    return portfolio || [];
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
}

// Since Edge Config doesn't have a direct set method, we'll use update
export async function setClients(clients: Client[]): Promise<boolean> {
  try {
    await fetch('/api/admin/edge-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'clients', value: clients }),
    });
    return true;
  } catch (error) {
    console.error('Error setting clients:', error);
    return false;
  }
}

export async function setPortfolio(portfolio: Portfolio[]): Promise<boolean> {
  try {
    await fetch('/api/admin/edge-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'portfolio', value: portfolio }),
    });
    return true;
  } catch (error) {
    console.error('Error setting portfolio:', error);
    return false;
  }
} 