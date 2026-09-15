// types/navbar.ts

export interface NavbarUser {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface NavbarProps {
  user?: NavbarUser;
  logoSrc?: string;
  brandName?: string; 
  variant:string;
  brandTagline?: string;
  hasNotification?: boolean;
  onSearch?: (query: string) => void;
}