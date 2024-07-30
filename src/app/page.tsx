// App.tsx
"use client";
import React, { useState, useEffect } from 'react';
import AutomationRuleForm from './components/AutomationRuleForm';
import LeadList from './components/LeadList';
import { Lead, AutomationRule } from './models/type';
import { leads } from './models/data';

const App: React.FC = () => {
  const [leadData, setLeadData] = useState<Lead[]>(leads);
  const [rules, setRules] = useState<AutomationRule[]>([]);

  useEffect(() => {
    console.log("Lead data loaded:", leadData);
  }, [leadData]);

  const updateLeadStatus = (leadId: number, newStatus: string) => {
    setLeadData(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    checkAndExecuteAutomations(leadId, newStatus);
  };

  const checkAndExecuteAutomations = (leadId: number, newStatus: string) => {
    rules.forEach(rule => {
      if (rule.triggerField === 'status' && rule.triggerValue === newStatus) {
        rule.actions.forEach(action => {
          executeAction(action, leadId);
        });
      }
    });
  };

  const executeAction = (action: { type: string }, leadId: number) => {
    switch (action.type) {
      case 'SEND_EMAIL':
        console.log(`Sending email for lead ID ${leadId}`);
        break;
    }
  };

  const addAutomationRule = (rule: AutomationRule) => {
    setRules(prevRules => [...prevRules, rule]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex">
        <LeadList leads={leadData} onUpdateStatus={updateLeadStatus} />
      </div>
      <div className="p-6 bg-gray-100">
        <AutomationRuleForm leads={leadData} onAddRule={addAutomationRule} />
      </div>
    </div>
  );
};

export default App;
