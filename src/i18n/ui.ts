// Source de vérité : « Textes Site Moemo » (handoff design v5).
export const LINKS = {
  booking: 'https://calendar.app.google/4P69UCPa46jLFiR57',
  email: 'mailto:hello@moemo.io',
  substack: 'https://cleandataarchitecture.substack.com/',
  youtube: 'https://youtube.com/@moemo-io',
  whitepaper: 'https://drive.google.com/file/d/1xibnOfzrpkDz9EurBc4ALToG4AIF8iWo/view',
  precisely:
    'https://www.precisely.com/data-integrity/2025-planning-insights-data-quality-remains-the-top-data-integrity-challenges/',
};

export type Lang = 'fr' | 'en';

const fr = {
  meta: {
    homeTitle: 'moemo — Context in motion',
    servicesTitle: 'Services — moemo',
    homeDesc:
      'Nous aidons les organisations data à créer un langage partagé entre métiers, tech et données. Mentoring, formations et accompagnement en Domain-Driven Design.',
    servicesDesc:
      "Du plus léger au plus engagé : mentoring, newsletter, vidéos, formations d'équipe, ateliers de domaines et missions avec Gaëlle Seret.",
  },
  nav: { approach: 'Approche', services: 'Services', about: 'À propos', home: 'Accueil', langLabel: 'Langue' },
  cta: 'Réserver un mentoring',
  hero: {
    titleA: 'Maîtriser votre ',
    titleCtx: 'contexte',
    titleB: ' durablement',
    titleFull: 'Maîtriser votre contexte durablement.',
    sub: 'Nous aidons les organisations data à créer un langage partagé entre métiers, tech et données.',
    explore: 'Explorer nos services',
  },
  problem: {
    eyebrow: 'Le problème',
    title: 'Vos équipes manipulent les mêmes données.',
    titleB: 'Mais pas le même ',
    titleCtx: 'contexte',
    text: 'Chaque domaine utilise ses propres mots, métriques et représentations.',
    kpi: '45 %',
    kpiLabel: 'des organisations citent des définitions et formats de données incohérents parmi les freins à une donnée de qualité',
    words: {
      slower: 'Décisions ralenties',
      rework: 'Retravail',
      misunderstandings: 'Malentendus',
      underused: 'Plateformes sous-utilisées',
      trust: 'Perte de confiance',
      delays: 'Lenteur',
      kpis: 'Indicateurs divergents',
    },
  },
  approach: {
    eyebrow: 'Notre approche',
    title: "Le Domain-Driven Design comme outil d'alignement.",
    titleB: 'Pas comme un cadre théorique.',
    p1: 'Comme une pratique vivante pour clarifier les domaines, aligner les équipes et rendre la donnée réellement exploitable.',
    p2: 'moemo transforme des architectures complexes en contextes partagés et actionnables.',
    kpiLabel: 'flux non gouvernés devenus data products',
    steps: [
      ['Clarifier', 'les domaines'],
      ['Relier', 'les équipes'],
      ['Partager', 'un langage commun'],
      ['Agir', 'avec une donnée exploitable'],
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Commencer par',
    titleB: 'une heure.',
    punch: 'Une heure suffit pour nommer ce qui bloque.',
    kpiLabel: 'professionnels formés au data product',
    seeAll: 'Voir tous les services',
    mentorTag: 'Mentoring · 1 heure',
    mentorTitle: 'Faire le point avec Gaëlle.',
    mentorText:
      'Pour les dirigeants qui veulent parler de leur contexte, poser leurs idées, nommer ce qui bloque et repartir avec une prochaine étape claire.',
    byEmail: 'Ou par e-mail à ',
  },
  about: {
    eyebrow: 'À propos',
    title: 'Praticienne.',
    titleB: 'Pas théoricienne.',
    p1: "Gaëlle Seret commence sa carrière en portant des sujets transverses, entre métiers, produit et data. À travers ses expériences, elle observe la fragilité de la cohérence d'un système, la difficulté des acteurs à se comprendre et à partager un langage commun.",
    p2a: "Elle fonde l'atelier ",
    p2b: " avec l'ambition de faire travailler les disciplines ensemble au cœur des entreprises : métiers, produit, tech et données.",
    kpiLabel: 'lecteurs dans 97 pays',
  },
  trust: {
    eyebrow: 'Ils nous font confiance',
    pernod: 'directions financières alignées sur un même domaine',
    lbc: 'domaines structurés et un modèle opérationnel',
    ima: 'livre blanc, accessible ici',
  },
  contact: {
    sub: 'Des domaines clairs. Une data utile. Un contexte partagé.',
    write: 'ou écrire à ',
  },
  path: {
    title: 'Puis, à votre rythme',
    titleB: 'du plus léger au plus engagé.',
    light: 'léger',
    engaged: 'engagé',
    example: 'Exemple de mission',
    stages: [
      { name: 'En solo', level: 'Engagement léger' },
      { name: 'En équipe', level: 'Engagement moyen' },
      { name: 'Dans votre contexte', level: 'Engagement fort' },
    ],
    s01: ["Chercher l'inspiration", "Clean Data Architecture, la newsletter : analyses et retours de terrain sur l'architecture et l'organisation des données.", 'Lire sur Substack'],
    s02: ['Se former en autonomie', 'Des vidéos sur le Domain-Driven Design appliqué aux organisations data, à suivre à votre rythme.', 'Voir la chaîne YouTube'],
    s03: ['Former son équipe', 'Des formations pour les équipes data et produit.', '4 h à 1 semaine', ['Computational federated governance', 'Data product management', 'Domain-Driven Design']],
    s04: ['Structurer ses domaines', 'Des ateliers pour clarifier vos domaines.', '4 h par domaine', ['Ubiquitous language', 'Event storming', 'Domain mapping']],
    s05: ['Structurer son organisation', "Organiser l'entreprise autour de ses domaines.", '½ journée · focus dédié', ['Cohérence data et produit', 'Accompagnement des leaders']],
    s06: ['Transformer ses pratiques', 'Un contributeur individuel intégré à vos équipes, pour transformer vos pratiques produit et data.', 'Staff'],
    s07: ['Piloter la transition', 'Une manager de transition pour travailler la vision avec vous, former votre équipe et construire la suite.', 'Head of'],
  },
};

export type UI = typeof fr;

const en: UI = {
  meta: {
    homeTitle: 'moemo — Context in motion',
    servicesTitle: 'Services — moemo',
    homeDesc:
      'We help data organizations build a shared language between business, tech and data. Mentoring, training and Domain-Driven Design support.',
    servicesDesc:
      'From light-touch to fully engaged: mentoring, newsletter, videos, team training, domain workshops and missions with Gaëlle Seret.',
  },
  nav: { approach: 'Approach', services: 'Services', about: 'About', home: 'Home', langLabel: 'Language' },
  cta: 'Book a mentoring session',
  hero: {
    titleA: 'Master your ',
    titleCtx: 'context',
    titleB: ' for the long run',
    titleFull: 'Master your context for the long run.',
    sub: 'We help data organizations build a shared language between business, tech and data.',
    explore: 'Explore our services',
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Your teams work with the same data.',
    titleB: 'But not the same ',
    titleCtx: 'context',
    text: 'Each domain uses its own words, metrics and representations.',
    kpi: '45%',
    kpiLabel: 'of organizations cite inconsistent data definitions and formats as a barrier to data quality',
    words: {
      slower: 'Slower decisions',
      rework: 'Rework',
      misunderstandings: 'Misunderstandings',
      underused: 'Underused platforms',
      trust: 'Loss of trust',
      delays: 'Delays',
      kpis: 'Diverging KPIs',
    },
  },
  approach: {
    eyebrow: 'Our approach',
    title: 'Domain-Driven Design as an alignment tool.',
    titleB: 'Not as a theoretical framework.',
    p1: 'As a living practice to clarify domains, align teams and make data truly usable.',
    p2: 'moemo turns complex architectures into shared, actionable contexts.',
    kpiLabel: 'ungoverned flows turned into data products',
    steps: [
      ['Clarify', 'domains'],
      ['Connect', 'teams'],
      ['Share', 'a common language'],
      ['Act', 'on usable data'],
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Start with',
    titleB: 'one hour.',
    punch: 'One hour is enough to name what is holding you back.',
    kpiLabel: 'professionals trained in data products',
    seeAll: 'See all services',
    mentorTag: 'Mentoring · 1 hour',
    mentorTitle: 'Take stock with Gaëlle.',
    mentorText:
      'For executives who want to talk through their context, lay out their ideas, name what is holding them back and leave with a clear next step.',
    byEmail: 'Or by email at ',
  },
  about: {
    eyebrow: 'About',
    title: 'A practitioner.',
    titleB: 'Not a theorist.',
    p1: "Gaëlle Seret began her career on cross-functional topics, between business, product and data. Along the way, she saw how fragile a system's coherence can be, and how hard it is for people to understand each other and share a common language.",
    p2a: 'She founded the ',
    p2b: ' studio to help disciplines work together at the heart of companies: business, product, tech and data.',
    kpiLabel: 'readers in 97 countries',
  },
  trust: {
    eyebrow: 'Trusted by',
    pernod: 'finance departments aligned on one domain',
    lbc: 'domains structured and one operating model',
    ima: 'white paper, available here',
  },
  contact: {
    sub: 'Clear domains. Useful data. Shared context.',
    write: 'or write to ',
  },
  path: {
    title: 'Then, at your own pace',
    titleB: 'from light-touch to fully engaged.',
    light: 'light',
    engaged: 'engaged',
    example: 'Example mission',
    stages: [
      { name: 'Solo', level: 'Light commitment' },
      { name: 'As a team', level: 'Medium commitment' },
      { name: 'In your context', level: 'Deep commitment' },
    ],
    s01: ['Find inspiration', 'Clean Data Architecture, the newsletter: analysis and field notes on data architecture and organization.', 'Read on Substack'],
    s02: ['Learn at your own pace', 'Videos on Domain-Driven Design for data organizations, at your own pace.', 'Watch on YouTube'],
    s03: ['Train your team', 'Training for data and product teams.', '4 h to 1 week', ['Computational federated governance', 'Data product management', 'Domain-Driven Design']],
    s04: ['Structure your domains', 'Workshops to clarify your domains.', '4 h per domain', ['Ubiquitous language', 'Event storming', 'Domain mapping']],
    s05: ['Structure your organization', 'Organizing the company around its domains.', 'Half a day · dedicated focus', ['Data and product coherence', 'Leadership support']],
    s06: ['Transform your practices', 'An individual contributor embedded in your teams, to transform your product and data practices.', 'Staff'],
    s07: ['Lead the transition', 'An interim manager to shape the vision with you, train your team and build what comes next.', 'Head of'],
  },
};

export const ui: Record<Lang, UI> = { fr, en };

/** Chemin d'une page dans une langue donnée. */
export const href = (lang: Lang, page: '' | 'services' = '') =>
  (lang === 'fr' ? '/' : '/en/') + (page ? page + '/' : '');
