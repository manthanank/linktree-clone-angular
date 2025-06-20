export interface Link {
  name: string;
  icon: string;
  url: string;
  description?: string;
}

export interface Profile {
  name: string;
  desc: string;
  bio?: string;
  location?: string;
  iconurl: string;
  links: Link[];
  skills?: string[];
}

export interface ProfileData extends Array<Profile> {}
