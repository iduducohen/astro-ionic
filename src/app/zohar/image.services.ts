import { Injectable, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  captureChoices, detectFace, detectPalm, fileIssues, gateImage, moderationIssue, qualityIssue,
  type CaptureChoices, type Frame, type GateResult, type IssueCode, type ReadingKind,
} from '../../analysis/zohar';
import { frameFromBlob } from './decode';

@Injectable({ providedIn: 'root' })
export class ImageValidationService {
  file = fileIssues;
  quality = qualityIssue;
}

@Injectable({ providedIn: 'root' })
export class ModerationService {
  /** תמונה שנדחית כאן לא ממשיכה לניתוח. */
  check(frame: Frame): IssueCode | null {
    return moderationIssue(frame);
  }
}

@Injectable({ providedIn: 'root' })
export class FaceAnalysisService {
  read(frame: Frame) {
    return detectFace(frame);
  }
}

@Injectable({ providedIn: 'root' })
export class PalmAnalysisService {
  read(frame: Frame) {
    return detectPalm(frame);
  }
}

export interface Inspected {
  result: GateResult;
  url: string | null;
}

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  private readonly validation = inject(ImageValidationService);
  private readonly moderation = inject(ModerationService);
  private readonly faces = inject(FaceAnalysisService);
  private readonly palms = inject(PalmAnalysisService);

  /**
   * בדיקה אחת במכשיר: קובץ, איכות, מסננת, ורק אחר כך פרשנות.
   * התמונה לא נשמרת ולא נשלחת לשרת — אין כאן שרת העלאה.
   */
  async inspect(file: File, kind: ReadingKind): Promise<Inspected> {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const meta = { size: file.size, mime: file.type || '', name: file.name || 'photo.jpg', bytes };
    const early = this.validation.file(meta);
    if (early) {
      return { url: null, result: { ok: false, code: early, checks: [{ id: 'file', ok: false, he: 'הקובץ לא עבר את הבדיקה', en: 'The file did not pass' }] } };
    }
    let decoded: { frame: Frame; url: string } | null = null;
    try {
      decoded = await frameFromBlob(new Blob([bytes], { type: file.type || 'image/jpeg' }), kind);
    } catch {
      decoded = null;
    }
    if (!decoded) {
      return { url: null, result: { ok: false, code: 'damaged', checks: [{ id: 'file', ok: false, he: 'התמונה לא נקראה', en: 'The image was not read' }] } };
    }
    const blocked = this.moderation.check(decoded.frame);
    if (blocked) {
      return {
        url: decoded.url,
        result: { ok: false, code: blocked, checks: [{ id: 'safety', ok: false, he: 'התמונה אינה מתאימה', en: 'The image is not suitable' }] },
      };
    }
    const result = gateImage({ ...meta, frame: decoded.frame, kind });
    if (!result.ok) return { url: decoded.url, result };
    const confirm = kind === 'face' ? this.faces.read(decoded.frame) : this.palms.read(decoded.frame);
    if (!confirm.ok) {
      const code = 'code' in confirm ? confirm.code : kind === 'face' ? 'no-face' : 'no-palm';
      return { url: decoded.url, result: { ok: false, code, checks: result.checks } };
    }
    return { url: decoded.url, result };
  }
}

@Injectable({ providedIn: 'root' })
export class CameraService {
  async choices(): Promise<CaptureChoices> {
    const native = Capacitor.isNativePlatform();
    const mediaDevices = !!navigator.mediaDevices?.getUserMedia;
    let videoInputs: number | null = null;
    if (!native && navigator.mediaDevices?.enumerateDevices) {
      try {
        const list = await navigator.mediaDevices.enumerateDevices();
        videoInputs = list.filter((d) => d.kind === 'videoinput').length;
      } catch {
        videoInputs = null;
      }
    }
    const mobile = window.matchMedia('(pointer: coarse)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return captureChoices({ native, mediaDevices, videoInputs, mobile });
  }

  native(): boolean {
    return Capacitor.isNativePlatform();
  }

  async nativePhoto(source: 'camera' | 'photos', kind: ReadingKind): Promise<File | IssueCode> {
    return this.capture(source, {
      width: kind === 'palm' ? 2000 : 1400,
      quality: kind === 'palm' ? 92 : 85,
      filename: source === 'camera' ? 'camera.jpg' : 'gallery.jpg',
    });
  }

  /** מצלמה או גלריה ב-iOS וב-Android. בדפדפן אין כאן צילום. */
  async capture(source: 'camera' | 'photos', options?: { width?: number; quality?: number; filename?: string }): Promise<File | IssueCode> {
    try {
      const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
      const photo = await Camera.getPhoto({
        quality: options?.quality ?? 90,
        width: options?.width ?? 2000,
        correctOrientation: true,
        allowEditing: false,
        source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos,
        resultType: CameraResultType.Uri,
      });
      if (!photo.webPath) return 'camera-missing';
      const res = await fetch(photo.webPath);
      const blob = await res.blob();
      const filename = options?.filename ?? (source === 'camera' ? 'camera.jpg' : 'gallery.jpg');
      return new File([blob], filename, { type: blob.type || 'image/jpeg' });
    } catch (err) {
      const msg = String((err as { message?: string })?.message || err);
      if (/cancel/i.test(msg)) return 'cancelled';
      if (/denied|permission/i.test(msg)) return 'camera-denied';
      return 'camera-missing';
    }
  }
}
