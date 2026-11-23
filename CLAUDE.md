# CLAUDE.md

Consignes pour une IA (Claude Code ou autre) qui travaille sur ce repo. À tenir à jour quand l'organisation change.

## Le projet

Site vitrine de **moemo** (Atelier Moemo, Gaëlle Seret) : https://moemo.io. Cabinet qui aide les organisations data à créer un langage partagé entre métiers, tech et données (Domain-Driven Design, data mesh). Audience : CDO et dirigeants. Objectif unique du site : **réserver un mentoring** (lien agenda Google).

- **Stack :** Astro 5, site 100 % statique, TypeScript. Pas de framework UI, pas de CMS, pas de base de données.
- **Langues :** français par défaut sur `/`, anglais sur `/en/` (i18n natif d'Astro, `prefixDefaultLocale: false`).
- **Pages :** Accueil (`/`, `/en/`) et Services (`/services/`, `/en/services/`).

## Commandes

```bash
npm ci            # installer (respecte package-lock.json)
npm run dev       # http://localhost:4321
npm run build     # génère dist/ ; doit passer sans erreur avant toute PR
npm run preview   # sert dist/
npx astro check   # contrôle de types (installer @astrojs/check au besoin, sans l'ajouter au repo)
```

Pas de suite de tests. Vérifier visuellement : desktop 1280 px, mobile 390 px, `prefers-reduced-motion`, et JavaScript désactivé.

## Où est quoi

| Chemin | Rôle |
|---|---|
| `src/i18n/ui.ts` | **Tous les textes FR/EN et tous les liens.** Un texte ne s'écrit jamais en dur dans un composant. |
| `src/layouts/Base.astro` | `<head>` (SEO, hreflang, OG), fond animé, en-tête, Contact, pied de page. |
| `src/components/Home.astro` | Accueil : hero, problème, approche, services, à propos, confiance. |
| `src/components/ServicesPage.astro` | Page Services : carte mentoring + parcours en 3 étapes / 7 cartes. |
| `src/components/Kpi.astro` | Indicateur chiffre / libellé / source. |
| `src/components/StepArt.astro` | Pictos SVG de l'Approche, repris tels quels de la maquette. |
| `src/styles/global.css` | Tokens (en tête) puis styles par bloc. |
| `src/scripts/motion.ts` | Tous les effets au scroll. |
| `public/assets/` | Logos SVG, favicon, icônes, photo, image OG. |
| `.github/workflows/deploy.yml` | Build + publication GitHub Pages à chaque push sur `main`. |

## Règles de design (handoff « Moemo brief design 5 », à respecter)

- **Source de vérité des textes :** le document « Textes Site Moemo » du handoff. En cas d'écart avec une maquette, ce document fait foi.
- **Typo :** Nunito (titres, graisses fines 300/400) et Manrope (texte). Pas de serif.
- **Couleurs :** utiliser les variables de `global.css` (`--violet` `#6B28E0`, `--violet-bright` `#8F48FF`, `--cream` `#FFFCF8`, `--dark` `#0E0E12`…), jamais une nouvelle valeur en dur.
- **Italique violet :** réservé au mot *contexte* / *context*. Seule exception validée : « une heure. » dans le titre de la page Services.
- **Animations :** déclenchées au scroll uniquement. Aucun effet au pointeur (pas de magnétisme, d'inclinaison, de parallaxe souris).
- **`prefers-reduced-motion` :** couper toutes les animations et afficher les états finaux.
- **Liens externes :** soulignés violet `#8F48FF` + « ↗ », `target="_blank" rel="noopener"`.
- **Responsive :** breakpoint principal 820 px ; cibles tactiles ≥ 44 px.
- **Écarté, ne pas réintroduire :** effets au pointeur, taches aquarelle texturées, trait fin sous les titres, plusieurs fonds de carnet (seulement les points), flèche « scroll ».

## Fonctionnement à connaître

- **Partie sombre (Confiance, Contact, pied de page) :** le fond noir est peint par `motion.ts` sur un canvas fixe, au scroll, pour laisser voir les halos. Le CSS donne un fond sombre de secours tant que la classe `motion-ready` n'est pas posée sur `<html>`. Ne pas supprimer ce secours : sans lui, le texte blanc devient illisible si le JS ne tourne pas.
- **Apparitions :** les éléments `[data-reveal]` ne sont masqués que si `<html>` a la classe `js` (posée par un script inline dans `<head>`).
- **Langue :** le choix fait via le sélecteur FR · EN est mémorisé (`localStorage` `moemo-lang`). Pas de redirection selon la langue du navigateur, pour ne pas gêner l'indexation de `/en/`.

## Déploiement

- Tout merge sur `main` part en production (≈ 1 min 20). Travailler sur une branche et passer par une PR.
- GitHub Settings → Pages : **Source = GitHub Actions**, **Custom domain = `moemo.io`**, **Enforce HTTPS** coché. Ne pas repasser en « Deploy from branch ».
- **Pas de fichier `CNAME` dans le repo :** en publication par Actions, GitHub l'ignore. Le domaine vit uniquement dans les réglages.

## Conventions

- Textes des commits, PR et commentaires de code en français.
- Une PR = un sujet. Décrire dans la PR ce qui change à l'écran.
