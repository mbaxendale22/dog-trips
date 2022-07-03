export type User = {
  id: number;
  createdAt: string;
  user_id: string;
  name: string;
  household: number;
};

export type DatedTrip = {
  id: number;
  created_at: string;
  user_profile: {
    id: number;
    created_at: string;
    name: string;
    household: number;
  };
  household: number;
};
