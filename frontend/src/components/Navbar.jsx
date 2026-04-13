import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../hook/authHook';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();


    // Reusable glassy class for consistency

    const glassNav = "bg-[#0B0F19]/70 border-b border-white/[0.05] backdrop-blur-xl";

    useEffect(() => {

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? glassNav : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <Link to="/jobs" className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                            HireFlow
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">

                        {user ? <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? 'text-white text-sm font-medium' : 'text-sm font-medium text-slate-300 hover:text-white transition-colors'}>Jobs</NavLink> :
                            <NavLink to="/jobs" className={({ isActive }) => isActive ? 'text-white text-sm font-medium' : 'text-sm font-medium text-slate-300 hover:text-white transition-colors'}>Jobs</NavLink>}
                        {user && <NavLink to="/admin/archive" className={({ isActive }) => isActive ? 'text-white text-sm font-medium' : 'text-sm font-medium text-slate-300 hover:text-white transition-colors'}>Archive</NavLink>}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? <button type='button' onClick={logout}>Logout</button> : <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</Link>}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-[#0B0F19]/95 backdrop-blur-3xl border-b border-white/10 py-4 px-4 flex flex-col gap-4 shadow-2xl">
                    <NavLink to="/jobs" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-slate-300 hover:bg-white/5 rounded-xl">Jobs</NavLink>


                    {user ? <button type='button' onClick={logout}>Logout</button> : <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-left px-4 py-2 text-slate-300 hover:bg-white/5 rounded-xl">Log in</Link>}
                </div>
            )}
        </nav>
    );
};
export default Navbar;