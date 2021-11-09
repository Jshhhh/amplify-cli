import { UserDefinedSlot } from '@aws-amplify/graphql-transformer-core';

export const SLOT_NAMES = [
  'init',
  'preAuth',
  'auth',
  'postAuth',
  'preDataLoad',
  'preUpdate',
  'preSubscribe',
  'postDataLoad',
  'postUpdate',
  'finish',
];

const README = 'README.md';

export function createUserDefinedSlot(fileName: string, slicedSlotName: string[], template: string): UserDefinedSlot {
  return {
    fileName,
    resolverTypeName: slicedSlotName[0],
    resolverFieldName: slicedSlotName[1],
    slotName: slicedSlotName[2],
    template,
  };
}

export function parseUserDefinedSlots(userDefinedTemplates: any): Record<string, UserDefinedSlot[]> {
  const slots: Record<string, UserDefinedSlot[]> = {};
  const keys = Object.keys(userDefinedTemplates);

  keys.forEach(key => {
    if (key === README) return;

    const slicedSlotName = key.split('.');
    const isSlot = SLOT_NAMES.includes(slicedSlotName[2]);

    if (isSlot) {
      const slot = createUserDefinedSlot(key, slicedSlotName, userDefinedTemplates[key]);
      const resolverName = [slicedSlotName[0], slicedSlotName[1]].join('.');

      if (!slots[resolverName]) slots[resolverName] = [slot];
      else slots[resolverName].push(slot);
    }
  });

  return slots;
}
