const page = (title, kicker, lead, body, image, points) => ({ title, kicker, lead, body, image, points });
const system = '/images/integrated-system.webp';
const storage = '/images/storage.webp';
const solar = '/images/solar.webp';
const space = '/images/space.webp';
export const pages = {
  company: page('Company','OUR PERSPECTIVE','A connected view of what comes next.','CTRI Global brings energy systems, engineering disciplines, emerging ideas and the relationships between them into one conversation. These chapters describe an editorial framework and areas of inquiry.',system,['One perspective','Practical questions','The long view']),
  vision: page('Vision','OUR PERSPECTIVE','Think in systems. Work across boundaries.','A generation asset, storage layer, supporting infrastructure and operating model each shape the others. This perspective starts with those connections and the people and places affected by them.',system,['Connected','Responsible','Adaptable']),
  approach: page('Approach','OUR PERSPECTIVE','Make the complex legible.','Each chapter begins with a question, shows where it fits in the whole and links to the next area of exploration.',system,['Understand','Connect','Refine']),
  'integrated-energy': page('Integrated energy','ENERGY SYSTEMS','A system is stronger when its parts are understood together.','Solar generation, storage and supporting infrastructure have different roles. The integrated view looks at how those layers interact, from design intent through operation.',system,['Generation','Flexibility','Connection']),
  solar: page('Solar','ENERGY SYSTEMS','Start with the resource. Design for the place.','Solar is part of a larger energy conversation. Siting, design, grid interfaces and long-term maintenance all influence how an installation serves its purpose.',solar,['Place','Design','Operation']),
  storage: page('Storage','ENERGY SYSTEMS','Make room for flexibility.','Storage connects the timing of supply with the timing of use. Its value depends on the surrounding system, safety considerations and how it will be operated.',storage,['Timing','Safety','Lifecycle']),
  infrastructure: page('Infrastructure','ENERGY SYSTEMS','Connect the physical and the operational.','Infrastructure gives an energy system its interfaces with land, networks and people. The details of those interfaces matter as much as individual components.',storage,['Interfaces','Delivery','Resilience']),
  engineering: page('Engineering','DELIVERY DISCIPLINES','Bring the whole lifecycle into view.','Engineering translates intent into reality. Design, delivery and operations are connected stages, each informed by what comes before and after.',storage,['Design','Delivery','Operations']),
  design: page('Design','DELIVERY DISCIPLINES','A good answer begins with a better question.','Sound design starts with a clear problem statement, the real constraints of a site and an understanding of how a system must perform throughout its life.',system,['Context','Tradeoffs','Iteration']),
  delivery: page('Delivery','DELIVERY DISCIPLINES','Bridge the plan and the place.','Delivery turns a design into a working system. Sequence, procurement, coordination and verification are part of that transition.',storage,['Sequence','Coordination','Verification']),
  operations: page('Operations','DELIVERY DISCIPLINES','Keep learning after launch.','Operational thinking begins before commissioning. Monitoring, care and adaptation create opportunities to improve a system over its working life.',storage,['Observation','Maintenance','Adaptation']),
  markets: page('Markets','PLACES & APPLICATIONS','Different places ask different questions.','Energy and engineering decisions depend on geography, use, infrastructure and community. Explore the contexts where integrated thinking matters.',system,['Commercial','Utility','Remote']),
  commercial: page('Commercial settings','PLACES & APPLICATIONS','Energy as part of an operating environment.','Commercial energy decisions connect the built environment, the pattern of use and the responsibilities of operating a site.',solar,['Demand','Site','Continuity']),
  utility: page('Utility scale','PLACES & APPLICATIONS','Scale changes the conversation.','At larger scale, site planning, grid connection, delivery logistics and long-term stewardship become central design considerations.',solar,['Land','Grid','Lifecycle']),
  remote: page('Remote systems','PLACES & APPLICATIONS','Design around the constraints that matter most.','Remote and constrained locations call for attention to availability, access, maintenance and the people who depend on the system.',storage,['Access','Resilience','Care']),
  climate: page('Climate & stewardship','RESPONSIBILITY','Measure what matters. Say what can be supported.','Climate and resource claims require clear boundaries, reliable data and context. Here we introduce the questions without presenting estimates as measured outcomes.',solar,['Boundaries','Evidence','Stewardship']),
  carbon: page('Carbon','RESPONSIBILITY','Clarity before claims.','A meaningful carbon conversation distinguishes assumptions, calculated estimates and verified performance. No live telemetry or certified reductions are represented on this site.',solar,['Baseline','Method','Verification']),
  stewardship: page('Stewardship','RESPONSIBILITY','Consider the full footprint of a decision.','Systems touch land, materials, communities and future operations. Responsible choices bring those relationships into the conversation from the start.',system,['Place','Materials','People']),
  frontiers: page('Frontiers','BEYOND THE HORIZON','Look outward with curiosity and discipline.','The frontiers chapter explores questions at the edge of energy, institutions and space. These are editorial areas of inquiry, not claims of active missions or contracted programs.',space,['Questions','Partnerships','Evidence']),
  space: page('Space systems','BEYOND THE HORIZON','A demanding lens on energy and resilience.','Space systems offer a way to think about constraints, autonomy and dependable power. This is a conceptual exploration; no mission, hardware or agency partnership is implied.',space,['Power','Autonomy','Reliability']),
  institutions: page('Institutions','BEYOND THE HORIZON','Complex challenges need shared language.','Research, policy and delivery organizations each bring a different view. Useful collaboration begins with a clear scope and a common understanding of evidence.',system,['Scope','Roles','Outcomes']),
  connect: page('Connect','BEGIN A CONVERSATION','A better future starts with a conversation.','For current Centauri Renewables information and inquiries, use its established public site. This CTRI Global preview is an editorial introduction; a dedicated inquiry channel will be added when verified.',system,['Explore','Verify','Reach out']),
};
export const groups = [
  { label: 'Company', items: ['company','vision','approach'] },
  { label: 'Energy', items: ['integrated-energy','solar','storage','infrastructure'] },
  { label: 'Engineering', items: ['engineering','design','delivery','operations'] },
  { label: 'Markets', items: ['markets','commercial','utility','remote'] },
  { label: 'Climate', items: ['climate','carbon','stewardship'] },
  { label: 'Frontiers', items: ['frontiers','space','institutions'] },
  { label: 'Connect', items: ['connect'] },
];
