export type SettingsCard = {
  title: string;
  description: string;
  icon: string;
  /** Size (px) of the exported icon. */
  iconSize: number;
  /** Colour of the rounded square behind the icon. */
  iconBg: string;
  /** Side (px) of that square; the design draws Developer Space's larger. */
  boxSize?: number;
  /** Left and right padding of the card (px); the design uses 32 unless set. */
  padding?: number;
  /** Width (px) of the title and description box in the design; it decides where the description wraps. */
  textWidth: number;
};

export const settingsCards: SettingsCard[] = [
  { title: "General", description: "Basic information and system-wide preferences.", icon: "settings-general", iconSize: 32, iconBg: "#f9e7b4", textWidth: 362 },
  { title: "User and Control", description: "Manage users, roles, permissions, and access controls.", icon: "settings-users", iconSize: 32, iconBg: "#bde6ef", padding: 31, textWidth: 335 },
  { title: "Channels", description: "Connect communication channels like email, phone, and chat.", icon: "settings-channels", iconSize: 38, iconBg: "#bdf4e4", padding: 37, textWidth: 335 },
  { title: "Customization", description: "Personalize layouts, fields, modules, and branding.", icon: "settings-customization", iconSize: 40, iconBg: "#f7c2d4", textWidth: 362 },
  { title: "Automation", description: "Create workflows, rules, and schedules to automate tasks.", icon: "settings-automation", iconSize: 34, iconBg: "#c3c2f7", textWidth: 362 },
  { title: "Process Management", description: "Define and monitor sales and business processes.", icon: "settings-process", iconSize: 32, iconBg: "#fce9b4", textWidth: 362 },
  { title: "Data Administration", description: "Import, export, and maintain your CRM data securely.", icon: "settings-data", iconSize: 44, iconBg: "#bde6ef", textWidth: 362 },
  { title: "Marketplace", description: "Explore and install apps, integrations, and extensions.", icon: "settings-marketplace", iconSize: 36, iconBg: "#f7c2d4", textWidth: 362 },
  { title: "Developer Space", description: "Access APIs, webhooks, and developer tools.", icon: "settings-developer", iconSize: 43, iconBg: "#bdf4e4", boxSize: 65, textWidth: 362 },
];
