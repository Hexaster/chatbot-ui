import { supabase } from "@/lib/supabase/browser-client"

export const getDomainByUserId = async (userId: string) => {
  const { data: domains } = await supabase
    .from("user_domain_process")
    .select("domain_id")
    .eq("user_id", userId)
  return domains
}
