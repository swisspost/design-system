export function CheckOneOf(possibleValues: any[], customMessage?: string) {
    return function (target: any, propertyKey: string) {
      const backingField = `__${propertyKey}`;
      Object.defineProperty(target, propertyKey, {
        get: function () {
          return this[backingField];
        },
        set: function (newVal: any) {
          const defaultMessage = `The property ${propertyKey} must be one of the following values: ${possibleValues.join(', ')}.`;
          const message = customMessage || defaultMessage;
          if (!possibleValues.includes(newVal)) {
            throw new Error(message);
          }
          this[backingField] = newVal;
        },
        enumerable: true,
        configurable: true,
      });
    };
  }
  