
function getSupabaseClient(){
  const c=window.APP_CONFIG||{};
  if(!c.SUPABASE_URL || !c.SUPABASE_ANON_KEY || c.SUPABASE_URL.includes("COLE_AQUI")){
    alert("Configure o Supabase no arquivo config.js primeiro.");
    return null;
  }
  return window.supabase.createClient(c.SUPABASE_URL,c.SUPABASE_ANON_KEY);
}
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function normalizePhone(p){
  let n=String(p||"").replace(/\D/g,"");
  if(n.startsWith("00"))n=n.slice(2);
  if(!n.startsWith("55")&&(n.length===10||n.length===11))n="55"+n;
  return n;
}
function openWhatsApp(phone){
  const n=normalizePhone(phone);
  if(n.length<12){ alert("Telefone inválido. Inclua DDD."); return; }
  window.open("https://wa.me/"+n,"_blank");
}
function extractCoords(text){
  if(!text)return null;
  let m=text.match(/@(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/)
    ||text.match(/!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/)
    ||text.match(/[?&](?:query|q|destination)=(-?\d{1,2}\.\d+)(?:%2C|,)(-?\d{1,3}\.\d+)/i)
    ||text.match(/(-?\d{1,2}\.\d+)\s*[,;\s]\s*(-?\d{1,3}\.\d+)/);
  return m?{lat:+m[1],lng:+m[2]}:null;
}
