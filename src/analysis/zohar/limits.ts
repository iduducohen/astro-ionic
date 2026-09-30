/** גבולות קבועים לבדיקת תמונה. לא מפזרים מספרים בקוד הקורא. */

export const MAX_FILE_SIZE = 8 * 1024 * 1024;
export const MIN_IMAGE_WIDTH = 480;
export const MIN_IMAGE_HEIGHT = 480;
export const MAX_IMAGE_WIDTH = 8000;
export const MAX_IMAGE_HEIGHT = 8000;
export const MIN_ASPECT = 0.45;
export const MAX_ASPECT = 2.4;

export const DARK_MEAN = 48;
export const BRIGHT_MEAN = 228;
export const BRIGHT_SHARE = 0.62;
export const EMPTY_STD = 7;
export const SHARP_MIN = 22;

export const MIN_FACE_AREA = 0.075;
export const TINY_FACE_AREA = 0.012;
export const CROP_EDGE = 0.02;

export const MIN_PALM_SKIN = 0.16;
export const MIN_FINGER_PEAKS = 3;
export const MIN_PALM_LINES = 2;
export const PALM_BORDER = 0.22;

/** עור שממלא את הפריים בלי מבנה של פנים או כף יד נדחה לפני הניתוח. */
export const DISALLOWED_SKIN = 0.8;

export const FACE_PROFILE = { maxEdge: 1280, quality: 0.82 };
export const PALM_PROFILE = { maxEdge: 2000, quality: 0.92 };

export const ANALYSIS_QUOTA = 12;
export const QUOTA_WINDOW_MS = 60_000;

export const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'webp'] as const;
export const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'] as const;
