
import { getChildIndex } from '../get-child-index';

describe('getChildIndex', () => {
  let mockSiblings: HTMLElement[];

  beforeAll(() => {
    const mockParent = document.createElement('p');
    mockSiblings = Array.from({length: 5}, () => document.createElement('span'));
    mockSiblings .forEach((el, i) => {
      el.classList.add(i % 2 === 0 ? 'even' : 'odd');
      mockParent.appendChild(el);
    });
  });

  it('should return the correct index when used without a filter', () => {
    mockSiblings.forEach((el, index) => {
      expect(getChildIndex(el)).toEqual(index);
    });
  });

  it('should return the correct index when used with a filter', () => {
    const oddSiblings = mockSiblings.filter(el => el.classList.contains('odd'));
    oddSiblings.forEach((el, index) => {
      expect(getChildIndex(el, '.odd')).toEqual(index);
    });
  });

  it('should return -1 if the supplied element has no parent', () => {
    const newChild = document.createElement('em');
    expect(getChildIndex(newChild)).toEqual(-1);
  });

  it('should return -1 if the provided element does not match the provided filter', () => {
    expect(getChildIndex(mockSiblings[0], '.odd')).toEqual(-1);
  });
});
