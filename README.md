# Portfolio — Franck Nguimkeu

Site portfolio statique, bilingue **FR / EN**, thème **clair / sombre**, sans étape de build.
Il suffit d'ouvrir `index.html` — ou mieux, de l'héberger (voir plus bas).

## 📁 Structure

```
Portfolio professionnelle/
├── index.html          # Contenu et structure
├── styles.css          # Design system (couleurs, typo, responsive)
├── script.js           # Interactions : i18n FR/EN, thème, animations, compteurs
├── assets/
│   ├── cv/
│   │   ├── CV_Franck_Nguimkeu_FR.pdf
│   │   └── CV_Franck_Nguimkeu_EN.pdf
│   └── img/            # (og-image.png à ajouter — voir checklist)
└── README.md
```

## ✅ À personnaliser avant publication

Quelques valeurs sont des **placeholders** — vérifie-les :

1. **LinkedIn** — dans `script.js`, ligne `const LINKEDIN = "..."`, mets ton vrai lien.
2. **GitHub** — j'ai mis `github.com/franckdollar916` (repris de ton ancien portfolio). À confirmer / corriger dans `index.html` (2 endroits) et `script.js`.
3. **Email** — j'ai utilisé `franck.intern@gmail.com` (celui de ton CV). Change-le dans `index.html` si besoin.
4. **Image de partage (aperçu réseaux)** — ajoute un fichier `assets/img/og-image.png` (1200×630) pour un bel aperçu quand tu partages le lien sur LinkedIn/WhatsApp. Optionnel mais recommandé.

> Astuce : tout le contenu texte est modifiable directement dans `index.html` (français) et `script.js` (traductions anglaises, objet `I18N.en`).

## 📸 Galerie photos (section « En images »)

Les photos vivent dans `assets/img/gallery/` et sont listées dans `assets/img/gallery/photos.json`
(`{ "src": "...", "caption": "..." }`). Le carrousel défile en continu et chaque photo s'ouvre
en grand (lightbox) au clic.

Pour (ré)importer un dossier de photos et régénérer la galerie automatiquement :
```bash
python tools/import-photos.py "C:\chemin\vers\le\dossier"
```
Le script dédoublonne, renomme en versions web-safe, applique les légendes et l'ordre
(voir `OVERRIDES` / `ORDER` dans le script), puis écrit `photos.json`.
Pour ajouter/retirer une photo ponctuellement, édite simplement `photos.json`.

## 🚀 Héberger le site (avec ton propre nom de domaine)

Trois options gratuites, de la plus simple à la plus « pro ». Toutes acceptent un domaine perso.

### Option A — Netlify (le plus simple, glisser-déposer)
1. Va sur https://app.netlify.com/drop
2. Glisse le dossier `Portfolio professionnelle` entier dans la page.
3. Ton site est en ligne en 10 s sur une URL `xxxx.netlify.app`.
4. Pour ton domaine : **Site settings → Domain management → Add custom domain**.

### Option B — Vercel
1. Crée un compte sur https://vercel.com (connecte GitHub).
2. « Add New → Project », importe le repo, déploie (aucun réglage : c'est du statique).
3. Domaine perso : onglet **Domains**.

### Option C — GitHub Pages (comme ton ancien portfolio)
```bash
git init
git add .
git commit -m "Nouveau portfolio"
git branch -M main
git remote add origin https://github.com/franckdollar916/portfolio.git
git push -u origin main
```
Puis : **Repo → Settings → Pages → Source: main / root**.
Domaine perso : champ **Custom domain** + un fichier `CNAME`.

### 🌐 Acheter un nom de domaine
- Registrars conseillés : **OVH**, **Namecheap**, **Porkbun**, **Cloudflare** (~8–15 €/an).
- Idées : `franck-nguimkeu.com`, `nguimkeu.dev`, `franckdata.ai`…
- Après l'achat, tu pointes le domaine vers Netlify/Vercel/GitHub via les enregistrements DNS (A / CNAME) indiqués par la plateforme d'hébergement. Chaque plateforme te guide pas à pas.

## 🔧 Prévisualiser en local
```bash
python -m http.server 5177
```
Puis ouvre http://localhost:5177

---
Fait avec ❤️ pour mettre en valeur ton parcours Data & IA.
