export type ListingStatus =
  | "intake"
  | "processing"
  | "review"
  | "published"
  | "archived";

export interface Listing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: ListingStatus;
  mls_number: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface DashboardMetrics {
  totalListings: number;
  activeListings: number;
  inReview: number;
  publishedThisMonth: number;
}
