# 2023/2024 – ISEN 3 – Projet de Fin d’Année

## RAPPORT D’ACTIVITE

---

# Summer Hangover

**Groupe 7**

| **NOM Prénom**          | **Formation**       |
| ----------------------- | ------------------- |
| Eudeline Nathan          | CIR3                |
| Kelma Cyprien            | CIR3                |
| Pousset Paul             | CIR3                |
| Cacheux Nolan            | CIR3                |
| De Almeida Julien        | CIR3                |

**Date de la soutenance :** 28 Juin 2024

---

## 1. Introduction

Dans le cadre de notre projet de fin de troisième année à l'ISEN, nous avons développé une application web innovante conçue pour faciliter l'organisation de sorties, qu'elles soient amicales, familiales ou professionnelles. Cette application répond à un besoin croissant de simplification dans la planification et la gestion d'événements sociaux.

Notre objectif principal est de créer une plateforme intuitive et efficace permettant aux utilisateurs de créer des groupes, planifier des événements, gérer les dépenses communes et coordonner les activités. En intégrant des fonctionnalités avancées telles que la gestion des groupes, le suivi des dépenses et la planification collaborative, notre application vise à offrir une expérience utilisateur optimale, rendant chaque sortie plus agréable et organisée.

Les utilisateurs pourront facilement créer et gérer des groupes, proposer des dates et des activités, suivre les dépenses partagées, et communiquer efficacement au sein de l'application. Ce projet représente une opportunité pour nous de démontrer nos compétences techniques et de gestion de projet, tout en répondant à un besoin réel du marché.

---

## 2. Problématique

### 2.1 Gestion des Groupes et des Administrateurs
L'un des premiers défis était de permettre aux utilisateurs de créer et gérer des groupes. Chaque groupe a un administrateur, généralement le créateur du groupe, qui a le pouvoir de proposer des sorties, d'ajouter ou de supprimer des membres, et de modérer les discussions.

### 2.2 Gestion des Dépenses
Nous avons intégré un système permettant de suivre les dépenses effectuées par chaque membre du groupe. Ce système facilite le remboursement entre les membres, assurant une répartition équitable des coûts.

### 2.3 Planification des Événements
Chaque membre doit pouvoir créer une date d'événement et proposer des activités. Cette fonctionnalité permet une planification flexible et collaborative.

### 2.4 Participation et Vote
Les membres peuvent valider leur participation à un événement et voter pour leur activité favorite parmi celles proposées.

### 2.5 Système de Tchat
Un système de tchat a été implémenté pour faciliter la communication et la coordination des sorties.

### 2.6 Hall of Fame
Un "Hall of Fame" est mis en place pour chaque groupe, affichant des statistiques telles que les personnes avec qui ils sortent le plus souvent et ceux qui proposent le plus d'événements.

---

## 3. Solutions envisagées

### 3.1 Présentation de la solution

#### 3.1.1 Exposition de la solution / Périmètre fonctionnel
Notre application se structure autour de trois grandes étapes : création de groupe, planification de sorties et gestion d'événements.

- **Création de Groupe :** Les utilisateurs peuvent créer des groupes, avec des systèmes d'invitation via QR codes ou liens.
- **Planification de Sorties :** Chaque membre peut proposer des activités et voter pour celles-ci.
- **Gestion d'Événements :** Les dépenses communes sont suivies avec un système de tricount.

#### 3.1.2 Choix techniques (matériels et logiciels)

- **Framework :** NextJS avec Typescript
- **Frontend :** React, TailwindCSS, MaterialUI
- **Backend :** LibSQL avec Turso, DrizzleORM, TRPC
- **Authentification :** NextAuth
- **Notifications :** Pusher
- **Stockage d’images :** Uploadthing
- **Activités :** API Google Maps

#### 3.1.3 Pilotage du projet

##### 3.1.3.1 Estimation des charges
Pour la réalisation de ce projet, chaque membre de l'équipe a été assigné à une fonctionnalité spécifique de l’application, couvrant à la fois le front-end et le back-end. Cette approche a permis à chaque membre de développer des compétences complètes tout en assurant une cohérence dans le développement des différentes parties de l'application. Voici la répartition des tâches et le temps estimé pour chacune :

