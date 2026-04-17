export interface Link {
  name: string;
  icon: string;
  url: string;
  description?: string;
  pinned?: boolean;
  category?: string;
}

export interface ProfileTheme {
  gradient?: [string, string];
  mode?: 'dark' | 'light';
}

export interface Profile {
  name: string;
  desc: string;
  bio?: string;
  location?: string;
  iconurl: string;
  links: Link[];
  skills?: string[];
  theme?: ProfileTheme;
  available?: boolean;
  availabilityText?: string;
}

export interface ProfileData extends Array<Profile> {}
