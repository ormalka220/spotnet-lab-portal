
export type LabType = {
  id: string;
  name: string;
  description: string;
  os: 'Windows' | 'Linux';
  icon: string;
};

export type LabDuration = {
  id: string;
  hours: number;
  label: string;
};

export type LabStatus = 'active' | 'completed' | 'failed';

export type Lab = {
  id: string;
  type: LabType;
  duration: LabDuration;
  startTime: Date;
  endTime: Date;
  status: LabStatus;
  serverName: string;
};

export const LAB_TYPES: LabType[] = [
  {
    id: 'bgp-lab',
    name: 'BGP Lab',
    description: 'Border Gateway Protocol networking lab environment',
    os: 'Windows',
    icon: 'network'
  },
  {
    id: 'ospf-lab',
    name: 'OSPF Lab',
    description: 'Open Shortest Path First routing protocol lab',
    os: 'Windows',
    icon: 'router'
  },
  {
    id: 'fortigate-lab',
    name: 'Fortigate Lab',
    description: 'Fortinet security appliance lab environment',
    os: 'Linux',
    icon: 'shield'
  },
  {
    id: 'dns-dhcp-lab',
    name: 'DNS + DHCP Lab',
    description: 'Domain Name System and DHCP server configuration lab',
    os: 'Windows',
    icon: 'server'
  },
  {
    id: 'empty-windows',
    name: 'Empty Windows',
    description: 'Clean Windows Server 2022 environment',
    os: 'Windows',
    icon: 'window'
  },
  {
    id: 'empty-linux',
    name: 'Empty Linux',
    description: 'Clean Linux server environment',
    os: 'Linux',
    icon: 'terminal'
  }
];

export const LAB_DURATIONS: LabDuration[] = [
  {
    id: '1hr',
    hours: 1,
    label: '1 hour'
  },
  {
    id: '2hr',
    hours: 2,
    label: '2 hours'
  },
  {
    id: '3hr',
    hours: 3,
    label: '3 hours'
  },
  {
    id: '5hr',
    hours: 5,
    label: '5 hours'
  }
];

// Utility functions
export const getEstimatedEndTime = (duration: LabDuration): Date => {
  const now = new Date();
  return new Date(now.getTime() + duration.hours * 60 * 60 * 1000);
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const generateServerName = (labType: LabType): string => {
  const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${labType.id}-${randomSuffix}`;
};

export const getRemainingTime = (endTime: Date): string => {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m remaining`;
};
