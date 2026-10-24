"use client";

import MotionLibraryDrawer from "./MotionLibraryDrawer";
import MotionLibraryHeader from "./MotionLibraryHeader";
import MotionLibraryRuntime from "./MotionLibraryRuntime";
import MotionLibrarySections from "./MotionLibrarySections";
import MotionLibraryToolbar from "./MotionLibraryToolbar";

export default function MotionLibraryApp() {
  return (
    <div className="motion-library">
      <div className="mgvars" id="app">
        <MotionLibraryHeader />
        <MotionLibraryToolbar />
        <MotionLibrarySections />
        <MotionLibraryDrawer />
      </div>

      <MotionLibraryRuntime />
    </div>
  );
}
