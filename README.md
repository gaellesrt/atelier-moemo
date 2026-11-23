# moemo.io

Site vitrine de moemo — *Context in motion*. Astro, statique, FR (`/`) et EN (`/en/`).

## Développer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run preview  # sert dist/
```

## Structure

| Chemin | Rôle |
|---|---|
| `src/i18n/ui.ts` | **Tous les textes FR/EN** et les liens (agenda, e-mail, Substack…). C'est ici qu'on modifie un texte. |
| `src/styles/global.css` | Tokens (couleurs, typo, rayons) et styles. |
| `src/layouts/Base.astro` | `<head>` (SEO, hreflang, OG), fond animé, en-tête, contact, pied de page. |
| `src/components/Home.astro` | Page d'accueil. |
| `src/components/ServicesPage.astro` | Page Services. |
| `src/components/StepArt.astro` | Pictos calligraphiés de l'Approche. |
| `src/scripts/motion.ts` | Effets au scroll : halos, passage au noir, reveal, nuage de mots, dessin de l'Approche. |
| `public/assets/` | Logos SVG, favicon, icônes, photo, image OG. |

## Déploiement

GitHub Actions (`.github/workflows/deploy.yml`) construit et publie sur GitHub Pages à chaque push sur `main`.

Réglages GitHub (Settings → Pages), à ne pas modifier :
- **Source : GitHub Actions.** Le mode « Deploy from branch » publierait les fichiers source, pas le site.
- **Custom domain : `moemo.io`**, avec **Enforce HTTPS** coché.

Le domaine vit uniquement dans ces réglages. En publication par Actions, GitHub ignore tout fichier `CNAME` du repo : n'en ajoute pas.

## Référence design

Handoff « Moemo brief design 5 » : `README.md`, `DETAILS.md`, maquettes `Accueil` / `Services`, textes validés `Textes Site Moemo` (source de vérité des textes).