- **Gestion des groupes et des événements :** 5 semaines (3 personnes)
  - Création et gestion de groupes.
  - Organisation et planification des événements au sein des groupes.
  
- **Gestion du tricount :** 2 semaines (1 personne)
  - Implémentation du système de gestion des dépenses et des remboursements entre les membres du groupe.

- **Gestion du Hall of Fame :** 2 semaines (1 personne)
  - Développement de la fonctionnalité permettant de visualiser les statistiques des contributions et participations des membres.

- **Gestion des connexions :** 2 semaines (2 personnes)
  - Implémentation du système d'authentification et de gestion des sessions utilisateur.

- **Gestion des votes d’activités avec mise en place de l’API :** 2 semaines (2 personnes)
  - Mise en place du système de proposition et de vote des activités.
  - Intégration de l'API Google Maps pour récupérer des informations sur les activités.

- **Gestion du dashboard :** 2 semaines (1 personne)
  - Développement du tableau de bord pour la visualisation et la gestion des données utilisateur.

- **Gestion du tchat :** 2 semaines (1 personne)
  - Implémentation du système de communication en temps réel au sein des groupes et des événements.

- **Gestion des settings :** 1 semaine (1 personne)
  - Développement de la section des paramètres pour les utilisateurs et les groupes.

- **Gestion du panneau admin du groupe :** 1 semaine (1 personne)
  - Création des fonctionnalités permettant aux administrateurs de gérer les membres et les permissions au sein des groupes.

- **Gestion des tests :** 1 semaine (1 personne)
  - Mise en place et exécution des tests pour s'assurer de la qualité et de la fiabilité de l'application.

##### 3.1.3.2 Communication
Pour assurer une communication efficace au sein de notre équipe, nous avons mis en place plusieurs stratégies et outils de communication :

- **Discord :** Nous avons principalement utilisé Discord pour nos communications quotidiennes. Chaque channel était dédié à un aspect spécifique du projet, comme le développement front-end, le développement back-end, la gestion des fonctionnalités, et la résolution des bugs. Cette organisation a permis de maintenir des discussions claires et centrées sur des sujets précis, évitant ainsi la confusion et le mélange d'informations.

- **Réunions quotidiennes :** En plus des communications en ligne, nous nous sommes réunis physiquement chaque jour au même endroit. Ces réunions quotidiennes ont été cruciales pour la coordination et le suivi de l'avancement du projet. Elles nous ont permis de discuter en temps réel des progrès réalisés, des défis rencontrés, et des ajustements nécessaires. Les réunions en personne ont renforcé la collaboration et ont permis une résolution plus rapide des problèmes.

Nous avons ainsi pu maintenir une communication fluide et efficace tout au long du projet. Cette approche a non seulement facilité la coordination des tâches, mais a également renforcé l'esprit d'équipe et l'engagement de chaque membre envers les objectifs communs du projet.

---

### 3.1.4 Coûts

Dans le cadre de notre projet, nous avons analysé et estimé les coûts des services nécessaires pour le bon fonctionnement de notre application. Voici un détail des coûts mensuels associés aux différents services utilisés :

- **Pusher :** Pusher est utilisé pour la gestion des notifications en temps réel. Le plan de base nous permet d'envoyer 200 000 messages par jour et de gérer 100 connexions simultanées. Toutefois, pour une utilisation plus intensive, nous pourrions opter pour l’offre Premium qui permet 10 000 connexions simultanées et 20 millions de messages par jour, au coût de 500€/mois. Les tarifs détaillés sont disponibles sur [Pusher Pricing](https://pusher.com/pricing).

- **API Google Maps :** L'API Google Maps est intégrée pour fournir des informations géolocalisées sur les activités proposées par les utilisateurs. Le coût de cette API dépend du nombre de requêtes effectuées. En supposant que 10 000 utilisateurs ajoutent environ 4 activités en moyenne par mois, le coût estimé serait de 1650€/mois. Les détails de la tarification peuvent être consultés sur [Google Maps Pricing](https://developers.google.com/maps/billing/pricing).

- **Vercel :** Vercel est utilisé pour l'hébergement et le déploiement de notre application. Bien que le coût exact soit difficile à déterminer sans contact direct avec Vercel, nos analyses estiment que les frais mensuels pour notre niveau d'utilisation seraient d'environ 100€/mois. Les informations générales sur la tarification sont disponibles sur [Vercel Pricing](https://vercel.com/pricing).

