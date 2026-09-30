import assert from 'node:assert/strict';
import { calculateHumanDesign } from '../../core/human-design.ts';
import { birthIssue, toChartView } from './map-chart.ts';

assert.equal(birthIssue({ date: '', time: '12:00', timeUnknown: false }), 'date');
assert.equal(birthIssue({ date: '1990-02-31', time: '12:00', timeUnknown: false }), 'date');
assert.equal(birthIssue({ date: '1990-05-17', time: '25:00', timeUnknown: false }), 'time');
assert.equal(birthIssue({ date: '1990-05-17', time: '', timeUnknown: true }), null);

const raw = calculateHumanDesign(1990, 5, 17, 8);
const view = toChartView(raw, true);
assert.equal(view.timeLimited, true);
assert.equal(view.typeName.he, raw.type.name.he);
assert.equal(view.authorityName.he.length > 0, true);
assert.equal(view.profileLabel.en.length > 0, true);
assert.equal('isActivated' in view, false);

console.log('hd map OK');
