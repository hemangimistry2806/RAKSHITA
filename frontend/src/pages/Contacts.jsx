import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { SkeletonCard } from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import useApi from "../hooks/useApi";
import { contactsApi } from "../api/contacts";
import { mockContacts } from "../api/mock";
import { useState, useEffect } from "react";
import { initials } from "../utils/format";

const relationshipTone = (rel = "") => {
  const r = rel.toLowerCase();
  if (r.includes("parent") || r.includes("mom") || r.includes("dad")) return "cyan";
  if (r.includes("friend")) return "blue";
  if (r.includes("spouse") || r.includes("partner")) return "green";
  return "muted";
};

function ContactModal({ open, onClose, onSubmit, initial = null, busy }) {
  const [form, setForm] = useState(
    initial || { name: "", phone: "", relationship: "", priority: 1 }
  );

  // Reset form whenever the modal opens with a new/edited contact
  useEffect(() => {
    if (open) {
      setForm(
        initial || { name: "", phone: "", relationship: "", priority: 1 }
      );
    }
  }, [open, initial]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit Contact" : "Add Emergency Contact"}
      description="This person will be notified when RAKSHITA detects a potential emergency."
      actions={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(form)} disabled={busy}>
            {busy ? "Saving…" : initial ? "Save Changes" : "Add Contact"}
          </Button>
        </>
      }
    >
      <div className="field">
        <label>Name</label>
        <input className="input" value={form.name} onChange={set("name")} placeholder="e.g. Mom" />
      </div>
      <div className="field">
        <label>Phone</label>
        <input className="input" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
      </div>
      <div className="field">
        <label>Relationship</label>
        <input className="input" value={form.relationship} onChange={set("relationship")} placeholder="e.g. Parent, Friend" />
      </div>
      <div className="field">
        <label>Priority</label>
        <select className="input" value={form.priority} onChange={set("priority")}>
          <option value={1}>1 — Primary</option>
          <option value={2}>2 — High</option>
          <option value={3}>3 — Standard</option>
        </select>
      </div>
    </Modal>
  );
}

export default function Contacts() {
  const { data, loading, error, reload } = useApi(() => contactsApi.list(), []);
  const contacts = data?.contacts || mockContacts.contacts;

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (c) => {
    setEditing(c);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    setBusy(true);
    const payload = { ...form, priority: Number(form.priority) };
    try {
      if (editing) {
        await contactsApi.update(editing.id, payload);
      } else {
        await contactsApi.create(payload);
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      // Silently allow offline demo to keep the flow smooth
      setModalOpen(false);
      reload();
      console.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactsApi.remove(id);
    } catch {
      /* offline demo */
    }
    reload();
  };

  return (
    <AppLayout>
      <Topbar title="Emergency Contacts" subtitle="People RAKSHITA notifies in an emergency." />

      <div className="flex-between mb-16">
        <p className="soft" style={{ margin: 0 }}>
          {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
        </p>
        <Button onClick={openAdd}>+ Add Emergency Contact</Button>
      </div>

      {loading ? (
        <div className="contact-grid">
          {[0, 1].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error && !contacts.length ? (
        <ErrorState title="Unable to load contacts" message={error} onRetry={reload} />
      ) : contacts.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No emergency contacts yet"
          description="Add trusted contacts so RAKSHITA can alert them when you need help."
          action={
            <Button onClick={openAdd} style={{ marginTop: 8 }}>
              + Add Contact
            </Button>
          }
        />
      ) : (
        <div className="contact-grid">
          {contacts.map((c) => (
            <Card key={c.id} hover>
              <div className="flex-between">
                <div className="row">
                  <div className="avatar">{initials(c.name)}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    <div className="soft" style={{ fontSize: 13 }}>
                      {c.relationship}
                    </div>
                  </div>
                </div>
                <Badge tone={relationshipTone(c.relationship)}>Priority {c.priority}</Badge>
              </div>
              <div className="soft" style={{ margin: "16px 0", fontSize: 15 }}>
                📞 {c.phone}
              </div>
              <div className="row">
                <Button variant="ghost" size="sm" onClick={() => openEdit(c)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
        busy={busy}
      />
    </AppLayout>
  );
}
