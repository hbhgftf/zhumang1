"use strict";
const TUIChat = {
  "查看内容": "Lihat konten",
  "立即填写": "Isi sekarang",
  "已提交": "Terkirim",
  "不能为空": "Tidak boleh kosong",
  "提交": "Kirim",
  "撤回": "Tarik kembali",
  "删除": "Hapus",
  "复制": "Salin",
  "重新发送": "Kirim ulang",
  "转发": "Teruskan",
  "引用": "Kutip",
  "打开": "Buka",
  "已读": "Dibaca",
  "全部已读": "Semua dibaca",
  "人已读": " dibaca",
  "人未读": " belum dibaca",
  "人关闭阅读状态": " status baca ditutup",
  "消息详情": "Detail Pesan",
  "关闭阅读状态": "Status baca ditutup",
  "该消息不存在": "Pesan tidak ada",
  "无法定位到原消息": "Tidak dapat menavigasi ke pesan asli",
  "未读": "Belum dibaca",
  "您": "Anda",
  "撤回了一条消息": "menarik kembali pesan",
  "重新编辑": "Edit ulang",
  "我": "Saya",
  "查看更多": "Lihat lebih banyak",
  "转发给": "Teruskan ke",
  "请输入消息": "Masukkan pesan",
  "描述": "Deskripsi",
  "经度": "Garis bujur",
  "纬度": "Garis lintang",
  "自定义消息": "Pesan kustom",
  "图片": "[foto]",
  "语音": "[suara]",
  "视频": "[rekaman video]",
  "表情": "[wajah]",
  "文件": "[dokumen]",
  "自定义": "[pesan kustom]",
  "管理员开启全员禁言": "Admin mengaktifkan Bisukan Semua",
  "您已被管理员禁言": "Anda telah dibisukan oleh admin",
  "按Enter发送": "Tekan Enter untuk mengirim pesan",
  "单击下载": "Klik untuk mengunduh",
  "下载": "Unduh",
  "确认重发该消息？": "Konfirmasi untuk mengirim ulang pesan?",
  "取消": "Batal",
  "确定": "Kirim",
  "对方正在输入": "Sedang mengetik...",
  "回到最新位置": "Kembali ke lokasi terbaru",
  "条新消息": " pesan baru",
  "点此投诉": "Keluhan",
  "语音通话": "Panggilan Suara",
  "视频通话": "Panggilan Video",
  "发起群语音": "Mulai panggilan suara grup",
  "发起群视频": "Mulai panggilan video grup",
  "已接听": "Dijawab",
  "拒绝通话": "Tolak Panggilan",
  "无应答": "Tidak Ada Jawaban",
  "取消通话": "Batalkan Panggilan",
  "发起通话": "Mulai Panggilan",
  "结束群聊": "Akhiri Panggilan Grup",
  "通话时长": "Durasi",
  "欢迎使用TUICallKit": "Selamat datang di TUICallKit",
  "检测到您暂未集成TUICallKit，无法体验音视频通话功能": "Terdeteksi bahwa Anda belum mengintegrasikan TUI CallKit, sehingga Anda tidak dapat merasakan panggilan audio dan video.",
  "请点击": "Silakan klik",
  "集成TUICallKit": " Integrasikan TUICallKit ",
  "开通腾讯实时音视频服务": "Integrasi Komunikasi Real-Time Tencent",
  "进行体验": "untuk merasakan.",
  "您当前购买使用的套餐包暂未开通此功能": "Paket yang Anda beli tidak mendukung kemampuan ini.",
  "系统消息": "Bot",
  "转人工服务": "layanan manusia",
  "点击处理": "Klik Proses",
  "发送失败": "Gagal mengirim",
  "复制成功": "Berhasil disalin ke clipboard",
  "回复": "Balas",
  "回复详情": "Detail Balasan",
  "拒绝": "Tolak",
  "聊天记录": "Riwayat Obrolan",
  "内容包含敏感词汇": "Konten mengandung kata-kata sensitif",
  "您当前购买使用的套餐包暂未开通群消息已读回执功能": "Paket yang Anda beli saat ini belum mengaktifkan fungsi resi baca pesan grup",
  "您当前购买使用的套餐包暂未开通在线用户列表功能": "Paket yang Anda beli saat ini belum mengaktifkan fungsi daftar pengguna online",
  "您有": "Anda memiliki",
  "涉及敏感内容": "Melibatkan konten sensitif",
  "申请加入": "Ajukan untuk bergabung",
  "条回复": "balasan",
  "条入群申请": "permintaan untuk bergabung dengan grup",
  "同意": "Setuju",
  "图片消息失败,无效的图片格式": "Gagal mengirim pesan gambar, format gambar tidak valid",
  "位置": "Lokasi",
  "文件不存在,请检查文件路径是否正确": "File tidak ada, silakan periksa apakah jalur file benar",
  "文件大小超出了限制,如果上传文件,最大限制是100MB": "Ukuran file melebihi batas, jika mengunggah file, batas maksimum adalah 100MB",
  "文件消息失败,禁止发送违规封禁的文件": "Gagal mengirim pesan file, dilarang mengirim file yang dilarang",
  "无法查看": "Tidak dapat dilihat",
  "无法收听": "Tidak dapat didengar",
  "正在加载": "Sedang memuat...",
  "加载结束": "Pemuatan selesai",
  "消息": "Pesan",
  "消息或者资料中文本存在敏感内容,发送失败": "Ada konten sensitif dalam teks pesan atau informasi, gagal mengirim",
  "消息长度超出限制,消息长度不要超过12K": "Panjang pesan melebihi batas, panjang pesan tidak boleh lebih dari 12K",
  "消息中图片存在敏感内容,发送失败": "Ada konten sensitif dalam gambar pesan, gagal mengirim",
  "选择提醒的人": "Pilih orang yang akan diingatkan",
  "已过撤回时限": "Batas waktu penarikan telah berlalu",
  "已拒绝": "Sudah ditolak",
  "已同意": "Sudah disetujui",
  "引用失败": "Gagal mengutip",
  "翻译": "menerjemahkan",
  "隐藏": "bersembunyi",
  "腾讯云 IM": "Tencent Cloud Chat",
  "空": "Kosong",
  "文本包含本地审核拦截词": "Teks mengandung kata-kata yang dicegah oleh peninjauan lokal",
  "按住说话": "Tahan dan bicara",
  "抬起发送": "Lepaskan untuk mengirim",
  "抬起取消": "Lepaskan untuk membatalkan",
  "正在录音": "Sedang merekam",
  "继续上滑可取消": "Lanjutkan menggeser ke atas untuk membatalkan",
  "松开手指 取消发送": "Lepaskan jari untuk membatalkan",
  "此机型暂不支持复制功能": "Fungsi menyalin tidak didukung oleh model ini",
  "请开通翻译功能": "Harap aktifkan fitur terjemahan",
  "请开通语音转文字功能": "Harap aktifkan fitur konversi suara ke teks",
  "翻译中": "Menerjemahkan",
  "转换中": "Mengonversi",
  "由IM提供翻译支持": "Didukung oleh IM untuk terjemahan",
  "所有人": "Semua orang",
  "已达到表情回应上限数量": "Telah mencapai batas maksimum respons emoji",
  "等": "dll",
  "人": "orang",
  "返回": "Kembali",
  "关闭": "Tutup",
  "多选": "Pilih banyak",
  "合并转发": "Gabungkan dan teruskan",
  "逐条转发": "Teruskan satu per satu",
  "未选择消息": "Tidak ada pesan yang dipilih",
  "[草稿]": "[Draf]",
  "[消息]": "[Pesan]",
  "[文本]": "[Teks]",
  "[自定义消息]": "[Pesan Kustom]",
  "[图片]": "[foto]",
  "[音频]": "[Suara]",
  "[语音]": "[Suara]",
  "[视频]": "[Video]",
  "[文件]": "[File]",
  "[位置]": "[Lokasi]",
  "[地理位置]": "[Lokasi]",
  "[动画表情]": "[Stiker Animasi]",
  "[群提示]": "[Petunjuk Grup]",
  "[群提示消息]": "[Pesan Petunjuk Grup]",
  "[聊天记录]": "[Riwayat Chat]",
  "[机器人自定义消息]": "[Pesan Kustom Robot]",
  "引用内容已撤回": "Konten kutipan telah ditarik kembali",
  "群聊的聊天记录": "Riwayat Chat Grup",
  "和": "dan",
  "的聊天记录": "riwayat chat",
  "请升级IMSDK到v2.10.1或更高版本查看此消息": "Harap tingkatkan IMSDK ke versi 2.10.1 atau yang lebih tinggi untuk melihat pesan ini",
  "该群聊已被解散": "Grup ini telah dibubarkan",
  "您已被管理员移出群聊": "Anda telah dikeluarkan dari grup oleh administrator",
  "您已退出该群聊": "Anda telah keluar dari grup ini",
  "您已被禁止聊天": "Anda telah dilarang untuk mengobrol",
  "按Enter发送，Ctrl+Enter换行": "Tekan Enter untuk mengirim, Ctrl+Enter untuk ganti baris",
  "账号被强制下线": "Akun dipaksa keluar",
  "登录失败": "Gagal masuk"
};
exports.TUIChat = TUIChat;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages-ai-desk/ai-desk-customer-uniapp/locales/id/TUIChat.js.map
