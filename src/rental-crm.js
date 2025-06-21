import React, { useState, useEffect } from "react";

export default function RentalCRM() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    requirement: "",
    location: "",
    budget: "",
    furnishing: "",
    followUp: "",
    notes: "",
    status: "New",
  });
  const [search, setSearch] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addClient = () => {
    if (form.name && form.phone) {
      setClients([...clients, form]);
      setForm({
        name: "",
        phone: "",
        requirement: "",
        location: "",
        budget: "",
        furnishing: "",
        followUp: "",
        notes: "",
        status: "New",
      });
    }
  };

  const exportToExcel = () => {
    const csv = clients.map((c) => Object.values(c).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredClients = clients.filter((c) =>
    Object.values(c).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const todayFollowUps = clients.filter((c) => c.followUp === today);

  return (
    <div style={{ padding: 20 }}>
      <h1>Prime Properties CRM</h1>

      <input
        placeholder="Search Clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 5, marginBottom: 10, width: "100%" }}
      />

      <div>
        <input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        <input placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <input placeholder="Requirement" name="requirement" value={form.requirement} onChange={handleChange} />
        <input placeholder="Location" name="location" value={form.location} onChange={handleChange} />
        <input placeholder="Budget" name="budget" value={form.budget} onChange={handleChange} />
        <input placeholder="Furnishing" name="furnishing" value={form.furnishing} onChange={handleChange} />
        <input placeholder="Follow-up Date" name="followUp" value={form.followUp} onChange={handleChange} type="date" />
        <input placeholder="Notes" name="notes" value={form.notes} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="New">New</option>
          <option value="Interested">Interested</option>
          <option value="Visited">Visited</option>
          <option value="Closed">Closed</option>
        </select>
        <button onClick={addClient}>Add Client</button>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>

      <h2>Today's Follow-ups</h2>
      {todayFollowUps.map((c, i) => (
        <div key={i} style={{ border: "1px solid green", padding: 10, margin: 5 }}>
          <p><strong>{c.name}</strong> - {c.phone}</p>
          <p>{c.requirement} in {c.location} for ₹{c.budget}</p>
          <p>{c.furnishing}, Status: {c.status}</p>
          <p>Notes: {c.notes}</p>
        </div>
      ))}

      <h2>All Clients</h2>
      {filteredClients.map((c, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, margin: 5 }}>
          <p><strong>{c.name}</strong> - {c.phone}</p>
          <p>{c.requirement} in {c.location} for ₹{c.budget}</p>
          <p>{c.furnishing}, Status: {c.status}</p>
          <p>Notes: {c.notes}</p>
        </div>
      ))}
    </div>
  );
}