- **Turso :** Turso est utilisé pour l’hébergement de notre base de données. Le coût estimé pour Turso est de 416,58€/mois. Plus d'informations peuvent être trouvées sur [Turso Pricing](https://turso.tech/pricing).

En combinant ces coûts, nous arrivons à un total mensuel de 2666€ pour supporter 10 000 utilisateurs par mois. Cette estimation couvre les services essentiels pour le fonctionnement continu et la scalabilité de notre application, assurant une expérience utilisateur fluide et fiable.

---

### 3.1.5 Plan d’avenir

Pour assurer la rentabilité et la durabilité de notre application, nous avons envisagé plusieurs stratégies de monétisation. Voici les principales options que nous proposons :

- **Système de Mise en Avant :** Nous pourrions introduire un système de mise en avant des activités proposées par des entreprises locales, telles que des restaurants, des bars, et des centres sportifs. Les établissements intéressés pourraient payer pour que leurs événements ou services apparaissent en priorité dans les suggestions des utilisateurs. Ce modèle de publicité native permettrait de générer des revenus tout en offrant une valeur ajoutée aux utilisateurs par des recommandations pertinentes.

- **Publicité via Google AdSense :** L'intégration de publicités via Google AdSense est une autre option pour générer des revenus. Google AdSense offre une méthode éprouvée pour monétiser le trafic de l'application en affichant des annonces ciblées. Cependant, nous devons être conscients que l’introduction de publicités peut potentiellement nuire à l'expérience utilisateur. Une implantation stratégique et modérée des publicités est essentielle pour minimiser l'impact négatif.

- **Abonnements Premium :** Offrir des fonctionnalités supplémentaires via un modèle d'abonnement premium est une autre voie à explorer. Les utilisateurs pourraient payer un abonnement mensuel pour accéder à des fonctionnalités avancées, telles que des outils de planification plus sophistiqués, des options de personnalisation accrues, ou une expérience sans publicité. Ce modèle permet de diversifier les sources de revenus tout en récompensant les utilisateurs les plus engagés.

- **Partenariats et Collaborations :** Établir des partenariats avec des entreprises locales ou des marques connues pour des événements exclusifs ou des offres spéciales peut également être une source de revenus. Par exemple, des restaurants ou des bars pourraient offrir des réductions aux utilisateurs de notre application, en échange d’une visibilité accrue sur notre plateforme.

- **Événements Sponsorisés :** Organiser des événements sponsorisés est une autre possibilité. Nous pourrions collaborer avec des entreprises pour créer et promouvoir des événements spéciaux. Ces sponsors pourraient couvrir les coûts de l'événement en échange de la promotion de leurs produits ou services.

- **Analyse de Données :** Utiliser les données anonymisées des utilisateurs pour des études de marché pourrait aussi être envisagé, en respectant les réglementations sur la protection des données. Les entreprises pourraient payer pour accéder à des insights sur les tendances de sortie et les préférences des consommateurs.

---

### 3.2 Analyse fonctionnelle

#### 3.2.1 Maquettes

Voici nos premières maquettes sur lesquelles nous nous sommes basés pour la conception initiale de l'interface utilisateur (UI) de notre application. Ces maquettes ont servi de guide pour la création du front-end, assurant une interface claire et intuitive pour les utilisateurs.

Au fur et à mesure de l'avancement du projet, nous avons apporté plusieurs modifications basées sur nos propres observations concernant l'ergonomie et l'intuitivité de l'application. Ces ajustements ont permis d'améliorer la facilité d'utilisation et l'expérience globale de l'utilisateur. Ces maquettes initiales et les évolutions apportées ont été essentielles pour structurer et orienter le développement de notre application, garantissant une interface utilisateur cohérente et agréable à utiliser.

---

### 3.3 Analyse Technique

#### 3.3.1 Architecture technique

L'architecture technique de notre application a été soigneusement conçue pour assurer une intégration fluide des différents composants et garantir une performance optimale. Voici un aperçu détaillé de l'architecture technique :

