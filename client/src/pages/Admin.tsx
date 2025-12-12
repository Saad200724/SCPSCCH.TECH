import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Lock, Plus, Edit, Trash2, Save, X, LogOut } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import CyberButton from "@/components/CyberButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  attendees: string | null;
  description: string | null;
  type: string;
  status: string;
  featured: boolean;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    date: "",
    time: "",
    location: "",
    attendees: "",
    description: "",
    type: "Workshop",
    status: "upcoming",
    featured: false,
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: async (pwd: string) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (!res.ok) throw new Error("Invalid password");
      return res.json();
    },
    onSuccess: (data) => {
      setToken(data.token);
      setIsAuthenticated(true);
      localStorage.setItem("adminToken", data.token);
      toast({ title: "Login successful" });
    },
    onError: () => {
      toast({ title: "Invalid password", variant: "destructive" });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (event: Partial<Event>) => {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to create event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setIsCreating(false);
      setNewEvent({
        title: "", date: "", time: "", location: "", attendees: "",
        description: "", type: "Workshop", status: "upcoming", featured: false,
      });
      toast({ title: "Event created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (event: Event) => {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to update event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setEditingEvent(null);
      toast({ title: "Event updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Event deleted" });
    },
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("adminToken");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <GlassCard className="w-full max-w-md">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-2">Enter password to continue</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); loginMutation.mutate(password); }}>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 bg-muted border-border"
            />
            <CyberButton variant="primary" className="w-full" type="submit">
              Login
            </CyberButton>
          </form>
        </GlassCard>
      </div>
    );
  }

  const upcomingEvents = events.filter((e) => e.status === "upcoming" && !e.featured);
  const featuredEvents = events.filter((e) => e.featured);
  const archiveEvents = events.filter((e) => e.status === "archive");

  const EventForm = ({ event, onSave, onCancel, isNew = false }: { 
    event: Partial<Event>; 
    onSave: (e: Partial<Event>) => void; 
    onCancel: () => void;
    isNew?: boolean;
  }) => {
    const [formData, setFormData] = useState(event);
    
    return (
      <GlassCard className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input 
              value={formData.title || ""} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-muted border-border"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input 
              value={formData.date || ""} 
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="bg-muted border-border"
              placeholder="e.g., Jan 15, 2025"
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input 
              value={formData.time || ""} 
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="bg-muted border-border"
              placeholder="e.g., 10:00 AM - 4:00 PM"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input 
              value={formData.location || ""} 
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="bg-muted border-border"
            />
          </div>
          <div>
            <Label>Attendees</Label>
            <Input 
              value={formData.attendees || ""} 
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              className="bg-muted border-border"
              placeholder="e.g., 50+"
            />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={formData.type || "Workshop"} onValueChange={(v) => setFormData({ ...formData, type: v })}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Competition">Competition</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Meetup">Meetup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={formData.status || "upcoming"} onValueChange={(v) => setFormData({ ...formData, status: v })}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Switch 
              checked={formData.featured || false} 
              onCheckedChange={(v) => setFormData({ ...formData, featured: v })}
            />
            <Label>Featured Event</Label>
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea 
              value={formData.description || ""} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-muted border-border"
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <CyberButton variant="primary" size="sm" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4 mr-1" /> {isNew ? "Create" : "Save"}
          </CyberButton>
          <CyberButton variant="outline" size="sm" onClick={onCancel}>
            <X className="w-4 h-4 mr-1" /> Cancel
          </CyberButton>
        </div>
      </GlassCard>
    );
  };

  const EventRow = ({ event }: { event: Event }) => (
    <div className="flex items-center justify-between p-3 border-b border-border last:border-0">
      <div className="flex-1">
        <span className="font-display text-foreground">{event.title}</span>
        <span className="text-muted-foreground text-sm ml-2">({event.date})</span>
        {event.featured && <span className="ml-2 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">Featured</span>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setEditingEvent(event)} className="p-2 text-primary hover:bg-primary/10 rounded">
          <Edit className="w-4 h-4" />
        </button>
        <button onClick={() => deleteMutation.mutate(event.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            <span className="text-primary text-glow-cyan">ADMIN</span> PANEL
          </h1>
          <div className="flex gap-2">
            <CyberButton variant="primary" size="sm" onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-1" /> Add Event
            </CyberButton>
            <CyberButton variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </CyberButton>
          </div>
        </div>

        {isLoading && <p className="text-muted-foreground">Loading events...</p>}

        {isCreating && (
          <div className="mb-8">
            <h2 className="font-display text-xl text-foreground mb-4">Create New Event</h2>
            <EventForm 
              event={newEvent} 
              onSave={(e) => createMutation.mutate(e)} 
              onCancel={() => setIsCreating(false)}
              isNew
            />
          </div>
        )}

        {editingEvent && (
          <div className="mb-8">
            <h2 className="font-display text-xl text-foreground mb-4">Edit Event</h2>
            <EventForm 
              event={editingEvent} 
              onSave={(e) => updateMutation.mutate(e as Event)} 
              onCancel={() => setEditingEvent(null)}
            />
          </div>
        )}

        <div className="space-y-8">
          <GlassCard>
            <h2 className="font-display text-xl font-bold text-secondary mb-4">Featured Events</h2>
            {featuredEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No featured events</p>
            ) : (
              featuredEvents.map((e) => <EventRow key={e.id} event={e} />)
            )}
          </GlassCard>

          <GlassCard>
            <h2 className="font-display text-xl font-bold text-primary mb-4">Upcoming Events</h2>
            {upcomingEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No upcoming events</p>
            ) : (
              upcomingEvents.map((e) => <EventRow key={e.id} event={e} />)
            )}
          </GlassCard>

          <GlassCard>
            <h2 className="font-display text-xl font-bold text-muted-foreground mb-4">Archive Events</h2>
            {archiveEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">No archived events</p>
            ) : (
              archiveEvents.map((e) => <EventRow key={e.id} event={e} />)
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Admin;
