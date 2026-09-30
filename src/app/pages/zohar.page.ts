import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, inject, viewChild } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import {
  ISSUE_TEXT, TEMPERAMENTS, interpret,
  type CaptureChoices, type CheckLine, type HandSide, type IssueCode, type ReadingKind, type TraditionalReading,
} from '../../analysis/zohar';
import { PAGE_INFO } from '../../core/page-info';
import { ELEMENTS } from '../../core/zohar';
import { LangService } from '../lang.service';
import { ScreenComponent } from '../shell/screen.component';
import { CameraService, ImageUploadService } from '../zohar/image.services';

type View = 'home' | 'face' | 'profile' | 'palm' | 'temper' | 'result';

@Component({
  selector: 'app-zohar',
  imports: [ScreenComponent, IonIcon],
  templateUrl: './zohar.page.html',
})
export class ZoharPage implements OnInit, OnDestroy {
  readonly lang = inject(LangService);
  readonly elements = ELEMENTS;
  readonly temperaments = TEMPERAMENTS;
  readonly more = PAGE_INFO.zohar.more;
  private readonly upload = inject(ImageUploadService);
  private readonly camera = inject(CameraService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('vid');
  private stream: MediaStream | null = null;
  private urls: string[] = [];

  view: View = 'home';
  kind: ReadingKind = 'face';
  hand: HandSide = 'right';
  agreed = false;
  busy = false;
  camOpen = false;
  moreOpen = false;
  sampleMode = false;
  dragOver = false;
  nativeApp = false;
  choices: CaptureChoices = { camera: false, gallery: false, file: true, drop: true, filePrimary: true, unavailableNote: true };
  errorCode: IssueCode | undefined;
  front: { url: string; checks: CheckLine[]; reading: TraditionalReading } | null = null;
  profileNote: IssueCode | 'ok' | null = null;
  profileUrl: string | null = null;
  shot: { url: string; checks: CheckLine[]; reading?: TraditionalReading } | null = null;
  reading: TraditionalReading | null = null;
  extra: TraditionalReading | null = null;

  async ngOnInit(): Promise<void> {
    this.nativeApp = this.camera.native();
    this.choices = await this.camera.choices();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.stopCamera();
    this.revoke();
  }

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  issue(code: IssueCode | undefined): string {
    if (!code) return '';
    return ISSUE_TEXT[code][this.lang.lang()];
  }

  checkText(line: CheckLine): string {
    return this.lang.lang() === 'he' ? line.he : line.en;
  }

  openFace(): void {
    this.resetFlow();
    this.kind = 'face';
    this.view = 'face';
  }

  openPalm(): void {
    this.resetFlow();
    this.kind = 'palm';
    this.view = 'palm';
  }

  openTemper(): void {
    this.view = 'temper';
  }

  home(): void {
    this.stopCamera();
    this.view = 'home';
    this.errorCode = undefined;
  }

  backFromProfile(): void {
    this.shot = this.front ? { url: this.front.url, checks: this.front.checks, reading: this.front.reading } : null;
    this.view = 'face';
    this.errorCode = undefined;
  }

  async onFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      this.errorCode = 'cancelled';
      this.cd.detectChanges();
      return;
    }
    await this.take(file);
  }

  async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    await this.take(file);
  }

  async useNative(source: 'camera' | 'photos'): Promise<void> {
    this.errorCode = undefined;
    const shot = await this.camera.nativePhoto(source, this.kind);
    if (typeof shot === 'string') {
      this.errorCode = shot;
      if (shot === 'camera-missing') {
        this.choices = { ...this.choices, camera: false, file: true, unavailableNote: true };
      }
      this.cd.detectChanges();
      return;
    }
    await this.take(shot);
  }

  async openBrowserCamera(): Promise<void> {
    this.errorCode = undefined;
    if (!navigator.mediaDevices?.getUserMedia) {
      this.choices = { ...this.choices, camera: false, unavailableNote: true, file: true };
      this.errorCode = 'camera-missing';
      this.cd.detectChanges();
      return;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: this.view === 'palm' ? 'environment' : 'user' },
      });
    } catch (err) {
      const name = (err as DOMException)?.name;
      if (name === 'NotAllowedError' || name === 'SecurityError') this.errorCode = 'camera-denied';
      else {
        this.choices = { ...this.choices, camera: false, unavailableNote: true, file: true };
        this.errorCode = 'camera-missing';
      }
      this.stopCamera();
      this.cd.detectChanges();
      return;
    }
    this.camOpen = true;
    this.cd.detectChanges();
    const el = this.video()?.nativeElement;
    if (!el) {
      this.closeCam();
      return;
    }
    el.srcObject = this.stream;
    await el.play().catch(() => undefined);
  }

  shoot(): void {
    const el = this.video()?.nativeElement;
    if (!el?.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = el.videoWidth;
    canvas.height = el.videoHeight;
    canvas.getContext('2d')?.drawImage(el, 0, 0);
    const quality = this.kind === 'palm' ? 0.92 : 0.85;
    canvas.toBlob((blob) => {
      this.closeCam();
      if (!blob) {
        this.errorCode = 'damaged';
        this.cd.detectChanges();
        return;
      }
      void this.take(new File([blob], 'camera.jpg', { type: 'image/jpeg' }));
    }, 'image/jpeg', quality);
  }

  closeCam(): void {
    this.camOpen = false;
    this.stopCamera();
  }

  async take(file: File): Promise<void> {
    this.busy = true;
    this.errorCode = undefined;
    this.cd.detectChanges();
    const inspected = await this.upload.inspect(file, this.kind);
    this.busy = false;
    if (this.view === 'profile') {
      this.profileNote = inspected.result.ok ? 'ok' : inspected.result.code;
      this.profileUrl = inspected.url;
      if (inspected.url) this.urls.push(inspected.url);
      this.cd.detectChanges();
      return;
    }
    if (inspected.url) this.urls.push(inspected.url);
    this.shot = inspected.url ? { url: inspected.url, checks: inspected.result.checks, reading: inspected.result.reading } : null;
    if (!inspected.result.ok) this.errorCode = inspected.result.code;
    this.cd.detectChanges();
  }

  replace(): void {
    this.shot = null;
    this.errorCode = undefined;
  }

  continueFace(): void {
    if (!this.agreed || !this.shot?.reading) return;
    this.front = { url: this.shot.url, checks: this.shot.checks, reading: this.shot.reading };
    this.shot = null;
    this.errorCode = undefined;
    this.view = 'profile';
  }

  skipProfile(): void {
    this.finish(this.front?.reading ?? null, null);
  }

  useProfile(): void {
    this.finish(this.front?.reading ?? null, null);
  }

  continuePalm(): void {
    if (!this.agreed || !this.shot?.reading) return;
    this.finish(this.shot.reading, null);
  }

  sample(): void {
    this.sampleMode = true;
    this.kind = 'face';
    this.hand = 'right';
    this.reading = interpret('face', { shape: 'oval', forehead: 'high', lines: 'straight', eyes: 'brown' });
    this.extra = interpret('palm', { hand: 'square-long', heart: 'curved', head: 'sloping', life: 'wide' });
    this.view = 'result';
  }

  private finish(reading: TraditionalReading | null, extra: TraditionalReading | null): void {
    this.sampleMode = false;
    this.reading = reading;
    this.extra = extra;
    this.view = 'result';
    this.stopCamera();
  }

  private resetFlow(): void {
    this.stopCamera();
    this.revoke();
    this.shot = null;
    this.front = null;
    this.profileNote = null;
    this.profileUrl = null;
    this.reading = null;
    this.extra = null;
    this.errorCode = undefined;
    this.sampleMode = false;
    this.busy = false;
  }

  private stopCamera(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.camOpen = false;
  }

  private revoke(): void {
    for (const url of this.urls) URL.revokeObjectURL(url);
    this.urls = [];
  }
}
