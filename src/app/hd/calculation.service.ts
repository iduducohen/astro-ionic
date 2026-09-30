import { Injectable } from '@angular/core';
import { calculateHumanDesign } from '../../core/human-design';
import { toChartView } from './map-chart';
import type { BirthData, HdChartView } from './models';

/**
 * מנוע להחלפה. הגרסה הזו קוראת לקירוב המקומי שכבר קיים בפרויקט.
 * זה לא חישוב אסטרונומי, ולא מדידה מדעית של אישיות.
 */
@Injectable({ providedIn: 'root' })
export class HumanDesignCalculationService {
  calculate(birth: BirthData): HdChartView {
    const [year, month, day] = birth.date.split('-').map(Number);
    const hour = birth.timeUnknown ? 12 : Number(birth.time.slice(0, 2)) || 12;
    return toChartView(calculateHumanDesign(year, month, day, hour), birth.timeUnknown);
  }
}
