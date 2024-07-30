// dropdownOptions.ts
export const columnOptions = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'company',
  'jobTitle',
  'leadSource',
  'status',
  'createdAt',
  'updatedAt',
  'notes',
  'priority',
  'address',
  'website',
  'industry',
  'annualRevenue',
  'numberOfEmployees',
  'leadScore',
  'lastContacted',
  'contactMethod',
  'salesAmount'
];

export const conditionOptions = [
  { value: 'changes', label: 'Changes to' },
];

export const triggerOptions = [
  
  { value: 'when', label: 'When' },
  { value: 'created', label: 'Item Created' },
];

export const stringConditions = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'doesNotEqual', label: 'Does Not Equal' },
  { value: 'startsWith', label: 'Starts With' },
  { value: 'endsWith', label: 'Ends With' },
  { value: 'isEmpty', label: 'Is Empty' },
  { value: 'isNotEmpty', label: 'Is Not Empty' }
];

export const numericConditions = [
  { value: 'equals', label: 'Equals' },
  { value: 'greaterThan', label: 'Greater Than' },
  { value: 'lessThan', label: 'Less Than' },
  { value: 'greaterThanOrEqual', label: 'Greater Than or Equal' },
  { value: 'lessThanOrEqual', label: 'Less Than or Equal' },
  { value: 'between', label: 'Between' },
  { value: 'notEqual', label: 'Not Equal' }
];

export const dateConditions = [
  { value: 'before', label: 'Before' },
  { value: 'after', label: 'After' },
  { value: 'on', label: 'On' },
  { value: 'notOn', label: 'Not On' },
  { value: 'between', label: 'Between' },
  { value: 'notBetween', label: 'Not Between' }
];

export const booleanConditions = [
  { value: 'isTrue', label: 'Is True' },
  { value: 'isFalse', label: 'Is False' }
];

export const timeOptions = [
  { value: '1_day', label: '1 day' },
  { value: '2_days', label: '2 days' },
  { value: '1_week', label: '1 week' },
  { value: '2_weeks', label: '2 weeks' },
  { value: '1_month', label: '1 month' },
  { value: '3_months', label: '3 months' },
  { value: '6_months', label: '6 months' },
  { value: '1_year', label: '1 year' }
];
