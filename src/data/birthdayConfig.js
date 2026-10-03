// =========================================================================
// BIRTHDAY ADVENTURE CONFIGURATION
// Semua konten personal dapat diedit langsung di file ini tanpa mengubah logika komponen.
// =========================================================================

export const birthdayConfig = {
  // Nama Pasangan / Birthday Girl
  recipientName: "Herlin Ochtorisa",
  recipientNickname: "Sayang",

  // Nama Pengirim / Pasangan
  senderName: "Luckman Yudha",

  // Tanggal Ulang Tahun
  birthdayDate: "12 Oktober 2000",
  age: 26,

  // Konfigurasi Musik
  music: {
    background: "/music/background.mp3",
    birthday: "/music/happy-birthday.mp3",
    defaultVolume: 0.25,
  },

  // Chapter 02: Love Verification
  verification: {
    title: "VERIFIKASI CINTA 🔐",
    subtitle: "Sebelum kita lanjut... aku harus memastikan kalau kamu benar-benar si birthday girl tercantik.",
    question: "Siapa orang paling beruntung di seluruh semesta karena bisa kenal dan dicintai kamu?",
    options: [
      {
        id: "opt_me",
        text: "Aku (Luckman), jelas pacar paling beruntung sedunia!",
        isCorrect: true,
        feedback: "Betul 100%! Nggak ada yang lebih bersyukur dan bahagia daripada aku ❤️"
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
        feedback: "Einstein pinter fisika, tapi dia nggak punya bidadari seindah kamu :P"
      },
      {
        id: "opt_alien",
        text: "Alien di planet Mars",
        isCorrect: false,
        feedback: "Alien aja bakal iri liat senyum manismu!"
      }
    ],
    verifiedBadge: {
      title: "TERVERIFIKASI RESMI",
      roles: ["Birthday Girl Kesayangan", "Pacar Terbaik Sedunia", "Paling Cantik & Gemas", "Pemilik Hatiku"]
    }
  },

  // Chapter 06: Love Letter Personal
  letter: {
    title: "SURAT DARI HATIKU UNTUKMU",
    opening: "Oke sayang... nggak ada lagi kuis. Nggak ada lagi misi. Sekarang aku cuma ingin menyampaikan sesuatu yang tulus dari lubuk hatiku yang terdalam.",
    paragraphs: [
      "Selamat ulang tahun yang paling hangat untuk orang paling spesial di seluruh semestaku, Herlin Ochtorisa.",
      "Waktu pertama kali kita kenal dan dekat, aku nggak pernah menyangka kalau hari-hari ke depannya bakal seindah, sehangat, dan sebermakna ini bareng kamu. Kamu itu seperti rumah tempat aku selalu ingin pulang—tempat di mana aku bisa jadi diriku sendiri seutuhnya tanpa rasa ragu sedikit pun.",
      "Terima kasih sudah bertahan sejauh ini, terima kasih sudah selalu berjuang dengan tulus dan penuh kasih, terima kasih atas tawa renyahmu yang selalu berhasil menghapus segala lelahku, dan terima kasih sudah memilih untuk terus melangkah bersamaku.",
      "Di usiamu yang baru ini, doaku selalu menyertaimu: semoga setiap langkahmu selalu dipeluk ketenangan dan hal-hal baik. Semoga mimpi-mimpimu yang indah pelan-pelan terwujud nyata, dan setiap tetes lelahmu selalu digantikan oleh kebahagiaan berlipat ganda.",
      "Apapun yang ada di depan nanti, ingat ya sayang: kamu nggak akan pernah sendirian. Ada aku yang selalu siap mendengarkan ceritamu, menggenggam erat tanganmu, dan selalu bangga melihat setiap prosesmu.",
      "Aku mencintaimu lebih dari kata-kata, lebih dari baris kode, dan lebih dari ribuan bintang di langit malam. ❤️"
    ],
    signoff: "Dengan segenap cintaku,"
  },

  // Final Birthday Surprise Screen Content
  finalSurprise: {
    headline: "SELAMAT ULANG TAHUN",
    subheadline: "UNTUK ORANG PALING SPESIAL DI DUNIAKU ❤️",
    wishes: [
      "Semoga di tahun ini, kamu semakin dekat dengan semua impian yang kamu harapkan.",
      "Semoga hari-harimu selalu dipenuhi oleh tawa bahagia, ketenangan hati, dan petualangan yang manis.",
      "Dan kalau aku beruntung... aku ingin selalu ada di sampingmu untuk menemani setiap momen indah itu."
    ],
    closing: "AKU SAYANG KAMU SELALU DAN SELAMANYA."
  },

  // Google Apps Script Web App URL untuk pengiriman form wishes
  googleAppsScriptUrl: "",

  // Easter Eggs Texts
  easterEggs: {
    secretButton: {
      label: "🐱 Jangan diklik ya!",
      message: "Tuh kan dibilangin jangan diklik masih diklik juga! 😂\n\nTapi nggak apa-apa... Aku sayang banget sama kamu, Herlin! ❤️"
    },
    secretHeartClick: {
      requiredClicks: 5,
      message: "🔓 PESAN RAHASIA TERBUKA!\n\nWah, kamu berhasil nemuin sesuatu yang tersembunyi!\nAku sayang kamu jauh lebih besar daripada yang bisa dihitung website ini!"
    },
    systemError: {
      title: "⚠️ SISTEM KEBANYAKAN MANIS",
      message: "Peringatan Kritis: Terlalu banyak keimutan terdeteksi! Semua server mengalami panas berlebih gara-gara senyuman manis Herlin.",
      btnText: "TETAP LANJUTKAN DENGAN CINTA ❤️"
    }
  }
};
