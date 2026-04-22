/**
 * Tabs — horizontal tab switcher used on Gurukula detail pages,
 * Gallery category filters, and anywhere tabbed content is needed.
 */

'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        className="flex gap-1 border-b border-ivory-300 overflow-x-auto"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`
              whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors
              border-b-2 -mb-px
              ${
                activeTab === tab.id
                  ? 'border-indigo text-indigo'
                  : 'border-transparent text-charcoal-300 hover:text-charcoal hover:border-ivory-400'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        className="pt-6"
      >
        {activeContent}
      </div>
    </div>
  );
}