- **Frontend :** NextJS avec Typescript pour le rendu côté serveur et l'optimisation SEO. React pour la création de composants d'interface utilisateur réactifs et dynamiques. TailwindCSS pour le style des composants, assurant une UI cohérente et adaptable. MaterialUI pour les icônes et éléments graphiques avancés.
  
- **Backend :** LibSQL gère les requêtes SQL pour la manipulation des données, et Turso assure l'hébergement sécurisé et scalable de la base de données. DrizzleORM facilite les interactions entre le code Typescript et la base de données. TRPC implémente les protocoles Typescript pour une communication efficace entre le frontend et le backend.

- **Services tiers :** NextAuth pour l'authentification sécurisée des utilisateurs, Pusher pour la gestion des notifications en temps réel via WebSocket, Uploadthing pour le stockage et la gestion des images, et API Google Maps pour l'intégration de fonctionnalités géolocalisées et la récupération d'informations sur les activités.

#### 3.3.2 Modélisation de la Data

La modélisation des données a été réalisée en utilisant des techniques de modélisation de données standards pour garantir une structure de données robuste et facilement extensible. 

- **Schéma UML :** montre les entités principales, leurs attributs et les relations entre elles.
  
- **Entités principales :**
  - **Utilisateur :** Représente chaque utilisateur avec ses informations de profil, préférences, et historique de connexion.
  - **Groupe :** Contient les informations sur les groupes créés par les utilisateurs, y compris les membres et les événements associés.
  - **Événement :** Stocke les détails de chaque événement, incluant la date, les activités proposées, les votes, et les dépenses.
  - **Activité :** Détaille les activités proposées dans le cadre des événements, avec des informations telles que le lieu, la description, et les votes reçus.
  - **Dépense :** Gère les transactions financières au sein des groupes, assurant une répartition équitable des coûts.

- **Flux de données :** Les interactions entre les entités sont clairement définies, assurant la cohérence des données à travers différentes opérations comme la création de groupes, la planification d'événements, et le suivi des dépenses.

### 3.4 Réalisation

La phase de réalisation a consisté à traduire les analyses techniques et fonctionnelles en une solution concrète, fonctionnelle et fiable. Voici les principales étapes et aspects importants de cette phase :

- **Développement itératif :** Chaque fonctionnalité a été développée en cycles itératifs, permettant de tester et d'affiner continuellement les composants avant leur intégration finale. Les versions intermédiaires ont été fréquemment déployées sur un environnement de test pour obtenir des retours rapides et effectuer les ajustements nécessaires.

- **Code Source :** Nous avons mis en œuvre des pratiques de codage propre et maintenable, avec une documentation claire pour chaque module. Des segments de code source importants, notamment pour l'authentification, la gestion des groupes, et les notifications, ont été particulièrement soignés pour assurer leur fiabilité et sécurité. Le code source complet de notre projet est disponible sur GitHub pour consultation et contributions : [Summer Hangover GitHub Repository](https://github.com/Bafbi/summer-hangover).

---

### 3.5 Tests

Quelques tests fonctionnels ont été réalisés pour vérifier la conformité des fonctionnalités aux spécifications. Ces tests ont permis d’identifier des bugs mineurs que nous avons corrigés au fur et à mesure. Les tests couvrent des scénarios tels que la gestion des groupes, l’ajout de membres, le suivi des dépenses, ainsi que les fonctionnalités de tchat et de vote.

Nous avons aussi utilisé des tests d'interface utilisateur pour garantir une expérience fluide et intuitive. Cela inclut des tests pour valider la compatibilité avec différents navigateurs et appareils.

---

### 3.6 Documentation

#### Guide de l'utilisateur :

- **Introduction :** L'application "Summer Hangover" est conçue pour faciliter la création et l'organisation de sorties entre amis, en famille ou avec des collègues. Elle permet de gérer des groupes, planifier des événements, suivre les dépenses et communiquer efficacement.

- **Installation et Inscription :**
  - Téléchargez et installez l'application depuis notre dépôt GitHub.
  - Créez un compte en fournissant une adresse email valide et en définissant un mot de passe.

- **Création et Gestion de Groupes :**
  - Pour créer un groupe, cliquez sur "Créer un Groupe" et invitez des membres en utilisant leur adresse email ou en partageant un lien/QR code.
  - Gérez les membres du groupe via la section "Membres", où vous pouvez ajouter ou supprimer des membres et définir des administrateurs.

