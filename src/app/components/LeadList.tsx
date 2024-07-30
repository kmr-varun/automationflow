import React from 'react';
import { Lead } from '../models/type';

interface LeadListProps {
  leads: Lead[];
  onUpdateStatus: (leadId: number, newStatus: string) => void;
}

const LeadList: React.FC<LeadListProps> = ({ leads, onUpdateStatus }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-full mx-auto overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Database</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Revenue</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Score</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contacted</th> {/* Optional */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Method</th> {/* Optional */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map(lead => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.leadSource}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.updatedAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${lead.salesAmount?.toFixed(2) || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.address || 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.website || 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.industry || 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.annualRevenue ? `$${lead.annualRevenue.toLocaleString()}` : 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.numberOfEmployees || 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.leadScore || 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.lastContacted || 'N/A'}</td> {/* Optional Data */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.contactMethod || 'N/A'}</td> {/* Optional Data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadList;
