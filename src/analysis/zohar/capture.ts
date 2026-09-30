export interface CaptureEnv {
  native: boolean;
  mediaDevices: boolean;
  /** null כשעדיין לא ידוע אם יש מצלמה. 0 = נבדק ואין. */
  videoInputs: number | null;
  mobile: boolean;
}

export interface CaptureChoices {
  camera: boolean;
  gallery: boolean;
  file: boolean;
  drop: boolean;
  filePrimary: boolean;
  unavailableNote: boolean;
}

/**
 * מה מציגים לפי הסביבה.
 * אפליקציה: מצלמה וגלריה.
 * דפדפן בלי מצלמה: העלאת קובץ בלבד, בלי כפתור צילום.
 */
export function captureChoices(env: CaptureEnv): CaptureChoices {
  if (env.native) {
    return { camera: true, gallery: true, file: false, drop: false, filePrimary: false, unavailableNote: false };
  }
  const file = true;
  const drop = !env.mobile;
  const confirmed = env.videoInputs !== null && env.videoInputs > 0;
  const camera = env.mediaDevices && (confirmed || env.mobile);
  return {
    camera,
    gallery: false,
    file,
    drop,
    filePrimary: !env.mobile,
    unavailableNote: !camera,
  };
}
