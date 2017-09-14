export interface ChangeDetectorConfig {
  original: any[],
  target: any[],
  comparisonProperty: string,
  apply?: boolean,
  comparator?: (p1: any, p2: any) => number
}

export interface ChangeList {
  add: any[],
  remove: any[],
  change: any[]
}

export function defaultComparator(p1: any, p2: any) {
  if (p1 === p2) return 0;
  else if (p1 > p2) return 1;
  else return -1;
}

// TODO: find ways to detect change in object, not by reference

export class ChangeDetector {

  static run(config: ChangeDetectorConfig): ChangeList {
    // config setting
    let original = config.original,
      target = config.target,
      comparisonProperty = config.comparisonProperty,
      apply = config.apply || false,
      comparator = config.comparator || defaultComparator;

    // declare variables
    let originalPoint = 0,
      targetPoint = 0,
      originalLength = original.length,
      targetLength = target.length,
      currentOriginalCompProp,
      currentNextCompProp,
      result = {add: [], remove: [], change: []};
    for (let i = 0; i < originalLength + targetLength; i++) {
      // boundary case
      if (!target[targetPoint] && original[originalPoint]) { // prev remain
        for (var j = originalPoint; j < original.length; j++) {
          result.remove.push(original[j]);
          if (apply) {
            original.splice(j, 1);
            j--;
          }
        }
        break;
      }
      if (target[targetPoint] && !original[originalPoint]) { // target remain
        for (var j = targetPoint; j < target.length; j++) {
          result.add.push(target[j]);
          if (apply) {
            original.push(target[j]);
          }
        }
        break;
      }
      if (!target[targetPoint] && !original[originalPoint]) { // end
        break;
      }

      // normal case
      currentOriginalCompProp = original[originalPoint][comparisonProperty];
      currentNextCompProp = target[targetPoint][comparisonProperty];
      if (comparator(currentOriginalCompProp, currentNextCompProp) === 0) {
        // detect change
        let newChange;
        for (let i in original[originalPoint]) {
          if (i === comparisonProperty) continue; // ignore comparisonProperty
          if (original[originalPoint][i] !== target[targetPoint][i]) { // change detected
            if (!newChange) { // create & push new change in result.change
              newChange = {};
              newChange[comparisonProperty] = currentOriginalCompProp;
              newChange['id'] = original[originalPoint]['id'];
              result.change.push(newChange);
            }
            newChange[i] = [original[originalPoint][i], target[targetPoint][i]];
            if (apply) original[originalPoint][i] = target[targetPoint][i];
          }
        }
        originalPoint++;
        targetPoint++;
      } else if (comparator(currentOriginalCompProp, currentNextCompProp) < 0) {
        result.remove.push(original[originalPoint]);
        if (apply) {
          original.splice(originalPoint, 1);
          originalPoint--;
        }
        originalPoint++;
      } else {
        result.add.push(target[targetPoint]);
        if (apply) {
          original.splice(originalPoint, 0, target[targetPoint]);
          originalPoint++;
        }
        targetPoint++;
      }
    }
    return result;
  }
}
