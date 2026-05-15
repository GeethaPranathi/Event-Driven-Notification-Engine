import { useState } from 'react';
import { 
  Activity, 
  BarChart3, 
  Bell, 
  Heart, 
  LayoutDashboard, 
  Shield, 
  Zap,
  Menu,
  X,
  Settings as SettingsIcon,
  Search,
  User as UserIcon,
  ChevronRight,
  CheckCircle2,
  Users,
  Database,
  Lock,
  LogOut,
  ArrowLeft,
  Server,
  Cpu,
  HardDrive,
  Globe,
  AlertCircle,
  FileText,
  Sliders
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- View Components ---

const DashboardView = ({ stats, chartData, notifications, onClear }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="stats-grid">
      {stats.map((s: any, i: number) => (
        <div key={i} className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--accent-soft)', borderRadius: '10px' }}>{s.icon}</div>
            <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 600 }}>+12%</div>
          </div>
          <div className="value">{s.value}<span style={{ fontSize: '1rem', marginLeft: '0.25rem', color: 'var(--text-muted)' }}>{s.unit}</span></div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="content-grid">
      <div className="glass-panel">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Activity Trend</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-pink)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-pink)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="val" stroke="var(--accent-pink)" fillOpacity={1} fill="url(#colorPink)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {notifications.map((n: any) => (
              <motion.div key={n.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} style={{ padding: '1rem', background: 'var(--accent-soft)', borderRadius: '1rem', position: 'relative' }}>
                <button onClick={() => onClear(n.id)} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: 'var(--accent-pink)' }}><X size={16} /></button>
                <div className="badge badge-pink" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{n.type}</div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{n.msg}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{n.user}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-pink)', fontWeight: 500 }}>{n.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </motion.div>
);

