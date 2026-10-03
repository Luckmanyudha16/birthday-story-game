// =========================================================================
// BIRTHDAY ADVENTURE CONFIGURATION
// Semua konten personal dapat diedit langsung di file ini tanpa mengubah logika komponen.
// =========================================================================

export const birthdayConfig = {
  // Nama Pasangan / Birthday Girl
  recipientName: "Adinda Putri",
  recipientNickname: "Sayang",

  // Nama Pengirim / Pasangan
  senderName: "Rama Pratama",

  // Tanggal Ulang Tahun
  birthdayDate: "04 Oktober 2026",
  age: 22,

  // Konfigurasi Musik
  music: {
    background: "/music/background.mp3",
    birthday: "/music/happy-birthday.mp3",
    defaultVolume: 0.25,
  },

  // Chapter 02: Love Verification
  verification: {
    title: "LOVE VERIFICATION",
    subtitle: "Before we continue... I need to make sure you're actually the real birthday girl.",
    question: "Siapa orang paling beruntung di seluruh semesta karena bisa kenal dan dicintai kamu?",
    options: [
      {
        id: "opt_me",
        text: "Aku (Rama), jelas pacar paling beruntung sedunia!",
        isCorrect: true,
        feedback: "Betul 100%! Nggak ada yang lebih bersyukur daripada aku ❤️"
      },
      {
        id: "opt_cat",
        text: "Kucing oren yang suka nongkrong depan rumah",
        isCorrect: false,
        feedback: "Kucingnya emang imut, tapi aku yang paling beruntung dong! 😂"
      },
      {
        id: "opt_einstein",
        text: "Albert Einstein",
        isCorrect: false,
        feedback: "Einstein pinter fisika, tapi dia nggak punya pacar seindah kamu :P"
      },
      {
        id: "opt_alien",
        text: "Alien di planet Mars",
        isCorrect: false,
        feedback: "Alien aja bakal iri liat senyum manismu!"
      }
    ],
    verifiedBadge: {
      title: "VERIFIED",
      roles: ["Official Birthday Girl", "Best Girlfriend", "Professional Cutie", "My Whole Heart"]
    }
  },

  // Chapter 06: Love Letter Personal
  letter: {
    title: "FROM ME TO YOU",
    opening: "Okay... No more questions. No more missions. Now I just want to tell you something from the bottom of my heart.",
    paragraphs: [
      "Selamat ulang tahun yang paling hangat untuk orang paling spesial di semestaku.",
      "Waktu pertama kali kita kenal, aku nggak pernah menyangka kalau hari-hari ke depannya bakal seindah dan sebermakna ini bareng kamu. Kamu itu seperti rumah tempat aku selalu ingin pulang—tempat di mana aku bisa jadi diriku sendiri tanpa rasa takut sedikit pun.",
      "Terima kasih sudah bertahan sejauh ini, terima kasih sudah selalu berjuang dengan tulus, terima kasih atas tawa renyahmu yang selalu berhasil menghapus penatku, dan terima kasih sudah memilih untuk terus melangkah bersamaku.",
      "Di usiamu yang baru ini, aku berdoa semoga setiap langkahmu selalu dipeluk ketenangan dan hal-hal baik. Semoga mimpi-mimpimu yang besar itu pelan-pelan terwujud, dan setiap rasa lelahmu selalu digantikan oleh senyuman berlipat ganda.",
      "Apapun yang ada di depan nanti, ingat ya: kamu nggak akan pernah sendirian. Ada aku yang selalu siap mendengarkan ceritamu, menggenggam tanganmu, dan bangga atas setiap prosesmu.",
      "I love you more than words, codes, and all the stars in the night sky could ever measure. ❤️"
    ],
    signoff: "With all my love,"
  },

  // Final Birthday Surprise Screen Content
  finalSurprise: {
    headline: "HAPPY BIRTHDAY",
    subheadline: "TO MY FAVORITE PERSON IN THE WORLD ❤️",
    wishes: [
      "I hope this year brings you closer to everything you dream of.",
      "May your days be filled with endless laughter, gentle peace, and sweet adventures.",
      "And if I'm lucky... I hope I get to be part of every single one of those moments."
    ],
    closing: "I LOVE YOU ALWAYS AND FOREVER."
  },

  // Google Apps Script Web App URL untuk pengiriman form wishes
  // Masukkan URL deployment Google Apps Script Anda di sini.
  // Contoh: "https://script.google.com/macros/s/AKfycbx.../exec"
  googleAppsScriptUrl: "",

  // Easter Eggs Texts
  easterEggs: {
    secretButton: {
      label: "🐱 Don't click this",
      message: "I literally told you not to click it! 😂\n\nAnyway... I love you so much ❤️"
    },
    secretHeartClick: {
      requiredClicks: 5,
      message: "🔓 SECRET UNLOCKED!\n\nYou found something you weren't supposed to find.\nI love you more than this website can calculate!"
    },
    systemError: {
      title: "⚠️ SYSTEM OVERLOAD",
      message: "Maximum cuteness detected in the system! Security protocol compromised by your smile.",
      btnText: "CONTINUE ANYWAY ❤️"
    }
  }
};
