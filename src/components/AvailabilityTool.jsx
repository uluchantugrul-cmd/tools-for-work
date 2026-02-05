import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowLeft, Plus, Trash2, Calendar, Clock, Info, ChevronRight, UserPlus, Users } from 'lucide-react';

const COMMON_TIMEZONES = [
    { name: 'London (GMT)', offset: 0 },
    { name: 'Paris/Berlin (CET)', offset: 1 },
    { name: 'Istanbul (TRT)', offset: 3 },
    { name: 'Dubai (GST)', offset: 4 },
    { name: 'New York (EST)', offset: -5 },
    { name: 'San Francisco (PST)', offset: -8 },
    { name: 'Tokyo (JST)', offset: 9 },
    { name: 'Sydney (AEDT)', offset: 11 }
];

const AvailabilityTool = ({ onBack }) => {
    const [teamMembers, setTeamMembers] = useState(() => {
        const saved = localStorage.getItem('tfw_team_availability');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'You', timezone: 3, workStart: 9, workEnd: 18 }
        ];
    });

    const [newName, setNewName] = useState('');
    const [newTimezone, setNewTimezone] = useState(3);

    useEffect(() => {
        localStorage.setItem('tfw_team_availability', JSON.stringify(teamMembers));
    }, [teamMembers]);

    const addMember = () => {
        if (!newName.trim()) return;
        const member = {
            id: Date.now(),
            name: newName,
            timezone: parseInt(newTimezone),
            workStart: 9,
            workEnd: 18
        };
        setTeamMembers([...teamMembers, member]);
        setNewName('');
    };

    const removeMember = (id) => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getLocalHour = (baseHour, baseOffset, targetOffset) => {
        let hour = baseHour + (targetOffset - baseOffset);
        if (hour < 0) hour += 24;
        if (hour >= 24) hour -= 24;
        return hour;
    };

    const isWorking = (hour, member) => {
        return hour >= member.workStart && hour < member.workEnd;
    };

    const getCommonHours = () => {
        return hours.filter(h => {
            // Check if every member is in their working hours for this global hour (UTC based or relative to 'You')
            const reference = teamMembers[0];
            return teamMembers.every(m => {
                const memberLocalHour = getLocalHour(h, reference.timezone, m.timezone);
                return isWorking(memberLocalHour, m);
            });
        });
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
            <button onClick={onBack} className="button-secondary" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="glass-panel" style={{ padding: 'clamp(20px, 5vw, 40px)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px', background: 'linear-gradient(to right, #fff, var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Team Sync Matrix</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Find the perfect overlap for global team meetings across time zones.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', background: 'rgba(15, 23, 42, 0.4)', padding: '12px', borderRadius: '16px', border: '1px solid var(--glass-border)', width: '100%', maxWidth: '600px' }}>
                        <input
                            type="text"
                            placeholder="Teammate Name..."
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            style={{ flexGrow: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', padding: '8px' }}
                        />
                        <select
                            value={newTimezone}
                            onChange={(e) => setNewTimezone(e.target.value)}
                            style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', cursor: 'pointer', padding: '8px' }}
                        >
                            {COMMON_TIMEZONES.map(tz => (
                                <option key={tz.offset} value={tz.offset} style={{ background: '#1e293b' }}>{tz.name}</option>
                            ))}
                        </select>
                        <button className="button-primary" onClick={addMember} style={{ padding: '8px 20px' }}>
                            <UserPlus size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', marginBottom: '32px' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '24px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, width: '200px', background: 'rgba(15, 23, 42, 0.3)' }}>TEAM MEMBER</th>
                                {hours.map(h => {
                                    const isCommon = getCommonHours().includes(h);
                                    return (
                                        <th key={h} style={{ padding: '12px 0', fontSize: '0.75rem', fontWeight: 800, color: isCommon ? 'var(--accent-primary)' : 'var(--text-muted)', background: isCommon ? 'rgba(59, 130, 246, 0.05)' : 'transparent', textAlign: 'center', width: '40px' }}>
                                            {h.toString().padStart(2, '0')}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.map((member, idx) => (
                                <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                    <td style={{ padding: '20px 24px', background: 'rgba(15, 23, 42, 0.3)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontWeight: 700, color: 'white' }}>{member.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                                    {COMMON_TIMEZONES.find(tz => tz.offset === member.timezone)?.name || `GMT${member.timezone >= 0 ? '+' : ''}${member.timezone}`}
                                                </div>
                                            </div>
                                            {idx !== 0 && (
                                                <button onClick={() => removeMember(member.id)} style={{ background: 'transparent', border: 'none', color: '#f87171', opacity: 0.4, cursor: 'pointer' }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    {hours.map(h => {
                                        const reference = teamMembers[0];
                                        const localH = getLocalHour(h, reference.timezone, member.timezone);
                                        const working = isWorking(localH, member);
                                        const isCommon = getCommonHours().includes(h);

                                        return (
                                            <td key={h} style={{ padding: '4px', background: isCommon ? 'rgba(59, 130, 246, 0.05)' : 'transparent' }}>
                                                <div style={{
                                                    height: '32px',
                                                    borderRadius: '4px',
                                                    background: working ? 'linear-gradient(135deg, var(--accent-primary), #6366f1)' : 'rgba(255,255,255,0.03)',
                                                    opacity: working ? 1 : 0.2,
                                                    boxShadow: working && isCommon ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none',
                                                    border: working && isCommon ? '1px solid white' : 'none'
                                                }} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="responsive-grid">
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Users size={24} className="text-green-400" />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Optimal Meeting Slots</h3>
                    </div>
                    {getCommonHours().length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            {getCommonHours().map(h => (
                                <div key={h} style={{ padding: '12px 20px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: 'white', fontWeight: 700 }}>
                                    {h.toString().padStart(2, '0')}:00 - {(h + 1).toString().padStart(2, '0')}:00
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed #ef4444', color: '#f87171', textAlign: 'center' }}>
                            No overlapping working hours found for all team members. Try adjusting your team's locations.
                        </div>
                    )}
                </div>

                <div className="glass-panel" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Info size={24} className="text-blue-400" />
                        <h4 style={{ fontWeight: 700 }}>How to use</h4>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        1. Add your team members and their respective time zones.<br />
                        2. The grid automatically aligns everyone's working hours (9 AM - 6 PM default) to <strong>your local time</strong>.<br />
                        3. The highlighted vertical bars indicate when <strong>everyone</strong> is at their desk.
                    </p>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                        <Globe size={16} /> DATA IS SAVED LOCALLY IN YOUR BROWSER
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityTool;
