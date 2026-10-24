export default function MotionLibraryDrawer() {
  return (
    <>
      <div className="scrim" id="scrim" hidden />

      <aside
        className="drawer"
        id="drawer"
        hidden
        aria-modal="true"
        role="dialog"
        aria-labelledby="dTitle"
      >
        <button className="close" id="dClose" type="button">
          Đóng
        </button>

        <div className="stagebox" id="dStage" />

        <div className="side">
          <div>
            <div className="key" id="dKey" />
            <h3 id="dTitle" />
          </div>

          <p id="dDesc" />

          <div className="transport">
            <button className="btn primary" id="dPlay" type="button">
              Tạm dừng
            </button>

            <div className="track">
              <div className="cues" id="dCues" />
              <input
                type="range"
                id="dScrub"
                min="0"
                max="1"
                step="0.0333"
                defaultValue="0"
                aria-label="Tua"
              />
            </div>

            <span className="time" id="dTime">
              00:00
            </span>
          </div>

          <div className="row">
            <button
              className="btn"
              id="dSound"
              type="button"
              aria-pressed="false"
            >
              Bật âm thanh
            </button>
            <span className="lbl">SFX đi kèm</span>
            <div className="sfxlist" id="dSfx" />
          </div>

          <div className="row" id="dModeRow">
            <span className="lbl">Nền</span>

            <div className="seg" id="dMode">
              <button type="button" data-v="full" aria-pressed="true">
                Phủ kín
              </button>
              <button type="button" data-v="card" aria-pressed="false">
                Đặt lên video
              </button>
            </div>

            <div className="seg" id="dPos">
              <button type="button" data-v="top" aria-pressed="false">
                Trên
              </button>
              <button type="button" data-v="center" aria-pressed="true">
                Giữa
              </button>
              <button type="button" data-v="bottom" aria-pressed="false">
                Dưới
              </button>
            </div>
          </div>

          <div>
            <div className="lbl" style={{ marginBottom: 6 }}>
              Nội dung (data)
            </div>

            <textarea
              id="dData"
              spellCheck={false}
              aria-label="Dữ liệu mẫu"
            />

            <div className="row" style={{ marginTop: 8 }}>
              <button className="btn primary" id="dApply" type="button">
                Áp dụng
              </button>
              <button className="btn" id="dResetData" type="button">
                Về dữ liệu mẫu
              </button>
              <span className="err" id="dErr" />
            </div>
          </div>

          <div>
            <div
              className="row"
              style={{ justifyContent: "space-between", marginBottom: 6 }}
            >
              <span className="lbl">Đoạn cho graphics.json</span>
              <button className="btn" id="dCopy" type="button">
                Sao chép
              </button>
            </div>

            <pre className="snip" id="dSnip" />
          </div>
        </div>
      </aside>
    </>
  );
}
