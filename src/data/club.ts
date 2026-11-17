// Client facts for the homepage. Source: veon/client.json, audit/text/home.txt (ids in comments). Nothing here is invented.

export const phones = {
  // company.contacts.phones[0]; B-R002: one checked number in tel:
  main: { tel: "+380678833073", label: "067 883 30 73" },
  // company.contacts.phones[1], L-F003
  second: { tel: "+380738833073", label: "073 883 30 73" },
} as const;

// company.contacts.emails[1], L-F003, audit/chrome-facts.json
export const email = "info@junior-club.com.ua";

// socials[] with status "confirmed" (YouTube inactive for 6 years — not shown, ux/demo-home.md §6)
export const socials = [
  { name: "Instagram", handle: "@juniorclublviv", url: "https://www.instagram.com/juniorclublviv/" },
  { name: "Facebook", handle: "juniorclublviv", url: "https://www.facebook.com/juniorclublviv/" },
] as const;

const map = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}`;

// B-F007, company.contacts.addresses, audit/text/home.txt (floors)
export const arenas = [
  {
    id: "pidzamche",
    district: "Підзамче",
    area: "150",
    street: "просп. В'ячеслава Чорновола, 63",
    short: "Чорновола, 63",
    floor: "1-й поверх",
    map: map("Львів, проспект В'ячеслава Чорновола, 63"),
  },
  {
    id: "sykhiv",
    district: "Сихів",
    area: "300",
    street: "просп. Червоної Калини, 37",
    short: "Червоної Калини, 37",
    floor: "2-й поверх",
    map: map("Львів, проспект Червоної Калини, 37"),
  },
] as const;

// L-F002 (age groups from the landing page)
export const programs = [
  { age: "1,6–3", name: "Junior Малюк" },
  { age: "3–4,5", name: "Junior Новачок" },
  { age: "4,5–6", name: "Junior Профі" },
  { age: "6–8", name: "Junior Легенда" },
  { age: "8–12", name: "Школа футболу" },
] as const;

// B-F009 (2024), L-F007
export const season = [
  { title: "Halloween CUP 2024", note: "Дитячий турнір", year: "2024" },
  { title: "Свято Миколая в Junior Club", note: "Свято для дітей у клубі", year: "2024" },
  { title: "Футбольне літо в Греції з Junior Club", note: "Розважально-тренувальна поїздка", year: "2024" },
  { title: "Вихід із футболістами на матчах Прем'єр-ліги", note: "Вихованці супроводжують футболістів", year: "" },
  { title: "Місцеві та міжнародні дитячі турніри", note: "Вихованці беруть участь у дитячих турнірах", year: "" },
] as const;

export const site = {
  title: "Футбол для дітей у Львові від 1,6 року — Junior Club",
  description:
    "Академія раннього розвитку футболу Junior Club: голландська методика, арени на Підзамчі та Сихові. Перше заняття 45 хв — безкоштовно. 067 883 30 73",
  h1: "Дитячий футбол у Львові від 1,6 року — перше заняття безкоштовно",
} as const;
