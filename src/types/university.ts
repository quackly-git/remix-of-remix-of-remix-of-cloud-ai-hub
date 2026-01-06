export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

export interface UserUniversity {
  id: string;
  user_id: string;
  university_name: string;
  country: string;
  alpha_two_code: string;
  web_page: string | null;
  state_province: string | null;
  created_at: string;
}

export interface CustomDiscussion {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}
