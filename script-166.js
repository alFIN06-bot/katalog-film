document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize mobile menu
  const initMobileMenu = () => {
    const mobileBtn = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  };

  // Function to handle new transaction form submission
  const initTransactionForm = () => {
    const transactionForm = document.getElementById('transactionForm');
    const transactionTableBody = document.getElementById('transactionTableBody');

    if (transactionForm && transactionTableBody) {
      transactionForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const transactionId = document.getElementById('transactionId').value.trim();
        const transactionDateInput = document.getElementById('transactionDate').value.trim(); // Get the date input value
        const packageType = document.getElementById('packageType').value;
        const paymentStatus = document.getElementById('paymentStatus').value;

        // Basic validation
        if (!transactionId || !transactionDateInput || !packageType || !paymentStatus) {
          alert('Semua kolom harus diisi!');
          return;
        }

        // Format the date to display month name
        const date = new Date(transactionDateInput);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('id-ID', options); // 'id-ID' for Indonesian locale

        // Create a new table row
        const newRow = document.createElement('tr');
        newRow.classList.add('border-t', 'dark:border-slate-700');

        // Determine status color class from custom CSS
        let statusColorClass = '';
        if (paymentStatus === 'Selesai') {
          statusColorClass = 'status-selesai';
        } else if (paymentStatus === 'Pending') {
          statusColorClass = 'status-pending';
        } else if (paymentStatus === 'Dibatalkan') {
          statusColorClass = 'status-dibatalkan';
        }

        newRow.innerHTML = `
          <td class="px-4 py-2">${transactionId}</td>
          <td class="px-4 py-2">${formattedDate}</td>
          <td class="px-4 py-2">${packageType}</td>
          <td class="px-4 py-2 ${statusColorClass}">${paymentStatus}</td>
        `;

        // Add the new row to the table body
        transactionTableBody.appendChild(newRow);

        // Clear the form
        transactionForm.reset();
        alert('Transaksi berhasil ditambahkan!');
      });
    }
  };

  // Function to handle login form submission
  const initLoginForm = () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Mencegah pengiriman formulir default

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Email validation regex (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '' || password === '') {
          alert('Email dan Password tidak boleh kosong!');
          return;
        }

        if (!emailRegex.test(email)) {
          alert('Format email tidak valid!');
          return;
        }

        console.log('Mencoba login dengan:', { email, password });

        // Simulasi Proses Login
        // Ganti kredensial ini sesuai kebutuhan Anda
        if (email === "user@example.com" && password === "password123") {
          alert('Login berhasil! Selamat datang.');
          window.location.href = 'profile-166.html'; // Arahkan ke halaman profil setelah login berhasil
        } else {
          alert('Login gagal: Email atau password salah.');
        }
      });
    }
  };

  // Function for Film Search and Filter (for katalog-166.html)
  const initFilmCatalog = () => {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-button');
    const movieCards = document.querySelectorAll('.grid > div[data-genre]');

    if (searchInput && filterButtons.length > 0 && movieCards.length > 0) {
      const filterMovies = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeGenreButton = document.querySelector('.filter-button.active');
        const selectedGenre = activeGenreButton ? activeGenreButton.dataset.genre : 'all';

        movieCards.forEach((card) => {
          const movieTitle = card.querySelector('h3').textContent.toLowerCase();
          const movieGenre = card.dataset.genre;

          const matchesSearch = movieTitle.includes(searchTerm);
          const matchesGenre = selectedGenre === 'all' || movieGenre === selectedGenre;

          if (matchesSearch && matchesGenre) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      };

      searchInput.addEventListener('keyup', filterMovies);

      filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          filterButtons.forEach((btn) =>
            btn.classList.remove('active', 'bg-primary', 'text-black')
          ); // Remove active classes
          button.classList.add('active', 'bg-primary', 'text-black'); // Add active classes
          filterMovies();
        });
      });

      // Set 'Semua' button as active by default
      const allButton = document.querySelector('.filter-button[data-genre="all"]');
      if (allButton) {
        allButton.classList.add('active', 'bg-primary', 'text-black');
      }

      filterMovies(); // Initial filter on page load
    }
  };

  // Function for Film Detail Loading (for detail-film-166.html)
  const initFilmDetail = () => {
    const filmDetailContainer = document.getElementById('filmDetailContainer');
    if (filmDetailContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const filmId = urlParams.get('id');

      const filmsData = {
        'warkop-dki-reborn': {
          title: 'Warkop DKI Reborn (2016)',
          image: 'https://i.ytimg.com/vi/m3U03b9yHKk/maxresdefault.jpg',
          description:
            'Trio Dono, Kasino, Indro kembali dengan gaya lawakan mereka yang khas dalam cerita modern. Film ini mengisahkan petualangan mereka dalam memecahkan kasus-kasus lucu dan menghadapi berbagai situasi konyol.',
          rating: '9.5',
          genre: 'Komedi',
          director: 'Anggy Umbara',
          cast: 'Abimana Aryasatya, Vino G. Bastian, Tora Sudiro',
        },
        'pengabdi-setan': {
          title: 'Pengabdi Setan (2017)',
          image: 'https://i0.wp.com/www.biem.co/wp-content/uploads/2017/11/Resensi-Pengabdi-Setan-biem.co_.jpg',
          description:
            'Keluarga yang tinggal di rumah terpencil mulai diganggu oleh makhluk halus setelah ibu mereka sakit misterius. Film horor ini penuh dengan ketegangan dan jumpscare yang efektif.',
          rating: '9.5',
          genre: 'Horor',
          director: 'Joko Anwar',
          cast: 'Tara Basro, Bront Palarae, Endy Arfian',
        },
        'dilan-1990': {
          title: 'Dilan 1990 (2018)',
          image: 'https://statik.tempo.co/data/2018/01/22/id_678596/678596_720.jpg',
          description:
            'Kisah cinta remaja SMA antara Milea, siswi baru, dan Dilan, anggota geng motor yang terkenal di sekolahnya. Film ini diadaptasi dari novel populer dan berhasil menarik perhatian banyak penonton.',
          rating: '9.5',
          genre: 'Drama',
          director: 'Fajar Bustomi, Pidi Baiq',
          cast: 'Iqbaal Ramadhan, Vanesha Prescilla',
        },
        gundala: {
          title: 'Gundala (2019)',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwKc_KUYzXAljNZ2zXeesJiPSXaVv_wJy94Q&s',
          description:
            'Sancaka, seorang pekerja laboratorium yang mendapat kekuatan super setelah tersambar petir dan menjadi pahlawan melawan kejahatan. Film superhero Indonesia ini menampilkan aksi yang memukau.',
          rating: '9.5',
          genre: 'Action',
          director: 'Joko Anwar',
          cast: 'Abimana Aryasatya, Tara Basro, Bront Palarae',
        },
        'the-raid': {
          title: 'The Raid (2011)',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Biqq6hNVy0TrqnrOio2xh9zx82gSv9G3EQ&s',
          description:
            'Seorang tim SWAT dikirim ke gedung apartemen yang dikuasai gembong narkoba dan harus bertarung untuk bertahan hidup. Film aksi ini terkenal dengan koreografi pertarungan yang intens.',
          rating: '9.5',
          genre: 'Action',
          director: 'Gareth Evans',
          cast: 'Iko Uwais, Joe Taslim, Ray Sahetapy',
        },
        'laut-bercerita': {
          title: 'Laut Bercerita (2021)',
          image: 'https://kognisia.co/wp-content/uploads/2024/04/3EFA5F43-8050-4CF8-8A8E-ECC828214A21.png',
          description:
            'Kisah dua mahasiswa yang diculik dan diperlakukan dengan tidak manusiawi karena kecurigaan politik di era Orde Baru. Film ini diadaptasi dari novel dan menyajikan cerita yang menyentuh hati.',
          rating: '9.5',
          genre: 'Drama',
          director: 'Pritagita Arianegara',
          cast: 'Reza Rahadian, Putri Marino, Aryani Fitriana',
        },
        'a-man-called-ahok': {
          title: 'A Man Called Ahok (2018)',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb24dFbfFIdRuauDbMNL103gsfYTiX0dgrKg&s',
          description:
            'Biografi Basuki Tjahaja Purnama (Ahok), seorang pemimpin kontroversial yang menjabat sebagai gubernur Jakarta. Film ini menggambarkan perjalanan hidup dan karir politiknya.',
          rating: '9.5',
          genre: 'Drama',
          director: 'Putrama Tuta',
          cast: 'Daniel Mananta, Chew Kin Wah, Jill Gladys',
        },
        'kkn-di-desa-penari': {
          title: 'KKN di Desa Penari (2022)',
          image: 'https://cdn.antaranews.com/cache/1200x800/2022/05/12/IMG_20220512_135230_013.jpg',
          description:
            'Enam mahasiswa melakukan KKN di desa terpencil dan menghadapi teror dari penari misterius yang mengancam nyawa mereka. Film horor ini menjadi salah satu film terlaris di Indonesia.',
          rating: '9.5',
          genre: 'Horor',
          director: 'Awi Suryadi',
          cast: 'Tissa Biani, Adinda Thomas, Achmad Megantara',
        },
      };

      if (filmId && filmsData[filmId]) {
        const film = filmsData[filmId];
        filmDetailContainer.innerHTML = `
          <div class="flex flex-col md:flex-row gap-8">
              <div class="md:w-1/3">
                  <img src="${film.image}" alt="${film.title}" class="rounded-lg shadow-lg w-full object-cover">
              </div>
              <div class="md:w-2/3">
                  <h2 class="text-3xl font-bold mb-4 text-primary">${film.title}</h2>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">${film.description}</p>
                  <div class="space-y-2 text-gray-700 dark:text-gray-200">
                      <p><span class="font-semibold">Rating:</span> <i class="fas fa-star text-yellow-500 mr-1"></i> ${film.rating}</p>
                      <p><span class="font-semibold">Genre:</span> ${film.genre}</p>
                      <p><span class="font-semibold">Sutradara:</span> ${film.director}</p>
                      <p><span class="font-semibold">Pemeran:</span> ${film.cast}</p>
                  </div>
                  <a href="katalog-166.html" class="inline-flex items-center mt-6 px-6 py-3 bg-primary text-black rounded-lg hover:bg-sky-700 transition-colors">
                      <i class="fas fa-arrow-left mr-2"></i> Kembali ke Katalog
                  </a>
              </div>
          </div>
        `;
      } else {
        filmDetailContainer.innerHTML = `
          <p class="text-center text-red-500">Film tidak ditemukan.</p>
          <div class="text-center mt-4">
              <a href="katalog-166.html" class="inline-flex items-center px-6 py-3 bg-primary text-black rounded-lg hover:bg-sky-700 transition-colors">
                  <i class="fas fa-arrow-left mr-2"></i> Kembali ke Katalog
              </a>
          </div>
        `;
      }
    }
  };

  // Function to set active navigation link
  const setActiveNavLink = () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    const mobileNavLinks = document.querySelectorAll('#mobileMenu a');

    // Remove active class from all links first
    navLinks.forEach((link) => {
      link.classList.remove('active-link');
    });
    mobileNavLinks.forEach((link) => {
      link.classList.remove('active-link');
    });

    // Add active class to the current page's link
    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      // Handle index.html specifically as it might be accessed as just '/'
      if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
        link.classList.add('active-link');
      }
    });

    mobileNavLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
        link.classList.add('active-link');
      }
    });
  };

  // Initialize all functionalities
  initMobileMenu();
  initTransactionForm();
  initLoginForm();
  initFilmCatalog();
  initFilmDetail();
  setActiveNavLink(); // Call this function on DOMContentLoaded
});
