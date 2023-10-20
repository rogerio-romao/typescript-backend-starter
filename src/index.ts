const e: string[] = ['a', 'b'];
const createValue = () => e;
createValue();

interface T1 {
    func: (_arg: unknown) => number;
}
export type { T1 };

function foo(arg: 'bar' | 'baz') {
    console.log(arg);
}

for (let i = 0; i < e.length; i++) {
    // eslint-disable-next-line no-console
    console.log(i);
}

const str = 'foo';
str.includes('o');
