# 🚀 Plan de Modernisation "Malt 2025" - ParisPrivateDriver

Ce plan vise à transformer l'application actuelle en une expérience web ultra-moderne, fluide et premium, optimisée pour impressionner sur un profil Malt.

## 🎨 1. Design System & Esthétique (L'Effet "Wow")
- [ ] **Nouvelle Palette de Couleurs** :
  - Fond : `Midnight Black` (#020617) ou `Deep Navy` (#0B1120) pour une profondeur maximale.
  - Accents : `Champagne Gold` (#F59E0B) ou `Electric Blue` (#3B82F6) pour le contraste.
  - Glassmorphism : Utilisation intensive de `backdrop-blur-xl`, bordures `white/10`, et ombres colorées.
- [ ] **Typographie** :
  - Titres : `Outfit` ou `Syne` (Google Fonts) pour un look éditorial et audacieux.
  - Corps : `Inter` ou `DM Sans` pour une lisibilité parfaite.
- [ ] **Ambiance** :
  - Grain/Bruit subtil en superposition sur tout le site pour un rendu "texture premium".
  - Curseurs personnalisés (cercle magnétique qui s'agrandit au survol).

## ⚡ 2. Refonte du "Cœur" : Le Formulaire de Réservation (Wizard)
L'élément central pour un "site de paiement". On passe d'un formulaire statique à un **Wizard Multi-étapes** interactif.
- [ ] **Architecture du Wizard** :
  - **Étape 1 : Trajet** (Départ, Arrivée, Date/Heure) avec autocomplétion visuelle.
  - **Étape 2 : Véhicule** (Sélection type "Carte" avec grande image, prix estimé, et caractéristiques).
  - **Étape 3 : Détails** (Passagers, Options, Coordonnées).
  - **Étape 4 : Paiement/Récap** (Interface type Stripe/Apple Pay, résumé clair).
- [ ] **Animations** : Transitions fluides (slide/fade) entre les étapes avec `framer-motion`.

## 🖥️ 3. Structure de la Page & Composants
- [ ] **Hero Section (Haut de page)** :
  - Titre géant (Typographie cinétique).
  - Vidéo d'arrière-plan ou effet Parallaxe 3D.
  - Bouton "Réserver" magnétique (Call to Action principal).
- [ ] **Section Flotte (Véhicules)** :
  - Carrousel horizontal avec effet "Snap" ou cartes 3D tilt (effet de bascule au survol).
- [ ] **Section Services (Bento Grid)** :
  - Mise en page en grille asymétrique (tendance 2024/2025).
  - Icônes minimalistes animées.
- [ ] **Témoignages** :
  - "Marquee" infini (défilement automatique horizontal) pour montrer la preuve sociale.

## 🛠️ 4. Technique & Performance
- [ ] **Animations au Scroll** : Tout le contenu doit apparaître progressivement (Fade Up, Zoom In) lors du défilement.
- [ ] **Smooth Scroll** : Défilement fluide de la page entière pour une sensation de lourdeur/luxe.
- [ ] **Responsive** : Adaptation parfaite mobile (menu burger animé plein écran).

---

## 📅 Ordre d'Exécution Suggéré

1.  **Setup Design** : Installer les polices, configurer Tailwind (couleurs, ombres).
2.  **Refonte Hero** : Créer la première impression.
3.  **Création du Wizard** : Le gros morceau technique (le formulaire).
4.  **Refonte des Sections** : Services (Bento), Flotte, etc.
5.  **Polish** : Animations, Curseurs, Grain.
