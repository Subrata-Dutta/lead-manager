import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { auth, googleProvider } from "./firebase";
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://lead-manager-5b74.onrender.com";

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
const [theme, setTheme] = useState("dark");
const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setAuthLoading(false);
  });

  return () => unsubscribe();
}, []);

const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Google login failed:", error);
    alert("Google login failed. Please try again.");
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "New",
  });

 
const fetchLeads = async () => {
  try {
    const token = await user.getIdToken();

    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch leads");
    }

    setLeads(data);
  } catch (error) {
    console.error("Error fetching leads:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (user) {
    setLoading(true);
    fetchLeads();
  } else {
    setLeads([]);
    setLoading(false);
  }
}, [user]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const filteredLeads = leads.filter((lead) => {
  const matchesSearch =
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.status.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || lead.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const handleEdit = (lead) => {
  setForm({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company || "",
    source: lead.source,
    status: lead.status,
  });

  setEditingId(lead._id);
};


const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmDelete) return;

  try {
    const token = await user.getIdToken();

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not delete lead");
      return;
    }

    await fetchLeads();
    alert("Lead deleted successfully!");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Server connection failed");
  }
};

  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = await user.getIdToken();

    const response = await fetch(
      editingId ? `${API_URL}/${editingId}` : API_URL,
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not save lead");
      return;
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "",
      status: "New",
    });

    setEditingId(null);

    await fetchLeads();

    alert(
      editingId
        ? "Lead updated successfully!"
        : "Lead added successfully!"
    );
  } catch (error) {
    console.error("Save lead error:", error);
    alert("Server connection failed");
  }


  };
// 1. Show loading while Firebase checks login
if (authLoading) {
  return <div className="loading-screen">Checking login...</div>;
}

// 2. Show login screen if user is not logged in
if (!user) {
  return (
    <div className={`app theme-${theme}`}>
      <div className="login-container">
        <h1>▰ Lead Manager</h1>
        <p>Sign in to manage your leads</p>

        <button
          type="button"
          className="google-login-btn"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

  return (
    <div className={`app theme-${theme}`}>
      <header className="header">
  <div className="header-content">
    <div>
      <h1>▰ Lead Manager</h1>
      <p>Manage and track your business leads</p>
    </div>

    <button
      type="button"
      className="theme-toggle"
      onClick={() =>
        setTheme((current) => current === "dark" ? "light" : "dark")
      }
    >
      {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
    </button>
<div className="user-actions">
  <span className="user-email">
    {user?.email}
  </span>

  <button
    type="button"
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>

  </div>
</header>

      <main className="container">
        <section className="dashboard-stats">
 <div className="stat-card">
  <div className="stat-info">
    <p>Total Leads</p>
    <h2>{leads.length}</h2>
  </div>
  <span className="stat-icon">👥</span>
</div>

<div className="stat-card">
  <div className="stat-info">
    <p>New Leads</p>
    <h2>{leads.filter((lead) => lead.status === "New").length}</h2>
  </div>
  <span className="stat-icon">✚</span>
</div>

<div className="stat-card">
  <div className="stat-info">
    <p>Contacted</p>
    <h2>{leads.filter((lead) => lead.status === "Contacted").length}</h2>
  </div>
  <span className="stat-icon">📞</span>
</div>

<div className="stat-card">
  <div className="stat-info">
    <p>Qualified</p>
    <h2>{leads.filter((lead) => lead.status === "Qualified").length}</h2>
  </div>
  <span className="stat-icon">✓</span>
</div>

<div className="stat-card">
  <div className="stat-info">
    <p>Lost Leads</p>
    <h2>{leads.filter((lead) => lead.status === "Lost").length}</h2>
  </div>
  <span className="stat-icon">▤</span>
</div>
</section>
       
<section className="form-section">
  <h2>{editingId ? "Edit Lead" : "Add New Lead"}</h2>

  <form onSubmit={handleSubmit}>
    <label htmlFor="name">Full Name</label>
    <input
      id="name"
      name="name"
      placeholder="Enter full name"
      value={form.name}
      onChange={handleChange}
      required
    />

    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="Enter email address"
      value={form.email}
      onChange={handleChange}
      required
    />

    <label htmlFor="phone">Phone Number</label>
    <input
      id="phone"
      name="phone"
      placeholder="Enter phone number"
      value={form.phone}
      onChange={handleChange}
      required
    />

    <label htmlFor="company">Company Name</label>
    <input
      id="company"
      name="company"
      placeholder="Enter company name"
      value={form.company}
      onChange={handleChange}
    />

    <label htmlFor="source">Lead Source</label>
    <select
      id="source"
      name="source"
      value={form.source}
      onChange={handleChange}
      required
    >
      <option value="">Select Source</option>
      <option value="Website">Website</option>
      <option value="Referral">Referral</option>
      <option value="LinkedIn">LinkedIn</option>
      <option value="Other">Other</option>
    </select>

    <label htmlFor="status">Lead Status</label>
    <select
      id="status"
      name="status"
      value={form.status}
      onChange={handleChange}
    >
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Lost">Lost</option>
    </select>

    <button type="submit">
      {editingId ? "Update Lead" : "Add Lead"}
    </button>
  </form>
</section>

      <section className="lead-section">
  <h2>All Leads</h2>

  <div className="lead-controls">
    <input
      type="text"
      placeholder="Search leads by name or status..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All Statuses</option>
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Lost">Lost</option>
    </select>
  </div>

          {loading ? (
            <p>Loading leads...</p>
          ) : leads.length === 0 ? (
            <p>No leads found. Add your first lead!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.company}</td>
                    <td>{lead.source}</td>

<td>
  <span className={`status-badge ${lead.status.toLowerCase()}`}>
    {lead.status}
  </span>
</td>
   <td>
  <button
  className="edit-btn"
  onClick={() => handleEdit(lead)}
>
  ✎ Edit
</button>

<button
  className="delete-btn"
  onClick={() => handleDelete(lead._id)}
>
  🗑 Delete
</button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;