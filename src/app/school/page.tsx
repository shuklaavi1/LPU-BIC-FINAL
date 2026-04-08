import Link from 'next/link';

export default function SchoolDashboard() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-app-bg text-text-primary p-6 md:p-10">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">School Dashboard</h1>
            <p className="text-text-secondary mt-1">Manage classes, students, and track Innobotix project usage.</p>
          </div>
          <button className="bg-btn-bg border border-panel-border text-text-primary px-4 py-2 rounded-lg hover:bg-btn-hover transition-colors text-sm font-medium">
            Export Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-panel-bg border border-panel-border rounded-xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-accent-teal">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <span className="text-sm font-medium text-text-secondary">Total Students</span>
            <span className="text-4xl font-bold text-text-primary">1,492</span>
            <span className="text-xs text-accent-teal flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              +12% from last month
            </span>
          </div>

          <div className="bg-panel-bg border border-panel-border rounded-xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <span className="text-sm font-medium text-text-secondary">Projects Generated</span>
            <span className="text-4xl font-bold text-text-primary">3,854</span>
            <span className="text-xs text-purple-400 flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              +450 this week
            </span>
          </div>

          <div className="bg-panel-bg border border-panel-border rounded-xl p-6 shadow-sm flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <span className="text-sm font-medium text-text-secondary">Active Classes</span>
            <span className="text-4xl font-bold text-text-primary">34</span>
            <span className="text-xs text-blue-400 flex items-center gap-1 mt-1">
              Spread across Grade 8-12
            </span>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-panel-bg border border-panel-border rounded-xl drop-shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-panel-border">
              <h3 className="font-semibold text-text-primary">Class Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-text-secondary bg-zinc-900/50">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Class</th>
                    <th className="px-6 py-3 font-semibold">Students</th>
                    <th className="px-6 py-3 font-semibold">Projects Completed</th>
                    <th className="px-6 py-3 font-semibold">Avg. Simulation Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium">Grade 10 - Section A</td>
                    <td className="px-6 py-4">45</td>
                    <td className="px-6 py-4">112</td>
                    <td className="px-6 py-4 text-accent-teal font-medium">94%</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium">Grade 11 - Section C</td>
                    <td className="px-6 py-4">38</td>
                    <td className="px-6 py-4">85</td>
                    <td className="px-6 py-4 text-accent-teal font-medium">88%</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium">Grade 8 - Robotics Club</td>
                    <td className="px-6 py-4">24</td>
                    <td className="px-6 py-4">60</td>
                    <td className="px-6 py-4 text-purple-400 font-medium">96%</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium">Grade 12 - Section B</td>
                    <td className="px-6 py-4">42</td>
                    <td className="px-6 py-4">150</td>
                    <td className="px-6 py-4 text-accent-teal font-medium">91%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-panel-bg border border-panel-border rounded-xl drop-shadow-sm flex flex-col p-5">
            <h3 className="font-semibold text-text-primary mb-4">Projects Generated / Week</h3>
            
            {/* CSS-based Mock Bar Chart */}
            <div className="flex-1 flex items-end justify-between gap-2 mt-4 pt-4 border-t border-dashed border-panel-border">
              <div className="w-full flex justify-between items-end h-40 group">
                <div className="w-[12%] bg-btn-bg group-hover:opacity-50 transition-opacity rounded-t-sm h-[30%]"></div>
                <div className="w-[12%] bg-btn-bg group-hover:opacity-50 transition-opacity rounded-t-sm h-[45%]"></div>
                <div className="w-[12%] bg-btn-bg group-hover:opacity-50 transition-opacity rounded-t-sm h-[60%]"></div>
                <div className="w-[12%] bg-btn-bg group-hover:opacity-50 transition-opacity rounded-t-sm h-[50%]"></div>
                <div className="w-[12%] bg-btn-bg group-hover:opacity-50 transition-opacity rounded-t-sm h-[80%]"></div>
                <div className="w-[12%] bg-accent-teal transition-opacity rounded-t-sm h-[100%] shadow-[0_0_15px_rgba(20,184,166,0.5)]"></div>
              </div>
            </div>
            <div className="w-full flex justify-between items-end mt-2 text-[10px] text-text-secondary uppercase">
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
              <span>W5</span>
              <span className="text-accent-teal font-bold">W6</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
