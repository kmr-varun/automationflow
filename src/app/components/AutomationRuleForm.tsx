import React, { useState, useEffect } from 'react';
import { Lead, AutomationRule } from '../models/type';
import { getValueOptionsForColumn, getColumnOptions } from '../utils/utils';
import {
  triggerOptions,
  stringConditions,
  dateConditions,
  timeOptions,
  numericConditions
} from '../models/dropdownOptions';

interface AutomationRuleFormProps {
  leads: Lead[];
  onAddRule: (rule: AutomationRule) => void;
}

const AutomationRuleForm: React.FC<AutomationRuleFormProps> = ({ leads, onAddRule }) => {
  const [selectedTrigger, setSelectedTrigger] = useState<string>('');
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('SEND_EMAIL');
  const [valueOptions, setValueOptions] = useState<{ value: string; label: string }[]>([]);
  const [conditionOptions, setConditionOptions] = useState<{ value: string; label: string }[]>([]);
  const [timeOptionsVisible, setTimeOptionsVisible] = useState<boolean>(false);
  const [numericOptionsVisible, setNumericOptionsVisible] = useState<boolean>(false);
  const [rangeStart, setRangeStart] = useState<string>('');
  const [rangeEnd, setRangeEnd] = useState<string>('');
  const [dateRangeStart, setDateRangeStart] = useState<string>('');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('');
  const [singleDate, setSingleDate] = useState<string>('');
  const [rules, setRules] = useState<AutomationRule[]>([]);

  useEffect(() => {
    if (selectedColumn) {
      if (['salesAmount', 'annualRevenue', 'leadScore'].includes(selectedColumn)) {
        setConditionOptions(numericConditions);
        const options = getValueOptionsForColumn(leads, selectedColumn);
        setValueOptions(options);
        setNumericOptionsVisible(true);
        setTimeOptionsVisible(false);
      } else if (['createdAt', 'updatedAt', 'lastContacted'].includes(selectedColumn)) {
        setConditionOptions(dateConditions);
        setValueOptions([]);
        setTimeOptionsVisible(true);
        setNumericOptionsVisible(false);
      } else if (['status', 'priority'].includes(selectedColumn)) {
        setConditionOptions(stringConditions);
        setValueOptions(getValueOptionsForColumn(leads, selectedColumn));
        setTimeOptionsVisible(false);
        setNumericOptionsVisible(false);
      } else {
        setConditionOptions([]);
        setValueOptions(getValueOptionsForColumn(leads, selectedColumn));
        setTimeOptionsVisible(false);
        setNumericOptionsVisible(false);
      }
    }
  }, [selectedColumn, leads]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTrigger && selectedColumn && selectedCondition && (selectedCondition === 'between'
      ? (selectedColumn.includes('At') ? dateRangeStart && dateRangeEnd : rangeStart && rangeEnd) 
      : (selectedColumn.includes('At') ? singleDate : selectedValue))) {
        
      const currentTime = new Date().toISOString();
      const newRule: AutomationRule = {
        id: Date.now(),
        triggerField: selectedColumn,
        triggerValue: selectedCondition === 'between'
          ? (selectedColumn.includes('At') ? `${dateRangeStart}-${dateRangeEnd}` : `${rangeStart}-${rangeEnd}`)
          : (selectedColumn.includes('At') ? singleDate : selectedValue),
        triggerType: selectedTrigger,
        condition: selectedCondition,
        createdTime: currentTime,
        updatedTime: currentTime,
        actions: [{ type: selectedAction }]
      };

      setRules([...rules, newRule]);
      onAddRule(newRule);

      setSelectedTrigger('');
      setSelectedColumn('');
      setSelectedCondition('');
      setSelectedValue('');
      setRangeStart('');
      setRangeEnd('');
      setDateRangeStart('');
      setDateRangeEnd('');
      setSingleDate('');
      setSelectedAction('SEND_EMAIL');
    } else {
      console.log('Please fill all fields');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Automation Trigger</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Trigger Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Trigger</label>
                  <select
                    value={selectedTrigger}
                    onChange={(e) => setSelectedTrigger(e.target.value)}
                    className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select trigger</option>
                    {triggerOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Column</label>
                  <select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select column</option>
                    {getColumnOptions().map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Condition & Value</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select condition</option>
                    {conditionOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-2">Value</label>
                  {selectedCondition === 'between' && selectedColumn.includes('At') ? (
                    <div className="flex flex-col gap-4">
                      <input
                        type="date"
                        value={dateRangeStart}
                        onChange={(e) => setDateRangeStart(e.target.value)}
                        className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="date"
                        value={dateRangeEnd}
                        onChange={(e) => setDateRangeEnd(e.target.value)}
                        className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  ) : selectedCondition === 'between' ? (
                    <div className="flex flex-col gap-4">
                      <input
                        type="number"
                        value={rangeStart}
                        onChange={(e) => setRangeStart(e.target.value)}
                        placeholder="Start"
                        className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        type="number"
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(e.target.value)}
                        placeholder="End"
                        className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  ) : selectedColumn.includes('At') && (selectedCondition === 'on' || selectedCondition === 'not on') ? (
                    <input
                      type="date"
                      value={singleDate}
                      onChange={(e) => setSingleDate(e.target.value)}
                      className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ) : (
                    <select
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select value</option>
                      {timeOptionsVisible ? timeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      )) : numericOptionsVisible ? valueOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      )) : valueOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Action</h3>
              <div className="flex flex-col">
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="block w-full bg-white text-gray-700 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="SEND_EMAIL">Send Email</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg font-semibold"
          >
            Create Trigger
          </button>
        </form>
        <div className="mt-8 space-y-4">
          {rules.map(rule => (
            <div key={rule.id} className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
              <pre className="whitespace-pre-wrap">{JSON.stringify(rule, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationRuleForm;