- **Planification des Événements :**
  - Définissez la date, l'heure et le lieu de la sortie. Ajoutez des activités que les membres peuvent proposer.
  - Les membres peuvent voter pour les activités proposées et confirmer leur participation.

- **Gestion des Dépenses :**
  - Utilisez la fonctionnalité "Tricount" pour suivre les dépenses de chaque membre pendant l'événement.
  - Ajoutez les dépenses et partagez les coûts entre les membres pour équilibrer les comptes à la fin de la sortie.

- **Utilisation du Tchat :**
  - Accédez au tchat de groupe ou de l'événement pour communiquer avec les membres en temps réel.
  - Utilisez les notifications pour rester informé des nouvelles activités et messages.

- **Hall of Fame :**
  - Consultez le Hall of Fame pour voir les statistiques de participation, les dépenses et les contributions de chaque membre.

---

#### Guide du Développeur :

- **Architecture du Projet :** Le projet utilise NextJS avec Typescript pour le frontend, et LibSQL avec Turso pour le backend. La communication entre le frontend et le backend est assurée par TRPC, et les notifications en temps réel sont gérées par Pusher.

- **Installation et Configuration :**
  - **Clonez le dépôt GitHub :** `git clone https://github.com/Bafbi/summer-hangover.git`
  - **Installez les dépendances :** `npm install`
  - **Configurez les variables d'environnement :** Suivez le fichier `.env.example` pour la configuration des services tiers.

- **Installation du Backend :**
  - **Configurez la base de données :** `npm run db:push`
  - **Pour la visualiser :** `npm run db:studio`

- **Installation du Frontend :**
  - **Démarrez le serveur frontend :** `npm run dev`
  - Accédez à l'application via `http://localhost:3000`

- **Structure du Code :** Le dossier `src` contient les composants React pour le frontend. Les fichiers de configuration de NextAuth pour l'authentification sont situés dans le dossier `auth`.

- **Développement et Déploiement :**
  - Pour développer une nouvelle fonctionnalité, créez une branche à partir de `main` et effectuez vos modifications.
  - Testez localement en exécutant `npm run dev`.
  - Une fois les tests passés, soumettez une pull request pour révision et fusion.

- **Instructions d'Installation et de Configuration :**

  - **Pré-requis :**
    - Node.js et npm installés sur votre machine.
    - Accès à un compte Pusher et une clé API Google Maps.

  - **Configuration des Services Tiers :**
    - Configurez Pusher et Google Maps API en ajoutant vos clés API dans le fichier `.env`.

---

#### Guide d'Utilisation pour l'Administrateur :

- **Tableau de Bord Administrateur :**
  - Accédez au tableau de bord "Dashboard" dans le menu principal.
  - Surveillez les activités des utilisateurs et les indicateurs d'utilisation.

- **Gestion des Utilisateurs :**
  - Ajoutez, modifiez ou supprimez des utilisateurs.
  - Définissez les permissions et rôles des utilisateurs.

---

## 4. Résultats obtenus

### 4.1 Difficultés rencontrées et solutions

Lors de la réalisation de notre projet, nous avons rencontré plusieurs difficultés techniques et fonctionnelles que nous avons dû surmonter :

- **Problèmes de Login :**
  - **Difficulté :** L'implémentation du système de login avec NextAuth a présenté des défis, en particulier en ce qui concerne la gestion des sessions utilisateur et la sécurisation des données d'authentification.
  - **Solution :** Nous avons effectué une révision approfondie de la documentation de NextAuth et consulté des forums de développeurs pour résoudre ces problèmes. Nous avons également ajouté des validations et des vérifications de sécurité supplémentaires pour assurer la fiabilité du système de login.

- **Intégration avec Google Maps :**
  - **Difficulté :** L'utilisation de Typescript avec Google Maps API a été compliquée par l'absence de types définis pour certains composants de l'API.
  - **Solution :** Nous avons dû écrire nos propres types Typescript pour ces composants, ce qui a demandé du temps et des tests pour garantir leur précision. Cela a finalement permis une intégration fluide de Google Maps dans notre application.

