import { isInFrame } from '.';
import * as expect from 'expect';

describe('index', () => {

    it('smoke', () => {
        expect(isInFrame).toBeA(Function);
    });
});
