# Hardy's Art — Portfolio

Site portfolio one-page : motion design & vidéo. Design noir + glow bleu, animations au scroll, 100 % statique (HTML/CSS/JS, aucune dépendance à installer).

## Utiliser le site

Ouvrir simplement `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000
```

Le site est déployable tel quel sur Netlify, Vercel, GitHub Pages ou n'importe quel hébergeur statique.

## Personnaliser

| Quoi | Où |
|---|---|
| E-mail de contact | `index.html` → section `#contact`, attributs `href="mailto:..."` et `data-mail` |
| Liens Behance / Instagram / LinkedIn | `index.html` → section `.footer-socials` et bouton Behance du CTA |
| Projets | `index.html` → section `#projets` (titre, description, tag). Remplacer les images `assets/projects/*.svg` par vos visuels réels (PNG/JPG 16:10 conseillé) |
| Services | `index.html` → section `#services` |
| Tarifs | `index.html` → section `#tarifs` |
| FAQ | `index.html` → section `#faq` |
| Statistiques du hero | `index.html` → attributs `data-target` des `.counter` |
| Rôles de l'animation de frappe | `js/main.js` → tableau `roles` |
| Couleurs de la charte | `css/style.css` → variables `:root` (`--accent`, `--glow`…) |
| Nom de marque | Recherche/remplacer « Hardy's ART » et `title`/`meta` dans `index.html` |

## Structure

```
index.html          Page unique (toutes les sections)
css/style.css       Design system + animations
js/main.js          Interactions (reveal, typing, compteurs, menu, curseur)
assets/             Favicon + miniatures de projets (placeholders)
```
