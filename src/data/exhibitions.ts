/**
 * Ali Bachler — Exhibitions Data
 *
 * Add upcoming and past exhibitions here.
 * Status: "upcoming" | "ongoing" | "past"
 */

export type ExhibitionStatus = "upcoming" | "ongoing" | "past";

export interface ExhibitionDate {
  label: string;   // e.g. "Opening event"
  date: string;    // e.g. "Friday 24th April"
  time?: string;   // e.g. "5pm – 9pm"
}

export interface Exhibition {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  status: ExhibitionStatus;
  /** Primary poster image path */
  poster: string;
  /** Additional images (detail shots, invite pages, etc.) */
  images?: string[];
  dates: ExhibitionDate[];
  venue: {
    name: string;
    address?: string;
    city?: string;
    mapUrl?: string;
  };
  artists: string[];
  curatedBy?: string;
  description?: string;
  admission?: string;
  rsvpUrl?: string;
  instagramUrl?: string;
  featured: boolean;
}

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 1,
    slug: "out-of-chaos",
    title: "Out of Chãos",
    subtitle: "A curated art exhibition at Quinta dos Chãos",
    status: "upcoming",
    poster: "/images/exhibition/out-of-chaos-p1.png",
    images: [
      "/images/exhibition/out-of-chaos-p4.png",
    ],
    dates: [
      {
        label: "Opening event",
        date: "Friday 24th April",
        time: "5pm – 9pm",
      },
      {
        label: "Collection on view",
        date: "Saturday 25th April",
        time: "10am – 3pm",
      },
      {
        label: "Viewings by appointment",
        date: "Sunday 26th April",
      },
    ],
    venue: {
      name: "Quintas dos Chãos",
      address: "Av. das Laranjeiras 13",
      city: "2640 Santo Isidoro",
      mapUrl: "https://www.google.com/maps/place/Quinta+dos+Ch%C3%A3os/@38.9949453,-9.4005746,17z/data=!4m15!1m8!3m7!1s0xd1f26450980babb:0x21437c387b2a44ae!2sAv.+das+Laranjeiras+13,+2640-094+Santo+Isidoro!3b1!8m2!3d38.9949453!4d-9.3979997!16s%2Fg%2F11h9p5jnj1!3m5!1s0xd1f271908626d3b:0xb941dd6973ea28b6!8m2!3d38.9956082!4d-9.3975092!16s%2Fg%2F11s7bg5h24?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D",
    },
    artists: ["Ali Bachler", "Mikayla Kwik", "James McEwen Hood", "Rami Mogabgab"],
    curatedBy: "In cooperation with ORO Collective",
    description:
      "Out of Chãos was chosen as a play on words, bridging the Portuguese meaning 'floors, grounds and soils' with the English definition 'a state of utter disorder.' By merging these two worlds, we welcome you into the world of Chaos.",
    admission: "Free entry — RSVP required",
    rsvpUrl: "https://www.eventbrite.com/e/bilhetes-out-of-chaos-a-curated-art-exhibition-at-quinta-dos-chaos-1985191411953?aff=oddtdtcreator&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=fbclid",
    featured: true,
  },
];

export function getUpcomingExhibitions(): Exhibition[] {
  return EXHIBITIONS.filter(
    (e) => e.status === "upcoming" || e.status === "ongoing"
  ).sort((a, b) => a.id - b.id);
}

export function getPastExhibitions(): Exhibition[] {
  return EXHIBITIONS.filter((e) => e.status === "past");
}

export function getFeaturedExhibition(): Exhibition | undefined {
  return EXHIBITIONS.find((e) => e.featured && e.status !== "past");
}
