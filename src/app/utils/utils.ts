import { Lead } from '../models/type';

export const getColumnOptions = (): { value: string; label: string }[] => [
  { value: 'status', label: 'Status' },
  { value: 'createdAt', label: 'Created At' },
  { value: 'priority', label: 'Priority' },
  { value: 'updatedAt', label: 'Updated At' },
  { value: 'salesAmount', label: 'Sales Amount' },
  { value: 'annualRevenue', label: 'Annual Revenue' },
  { value: 'leadScore', label: 'Lead Score' },
  { value: 'lastContacted', label: 'Last Contacted' },
];

export const getValueOptionsForColumn = (leads: Lead[], column: string): { value: string; label: string }[] => {
  const values = new Set<string>();

  leads.forEach(lead => {
    const value = lead[column as keyof Lead];
    if (value !== undefined && value !== null) {
      values.add(value.toString());
    }
  });

  return Array.from(values).map(value => ({ value, label: value }));
};
