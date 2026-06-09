const { createClient } = require("@supabase/supabase-js");

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Try RPC first
  const { error: rpcError } = await supabase.rpc("exec_sql", {
    sql_text: "ALTER TABLE contents ADD COLUMN IF NOT EXISTS target_roles TEXT[] DEFAULT '{}';",
  });

  if (rpcError) {
    console.log("RPC failed:", rpcError.message);
    console.log("You may need to run this SQL manually in the Supabase SQL editor:");
    console.log("ALTER TABLE contents ADD COLUMN IF NOT EXISTS target_roles TEXT[] DEFAULT '{}';");
    process.exit(1);
  }

  console.log("target_roles column added successfully");
}

main().catch(console.error);
