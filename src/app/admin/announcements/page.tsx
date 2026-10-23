"use client";
import { FormEvent, useEffect, useState } from "react";
import { Megaphone, PlusCircle, Trash2, ShieldCheck, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Announcement = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
};

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General Update");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchAnnouncements();

    // Real-time listener for announcements
    const channel = supabase
      .channel("admin-announcements")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        () => {
          fetchAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchAnnouncements() {
    setLoading(true);
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching announcements:", error.message);
    } else {
      setAnnouncements(data || []);
    }
    setLoading(false);
  }

  async function handlePublish(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");

    const { error } = await supabase.from("announcements").insert([
      {
        title: title.trim(),
        content: content.trim(),
        category,
      },
    ]);

    setSubmitting(false);

    if (error) {
      alert("Error publishing announcement: " + error.message);
    } else {
      setSuccessMsg(`Successfully published "${title}"!`);
      setTitle("");
      setContent("");
      fetchAnnouncements();
    }
  }

  async function remove(id: string) {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting announcement: " + error.message);
    } else {
      fetchAnnouncements();
    }
  }

  return (
    <section className="page-content">
      <div className="container">
        <span className="eyebrow"><i /> ADMIN PORTAL</span>
        <h2 className="content-title">ANNOUNCEMENT MANAGEMENT</h2>
        <p className="admin-intro">
          Broadcast real-time updates, venue changes, and key notices to attendees across the Digital Nexus platform.
        </p>

        <div className="admin-warning" style={{ borderColor: "rgba(198,255,51,0.3)", marginBottom: "30px" }}>
          <ShieldCheck size={16} style={{ color: "var(--lime)" }} />
          <span>Supabase live database connected: Announcements publish instantly to the live public feed.</span>
        </div>

        {successMsg && (
          <div className="admin-warning" style={{ background: "rgba(198,255,51,0.1)", marginBottom: "20px" }}>
            <ShieldCheck size={16} style={{ color: "var(--lime)" }} />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="score-admin-grid">
          {/* Create Announcement Form */}
          <form className="score-entry-form" onSubmit={handlePublish}>
            <h3>
              <PlusCircle size={18} /> BROADCAST NEW NOTICE
            </h3>
            <label>
              Headline / Title
              <input
                type="text"
                required
                maxLength={120}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Venue Shift for Coding Arena"
              />
            </label>
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General Update">General Update</option>
                <option value="Schedule Change">Schedule Change</option>
                <option value="Competition Notice">Competition Notice</option>
                <option value="CCIT Night">CCIT Night</option>
              </select>
            </label>
            <label>
              Announcement Content
              <textarea
                required
                maxLength={800}
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full announcement details here..."
              />
            </label>
            <button className="button button-lime" type="submit" disabled={submitting}>
              <Megaphone size={16} /> {submitting ? "Broadcasting..." : "Publish Announcement"}
            </button>
          </form>

          {/* Active Announcements Summary Card */}
          <div className="score-totals-card">
            <h3>ACTIVE BROADCASTS</h3>
            <div className="mt-4 flex flex-col gap-3">
              <div className="score-total-line">
                <span className="score-total-rank">📢</span>
                <div>
                  <strong>Total Published</strong>
                  <small>Live on platform feed</small>
                </div>
                <b>{announcements.length}</b>
              </div>
            </div>
            <p className="mt-4">
              All announcements are synchronized through Supabase tables in real-time.
            </p>
          </div>
        </div>

        {/* Announcements History List */}
        <div className="score-history" style={{ marginTop: "40px" }}>
          <div className="score-history-head">
            <h3>PUBLISHED ANNOUNCEMENTS FEED</h3>
            <span>{announcements.length} notices</span>
          </div>

          {loading ? (
            <p className="score-history-empty">Synchronizing announcement records...</p>
          ) : announcements.length === 0 ? (
            <p className="score-history-empty">No announcements published yet. Use the form above to broadcast your first notice.</p>
          ) : (
            <div className="score-history-list">
              {announcements.map((item) => (
                <article className="score-history-item" key={item.id}>
                  <div className="score-history-main">
                    <div>
                      <span className="category-pill inline-block mb-1">{item.category}</span>
                      <strong className="block text-base mt-1">{item.title}</strong>
                      <p className="mt-2 text-sm" style={{ color: "#d4d4d9" }}>{item.content}</p>
                      <small className="flex items-center gap-1 mt-2">
                        <Calendar size={11} /> Published on {new Date(item.created_at).toLocaleString()}
                      </small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="score-delete"
                    onClick={() => remove(item.id)}
                    aria-label="Delete announcement"
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