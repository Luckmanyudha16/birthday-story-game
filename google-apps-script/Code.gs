/**
 * GOOGLE APPS SCRIPT FOR BIRTHDAY ADVENTURE WISH SUBMISSION
 * 
 * SPREADSHEET TARGET:
 * https://docs.google.com/spreadsheets/d/1pF-qkBZtk4j9XjPmN2ej7UsOy2ZoZoGhc8QAs56dkxg/edit?usp=sharing
 * 
 * CARA SETUP:
 * 1. Buka spreadsheet Anda: https://docs.google.com/spreadsheets/d/1pF-qkBZtk4j9XjPmN2ej7UsOy2ZoZoGhc8QAs56dkxg/edit
 * 2. Klik menu "Extensions" > "Apps Script" (atau "Ekstensi" > "Apps Script").
 * 3. Hapus semua kode default di editor, lalu paste SEMUA isi file ini.
 * 4. (Opsional) Ganti EMAIL_RECIPIENT dengan email Anda jika ingin menerima notifikasi email saat pasangan mengirim harapan.
 * 5. Klik icon "Save" (Disket).
 * 6. Klik tombol "Deploy" (biru di kanan atas) > "New deployment" (Penerapan baru).
 * 7. Klik icon gerigi "Select type", pilih "Web app".
 * 8. Konfigurasi:
 *    - Description: Birthday Wish Form
 *    - Execute as: Me (emailanda@gmail.com)
 *    - Who has access: Anyone (Siapa saja)  <-- SANGAT PENTING agar form bisa kirim tanpa login Google
 * 9. Klik "Deploy" -> Klik "Authorize access" -> Pilih akun Google Anda -> Klik "Advanced" -> Klik "Go to Birthday Wish Form (unsafe)" -> Klik "Allow".
 * 10. Salin "Web App URL" yang berakhiran `/exec`.
 * 11. Buka file `src/data/birthdayConfig.js`, lalu tempel URL tersebut di:
 *     googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec"
 */

// ID Spreadsheet Anda (diambil dari link spreadsheet Anda)
const SPREADSHEET_ID = "1pF-qkBZtk4j9XjPmN2ej7UsOy2ZoZoGhc8QAs56dkxg";

// Ganti dengan alamat email Anda untuk menerima notifikasi saat pasangan submit form
const EMAIL_RECIPIENT = "ganti_dengan_email_anda@gmail.com"; 
const SEND_EMAIL_NOTIFICATION = false; // Ubah ke true jika ingin notifikasi email

function getTargetSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    }
  } catch (err) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return ss.getActiveSheet() || ss.getSheets()[0];
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = getTargetSheet();
    
    // Siapkan Header jika baris pertama masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Recipient Name",
        "Quiz Score",
        "Wish 1",
        "Wish 2",
        "Wish 3",
        "Person I Want To Become",
        "Wish With Partner",
        "Dream Gift",
        "Dream Destination"
      ]);
      // Format header row bold dengan warna background pastel lembut
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#FCE4EC");
    }

    // Ambil data JSON dari POST request
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    // Masukkan data ke baris baru
    sheet.appendRow([
      timestamp,
      data.name || "-",
      data.quizScore || "100/100",
      data.wish1 || "-",
      data.wish2 || "-",
      data.wish3 || "-",
      data.personToBecome || "-",
      data.wishTogether || "-",
      data.dreamGift || "-",
      data.dreamDestination || "-"
    ]);

    // Kirim notifikasi email ke pemilik jika diaktifkan
    if (SEND_EMAIL_NOTIFICATION && EMAIL_RECIPIENT && EMAIL_RECIPIENT.includes("@") && !EMAIL_RECIPIENT.includes("ganti_dengan")) {
      const emailSubject = `🎂 New Birthday Wishes Received from ${data.name || "Birthday Girl"}! ❤️`;
      const emailBody = `
Halo! Pasanganmu baru saja menyelesaikan The Birthday Adventure dan mengirimkan harapannya! ❤️

Detail Harapan:
----------------------------------------
Nama: ${data.name || "-"}
Waktu: ${timestamp}
Quiz Score: ${data.quizScore || "100/100"}

✨ 3 Hal yang diharapkan tahun ini:
1. ${data.wish1 || "-"}
2. ${data.wish2 || "-"}
3. ${data.wish3 || "-"}

💭 Ingin menjadi pribadi seperti apa:
${data.personToBecome || "-"}

❤️ Hal yang ingin dijalani bersama:
${data.wishTogether || "-"}

🎁 Kado/hadiah yang diinginkan tahun ini:
${data.dreamGift || "-"}

🌎 Tempat impian yang ingin dikunjungi:
${data.dreamDestination || "-"}
----------------------------------------

Buka Google Sheet kamu untuk melihat riwayat lengkapnya:
https://docs.google.com/spreadsheets/d/1pF-qkBZtk4j9XjPmN2ej7UsOy2ZoZoGhc8QAs56dkxg/edit

Selamat merayakan hari ulang tahunnya! 🎉
      `;
      MailApp.sendEmail(EMAIL_RECIPIENT, emailSubject, emailBody);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Wishes safely stored!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Birthday Adventure API is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}
