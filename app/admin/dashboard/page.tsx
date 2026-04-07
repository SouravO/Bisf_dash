"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  supabase,
} from "@/lib/supabase";
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
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  place: string | null;
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
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUserEmail(session.user.email);
      }
    };
    checkSession();
  }, [router]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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

      setLeads(data || []);
    } catch (err: any) {
      console.error("Error fetching leads:", err);
      setError(err.message || "Failed to fetch leads");
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

  // Filter leads based on search term
  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(search) ||
      lead.email?.toLowerCase().includes(search) ||
      lead.phone?.toLowerCase().includes(search) ||
      lead.city?.toLowerCase().includes(search) ||
      lead.place?.toLowerCase().includes(search)
    );
  });

  const getStatusBadge = (status: string | null) => {
    const statusColors: { [key: string]: string } = {
      new: "bg-green-100 text-green-700",
      contacted: "bg-blue-100 text-blue-700",
      qualified: "bg-purple-100 text-purple-700",
      converted: "bg-emerald-100 text-emerald-700",
      lost: "bg-red-100 text-red-700",
    };

    const color = statusColors[status || "new"] || "bg-slate-100 text-slate-700";

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${color}`}
      >
        {status || "new"}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
                <p className="text-xs text-slate-500">Bharat Innovation & Startup Facilitator</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userEmail && (
                <span className="text-sm text-slate-600">{userEmail}</span>
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
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
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

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
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

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
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

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
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

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone, city, or place..."
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B2E7E] focus:border-transparent"
            />
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
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#2B2E7E]" />
              <span className="ml-3 text-slate-500">Loading leads...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">
                {searchTerm ? "No leads match your search" : "No leads found"}
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
                      Location
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">
                          {lead.name}
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
                            {lead.place || "N/A"}
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
                          {lead.is_interested ? "✓" : lead.is_interested === false ? "✗" : "-"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            lead.ecosystem
                              ? "bg-green-100 text-green-700"
                              : lead.ecosystem === false
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {lead.ecosystem ? "✓" : lead.ecosystem === false ? "✗" : "-"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(lead.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && filteredLeads.length > 0 && (
          <div className="text-center mt-4 text-sm text-slate-500">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        )}
      </main>
    </div>
  );
}
