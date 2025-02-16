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
      admin_logs: {
        Row: {
          created_at: string | null
          details: Json | null
          id: string
          log_type: string
          message: string
          scan_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: string
          log_type: string
          message: string
          scan_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: string
          log_type?: string
          message?: string
          scan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "wallet_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      security_issues: {
        Row: {
          created_at: string | null
          description: string
          id: string
          issue_type: string
          recommendation: string
          scan_id: string | null
          severity: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          issue_type: string
          recommendation: string
          scan_id?: string | null
          severity: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          issue_type?: string
          recommendation?: string
          scan_id?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_issues_scan_id_fkey"
            columns: ["scan_id"]
            isOneToOne: false
            referencedRelation: "wallet_scans"
            referencedColumns: ["id"]
          },
        ]
      }
      Table: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      wallet_scans: {
        Row: {
          created_at: string | null
          email: string
          id: string
          issue_id: string | null
          scan_results: Json | null
          security_score: number | null
          status: Database["public"]["Enums"]["scan_status"] | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          issue_id?: string | null
          scan_results?: Json | null
          security_score?: number | null
          status?: Database["public"]["Enums"]["scan_status"] | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          issue_id?: string | null
          scan_results?: Json | null
          security_score?: number | null
          status?: Database["public"]["Enums"]["scan_status"] | null
          wallet_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      scan_status: "pending" | "completed" | "failed"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
