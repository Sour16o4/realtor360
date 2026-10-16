import type { FilterGroup } from "./types";

export const activityFilters: FilterGroup[] = [
  { title: "Activity Type", options: ["Task", "Meeting", "Call"] },
  { title: "Status", options: ["Active", "Completed", "In Progress", "Missed", "Not Interested"] },
  { title: "Linked With", options: ["Deal", "Contact", "Lead", "Company", "Development"] },
  { title: "Priority", options: ["High", "Medium", "Low"] },
  { title: "Owner Name", options: ["Mohit Verma", "Arjun Malhotra", "Mohit Mehra", "Shruti Reddy", "Neha Desai"] },
];

export const ACTIVITY_TABS = [
  { id: "customers", label: "Customers" },
  { id: "open-deals", label: "Open Deals" },
  { id: "leads-contacts", label: "Leads/Contacts" },
] as const;

export type ActivityTab = (typeof ACTIVITY_TABS)[number]["id"];

export type Activity = {
  title: string;
  /** Width (px) of the title box in the design; it decides where a long title wraps. */
  titleWidth?: number;
  icon: "task" | "call-outgoing" | "call-missed";
  date: string;
  /** Only the Open Deals and Leads/Contacts cards show a time. */
  time?: string;
  /** Overdue dates are red. */
  overdue?: boolean;
  assignedTo: string;
  /** Customers cards show the deal and its value; the other tabs show a title and what the activity is linked to. */
  deal?: string;
  dealValue?: string;
  subject?: string;
  linkedTo?: string;
  status: string;
  priority: "High" | "Medium" | "Low";
};

type Card = Pick<Activity, "title" | "titleWidth" | "status" | "priority">;

const customer = ({ title, titleWidth = 101, status, priority }: Card, overdue = false): Activity => ({
  title,
  titleWidth,
  icon: "task",
  date: overdue ? "10/07/2025" : "12/07/2025",
  overdue,
  assignedTo: "Mohit Verma",
  deal: "Sunrise Villa Sale",
  dealValue: "₹1.45 Cr",
  status,
  priority,
});

const followUp = (status: string, priority: Activity["priority"], overdue = false) =>
  customer({ title: "Follow-up with John", status, priority }, overdue);
const contract = (status: string, priority: Activity["priority"], titleWidth: number) =>
  customer({ title: "Initiate Contract with John", titleWidth, status, priority });

/** Customers tab (frame 44:2), row by row. */
const customerActivities: Activity[] = [
  followUp("Active", "High"),
  followUp("Not Interested", "Low", true),
  contract("Active", "High", 126),
  followUp("In Progress", "Medium"),
  followUp("In Progress", "High"),
  followUp("Active", "High"),
  followUp("In Progress", "High"),
  followUp("In Progress", "Medium"),
  followUp("In Progress", "Medium"),
  contract("In Progress", "Medium", 128),
  followUp("In Progress", "Medium"),
  followUp("In Progress", "Medium"),
];

const meeting = ({ title, titleWidth, status, priority }: Card): Activity => ({
  title,
  titleWidth,
  icon: "task",
  date: "12/07/2025",
  time: "2:30 PM",
  assignedTo: "Jessica Chen",
  subject: "Virtual discussion with legal team",
  linkedTo: "Urban Build Group",
  status,
  priority,
});

const call = (status: string, priority: Activity["priority"]): Activity => ({
  title: "John Doe",
  icon: status === "Missed" ? "call-missed" : "call-outgoing",
  date: "11/07/2025",
  time: "11:00 AM",
  overdue: status === "Missed",
  assignedTo: "Mohit Verma",
  subject: "Broker call - Pricing negotiation",
  linkedTo: "Lotus Crest (Lead)",
  status,
  priority,
});

const openDealRow = (): Activity[] => [
  meeting({ title: "Meeting", status: "Completed", priority: "High" }),
  meeting({ title: "Share More Info", status: "In Progress", priority: "Medium" }),
  meeting({ title: "Follow Up John", status: "Not Started", priority: "Low" }),
  meeting({ title: "Share Attorney Firm", status: "In Progress", priority: "Medium" }),
];

/** Open Deals tab (frame 44:420): two identical rows and one more card. */
const openDealActivities: Activity[] = [
  ...openDealRow(),
  ...openDealRow(),
  meeting({ title: "Meeting", status: "Completed", priority: "High" }),
];

/** Leads/Contacts tab (frame 44:775), row by row. */
const leadContactActivities: Activity[] = [
  meeting({ title: "Test", status: "Completed", priority: "High" }),
  meeting({ title: "Follow Up John", status: "In Progress", priority: "High" }),
  meeting({ title: "Initiate Contract with John", titleWidth: 114, status: "Not Started", priority: "Low" }),
  call("Completed", "Low"),
  meeting({ title: "Test", status: "Completed", priority: "High" }),
  meeting({ title: "Follow Up John", status: "In Progress", priority: "Medium" }),
  meeting({ title: "Initiate Contract with John", titleWidth: 114, status: "Not Started", priority: "Medium" }),
  call("Missed", "Low"),
  call("Completed", "High"),
  call("Missed", "Low"),
];

export const activitiesByTab: Record<ActivityTab, Activity[]> = {
  customers: customerActivities,
  "open-deals": openDealActivities,
  "leads-contacts": leadContactActivities,
};
