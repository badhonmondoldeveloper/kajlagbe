'use client';

import * as React from 'react';
import { Users, Plus, Trash2, Phone, Mail, Shield, UserCheck } from 'lucide-react';
import { Button, Input, Select, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Avatar } from '@kajlagbe/ui';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: string;
}

export default function BusinessTeamPage() {
  const [team, setTeam] = React.useState<TeamMember[]>([
    { id: 'tm-1', name: 'রাশেদুল হক', role: 'ম্যানেজিং ডিরেক্টর / ওনার', phone: '01712345678', status: 'ACTIVE' },
    { id: 'tm-2', name: 'কামরুল হাসান', role: 'লিড এসি টেকনিশিয়ান', phone: '01823456789', status: 'ACTIVE' },
    { id: 'tm-3', name: 'মিজানুর রহমান', role: 'সিনিয়র ইলেকট্রিশিয়ান', phone: '01934567890', status: 'ACTIVE' },
  ]);

  const [isAdding, setIsAdding] = React.useState(false);
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('টেকনিশিয়ান');
  const [phone, setPhone] = React.useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: name.trim(),
      role,
      phone: phone.trim() || '01XXXXXXXXX',
      status: 'ACTIVE',
    };

    setTeam([...team, newMember]);
    setName('');
    setPhone('');
    setIsAdding(false);
  };

  const removeMember = (id: string) => {
    setTeam(team.filter((t) => t.id !== id));
  };

  return (
    <DashboardLayout
      title="টিম সদস্য ও টেকনিশিয়ান ব্যবস্থাপনা"
      subtitle="আপনার কোম্পানির আওতাধীন সকল ফিল্ড টেকনিশিয়ান ও স্টাফ পরিচালনা করুন"
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            মোট নিবন্ধিত টিম মেম্বার: {team.length} জন
          </span>
          <Button
            size="sm"
            onClick={() => setIsAdding(!isAdding)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {isAdding ? 'বাতিল করুন' : 'নতুন টেকনিশিয়ান যুক্ত করুন'}
          </Button>
        </div>

        {isAdding && (
          <Card className="border-sky-200 bg-sky-50/30">
            <CardHeader>
              <CardTitle className="text-base">নতুন টিম মেম্বারের তথ্য</CardTitle>
              <CardDescription>সদস্যের নাম, পদবী ও যোগাযোগের নম্বর দিন</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800">পুরো নাম</label>
                    <Input
                      placeholder="যেমন: মো: সেলিম রেজা"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">পদবী / রোল</label>
                    <Input
                      placeholder="যেমন: এসি টেকনিশিয়ান"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">মোবাইল নম্বর</label>
                  <Input
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" size="sm">
                    মেম্বার সেভ করুন
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Avatar fallback={member.name} size="md" />
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{member.name}</h4>
                    <Badge variant="secondary" size="sm">{member.role}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {member.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="verified" size="sm">সক্রিয়</Badge>
                {member.id !== 'tm-1' && (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="ডিলিট"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
