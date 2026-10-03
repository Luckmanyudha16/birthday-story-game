/**
 * GOOGLE APPS SCRIPT FOR BIRTHDAY ADVENTURE WISH SUBMISSION
 * 
 * CARA MENGGUNAKAN:
 * 1. Buka Google Sheets baru di https://sheets.google.com
 * 2. Beri nama spreadsheet, misalnya: "Birthday Adventure Wishes - [Nama Pasangan]"
 * 3. Buka menu Extensions > Apps Script (Ekstensi > Apps Script).
 * 4. Hapus seluruh kode default di Apps Script editor, lalu paste kode ini.
 * 5. Ganti variabel EMAIL_RECIPIENT di bawah ini dengan alamat email Anda (jika ingin menerima notifikasi email).
 * 6. Klik tombol "Save" (ikon disket).
 * 7. Klik tombol "Deploy" (Terapkan) > "New deployment" (Penerapan baru).
 * 8. Pada ikon roda gigi "Select type", pilih "Web app" (Aplikasi web).
 * 9. Konfigurasi:
 *    - Description: Birthday Wishes API
 *    - Execute as: Me (emailanda@gmail.com)
 *    - Who has access: Anyone (Siapa saja)  <-- PENTING agar website static bisa mengirim data tanpa login Google
 * 10. Klik "Deploy", beri izin (Authorize Access / Izinkan).
 * 11. Salin "Web App URL" yang berakhiran `/exec`.
 * 12. Buka file `src/data/birthdayConfig.js` di project ini, dan tempelkan URL tersebut ke `googleAppsScriptUrl: "https://script.google.com/macros/s/.../exec"`.
 */

// Ganti dengan alamat email Anda untuk menerima notifikasi saat pasangan submit form
const EMAIL_RECIPIENT = "ganti_dengan_email_anda@gmail.com"; 
const SEND_EMAIL_NOTIFICATION = true; // Ubah ke false jika tidak ingin notifikasi email

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
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
      // Format header row bold
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

Buka Google Sheet kamu untuk melihat riwayat lengkapnya.
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
