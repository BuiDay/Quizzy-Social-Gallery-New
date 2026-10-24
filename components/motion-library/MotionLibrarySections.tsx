export default function MotionLibrarySections() {
  return (
    <div className="wrap">
      <section id="sec-mg">
        <div className="sec-head">
          <div>
            <h2>
              Mẫu chuyển động <span className="n">37</span>
            </h2>
            <p>
              Dùng khi người nói nhắc tới số liệu, thời gian, danh sách, giao
              diện… Phủ kín màn hình để che chỗ nhìn lệch, hoặc đặt lên video.
            </p>
          </div>
        </div>

        <div className="grid" id="grid" />
        <div className="empty" id="empty" hidden>
          Không có mẫu nào khớp. Thử từ khoá khác.
        </div>
      </section>

      <section id="sec-tfx">
        <div className="sec-head">
          <div>
            <h2>
              Chữ động <span className="n">34</span>
            </h2>
            <p>
              34 preset chữ cho câu hook, từ khoá, tên phần. Gõ chữ của bạn để
              xem tất cả cùng lúc; dùng dấu | để xuống dòng.
            </p>
          </div>

          <div className="txtin">
            <input
              id="tfxText"
              type="text"
              placeholder="vd: Bí mật|tăng view"
              aria-label="Chữ thử cho preset"
            />
            <button className="btn" id="tfxReset" type="button">
              Dùng chữ mẫu
            </button>
          </div>
        </div>

        <div className="grid wide" id="tgrid" />
      </section>

      <section id="sec-fx">
        <div className="sec-head">
          <div>
            <h2>
              Hiệu ứng dựng video <span className="n">30</span>
            </h2>
            <p>
              Áp lên chính khung hình người nói: tách người khỏi nền, đặt đồ hoạ
              phía sau, zoom, khung, chữ khổng lồ… Bản mẫu dựng trên cùng một
              đoạn 4,6 giây. Bấm để dừng hoặc chạy.
            </p>
          </div>
        </div>

        <div className="grid" id="fxgrid" />
      </section>

      <footer>
        Dùng trong video: thêm đoạn cấu hình vào{" "}
        <code>graphics.json</code> của dự án, hoặc nói với Claude tên mẫu + câu
        thoại cần gắn. Hiệu ứng dựng: <code>fx/prepare.py</code> rồi{" "}
        <code>fx/fxrender.py</code>. Xuất riêng cho CapCut:{" "}
        <code>studio.py chu-dong mov …</code> (chữ động) hoặc{" "}
        <code>mg.py render …</code>.{" "}
        <b>Skill by Quizzy Social Gallery.</b>
      </footer>
    </div>
  );
}
