export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name_en: string;
          name_sq: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name_en: string;
          name_sq: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name_en?: string;
          name_sq?: string;
          slug?: string;
        };
        Relationships: [];
      };
      cities: {
        Row: {
          country: string;
          created_at: string;
          id: string;
          lat: number | null;
          lng: number | null;
          name_en: string;
          name_sq: string;
          slug: string;
        };
        Insert: {
          country?: string;
          created_at?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          name_en: string;
          name_sq: string;
          slug: string;
        };
        Update: {
          country?: string;
          created_at?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          name_en?: string;
          name_sq?: string;
          slug?: string;
        };
        Relationships: [];
      };
      event_organizations: {
        Row: {
          event_id: string;
          organization_id: string;
          role: string | null;
        };
        Insert: {
          event_id: string;
          organization_id: string;
          role?: string | null;
        };
        Update: {
          event_id?: string;
          organization_id?: string;
          role?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_organizations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_organizations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      event_people: {
        Row: {
          event_id: string;
          mention_context: string | null;
          person_id: string;
        };
        Insert: {
          event_id: string;
          mention_context?: string | null;
          person_id: string;
        };
        Update: {
          event_id?: string;
          mention_context?: string | null;
          person_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_people_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_people_person_id_fkey";
            columns: ["person_id"];
            isOneToOne: false;
            referencedRelation: "people";
            referencedColumns: ["id"];
          },
        ];
      };
      event_tags: {
        Row: {
          event_id: string;
          tag_id: string;
        };
        Insert: {
          event_id: string;
          tag_id: string;
        };
        Update: {
          event_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_tags_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      event_timeline_entries: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          event_id: string;
          id: string;
          occurred_at: string;
          source_id: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          event_id: string;
          id?: string;
          occurred_at: string;
          source_id?: string | null;
          title: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          event_id?: string;
          id?: string;
          occurred_at?: string;
          source_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_timeline_entries_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_timeline_entries_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_timeline_entries_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "sources";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          ai_summary: string | null;
          category_id: string | null;
          city_id: string | null;
          confidence: number | null;
          created_at: string;
          created_by: string | null;
          editor_summary: string | null;
          event_date: string | null;
          id: string;
          is_featured: boolean;
          is_pinned: boolean;
          lat: number | null;
          lng: number | null;
          published_at: string | null;
          slug: string;
          starts_at: string | null;
          status: Database["public"]["Enums"]["event_status"];
          summary_lang: string | null;
          title: string;
          updated_at: string;
          view_count: number;
        };
        Insert: {
          ai_summary?: string | null;
          category_id?: string | null;
          city_id?: string | null;
          confidence?: number | null;
          created_at?: string;
          created_by?: string | null;
          editor_summary?: string | null;
          event_date?: string | null;
          id?: string;
          is_featured?: boolean;
          is_pinned?: boolean;
          lat?: number | null;
          lng?: number | null;
          published_at?: string | null;
          slug: string;
          starts_at?: string | null;
          status?: Database["public"]["Enums"]["event_status"];
          summary_lang?: string | null;
          title: string;
          updated_at?: string;
          view_count?: number;
        };
        Update: {
          ai_summary?: string | null;
          category_id?: string | null;
          city_id?: string | null;
          confidence?: number | null;
          created_at?: string;
          created_by?: string | null;
          editor_summary?: string | null;
          event_date?: string | null;
          id?: string;
          is_featured?: boolean;
          is_pinned?: boolean;
          lat?: number | null;
          lng?: number | null;
          published_at?: string | null;
          slug?: string;
          starts_at?: string | null;
          status?: Database["public"]["Enums"]["event_status"];
          summary_lang?: string | null;
          title?: string;
          updated_at?: string;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      media: {
        Row: {
          caption: string | null;
          created_at: string;
          credit: string | null;
          event_id: string | null;
          exif_stripped: boolean;
          external_url: string | null;
          height: number | null;
          id: string;
          license: string | null;
          source_id: string | null;
          storage: Database["public"]["Enums"]["media_storage"];
          storage_path: string | null;
          thumbnail_path: string | null;
          type: Database["public"]["Enums"]["media_type"];
          width: number | null;
        };
        Insert: {
          caption?: string | null;
          created_at?: string;
          credit?: string | null;
          event_id?: string | null;
          exif_stripped?: boolean;
          external_url?: string | null;
          height?: number | null;
          id?: string;
          license?: string | null;
          source_id?: string | null;
          storage?: Database["public"]["Enums"]["media_storage"];
          storage_path?: string | null;
          thumbnail_path?: string | null;
          type: Database["public"]["Enums"]["media_type"];
          width?: number | null;
        };
        Update: {
          caption?: string | null;
          created_at?: string;
          credit?: string | null;
          event_id?: string | null;
          exif_stripped?: boolean;
          external_url?: string | null;
          height?: number | null;
          id?: string;
          license?: string | null;
          source_id?: string | null;
          storage?: Database["public"]["Enums"]["media_storage"];
          storage_path?: string | null;
          thumbnail_path?: string | null;
          type?: Database["public"]["Enums"]["media_type"];
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "media_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "media_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "sources";
            referencedColumns: ["id"];
          },
        ];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          is_verified: boolean;
          name: string;
          slug: string;
          type: Database["public"]["Enums"]["organization_type"];
          website: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_verified?: boolean;
          name: string;
          slug: string;
          type?: Database["public"]["Enums"]["organization_type"];
          website?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_verified?: boolean;
          name?: string;
          slug?: string;
          type?: Database["public"]["Enums"]["organization_type"];
          website?: string | null;
        };
        Relationships: [];
      };
      people: {
        Row: {
          created_at: string;
          display_name: string;
          id: string;
          is_verified: boolean;
          kind: Database["public"]["Enums"]["person_kind"];
          role_description: string | null;
          slug: string;
          visibility: Database["public"]["Enums"]["person_visibility"];
        };
        Insert: {
          created_at?: string;
          display_name: string;
          id?: string;
          is_verified?: boolean;
          kind?: Database["public"]["Enums"]["person_kind"];
          role_description?: string | null;
          slug: string;
          visibility?: Database["public"]["Enums"]["person_visibility"];
        };
        Update: {
          created_at?: string;
          display_name?: string;
          id?: string;
          is_verified?: boolean;
          kind?: Database["public"]["Enums"]["person_kind"];
          role_description?: string | null;
          slug?: string;
          visibility?: Database["public"]["Enums"]["person_visibility"];
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          role: Database["public"]["Enums"]["user_role"];
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          role?: Database["public"]["Enums"]["user_role"];
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          username?: string | null;
        };
        Relationships: [];
      };
      sources: {
        Row: {
          ai_category: string | null;
          ai_summary: string | null;
          ai_tags: string[] | null;
          ai_title: string | null;
          created_at: string;
          detected_city: string | null;
          detected_date: string | null;
          event_id: string | null;
          id: string;
          is_relevant: boolean | null;
          platform: Database["public"]["Enums"]["source_platform"];
          processed_at: string | null;
          raw_metadata: Json | null;
          reliability: Database["public"]["Enums"]["source_reliability"];
          status: Database["public"]["Enums"]["source_status"];
          submitted_by: string | null;
          url: string;
        };
        Insert: {
          ai_category?: string | null;
          ai_summary?: string | null;
          ai_tags?: string[] | null;
          ai_title?: string | null;
          created_at?: string;
          detected_city?: string | null;
          detected_date?: string | null;
          event_id?: string | null;
          id?: string;
          is_relevant?: boolean | null;
          platform?: Database["public"]["Enums"]["source_platform"];
          processed_at?: string | null;
          raw_metadata?: Json | null;
          reliability?: Database["public"]["Enums"]["source_reliability"];
          status?: Database["public"]["Enums"]["source_status"];
          submitted_by?: string | null;
          url: string;
        };
        Update: {
          ai_category?: string | null;
          ai_summary?: string | null;
          ai_tags?: string[] | null;
          ai_title?: string | null;
          created_at?: string;
          detected_city?: string | null;
          detected_date?: string | null;
          event_id?: string | null;
          id?: string;
          is_relevant?: boolean | null;
          platform?: Database["public"]["Enums"]["source_platform"];
          processed_at?: string | null;
          raw_metadata?: Json | null;
          reliability?: Database["public"]["Enums"]["source_reliability"];
          status?: Database["public"]["Enums"]["source_status"];
          submitted_by?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sources_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sources_submitted_by_fkey";
            columns: ["submitted_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_moderator: { Args: never; Returns: boolean };
    };
    Enums: {
      event_status:
        "draft" | "needs_review" | "published" | "rejected" | "archived";
      media_storage: "external" | "supabase";
      media_type: "photo" | "video" | "document";
      organization_type:
        "ngo" | "party" | "gov" | "police" | "media" | "business" | "other";
      person_kind:
        "public_official" | "organization_rep" | "public_figure" | "private";
      person_visibility: "public" | "restricted" | "redacted";
      source_platform:
        | "instagram"
        | "facebook"
        | "youtube"
        | "tiktok"
        | "news"
        | "photo"
        | "video"
        | "pdf"
        | "witness"
        | "other";
      source_reliability:
        | "government"
        | "major_news"
        | "verified_journalist"
        | "verified_organizer"
        | "citizen_video"
        | "citizen_photo"
        | "anonymous"
        | "unknown";
      source_status:
        | "pending"
        | "processing"
        | "needs_review"
        | "approved"
        | "rejected"
        | "duplicate"
        | "error";
      user_role: "user" | "moderator" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      event_status: [
        "draft",
        "needs_review",
        "published",
        "rejected",
        "archived",
      ],
      media_storage: ["external", "supabase"],
      media_type: ["photo", "video", "document"],
      organization_type: [
        "ngo",
        "party",
        "gov",
        "police",
        "media",
        "business",
        "other",
      ],
      person_kind: [
        "public_official",
        "organization_rep",
        "public_figure",
        "private",
      ],
      person_visibility: ["public", "restricted", "redacted"],
      source_platform: [
        "instagram",
        "facebook",
        "youtube",
        "tiktok",
        "news",
        "photo",
        "video",
        "pdf",
        "witness",
        "other",
      ],
      source_reliability: [
        "government",
        "major_news",
        "verified_journalist",
        "verified_organizer",
        "citizen_video",
        "citizen_photo",
        "anonymous",
        "unknown",
      ],
      source_status: [
        "pending",
        "processing",
        "needs_review",
        "approved",
        "rejected",
        "duplicate",
        "error",
      ],
      user_role: ["user", "moderator", "admin"],
    },
  },
} as const;
