// === DONNÉES DES FILMS ===
const films = [
  {
    titre: "Inception",
    année: 2011,
    genre: "Science-Fiction",
    réalisateur: "Christopher Nolan",
    description: "Un voleur qui s'introduit dans les rêves pour y voler des secrets et implémenter des idées.",
    note: 8.8,
    emoji: "🌀",
    image: "https://picsum.photos/seed/inception/800/1200"
  },
  {
    titre: "The Dark Knight",
    année: 2009,
    genre: "Action",
    réalisateur: "Christopher Nolan",
    description: "Batman affronte le Joker, qui sème le chaos à Gotham.",
    note: 9.0,
    emoji: "🦇",
    image: "https://picsum.photos/seed/darkknight/800/1200"
  },
  {
    titre: "Parasite",
    année: 2022,
    genre: "Thriller",
    réalisateur: "Bong Joon-ho",
    description: "Une famille pauvre s'infiltre dans la maison d'une famille aisée, avec des conséquences imprévues.",
    note: 8.6,
    emoji: "🏘️",
    image: "https://picsum.photos/seed/parasite/800/1200"
  },
  {
    titre: "Amélie",
    année: 2002,
    genre: "Comédie",
    réalisateur: "Jean-Pierre Jeunet",
    description: "Une jeune femme timide décide d'améliorer la vie des personnes qui l'entourent.",
    note: 8.3,
    emoji: "🌸",
    image: "https://picsum.photos/seed/amelie/800/1200"
  },
  {
    titre: "Forrest Gump",
    année: 1994,
    genre: "Drame",
    réalisateur: "Robert Zemeckis",
    description: "La vie incroyable d'un homme simple témoin et acteur d'événements historiques.",
    note: 8.8,
    emoji: "🏃",
    image: "https://picsum.photos/seed/forrest/800/1200"
  },
  {
    titre: "Interstellar",
    année: 2014,
    genre: "Science-Fiction",
    réalisateur: "Christopher Nolan",
    description: "Des explorateurs spatiaux traversent un trou de ver pour trouver une nouvelle planète habitable.",
    note: 8.6,
    emoji: "🚀",
    image: "https://picsum.photos/seed/interstellar/800/1200"
  },
  {
    titre: "Joker",
    année: 2019,
    genre: "Thriller",
    réalisateur: "Todd Phillips",
    description: "Portrait sombre d'un homme en marge de la société qui devient le Joker.",
    note: 8.4,
    emoji: "🎭",
    image: "https://picsum.photos/seed/joker/800/1200"
  },
  {
    titre: "La Vie est Belle",
    année: 1997,
    genre: "Drame",
    réalisateur: "Roberto Benigni",
    description: "Un père utilise l'imagination pour protéger son fils pendant la guerre.",
    note: 8.6,
    emoji: "🌟",
    image: "https://picsum.photos/seed/lavieestbelle/800/1200"
  },
  {
    titre: "Mad Max Fury Road",
    année: 2015,
    genre: "Action",
    réalisateur: "George Miller",
    description: "Une course spectaculaire à travers un désert post-apocalyptique.",
    note: 8.1,
    emoji: "🚗",
    image: "https://picsum.photos/seed/madmax/800/1200"
  },
  {
    titre: "Pulp Fiction",
    année: 1994,
    genre: "Action",
    réalisateur: "Quentin Tarantino",
    description: "Histoires mêlées de criminels, de dialogues mémorables et de situations inattendues.",
    note: 8.9,
    emoji: "🔫",
    image: "https://picsum.photos/seed/pulpfiction/800/1200"
  },
  {
    titre: "Titanic",
    année: 1997,
    genre: "Drame",
    réalisateur: "James Cameron",
    description: "Une histoire d'amour tragique à bord du célèbre paquebot.",
    note: 7.9,
    emoji: "🚢",
    image: "https://picsum.photos/seed/titanic/800/1200"
  },
  {
    titre: "Gladiateur",
    année: 2000,
    genre: "Action",
    réalisateur: "Ridley Scott",
    description: "Un général romain déchu cherche vengeance en tant que gladiateur.",
    note: 8.5,
    emoji: "⚔️",
    image: "https://picsum.photos/seed/gladiator/800/1200"
  }
];

