export default function MotionLibraryToolbar() {
  return (
    <div className="bar">
      <div className="wrap">
        <div
          className="chips"
          id="cats"
          role="toolbar"
          aria-label="Lọc theo nhóm"
        />

        <div className="tools">
          <input
            className="search"
            id="q"
            type="search"
            placeholder="Tìm: đồng hồ, sale, like…"
            aria-label="Tìm mẫu"
          />

          <div className="swatches" id="sws">
            <span>Màu nhấn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
