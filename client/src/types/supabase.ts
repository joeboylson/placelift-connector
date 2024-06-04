export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      action_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      app_info: {
        Row: {
          id: number
          key: string
          value: string
        }
        Insert: {
          id?: number
          key: string
          value: string
        }
        Update: {
          id?: number
          key?: string
          value?: string
        }
        Relationships: []
      }
      event_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          _order: number
          answer: string | null
          created_at: string
          id: number
          question: string | null
        }
        Insert: {
          _order: number
          answer?: string | null
          created_at?: string
          id?: number
          question?: string | null
        }
        Update: {
          _order?: number
          answer?: string | null
          created_at?: string
          id?: number
          question?: string | null
        }
        Relationships: []
      }
      preferred_contact_method_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      product_group_items: {
        Row: {
          created_at: string
          id: number
          is_selected: boolean
          product_group_id: number | null
          product_item_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_selected?: boolean
          product_group_id?: number | null
          product_item_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          is_selected?: boolean
          product_group_id?: number | null
          product_item_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_group_items_product_group_id_fkey"
            columns: ["product_group_id"]
            isOneToOne: false
            referencedRelation: "product_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_group_items_product_item_id_fkey"
            columns: ["product_item_id"]
            isOneToOne: false
            referencedRelation: "product_items"
            referencedColumns: ["id"]
          },
        ]
      }
      product_groups: {
        Row: {
          created_at: string
          id: number
          is_template: boolean | null
          name: string | null
          request_id: number | null
          update_type_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_template?: boolean | null
          name?: string | null
          request_id?: number | null
          update_type_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          is_template?: boolean | null
          name?: string | null
          request_id?: number | null
          update_type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_groups_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "user_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_groups_update_type_id_fkey"
            columns: ["update_type_id"]
            isOneToOne: false
            referencedRelation: "update_types"
            referencedColumns: ["id"]
          },
        ]
      }
      product_items: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image_path: string
          images: string[]
          is_per_sqft: boolean | null
          name: string
          price: number
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string
          images?: string[]
          is_per_sqft?: boolean | null
          name: string
          price?: number
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image_path?: string
          images?: string[]
          is_per_sqft?: boolean | null
          name?: string
          price?: number
          url?: string
        }
        Relationships: []
      }
      product_status_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      project_manager_profile: {
        Row: {
          created_at: string
          id: number
          position_name: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          position_name?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          position_name?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_manager_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      room_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      room_types_to_update_types: {
        Row: {
          room_type_id: number
          update_type_id: number
        }
        Insert: {
          room_type_id: number
          update_type_id: number
        }
        Update: {
          room_type_id?: number
          update_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "room_types_to_update_types_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_types_to_update_types_update_type_id_fkey"
            columns: ["update_type_id"]
            isOneToOne: false
            referencedRelation: "update_types"
            referencedColumns: ["id"]
          },
        ]
      }
      status_types: {
        Row: {
          _order: number
          completion_percentage: number
          created_at: string
          description: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          completion_percentage?: number
          created_at?: string
          description?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          completion_percentage?: number
          created_at?: string
          description?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      timing_option_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      update_types: {
        Row: {
          _order: number
          created_at: string
          id: number
          is_standard_option: boolean | null
          name: string | null
        }
        Insert: {
          _order: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Update: {
          _order?: number
          created_at?: string
          id?: number
          is_standard_option?: boolean | null
          name?: string | null
        }
        Relationships: []
      }
      user_actions: {
        Row: {
          action_type_id: number
          created_at: string
          file_path: string | null
          id: number
          image_path: string | null
          is_archived: boolean | null
          is_unread: boolean | null
          sender_id: number
          text: string | null
          user_id: number
        }
        Insert: {
          action_type_id: number
          created_at?: string
          file_path?: string | null
          id?: number
          image_path?: string | null
          is_archived?: boolean | null
          is_unread?: boolean | null
          sender_id: number
          text?: string | null
          user_id: number
        }
        Update: {
          action_type_id?: number
          created_at?: string
          file_path?: string | null
          id?: number
          image_path?: string | null
          is_archived?: boolean | null
          is_unread?: boolean | null
          sender_id?: number
          text?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_actions_action_type_id_fkey"
            columns: ["action_type_id"]
            isOneToOne: false
            referencedRelation: "action_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_actions_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          created_at: string
          due_date: string
          event_type_id: number
          id: number
          user_id: number
        }
        Insert: {
          created_at?: string
          due_date?: string
          event_type_id: number
          id?: number
          user_id: number
        }
        Update: {
          created_at?: string
          due_date?: string
          event_type_id?: number
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_events_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_homes: {
        Row: {
          address: string | null
          created_at: string
          id: number
          image_path: string | null
          is_archived: boolean | null
          name: string | null
          user_id: number
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          image_path?: string | null
          is_archived?: boolean | null
          name?: string | null
          user_id: number
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          image_path?: string | null
          is_archived?: boolean | null
          name?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_homes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_request_products: {
        Row: {
          created_at: string
          id: number
          name: string | null
          product_status_id: number | null
          updated_at: string | null
          url: string | null
          user_id: number | null
          user_request_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          product_status_id?: number | null
          updated_at?: string | null
          url?: string | null
          user_id?: number | null
          user_request_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          product_status_id?: number | null
          updated_at?: string | null
          url?: string | null
          user_id?: number | null
          user_request_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_request_products_product_status_id_fkey"
            columns: ["product_status_id"]
            isOneToOne: false
            referencedRelation: "product_status_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_request_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_request_products_user_request_id_fkey"
            columns: ["user_request_id"]
            isOneToOne: false
            referencedRelation: "user_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_requests: {
        Row: {
          created_at: string
          description: string | null
          id: number
          images: string[] | null
          is_archived: boolean | null
          is_spam: boolean | null
          price: number
          room_type_id: number
          status_type_id: number
          user_home_id: number
          user_id: number
          videos: string[] | null
          will_change_floorplan: boolean | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          images?: string[] | null
          is_archived?: boolean | null
          is_spam?: boolean | null
          price?: number
          room_type_id: number
          status_type_id?: number
          user_home_id: number
          user_id: number
          videos?: string[] | null
          will_change_floorplan?: boolean | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          images?: string[] | null
          is_archived?: boolean | null
          is_spam?: boolean | null
          price?: number
          room_type_id?: number
          status_type_id?: number
          user_home_id?: number
          user_id?: number
          videos?: string[] | null
          will_change_floorplan?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_requests_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_requests_status_type_id_fkey"
            columns: ["status_type_id"]
            isOneToOne: false
            referencedRelation: "status_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_requests_user_home_id_fkey"
            columns: ["user_home_id"]
            isOneToOne: false
            referencedRelation: "user_homes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_requests_to_update_types: {
        Row: {
          update_type_id: number
          user_request_id: number
        }
        Insert: {
          update_type_id: number
          user_request_id: number
        }
        Update: {
          update_type_id?: number
          user_request_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_requests_to_update_types_update_type_id_fkey"
            columns: ["update_type_id"]
            isOneToOne: false
            referencedRelation: "update_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_requests_to_update_types_user_request_id_fkey"
            columns: ["user_request_id"]
            isOneToOne: false
            referencedRelation: "user_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string | null
          firebase_id: string | null
          has_selected_theme: boolean | null
          has_viewed_tutorial: boolean | null
          id: number
          image_path: string | null
          is_archived: boolean | null
          is_guest: boolean | null
          name: string | null
          phone_number: string | null
          project_manager_id: number | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email?: string | null
          firebase_id?: string | null
          has_selected_theme?: boolean | null
          has_viewed_tutorial?: boolean | null
          id?: number
          image_path?: string | null
          is_archived?: boolean | null
          is_guest?: boolean | null
          name?: string | null
          phone_number?: string | null
          project_manager_id?: number | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string | null
          firebase_id?: string | null
          has_selected_theme?: boolean | null
          has_viewed_tutorial?: boolean | null
          id?: number
          image_path?: string | null
          is_archived?: boolean | null
          is_guest?: boolean | null
          name?: string | null
          phone_number?: string | null
          project_manager_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_project_manager_id_fkey"
            columns: ["project_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_to_preferred_contact_methods: {
        Row: {
          preferred_contact_method_type_id: number
          user_id: number
        }
        Insert: {
          preferred_contact_method_type_id: number
          user_id: number
        }
        Update: {
          preferred_contact_method_type_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_users_to_preferred_contact_methods_preferred_contact_met"
            columns: ["preferred_contact_method_type_id"]
            isOneToOne: false
            referencedRelation: "preferred_contact_method_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_to_preferred_contact_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
