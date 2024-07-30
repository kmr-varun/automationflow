// type.ts
// type.ts
export interface Lead {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    leadSource: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    notes: string;
    priority: string;
    address?: string;
    website?: string;
    industry?: string;
    annualRevenue?: number;
    numberOfEmployees?: number;
    leadScore?: number;
    lastContacted?: string;
    contactMethod?: string;
    salesAmount?: number;
}


export interface AutomationRule {
    id: number;
    triggerField: string;
    triggerType: string;
    condition: string,
    createdTime: string,
    updatedTime: string,
    triggerValue: string;
    actions: { type: string }[];
}
