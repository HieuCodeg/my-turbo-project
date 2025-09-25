import React, { useState, useEffect } from 'react';
import { DataGrid, textEditor, SelectColumn } from 'react-data-grid';
import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react';

// Sample data for React Data Grid
const columns = [
  SelectColumn,
  { key: 'id', name: 'ID', width: 80, frozen: true },
  { key: 'name', name: 'Name', width: 150, editable: true, editor: textEditor },
  { key: 'email', name: 'Email', width: 200, editable: true, editor: textEditor },
  { key: 'role', name: 'Role', width: 150, editable: true, editor: textEditor },
  { key: 'department', name: 'Department', width: 120, editable: true, editor: textEditor },
  { key: 'status', name: 'Status', width: 100, editable: true, editor: textEditor },
];

const initialRows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Frontend Developer', department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Backend Developer', department: 'Engineering', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'UI/UX Designer', department: 'Design', status: 'Active' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Product Manager', department: 'Management', status: 'Active' },
  { id: 5, name: 'David Brown', email: 'david@example.com', role: 'QA Engineer', department: 'Quality Assurance', status: 'Active' },
];

// FlexLayout model configuration
const jsonModel: IJsonModel = {
  global: {
    tabEnableClose: true,
    tabEnableRename: true,
    tabEnableDrag: true,
  },
  borders: [],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'tabset',
        weight: 70,
        children: [
          {
            type: 'tab',
            name: 'Data Grid',
            component: 'datagrid',
          },
        ],
      },
      {
        type: 'tabset',
        weight: 30,
        children: [
          {
            type: 'tab',
            name: 'Settings',
            component: 'settings',
          },
          {
            type: 'tab',
            name: 'Properties',
            component: 'properties',
          },
        ],
      },
    ],
  },
};

// Component factory for FlexLayout
const componentFactory = (node: TabNode) => {
  const component = node.getComponent();
  switch (component) {
    case 'datagrid':
      return <DataGridDemo />;
    case 'settings':
      return <SettingsPanel />;
    case 'properties':
      return <PropertiesPanel />;
    default:
      return <div>Unknown component: {component}</div>;
  }
};

// Data Grid Demo Component
function DataGridDemo() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  
  console.log('DataGridDemo rendering with rows:', rows);
  console.log('DataGridDemo rendering with columns:', columns);
  
  return (
    <div className="h-full p-4">
      <h3 className="text-lg font-semibold mb-4">React Data Grid Demo</h3>
      <div style={{ height: '400px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          style={{ 
            height: '100%',
            border: 'none',
            fontSize: '14px'
          }}
        />
      </div>
    </div>
  );
}

// Settings Panel Component
function SettingsPanel() {
  return (
    <div className="h-full p-4">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold mb-2">Grid Options</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              Enable Selection
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              Enable Sorting
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              Enable Editing
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Properties Panel Component
function PropertiesPanel() {
  return (
    <div className="h-full p-4">
      <h3 className="text-lg font-semibold mb-4">Properties</h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold mb-2">Grid Properties</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Width</label>
              <input type="number" defaultValue="800" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Height</label>
              <input type="number" defaultValue="600" className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Workspace Page Component
export default function WorkspacePage() {
  const [model] = useState(() => Model.fromJson(jsonModel));
  const [theme, setTheme] = useState<'light' | 'dark' | 'blue' | 'green'>('light');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  return (
    <div className={`h-screen grid grid-rows-[auto,1fr] ${theme === 'dark' ? 'bg-gray-900 text-white' : theme === 'blue' ? 'bg-blue-50 text-blue-900' : theme === 'green' ? 'bg-green-50 text-green-900' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className={`border-b shadow-sm sticky top-0 z-10 h-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : theme === 'blue' ? 'bg-blue-100 border-blue-200' : theme === 'green' ? 'bg-green-100 border-green-200' : 'bg-white border-gray-200'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : theme === 'blue' ? 'text-blue-900' : theme === 'green' ? 'text-green-900' : 'text-gray-900'}`}>
                Workspace Demo
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : theme === 'blue' ? 'text-blue-700' : theme === 'green' ? 'text-green-700' : 'text-gray-600'}`}>
                React Data Grid + FlexLayout Integration
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : theme === 'blue' ? 'text-blue-900' : theme === 'green' ? 'text-green-900' : 'text-gray-900'}`}>Theme:</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'blue' | 'green')}
                  className="px-3 py-1 border rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="relative min-h-0 h-full overflow-auto">
        <Layout model={model} factory={componentFactory} className="h-full" style={{ height: '100%' }} />
      </div>
    </div>
  );
}