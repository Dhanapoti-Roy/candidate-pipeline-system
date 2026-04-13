import {
    X,
    LayoutDashboard,
    KanbanSquare,
    UserSquare2,
    Archive,
    Sparkles,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

// Reusable glassy class for consistency
const glassCard = "bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl rounded-3xl shadow-2xl";


const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Top Right Blob */}
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-violet-600/30 blur-[120px] mix-blend-screen"></div>
        {/* Center Left Blob */}
        <div className="absolute top-[30%] left-[-10%] w-150 h-150 rounded-full bg-blue-600/20 blur-[150px] mix-blend-screen"></div>
        {/* Bottom Center Blob */}
        <div className="absolute bottom-[-10%] left-[20%] w-200 h-150 rounded-full bg-fuchsia-600/20 blur-[150px] mix-blend-screen"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
    </div>
);

export default function App() {
    const features = [
        {
            id: "01",
            icon: <LayoutDashboard className="w-8 h-8 text-blue-400" />,
            title: "Jobs Dashboard",
            desc: "List all open positions. See title, department, and active candidate counts at a glance. Drill into pipelines with one click.",
            color: "from-blue-500/20 to-blue-500/0"
        },
        {
            id: "02",
            icon: <KanbanSquare className="w-8 h-8 text-violet-400" />,
            title: "Candidate Pipeline",
            desc: "A Kanban board scoped to one job. Drag and drop cards through stages: Applied → Shortlisted → Interviewing → Assessment → Accepted.",
            color: "from-violet-500/20 to-violet-500/0"
        },
        {
            id: "03",
            icon: <UserSquare2 className="w-8 h-8 text-fuchsia-400" />,
            title: "Candidate Detail",
            desc: "Full application view. See name, photo, and a timestamped, chronological history of every stage change and action taken.",
            color: "from-fuchsia-500/20 to-fuchsia-500/0"
        },
        {
            id: "04",
            icon: <Archive className="w-8 h-8 text-rose-400" />,
            title: "Rejected Archive",
            desc: "A read-only graveyard of rejected candidates. Track exact dates and reasons. Immutable to keep your active pipeline clean.",
            color: "from-rose-500/20 to-rose-500/0"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-violet-500/30">
            <BackgroundEffects />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">The modern alternative to hiring spreadsheets</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Stop letting candidates <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-fuchsia-400 to-blue-400">fall through the cracks.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Ditch the shared Excel files. Manage your entire recruitment pipeline visually.
                        Every action timestamped, every candidate tracked, single source of truth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                        <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-md">
                            Book a Demo
                        </button>
                    </div>
                </div>

                {/* Abstract App Mockup Preview */}
                <div className="mt-20 max-w-5xl mx-auto px-4 sm:px-6 relative">
                    <div className="absolute inset-0 bg-linear-to-t from-[#0B0F19] via-transparent to-transparent z-10 top-1/2"></div>
                    <div className={`${glassCard} p-2 md:p-4 rotate-x-12 transform-gpu shadow-2xl shadow-violet-500/20`}>
                        {/* Window controls */}
                        <div className="flex gap-2 p-3 border-b border-white/5 mb-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                        </div>

                        {/* Mock Kanban */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 opacity-80">
                            {['Applied', 'Shortlisted', 'Interviewing', 'Accepted'].map((stage, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stage}</div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5 h-24">
                                        <div className="w-8 h-8 rounded-full bg-white/10 mb-2"></div>
                                        <div className="h-2 w-3/4 bg-white/10 rounded mb-1"></div>
                                        <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                                    </div>
                                    {i < 2 && (
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 h-24">
                                            <div className="w-8 h-8 rounded-full bg-white/10 mb-2"></div>
                                            <div className="h-2 w-2/3 bg-white/10 rounded mb-1"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section id="problem" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`${glassCard} p-8 md:p-12 relative overflow-hidden`}>
                        {/* Glowing orb inside card */}
                        <div className="absolute top-0 right-0 w-75 h-75 bg-rose-500/10 blur-[100px] rounded-full"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">The spreadsheet nightmare.</h2>
                                <div className="space-y-6 text-slate-400">
                                    <p>
                                        Company X is actively hiring across multiple roles. Their entire recruitment process runs on spreadsheets and paper notes.
                                    </p>
                                    <p>
                                        Hiring managers update a shared Excel file by hand. There is no single source of truth.
                                    </p>
                                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex gap-4 mt-6 text-rose-200">
                                        <AlertTriangle className="w-6 h-6 shrink-0 text-rose-400" />
                                        <p className="text-sm">
                                            The result: Someone forgets to update a stage, an email never gets sent, or a promising CV gets buried. By the time anyone notices, the candidate has moved on.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Abstract visual of chaos vs order */}
                            <div className="flex flex-col gap-4">
                                <div className="p-5 rounded-2xl bg-white/2 border border-rose-500/20 backdrop-blur-sm line-through text-slate-500 flex items-center justify-between opacity-50">
                                    <span className="font-mono text-sm">hiring_tracker_final_v2_USE_THIS_ONE.xlsx</span>
                                    <X className="w-4 h-4 text-rose-500" />
                                </div>
                                <div className="h-8 border-l border-dashed border-slate-600 mx-auto"></div>
                                <div className="p-5 rounded-2xl bg-violet-500/10 border border-violet-500/30 backdrop-blur-sm flex items-center justify-between text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                                    <span className="font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4" /> Visual Pipeline</span>
                                    <CheckCircle2 className="w-5 h-5 text-violet-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What to Build / Features Section */}
            <section id="features" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-violet-400 font-semibold tracking-wider text-sm uppercase mb-3 block">What we built</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Four screens to rule them all.</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            A simple, powerful web application where the hiring team can manage candidates seamlessly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className={`${glassCard} p-6 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full`}>
                                {/* Subtle gradient hover background */}
                                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                                <div className="relative z-10">
                                    <div className="text-xs font-mono text-slate-500 mb-4 pb-4 border-b border-white/10 flex justify-between items-center">
                                        <span>SCREEN {feature.id}</span>
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm text-slate-400 leading-relaxed grow">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detail Showcase Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                            <div className={`${glassCard} p-6 relative z-10`}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-slate-700 to-slate-800 p-1">
                                        <div className="w-full h-full rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                                            <UserSquare2 className="w-8 h-8 text-slate-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">Alex Jenkins</h4>
                                        <p className="text-sm text-blue-400">Applied for Frontend Developer</p>
                                    </div>
                                </div>

                                {/* Mock Timeline */}
                                <div className="space-y-4 pl-4 border-l border-white/10 relative">
                                    <div className="absolute w-2 h-2 rounded-full bg-blue-400 -left-1.25 top-1 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Moved to Shortlisted</p>
                                        <p className="text-xs text-slate-500">Today at 2:45 PM by Sarah H.</p>
                                    </div>

                                    <div className="absolute w-2 h-2 rounded-full bg-slate-600 -left-1.25 top-18"></div>
                                    <div className="pt-4">
                                        <p className="text-sm font-medium text-slate-300">Application Received</p>
                                        <p className="text-xs text-slate-500">Yesterday at 10:30 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Every action timestamped. Nothing lost.</h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                The Candidate Detail screen provides a complete history. Know exactly who moved a candidate, when it happened, and what stage they are currently in. Perfect accountability for the whole hiring team.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Full chronological history',
                                    'Drag-and-drop state preservation',
                                    'Single source of truth for the team'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`${glassCard} p-12 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-linear-to-br from-violet-600/20 via-fuchsia-600/20 to-blue-600/20"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-6">Ready to fix your hiring process?</h2>
                            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                Join modern teams who have ditched the spreadsheets and built a visual, accountable recruitment pipeline.
                            </p>
                            <Link to="/jobs" className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                                Get Started for Free
                            </Link>
                            <p className="text-sm text-slate-400 mt-4">No credit card required. Setup in minutes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 text-center text-slate-500 bg-[#070A11] relative z-10">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-violet-500" />
                        <span className="font-bold text-slate-300">HireFlow</span>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} HireFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
