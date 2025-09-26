import React, { useState, useEffect } from 'react';
import DataGrid, { type Column } from 'react-data-grid';
import { Layout, Model, TabNode, IJsonModel } from 'flexlayout-react';
type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
};

// Sample data for React Data Grid
const columns: Column<Row>[] = [
  { key: 'id', name: 'ID', width: 80 },
  { key: 'name', name: 'Name', width: 150 },
  { key: 'email', name: 'Email', width: 200 },
  { key: 'role', name: 'Role', width: 150 },
  { key: 'department', name: 'Department', width: 120 },
  { key: 'status', name: 'Status', width: 100 }
];

const initialRows: Row[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Backend Developer',
    department: 'Engineering',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'UI/UX Designer',
    department: 'Design',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Product Manager',
    department: 'Management',
    status: 'Active',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    status: 'Active',
  },
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
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  console.log('DataGridDemo rendering with rows:', rows);
  console.log('DataGridDemo rendering with columns:', columns);

  return (
    <div className='h-full p-4'>
      <h3 className='text-lg font-semibold mb-4 text-foreground'>React Data Grid Demo</h3>
      <div className="h-[400px] border border-border rounded-lg overflow-hidden">
        {isClient ? (
          (() => {
            const RDG = DataGrid as unknown as React.ComponentType<any>;
            return (
              <RDG
                columns={columns}
                rows={rows}
                rowKeyGetter={(row: Row) => row.id}
                style={{ height: '100%', border: 'none', fontSize: '14px' }}
                className="rdg-theme"
              />
            );
          })()
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">Loading grid…</div>
        )}
      </div>
    </div>
  );
}

// ErrorBoundary removed after switching to a compatible DataGrid version and static import

// Settings Panel Component
function SettingsPanel() {
  return (
    <div className='h-full p-4'>
      <h3 className='text-lg font-semibold mb-4 text-foreground'>Settings</h3>
      <div className='space-y-4'>
        <div className='bg-card p-4 rounded border border-border'>
          <h4 className='font-semibold mb-2 text-card-foreground'>Grid Options</h4>
          <div className='space-y-2'>
            <label className='flex items-center text-card-foreground'>
              <input type='checkbox' defaultChecked className='mr-2 accent-primary' />
              Enable Selection
            </label>
            <label className='flex items-center text-card-foreground'>
              <input type='checkbox' defaultChecked className='mr-2 accent-primary' />
              Enable Sorting
            </label>
            <label className='flex items-center text-card-foreground'>
              <input type='checkbox' defaultChecked className='mr-2 accent-primary' />
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
    <div className='h-full p-4'>
      <h3 className='text-lg font-semibold mb-4 text-foreground'>Properties</h3>
      <div className='space-y-4'>
        <div className='bg-card p-4 rounded border border-border'>
          <h4 className='font-semibold mb-2 text-card-foreground'>Grid Properties</h4>
          <div className='space-y-2'>
            <div>
              <label className='block text-sm font-medium text-card-foreground'>Width</label>
              <input 
                type='number' 
                defaultValue='800' 
                className='w-full p-2 border border-input rounded bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none' 
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-card-foreground'>Height</label>
              <input 
                type='number' 
                defaultValue='600' 
                className='w-full p-2 border border-input rounded bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none' 
              />
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="h-screen grid grid-rows-[auto,1fr] bg-background text-foreground">
      {/* Header */}
      <div className="border-b shadow-sm sticky top-0 z-10 h-24 bg-card border-border">
        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Workspace Demo
              </h1>
              <p className="text-sm text-muted-foreground">
                React Data Grid + FlexLayout Integration
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <label className="text-sm font-medium text-foreground">
                  Theme:
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                  className="px-3 py-1 border border-input rounded-md bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option value='light'>Light</option>
                  <option value='dark'>Dark</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className='relative overflow-auto' style={{ height: 'calc(100vh - 6rem)' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <Layout model={model} factory={componentFactory} />
        </div>
      </div>
    </div>
  );
}
