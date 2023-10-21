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
const l = str[3];
str.includes('o');
const yes = str.startsWith('o');

type Day =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';

const day = 'Monday' as Day;
let result = 0;

switch (day) {
    case 'Monday':
        result = 1;
        break;
    case 'Tuesday':
        result = 2;
        break;
    case 'Wednesday':
        result = 3;
        break;
    case 'Thursday':
        result = 4;
        break;
    default:
        result = 0;
        break;
}
