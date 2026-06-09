import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://puxlwevkyfztlbvajnva.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY env var required");

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ITEMS = [
  {
    title: "Futurepedia",
    description:
      "세계 최대 AI 툴 디렉토리 및 교육 플랫폼. 4,000개 이상의 큐레이션된 AI 도구와 29개 코스, 1,000개 이상의 레슨을 제공한다. AI 도어 발견부터 스킬 학습까지 원스톱으로 커버하는 독립 AI 미디어 생태계.",
    url: "https://futurepedia.io",
    category_slug: "resources",
    votes: 420,
  },
  {
    title: "AI Valley",
    description:
      "최신 AI 도구와 프롬프트를 발견할 수 있는 디렉토리 서비스. 1,780개 이상의 AI 도구와 390개 이상의 프롬프트를 카테고리별로 탐색할 수 있다. 매일 업데이트되는 신규 도구 정보를 제공.",
    url: "https://aivalley.ai",
    category_slug: "resources",
    votes: 315,
  },
  {
    title: "There's An AI For That (TAAFT)",
    description:
      "'AI 앱의 구글'이라 불리는 가장 큰 AI 툴 디렉토리. 수만 개의 AI 도구를 작업 기반으로 검색할 수 있다. 'podcast summarizer' 같은 구체적인 태스크로 필요한 AI 도구를 빠르게 찾는 데 특화.",
    url: "https://theresanaiforthat.com",
    category_slug: "resources",
    votes: 380,
  },
  {
    title: "Toolify",
    description:
      "29,000개 이상의 AI 도구를 등록한 초대형 AI 디렉토리. GPT 스토어 앱까지 포함하며 방대한 데이터베이스를 자랑한다. 카테고리 필터링과 검색 기능으로 원하는 도구를 찾을 수 있다.",
    url: "https://toolify.ai",
    category_slug: "resources",
    votes: 290,
  },
  {
    title: "FutureTools",
    description:
      "AI 도구 디렉토리 + 뉴스 + 학습 콘텐츠를 결합한 플랫폼. 신규 및 틈새 AI 도구 발견에 강점이 있으며, AI 뉴스와 활용법 아티클도 함께 제공한다.",
    url: "https://futuretools.io",
    category_slug: "resources",
    votes: 265,
  },
  {
    title: "Snack Prompt",
    description:
      "AI 프롬프트 마켓플레이스. 다양한 사용 사례별로 검증된 프롬프트를 사고팔 수 있는 커뮤니티 기반 플랫폼. 프롬프트 엔지니어링에 관심 있는 사용자들에게 유용한 리소스를 제공한다.",
    url: "https://snackprompt.com",
    category_slug: "prompts",
    votes: 230,
  },
  {
    title: "PromptHero",
    description:
      "AI 이미지 생성 프롬프트 갤러리. Midjourney, Stable Diffusion, FLUX 등 다양한 모델용 프롬프트를 탐색하고 큐레이션할 수 있다. 인기순/최신순 정렬과 상세 검색 기능을 지원한다.",
    url: "https://prompthero.com",
    category_slug: "prompts",
    votes: 345,
  },
  {
    title: "Graded Prompts",
    description:
      "큐레이티드 프롬프트 마켓플레이스. 숙련된 프롬프트 엔지니어가 제작한 고품질 프롬프트를 구매할 수 있는 플랫폼. 이미지, 비디오, 텍스트 등 다양한 카테고리를 지원한다.",
    url: "https://gradedprompts.com",
    category_slug: "prompts",
    votes: 185,
  },
  {
    title: "AI Agent Directory",
    description:
      "AI 에이전트 및 도구를 발견하고 탐색할 수 있는 종합 디렉토리. 혁신적인 AI 에이전트 솔루션을 카테고리별로 정리하여 사용자가 필요한 도구를 쉽게 찾을 수 있도록 돕는다.",
    url: "https://aiagents.directory",
    category_slug: "agents",
    votes: 205,
  },
];

async function main() {
  // 1. get category map
  const { data: cats } = await supabase.from("categories").select("id, slug");
  if (!cats) throw new Error("no categories");
  const catMap = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  // 2. get or create system profile
  const SYS_EMAIL = "system@airadar.app";
  let { data: sysUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("name", "AI Radar")
    .single();
  if (!sysUser) {
    const { data: authUser, error: createErr } =
      await supabase.auth.admin.createUser({
        email: SYS_EMAIL,
        password: crypto.randomUUID(),
        email_confirm: true,
      });
    if (createErr) throw createErr;
    const uid = authUser.user.id;
    await supabase.from("profiles").upsert({
      id: uid,
      name: "AI Radar",
      avatar_url: null,
    });
    sysUser = { id: uid };
    console.log("created system user:", uid);
  } else {
    console.log("using existing system user:", sysUser.id);
  }

  // 3. insert items
  let inserted = 0;
  for (const item of ITEMS) {
    const { data: existing } = await supabase
      .from("contents")
      .select("id")
      .eq("title", item.title)
      .single();
    if (existing) {
      console.log(`skipping "${item.title}" (already exists)`);
      continue;
    }
    const { error: insertErr } = await supabase.from("contents").insert({
      title: item.title,
      description: item.description,
      url: item.url,
      category_id: catMap[item.category_slug],
      user_id: sysUser.id,
      votes: item.votes,
    });
    if (insertErr) {
      console.error(`error inserting "${item.title}":`, insertErr);
    } else {
      inserted++;
      console.log(`inserted "${item.title}"`);
    }
  }

  // 4. update category counts
  for (const slug of new Set(ITEMS.map((i) => i.category_slug))) {
    const { count } = await supabase
      .from("contents")
      .select("*", { count: "exact", head: true })
      .eq("category_id", catMap[slug]);
    await supabase
      .from("categories")
      .update({ content_count: count })
      .eq("id", catMap[slug]);
  }

  console.log(`\ndone. inserted ${inserted} items.`);
}

main().catch(console.error);
