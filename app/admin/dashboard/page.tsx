"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ShieldCheck,
  LogOut,
  Users,
  Search,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LayoutDashboard,
  List,
  Trash2,
  Filter,
  ArrowUpDown,
  Download,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import * as XLSX from "xlsx";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  state: string | null;
  place?: string | null; // Added for mapping from database
  city: string | null;
  is_interested: boolean | null;
  ecosystem: boolean | null;
  status: string | null;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [interestFilter, setInterestFilter] = useState<string>("all");
  const [ecosystemFilter, setEcosystemFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date_desc" | "date_asc" | "name_asc" | "name_desc">("date_desc");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "summary">("summary");

  // Check authentication on mount
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUserEmail(session.user.email ?? null);
      }
    };
    checkSession();
  }, [router]);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Fetch leads from Supabase
  const fetchLeads = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error: supabaseError } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      const mappedData = (data || []).map((lead) => ({
        ...lead,
        state: lead.place, // Mapping database 'place' to frontend 'state'
      })) as Lead[];

      setLeads(mappedData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch leads";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleRefresh = () => {
    fetchLeads();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("leads")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Update state locally
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Failed to delete lead. Please try again.");
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const { error: updateError } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", id);

      if (updateError) throw updateError;

      // Update state locally
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Filter and sort leads
  const filteredLeads = leads
    .filter((lead) => {
      // Search term filter
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        lead.name?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.phone?.toLowerCase().includes(search) ||
        lead.city?.toLowerCase().includes(search) ||
        lead.state?.toLowerCase().includes(search);

      // Status filter
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

      // Interest filter
      const matchesInterest =
        interestFilter === "all" ||
        (interestFilter === "yes" && lead.is_interested === true) ||
        (interestFilter === "no" && lead.is_interested === false);

      // Ecosystem filter
      const matchesEcosystem =
        ecosystemFilter === "all" ||
        (ecosystemFilter === "yes" && lead.ecosystem === true) ||
        (ecosystemFilter === "no" && lead.ecosystem === false);

      return matchesSearch && matchesStatus && matchesInterest && matchesEcosystem;
    })
    .sort((a, b) => {
      if (sortBy === "date_desc") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "date_asc") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === "name_asc") {
        return (a.name || "").localeCompare(b.name || "");
      } else if (sortBy === "name_desc") {
        return (b.name || "").localeCompare(a.name || "");
      }
      return 0;
    });

  const handleExportExcel = () => {
    if (filteredLeads.length === 0) {
      alert("No data to export");
      return;
    }

    // Format data for Excel
    const exportData = filteredLeads.map((lead) => ({
      ID: lead.id,
      Name: lead.name,
      Email: lead.email || "N/A",
      Phone: lead.phone,
      State: lead.state || "N/A",
      City: lead.city || "N/A",
      Interested: lead.is_interested ? "Yes" : "No",
      Ecosystem: lead.ecosystem ? "Yes" : "No",
      Status: lead.status || "new",
      "Created At": new Date(lead.created_at).toLocaleString(),
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Download file
    const date = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `BISF_Leads_Export_${date}.xlsx`);
  };

  // Analytics Data preparation
  const interestData = [
    {
      name: "Interested",
      value: leads.filter((l) => l.is_interested).length,
      color: "#10b981",
    },
    {
      name: "Exploring",
      value: leads.filter((l) => !l.is_interested).length,
      color: "#f59e0b",
    },
  ];

  const ecosystemData = [
    {
      name: "Join Ecosystem",
      value: leads.filter((l) => l.ecosystem).length,
      color: "#8b5cf6",
    },
    {
      name: "Not Right Now",
      value: leads.filter((l) => !l.ecosystem).length,
      color: "#64748b",
    },
  ];

  // State distribution data
  const stateCounts = leads.reduce((acc: Record<string, number>, lead) => {
    const state = lead.state || "Unknown";
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const stateData = Object.keys(stateCounts)
    .map((state) => ({
      name: state,
      count: stateCounts[state],
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Time-based data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const timelineData = last7Days.map((date) => {
    const count = leads.filter((l) => l.created_at.startsWith(date)).length;
    return {
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      leads: count,
    };
  });

  const getStatusBadge = (status: string | null) => {
    const statusColors: { [key: string]: string } = {
      new: "bg-green-100 text-green-700",
      contacted: "bg-blue-100 text-blue-700",
      qualified: "bg-purple-100 text-purple-700",
      converted: "bg-emerald-100 text-emerald-700",
      lost: "bg-red-100 text-red-700",
    };

    const color =
      statusColors[status || "new"] || "bg-slate-100 text-slate-700";

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${color}`}
      >
        {status || "new"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2B2E7E] rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-[#2B2E7E] tracking-tight">
                  BISF Admin
                </span>
                <p className="text-xs text-slate-500">
                  Bharat Innovations & Startups Facilitator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userEmail && (
                <span className="text-sm text-slate-600 hidden md:block">
                  {userEmail}
                </span>
              )}
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all font-medium text-sm ${
              activeTab === "summary"
                ? "bg-[#2B2E7E] text-white shadow-md shadow-[#2B2E7E]/20"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Summary
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all font-medium text-sm ${
              activeTab === "list"
                ? "bg-[#2B2E7E] text-white shadow-md shadow-[#2B2E7E]/20"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <List className="w-4 h-4" />
            Lead Management
          </button>
        </div>

        {activeTab === "summary" ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2B2E7E]/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#2B2E7E]" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Leads</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {leads.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Interested</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {leads.filter((l) => l.is_interested).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Ecosystem</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {leads.filter((l) => l.ecosystem).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">New Today</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {
                        leads.filter((l) => {
                          const today = new Date();
                          const leadDate = new Date(l.created_at);
                          return (
                            leadDate.getDate() === today.getDate() &&
                            leadDate.getMonth() === today.getMonth() &&
                            leadDate.getFullYear() === today.getFullYear()
                          );
                        }).length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Interest Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <PieChartIcon className="w-4 h-4 text-[#2B2E7E]" />
                  <h3 className="font-bold text-slate-800">
                    Interest Analysis
                  </h3>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interestData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {interestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ecosystem Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <PieChartIcon className="w-4 h-4 text-purple-600" />
                  <h3 className="font-bold text-slate-800">
                    Ecosystem Participation
                  </h3>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ecosystemData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ecosystemData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top States */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-slate-800">Top Locations</h3>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stateData}
                      layout="vertical"
                      margin={{ left: 20, right: 30 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={80}
                        axisLine={false}
                        tickLine={false}
                        fontSize={12}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#2B2E7E"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Lead Timeline */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm md:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-slate-800">Lead Generation (Last 7 Days)</h3>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2B2E7E" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2B2E7E" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                      <Tooltip
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      />
                      <Area
                        type="monotone"
                        dataKey="leads"
                        stroke="#2B2E7E"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorLeads)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Search Bar */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, phone, city, or state..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B2E7E] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters and Sorting */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Filter className="w-4 h-4" />
                  <span>Filters:</span>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#2B2E7E] focus:border-[#2B2E7E] p-2 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>

                <select
                  value={interestFilter}
                  onChange={(e) => setInterestFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#2B2E7E] focus:border-[#2B2E7E] p-2 outline-none"
                >
                  <option value="all">All Interests</option>
                  <option value="yes">Interested</option>
                  <option value="no">Not Interested</option>
                </select>

                <select
                  value={ecosystemFilter}
                  onChange={(e) => setEcosystemFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#2B2E7E] focus:border-[#2B2E7E] p-2 outline-none"
                >
                  <option value="all">All Ecosystem</option>
                  <option value="yes">Ecosystem Joiners</option>
                  <option value="no">Not Ecosystem</option>
                </select>

                <div className="flex-grow"></div>

                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort By:</span>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-[#2B2E7E] focus:border-[#2B2E7E] p-2 outline-none mr-2"
                >
                  <option value="date_desc">Date (Newest First)</option>
                  <option value="date_asc">Date (Oldest First)</option>
                  <option value="name_asc">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                </select>

                <button
                  onClick={handleExportExcel}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Export Excel
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-[#2B2E7E] animate-spin mb-4" />
                  <p className="text-slate-500">Loading leads...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">
                    No results found
                  </h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    {searchTerm
                      ? "No leads match your search"
                      : "No leads found"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          State/City
                        </th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Interested
                        </th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Ecosystem
                        </th>
                        <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-slate-50 transition-colors group"
                        >
                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-800">
                              {lead.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              ID: #{lead.id}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                {lead.email || "N/A"}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                {lead.phone}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {lead.state || "N/A"}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                {lead.city || "N/A"}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                lead.is_interested
                                  ? "bg-green-100 text-green-700"
                                  : lead.is_interested === false
                                  ? "bg-red-100 text-red-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {lead.is_interested ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                lead.ecosystem
                                  ? "bg-purple-100 text-purple-700"
                                  : lead.ecosystem === false
                                  ? "bg-slate-100 text-slate-400"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {lead.ecosystem ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <select
                              value={lead.status || "new"}
                              onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize outline-none cursor-pointer border border-transparent hover:border-slate-300 transition-all appearance-none text-center min-w-[100px] ${
                                (lead.status === "new" || !lead.status) ? "bg-green-100 text-green-700" :
                                lead.status === "contacted" ? "bg-blue-100 text-blue-700" :
                                lead.status === "qualified" ? "bg-purple-100 text-purple-700" :
                                lead.status === "converted" ? "bg-emerald-100 text-emerald-700" :
                                lead.status === "lost" ? "bg-red-100 text-red-700" :
                                "bg-slate-100 text-slate-700"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                              <option value="lost">Lost</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-sm text-slate-500">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
