export default function MotionLibraryHeader() {
  return (
    <div className="wrap">
      <header>
        <div>
          <div className="eyebrow">
            Edit Video · Skill by Quizzy Social Gallery · khung 1080×1920 · 30 fps
          </div>

          <h1>
            Thư viện <em>motion graphic</em>
          </h1>

          <p className="lede">
            Mỗi khung bên dưới đang chạy đúng như khi dựng vào video. Bấm vào
            một mẫu để tua từng khung, nghe tiếng SFX đi kèm, sửa chữ và chép
            đoạn cấu hình đưa cho Claude.
          </p>

          <div className="stickers">
            <span className="stk l">37 mẫu chuyển động</span>
            <span className="stk p">34 preset chữ</span>
            <span className="stk c">30 hiệu ứng dựng</span>
            <span className="stk k">Xuất được CapCut</span>
          </div>
        </div>

        <div className="tc">
          <span>tổng thời lượng thư viện</span>
          <b id="total">00:00:00:00</b>
          <span id="counts" />
        </div>
      </header>
    </div>
  );
}