- **Notifications Push :**
  - **Difficulté :** La mise en place de notifications push fonctionnelles sur toute l'application, y compris en dehors du navigateur, a été un défi majeur.
  - **Solution :** Nous avons choisi d'utiliser Pusher pour gérer les notifications en temps réel. Pusher s'est avéré être une solution efficace, permettant de délivrer des notifications fiables et en temps réel aux utilisateurs.

---

### 4.2 Respect des délais

Globalement, nous avons respecté les délais prévus pour la réalisation des différentes tâches du projet. Chaque fonctionnalité a été développée et intégrée dans les temps impartis, ce qui nous a permis de disposer d'une semaine supplémentaire pour effectuer des tests approfondis et corriger les erreurs détectées. Cette gestion efficace du temps a contribué à la livraison d'une application fonctionnelle et stable.

---

### 4.3 Respect du périmètre fonctionnel

Nous avons entièrement respecté le périmètre fonctionnel défini au début du projet. En outre, nous avons ajouté plusieurs améliorations qui enrichissent l'expérience utilisateur :

- **QR Code pour l'ajout de membres :** Permet d'inviter facilement des membres à rejoindre un groupe.
- **Notifications externes :** Assurent que les utilisateurs sont informés des mises à jour importantes, même lorsqu'ils ne sont pas connectés à l'application.

Ces fonctionnalités supplémentaires ont été bien accueillies par les utilisateurs et ont contribué à l'amélioration globale de l'application.

---

### 4.4 Mise en production

La mise en production de l'application a été effectuée via Vercel. Actuellement, notre application est viable pour une utilisation par 100 utilisateurs grâce à notre plan gratuit. Nous avons mis en place une infrastructure évolutive, permettant d'améliorer facilement la capacité et les performances en fonction de l'augmentation du nombre d'utilisateurs, comme présenté dans notre plan d'avenir. Cela garantit que notre application peut croître avec sa base d'utilisateurs sans compromettre les performances ou la fiabilité.

L’application en production est accessible ici : [Summer Hangover](https://github.com/Bafbi/summer-hangover).

---

## 5. Conclusion

### 5.1 Montée en compétences de l’équipe

Durant ce projet, notre équipe a acquis de nouvelles compétences techniques et de gestion, notamment :

- **Utilisation de nouvelles librairies :** Notre chef d’équipe nous a encouragés à utiliser des librairies que nous ne connaissions pas auparavant. Cette exploration nous a permis d'élargir notre expertise, tant en développement frontend qu'en backend.

- **Collaboration en présentiel :** Nous nous sommes réunis chaque jour en présentiel, ce qui a facilité la communication et la collaboration. Cette approche nous a permis de résoudre rapidement les problèmes et d'assurer une coordination efficace, contrairement à un travail en distanciel où les échanges peuvent être moins fluides.

- **Durabilité et commercialisation :** Nous avons réalisé que l'application peut être pérenne avec un bon plan financier et des techniques de commercialisation efficaces. Cela inclut des stratégies de monétisation telles que les publicités, les abonnements premium, et les partenariats avec des entreprises locales.

---

### 5.2 Valeur ajoutée pour le client

Notre projet "Summer Hangover" apporte une valeur significative à notre client en offrant une solution complète pour l'organisation de sorties. Les fonctionnalités clés telles que la gestion des groupes, la planification des événements, le suivi des dépenses, et les notifications en temps réel répondent directement aux besoins identifiés. De plus, les améliorations comme le QR code pour l'ajout de membres et les notifications externes enrichissent l'expérience utilisateur et augmentent l'engagement.

---

### 5.3 Et si c’était à refaire ?

Si c'était à refaire, voici quelques aspects que nous pourrions aborder différemment :

- **Planification initiale plus détaillée :** Une planification plus minutieuse des tâches dès le début aurait pu aider à mieux gérer les imprévus et à allouer les ressources de manière plus efficace.

- **Tests utilisateurs plus fréquents :** Intégrer des tests utilisateurs tout au long du développement aurait permis d’identifier des points d’amélioration plus tôt dans le projet.

- **Documentation continue :** Maintenir une documentation continue et à jour pendant tout le processus de développement aurait facilité la transition entre les différentes phases du projet et aidé à intégrer plus rapidement de nouveaux membres dans l’équipe.