// === VARIABLES GLOBALES ===
let genreCourant = "Tous";
let filmsFiltres = [...films];

// === ÉLÉMENTS DOM ===
const filmsGrid = document.getElementById('filmsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const themeToggle = document.getElementById('themeToggle');

// Éléments modal
const modal = document.getElementById('filmModal');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalGenre = document.getElementById('modalGenre');
const modalDirector = document.getElementById('modalDirector');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

// === FONCTIONS D'AFFICHAGE ===
function afficherFilms(filmsAfficher) {
  filmsGrid.innerHTML = '';
  
  filmsAfficher.forEach((film, idx) => {
    const card = document.createElement('div');
    card.className = 'film-card';
    card.setAttribute('data-index', idx);
    card.innerHTML = `
      <div class="film-poster">
        <img src="${film.image}" alt="Affiche ${film.titre}">
      </div>
      <div class="film-info">
        <h3>${film.titre}</h3>
        <div class="film-year">${film.année}</div>
        <div class="film-genre">${film.genre}</div>
        <div class="film-director">Réalisateur: ${film.réalisateur}</div>
        <div class="film-description">${film.description}</div>
        <div class="film-rating">${film.note}</div>
      </div>
    `;
    card.addEventListener('click', () => showDetails(film));
    filmsGrid.appendChild(card);
  });
}

function filterGenre(genre) {
  genreCourant = genre;
  
  // Mettre à jour les boutons actifs
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.trim() === genre) {
      btn.classList.add('active');
    }
  });
  
  // Filtrer les films
  if (genre === "Tous") {
    filmsFiltres = [...films];
  } else {
    filmsFiltres = films.filter(f => f.genre === genre);
  }
  
  // Appliquer également la recherche si elle existe
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    const filtered = filmsFiltres.filter(f => 
      f.titre.toLowerCase().includes(searchTerm) ||
      f.réalisateur.toLowerCase().includes(searchTerm)
    );
    afficherFilms(filtered);
  } else {
    afficherFilms(filmsFiltres);
  }
}

function searchFilms() {
  const terme = searchInput.value.toLowerCase();
  
  let filmsRecherche = films;
  
  // Si un filtre de genre est actif
  if (genreCourant !== "Tous") {
    filmsRecherche = films.filter(f => f.genre === genreCourant);
  }
  
  // Appliquer la recherche
  filmsFiltres = filmsRecherche.filter(f => 
    f.titre.toLowerCase().includes(terme) ||
    f.réalisateur.toLowerCase().includes(terme) ||
    f.description.toLowerCase().includes(terme)
  );
  
  afficherFilms(filmsFiltres);
}

// === FONCTIONS MODAL ===
function showDetails(film) {
  modalPoster.src = film.image;
  modalPoster.alt = `Affiche du film ${film.titre}`;
  modalTitle.textContent = film.titre;
  modalMeta.textContent = `${film.année} • Note: ${film.note}`;
  modalGenre.textContent = film.genre;
  modalDirector.textContent = `Réalisateur: ${film.réalisateur}`;
  modalDescription.textContent = film.description;
  
  // Ouvrir modal
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Empêcher le scroll
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto'; // Réactiver le scroll
}

// === GESTION DU THÈME ===
function prefersDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getSavedTheme() {
  return localStorage.getItem('theme') || (prefersDarkMode() ? 'dark' : 'light');
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<span class="theme-icon">☀️</span> Mode Clair';
    themeToggle.setAttribute('data-theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<span class="theme-icon">🌙</span> Mode Sombre';
    themeToggle.setAttribute('data-theme', 'light');
  }
}

function toggleTheme() {
  const currentTheme = themeToggle.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

// === INITIALISATION ===
function init() {
  // Afficher les films
  afficherFilms(films);
  
  // Initialiser le thème
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  
  // Écouteurs d'événements
  searchInput.addEventListener('input', searchFilms);
  
  // Modal events
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { 
    if (e.target === modal) closeModal(); 
  });
  
  // Thème events
  themeToggle.addEventListener('click', toggleTheme);
  
  // Écouter les changements de préférence système
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  // Fermer modal avec Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// === DÉMARRAGE ===
document.addEventListener('DOMContentLoaded', init);
