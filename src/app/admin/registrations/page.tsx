"use client";
import { useEffect, useState } from "react";
import { Users, ShieldCheck, Trash2, Mail, Phone, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  group_name?: string;
  event_interest?: string;
  created_at: string;
};

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();

    // Real-time subscription for new registrations
    const channel = supabase
      .channel("admin-registrations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "registrations" },
        () => {
          fetchRegistrations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchRegistrations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error.message);
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  }

  async function remove(id: string) {
    if (!confirm("Remove this registration record?")) return;

    const { error } = await supabase
      .from("registrations")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting registration: " + error.message);
    } else {
      fetchRegistrations();
    }
  }

  return (
    <section className="page-content">
      <div className="container">
        <span className="eyebrow"><i /> ADMIN PORTAL</span>
        <h2 className="content-title">REGISTRATION MANAGEMENT</h2>
        <p className="admin-intro">
          Review participant sign-ups, event interests, and contact data synchronized directly from the Supabase database.
        </p>

        <div className="admin-warning" style={{ borderColor: "rgba(198,255,51,0.3)", marginBottom: "30px" }}>
          <ShieldCheck size={16} style={{ color: "var(--lime)" }} />
          <span>Supabase live database connected: Participant sign-ups update automatically in real-time.</span>
        </div>

        <div className="score-history">
          <div className="score-history-head">
            <h3>
              <Users size={16} style={{ display: "inline", marginRight: "8px" }} /> REGISTERED PARTICIPANTS
            </h3>
            <span>{registrations.length} total sign-ups</span>
          </div>

          {loading ? (
            <p className="score-history-empty">Synchronizing participant records...</p>
          ) : registrations.length === 0 ? (
            <p className="score-history-empty">No registrations recorded in the database yet.</p>
          ) : (
            <div className="score-history-list">
              {registrations.map((item) => (
                <article className="score-history-item" key={item.id}>
                  <div className="score-history-main">
                    <div>
                      <strong>{item.full_name}</strong>
                      <span className="flex items-center gap-4 mt-1" style={{ color: "#aaa" }}>
                        <span className="flex items-center gap-1">
                          <Mail size={12} className="text-[var(--lime)]" /> {item.email}
                        </span>
                        {item.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-[var(--lime)]" /> {item.phone}
                          </span>
                        )}
                      </span>
                      <p className="mt-2">
                        Group: <strong>{item.group_name || "General Delegate"}</strong> · Interest: {item.event_interest || "General Admission"}
                      </p>
                      <small className="flex items-center gap-1 mt-1">
                        <Calendar size={11} /> Signed up on {new Date(item.created_at).toLocaleString()}
                      </small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="score-delete"
                    onClick={() => remove(item.id)}
                    aria-label="Delete registration"
                  >
                    <Trash2 size={15} /> Remove
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}