const AdminHomeView = ({ onNavigate }: any) => {
  const COLORS = ['#f472b6', '#fb7185', '#fda4af', '#fecdd3'];
  const data = [
    { name: 'Admin', value: 400 },
    { name: 'Developer', value: 300 },
    { name: 'Support', value: 300 },
    { name: 'Guest', value: 200 },
  ];

  return (
    <div className="content-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>System Users</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { name: 'System Root', role: 'Super Admin', status: 'Active', email: 'root@wealthbridge.io' },
            { name: 'Zetheta Dev', role: 'Lead Engineer', status: 'Active', email: 'dev@zetheta.io' },
            { name: 'Intern-01', role: 'Viewer', status: 'Inactive', email: 'intern@zetheta.io' },
          ].map((u, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserIcon size={18} color="var(--accent-pink)" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{u.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{u.role}</p>
                <span style={{ fontSize: '0.7rem', color: u.status === 'Active' ? '#10b981' : 'var(--accent-rose)' }}>● {u.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Role Distribution</h3>
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={() => onNavigate('access_logs')} className="nav-link" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--accent-soft)', borderRadius: '0.75rem', border: 'none' }}>
            <Lock size={16} color="var(--accent-pink)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Access Logs</span>
            <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
          </button>
          <button onClick={() => onNavigate('system_health')} className="nav-link" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--accent-soft)', borderRadius: '0.75rem', border: 'none' }}>
            <Database size={16} color="var(--accent-pink)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>System Health</span>
            <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AnalyticsView = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-panel">
    <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Performance Analytics</h2>
    <div className="stats-grid">
      <div className="glass-panel" style={{ background: '#fdf2f8' }}>
        <p className="label">Delivery Success</p>
        <p className="value" style={{ fontSize: '1.5rem', color: '#10b981' }}>99.9%</p>
      </div>
      <div className="glass-panel" style={{ background: '#fdf2f8' }}>
        <p className="label">Avg Process Time</p>
        <p className="value" style={{ fontSize: '1.5rem' }}>142ms</p>
      </div>
    </div>
    <div style={{ height: '350px', marginTop: '2rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[{day: 'Mon', req: 400}, {day: 'Tue', req: 300}, {day: 'Wed', req: 500}, {day: 'Thu', req: 450}, {day: 'Fri', req: 600}]}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'var(--accent-soft)'}} />
          <Bar dataKey="req" fill="var(--accent-pink)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const ComplianceView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-panel">
    <h2 style={{ marginBottom: '2rem', fontWeight: 800 }}>Compliance & Safety</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[
        { title: 'DND Registry Check', desc: 'Auto-syncing with national DND databases', status: 'Active', icon: <CheckCircle2 color="#10b981" /> },
        { title: 'Frequency Capping', desc: 'Enforcing 3-promo-per-day policy', status: 'Running', icon: <Activity color="var(--accent-pink)" /> },
        { title: 'Data Encryption', desc: 'AES-256 for all PII data at rest', status: 'Verified', icon: <Shield color="var(--accent-pink)" /> },
        { title: 'Audit Logs', desc: 'Immutable transaction trails enabled', status: 'Logging', icon: <FileText color="var(--accent-pink)" /> },
      ].map((c, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '1rem', background: 'white' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--accent-soft)', borderRadius: '12px' }}>{c.icon}</div>
            <div>
              <p style={{ fontWeight: 700 }}>{c.title}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{c.desc}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-pink" style={{ background: c.status === 'Active' ? '#d1fae5' : 'var(--accent-soft)', color: c.status === 'Active' ? '#065f46' : 'var(--accent-pink)' }}>{c.status}</span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SettingsView = () => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="glass-panel">
    <h2 style={{ marginBottom: '2rem', fontWeight: 800 }}>System Configuration</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sliders size={18} /> API Endpoints</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input type="text" value="https://api.wealthbridge.io/v1/notify" readOnly style={{ padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', background: '#f8fafc', fontSize: '0.875rem' }} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="badge badge-pink" style={{ padding: '0.5rem 1rem' }}>Regenerate Key</button>
            <button className="badge badge-pink" style={{ padding: '0.5rem 1rem', background: 'var(--text-main)', color: 'white' }}>Revoke All</button>
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={18} /> Threshold Alerts</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--accent-soft)', borderRadius: '1rem' }}>
          <span>Notify on 5xx Error Spike (&gt;5%)</span>
          <div style={{ width: '40px', height: '22px', background: 'var(--accent-pink)', borderRadius: '20px', position: 'relative' }}>
            <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }} />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const AccessLogsView = ({ onBack }: any) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-pink)', marginBottom: '1.5rem', fontWeight: 600 }}>
      <ArrowLeft size={18} /> Back to Admin
    </button>
    <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--accent-soft)', textAlign: 'left' }}>
            <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Timestamp</th>
            <th style={{ padding: '1rem', fontSize: '0.875rem' }}>User</th>
            <th style={{ padding: '1rem', fontSize: '0.875rem' }}>Action</th>
            <th style={{ padding: '1rem', fontSize: '0.875rem' }}>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: '2026-05-15 13:24:10', user: 'System Root', action: 'Login Success', ip: '192.168.1.1' },
            { time: '2026-05-15 13:20:05', user: 'Zetheta Dev', action: 'API Key Rotate', ip: '10.0.4.12' },
            { time: '2026-05-15 12:45:33', user: 'Intern-01', action: 'View Analytics', ip: '172.16.0.5' },
          ].map((log, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{log.time}</td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>{log.user}</td>
              <td style={{ padding: '1rem', fontSize: '0.875rem' }}><span className="badge badge-pink">{log.action}</span></td>
              <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const SystemHealthView = ({ onBack }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-pink)', marginBottom: '1.5rem', fontWeight: 600 }}>
      <ArrowLeft size={18} /> Back to Admin
    </button>
    <div className="stats-grid">
      {[
        { label: 'CPU Usage', value: '12%', icon: <Cpu color="var(--accent-pink)" /> },
        { label: 'Memory', value: '4.2GB', icon: <Server color="var(--accent-pink)" /> },
        { label: 'Storage', value: '82%', icon: <HardDrive color="var(--accent-pink)" /> },
        { label: 'Network', value: '1.2Gbps', icon: <Globe color="var(--accent-pink)" /> },
      ].map((h, i) => (
        <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--accent-soft)', borderRadius: '10px' }}>{h.icon}</div>
            <CheckCircle2 size={18} color="#10b981" />
          </div>
          <p className="value" style={{ fontSize: '1.5rem' }}>{h.value}</p>
          <p className="label">{h.label}</p>
        </div>
      ))}
    </div>
    <div className="glass-panel" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Service Status</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['Kafka Broker', 'Redis Cluster', 'PostgreSQL Primary', 'RabbitMQ Node'].map((service, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            <span style={{ fontWeight: 600 }}>{service}</span>
            <span style={{ color: '#10b981', fontWeight: 700 }}>● Operational</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

const App = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [adminSubView, setAdminSubView] = useState('home'); 
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(RECENT_NOTIFICATIONS);

  return (
    <div className="layout">
      <motion.aside className="sidebar" initial={false} animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--accent-pink)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={24} color="white" fill="white" /></div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-pink)' }}>WealthBridge</span>
        </div>
        <nav style={{ flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { id: 'admin', label: 'Admin Management', icon: <Users size={20} /> },
            { id: 'analytics', label: 'Analytics', icon: <Activity size={20} /> },
            { id: 'compliance', label: 'Compliance', icon: <Shield size={20} /> },
            { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
          ].map(item => (
            <button key={item.id} onClick={() => { setActiveNav(item.id); setAdminSubView('home'); }} className={`nav-link ${activeNav === item.id ? 'active' : ''}`} style={{ width: '100%', textAlign: 'left' }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="glass-panel" style={{ padding: '1.25rem', marginTop: 'auto', background: 'var(--accent-soft)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}><UserIcon size={22} color="var(--accent-pink)" /></div>
            <div><p style={{ fontSize: '0.9rem', fontWeight: 800 }}>Master Admin</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Super Administrator</p></div>
          </div>
          <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-rose)', fontSize: '0.875rem', fontWeight: 700, padding: '0.5rem', borderRadius: '0.5rem' }}><LogOut size={16} /> Logout</button>
        </div>
      </motion.aside>

      <main className="main-content">
        <header className="header">
          <div><h1 style={{ fontSize: '2.25rem', fontWeight: 800 }}>{activeNav.charAt(0).toUpperCase() + activeNav.slice(1).replace('_', ' ')}</h1><p style={{ color: 'var(--text-muted)' }}>Welcome back, Master Admin. Everything is looking good.</p></div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Search size={18} color="var(--text-muted)" /><input type="text" placeholder="Search system..." style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', width: '140px' }} /></div>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="glass-panel" style={{ padding: '0.5rem', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isSidebarOpen ? <X size={20} color="var(--accent-pink)" /> : <Menu size={20} color="var(--accent-pink)" />}</button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeNav === 'dashboard' && <DashboardView stats={STATS} chartData={CHART_DATA} notifications={notifications} onClear={(id: number) => setNotifications(n => n.filter(x => x.id !== id))} />}
          {activeNav === 'admin' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-panel">
              {adminSubView === 'home' && <AdminHomeView onNavigate={(v: string) => setAdminSubView(v)} />}
              {adminSubView === 'access_logs' && <AccessLogsView onBack={() => setAdminSubView('home')} />}
              {adminSubView === 'system_health' && <SystemHealthView onBack={() => setAdminSubView('home')} />}
            </motion.div>
          )}
          {activeNav === 'analytics' && <AnalyticsView />}
          {activeNav === 'compliance' && <ComplianceView />}
          {activeNav === 'settings' && <SettingsView />}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- Mock Data ---

const STATS = [
  { label: 'Throughput', value: '2,842', unit: 'req/s', icon: <Zap size={22} color="#f472b6" /> },
  { label: 'Engagement', value: '94.2', unit: '%', icon: <Heart size={22} color="#f472b6" /> },
  { label: 'Avg Latency', value: '38', unit: 'ms', icon: <BarChart3 size={22} color="#f472b6" /> },
  { label: 'Alerts', value: '12', unit: 'active', icon: <Bell size={22} color="#f472b6" /> },
];

const RECENT_NOTIFICATIONS = [
  { id: 1, type: 'TXNX-001', msg: 'Stock Purchase Confirmed', time: '2m ago', user: 'Sarah K.' },
  { id: 2, type: 'RISK-001', msg: 'Portfolio Rebalance Needed', time: '15m ago', user: 'James W.' },
  { id: 3, type: 'REGX-002', msg: 'KYC Update Required', time: '1h ago', user: 'Emma L.' },
];

const CHART_DATA = [
  { time: 'Mon', val: 4000 }, { time: 'Tue', val: 3000 }, { time: 'Wed', val: 6000 }, { time: 'Thu', val: 4500 }, { time: 'Fri', val: 9000 }, { time: 'Sat', val: 7000 }, { time: 'Sun', val: 8500 },
];

export default App;
